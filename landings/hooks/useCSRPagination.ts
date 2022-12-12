import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { PaginationV2DataIFace } from "interfaces/interfaces";
import { useCookies } from "react-cookie";

function useCSRPagination<PageType extends PaginationV2DataIFace>(
  pageName: string,
  pageID: string,
  initNetwork: (
    token: string,
    org: number
  ) => Promise<AxiosResponse<PaginationV2DataIFace>>,
  network: (
    token: string,
    org: number,
    next: string
  ) => Promise<AxiosResponse<PaginationV2DataIFace>>,
  MAX_AUTO_FETCH_PAGE_BY_SCROLL = 3,
  fetch_on_load_page: boolean = true
) {
  const [cookies] = useCookies(["lnd_org", "token"]);
  const router = useRouter();
  const [pageData, setPageData] = useState<PageType | null>(null);
  const [page, setPage] = React.useState(1);
  const { isLoading, refetch, status } = useQuery(
    [pageName, pageID, page],
    async () => {
      if (!pageData) {
        return (await initNetwork(cookies.token, cookies.lnd_org)).data;
      } else {
        if (pageData.next) {
          return (await network(cookies.token, cookies.lnd_org, pageData.next!))
            .data;
        }
        return null;
      }
    },
    { enabled: false }
  );

  const changePagesStates = (data: PageType | null, pageNumber: number) => {
    setPageData(data);
    setPage(pageNumber);
  };

  useEffect(() => {
    if (fetch_on_load_page) {
      setPage(1);
      setPageData(null);
      fetch();
    }
  }, [router.asPath]);

  const hasNextPage = () => {
    return !!(pageData && pageData.next);
  };
  const nextPage = () => {
    if (hasNextPage()) fetchMore();
  };

  const nextPageOnScroll = () => {
    if (hasMorePageForScroll() && !isLoading) nextPage();
  };
  const hasMorePageForScroll = () => {
    return page < MAX_AUTO_FETCH_PAGE_BY_SCROLL;
  };

  const pageDataLength = () => {
    if (pageData) {
      if (Array.isArray(pageData.results)) {
        return pageData.results.length;
      } else {
        let maxLen = 0;
        for (const resultKey in pageData.results) {
          maxLen = Math.max(maxLen, pageData.results[resultKey].length);
        }
        return maxLen;
      }
    }
    return 0;
  };
  const fetch = () => {
    refetch()
      .then((response) => {
        if (response.data) {
          if (pageData) setPage((prevState) => prevState + 1);
          setPageData((prevState) => {
            if (prevState) {
              const responseResults = response.data!.results;
              const prevStateResults = prevState.results;
              if (
                Array.isArray(prevStateResults) &&
                Array.isArray(responseResults)
              ) {
                return {
                  ...response.data,
                  results: [...prevStateResults, ...responseResults],
                } as PageType;
              } else {
                for (const preKey in prevStateResults) {
                  (prevStateResults as { [P: string]: object[] })[
                    preKey
                  ].concat(
                    (responseResults as { [P: string]: object[] })[
                      preKey as string
                    ]
                  );
                }
                return {
                  ...response.data,
                  results: prevStateResults,
                } as PageType;
              }
            }
            return response.data as PageType;
          });
        }
      })
      .catch(() => {
        setPageData((prevState) => {
          if (prevState) return { ...prevState, next: null };
          else return null;
        });
      });
  };
  const fetchMore = () => {
    if (pageData) setTimeout(fetch, 2000);
  };
  return {
    fetch,
    nextPage,
    hasNextPage,
    page,
    fetchMore,
    pageData,
    nextPageOnScroll,
    isLoading,
    MAX_AUTO_FETCH_PAGE_BY_SCROLL,
    hasMorePageForScroll,
    pageDataLength,
    status,
    changePagesStates,
  };
}

export default useCSRPagination;
