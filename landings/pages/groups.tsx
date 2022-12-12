import GroupsGamePlans from "components/pages/Groups/GroupsGamePlans";
import GroupsLayout from "components/pages/Groups/GroupsLayout";
import GroupsStages from "components/pages/Groups/GroupsStages";
import PlayoffsChart from "components/pages/Groups/PlayoffsChart";
import { getFooterPageData } from "networks/musics";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import handleOrganization from "../helpers/handleOrganization";
import { GetServerSideProps } from "next";
import { Groups_SET_ACTIVE_MENU_ITEM } from "slices/groupsSlice";
import {
  getMatchesByDate,
  getPlayoffRoundMatches,
  getStandingsData,
} from "networks/predictions";
import {
  AllGroupsStagesDataIFace,
  GetMatchesResponseData,
  playoffRoundItemDataIFace,
} from "interfaces/interfaces";

interface GroupsPagePropsIFace {
  stages: AllGroupsStagesDataIFace;
  plans: GetMatchesResponseData;
  playoffs: playoffRoundItemDataIFace[];
}

const GroupsPage: React.FC<GroupsPagePropsIFace> = ({
  stages,
  plans,
  playoffs,
}) => {
  const groupsPageContents = [
    <GroupsStages groups={stages} key={0} />,
    <PlayoffsChart playoffs={playoffs} key={1} />,
    <GroupsGamePlans plans={plans} key={2} />,
  ];
  const activeMenuItem = useSelector(
    (state: RootState) => state.groups.activeMenuItem
  );
  const [loading, setLoading] = useState(false);
  const [footerPage, setFooterPage] = useState<any>([]);
  const router = useRouter();
  const [cookies] = useCookies(["lnd_org"]);
  const dispatch = useDispatch();
  const pageData = useSelector((state: RootState) => state.pages.list);
  useEffect(() => {
    const handleRouteChange = (url: string, { shallow }: any) => {
      setLoading(true);
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
  useEffect(() => {
    getFooterPageData(cookies.lnd_org, router.route).then(async (res: any) => {
      setFooterPage(res.data);
    });
  }, []);

  useEffect(() => {
    dispatch(Groups_SET_ACTIVE_MENU_ITEM(1));
  }, [router.basePath]);

  let renderGroupsPageContent = () => {
    return groupsPageContents[activeMenuItem];
  };

  return (
    <>
      <NextSeo
        title={pageData[0]?.meta_title}
        description={pageData[0]?.meta_description}
        openGraph={{
          url: pageData[0]?.meta_url,
          title: pageData[0]?.meta_title,
          description: pageData[0]?.meta_description,
          site_name: "Vidaneh Sport",
          images: [
            {
              url: "/images/meta/mstile-150x150.png",
              width: 150,
              height: 150,
              alt: pageData[0]?.meta_title,
              type: "image/png",
            },
          ],
        }}
      />
      <GroupsLayout>{renderGroupsPageContent()}</GroupsLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stateCookie = await handleOrganization(context, false);
  let lnd_org = stateCookie?.lnd_org;
  const token = stateCookie?.token;
  const stages = await getStandingsData(token as string, lnd_org);
  const result = stages.data.reduce(function (r: any, a: any) {
    r[`${a.league_round}`] = r[`${a.league_round}`] || [];
    r[`${a.league_round}`].push(a);
    return r;
  }, Object.create(null));
  const stages_data = result;
  const plans = await getMatchesByDate(token as string, lnd_org);
  const plans_data = plans.data;
  const playoff = await getPlayoffRoundMatches(token as string, lnd_org);
  const playoff_data = playoff.data;
  return {
    props: {
      stages: stages_data,
      plans: plans_data,
      playoffs: playoff_data,
    },
  };
};
export default GroupsPage;
