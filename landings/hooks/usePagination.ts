import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { PaginationV2DataIFace } from "interfaces/interfaces";
import { useCookies } from "react-cookie";

function usePagination<PageType extends PaginationV2DataIFace>(
  pageName: string,
  first_page: PageType,
  network: (
    token: string,
    org: number,
    next: string
  ) => Promise<AxiosResponse<PaginationV2DataIFace>>,
  MAX_AUTO_FETCH_PAGE_BY_SCROLL = 3
) {
  const router = useRouter();
  const [pageData, setPageData] = useState<PageType>(first_page);
  const [page, setPage] = React.useState(1);
  const [cookies] = useCookies(["lnd_org", "token"]);
  const { isLoading, refetch } = useQuery(
    [pageName, pageData.next ? pageData.next : "no-next-page"],
    async () => {
      if (pageData.next)
        return (
          await network(cookies["token"], cookies["lnd_org"], first_page.next!)
        ).data;
      else return null;
    },
    { enabled: false }
  );

  useEffect(() => {
    setPage(1);
    setPageData(first_page);
  }, [router.asPath]);

  const hasNextPage = () => {
    return !!pageData.next;
  };
  const nextPage = () => {
    if (pageData.next) fetchMore();
  };

  const nextPageOnScroll = () => {
    if (hasMorePageForScroll() && !isLoading) nextPage();
  };
  const hasMorePageForScroll = () => {
    return page < MAX_AUTO_FETCH_PAGE_BY_SCROLL;
  };

  const pageDataLength = () => {
    if (Array.isArray(pageData.results)) {
      return pageData.results.length;
    } else {
      let maxLen = 0;
      for (const resultKey in pageData.results) {
        maxLen = Math.max(maxLen, pageData.results[resultKey].length);
      }
      return maxLen;
    }
  };
  const fetchMore = () => {
    setTimeout(() => {
      refetch()
        .then((response) => {
          if (response.data) {
            setPage((prevState) => prevState + 1);
            setPageData((prevState) => {
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
            });
          }
        })
        .catch(() => {
          setPageData((prevState) => ({ ...prevState, next: null }));
        });
    }, 2000);
  };
  return {
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
  };
}

export default usePagination;
