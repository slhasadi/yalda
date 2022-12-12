import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { GetServerSideProps } from "next";
import { pushToast } from "../slices/toastSlice";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  basePath,
  baseURL,
  haffezGhazalApi,
  haffezInterpretationApi,
} from "../globals";
import Main from "components/pages/Main";
import AboutOfSubject from "components/commons/AboutOfSubject";
import { useCookies } from "react-cookie";
import { NextSeo } from "next-seo";
import Container from "components/commons/Container";
import {
  getMatchRoundData,
  getStagesData,
  getStandingsData,
} from "networks/predictions";
import handleOrganization from "../helpers/handleOrganization";
import DashboardLoader from "../components/commons/PageLoaders/dashboard";
import { RootState } from "store";

import axios from "axios";
const Home: NextPage = ({ match, standing, stages }: any) => {
  const [loading, setLoading] = useState(false);
  const [footerPage, setFooterPage] = useState<any>([]);
  const [ghazalID, setGhazalID] = useState(0);

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [interpretation, setInterpretation] = useState("");
  const [ghazal, setGhazal] = useState([]);
  const router = useRouter();
  const pageLoader = useSelector((state: RootState) => state.page.activePage);
  const pageData = useSelector((state: RootState) => state.pages.list);
  const dispatch = useDispatch<any>();
  const [cookies] = useCookies(["lnd_org"]);
  useEffect(() => {
    const handleRouteChange = (url: string, { shallow }: any) => {
      setLoading(true);
    };
    if (router.query.query === "unauthorized") {
      dispatch(
        pushToast({
          status: "error",
          message: "ورود شما با مشکل مواجه شد",
        })
      );
    }
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
  useEffect(() => {
    const falID = Math.round(Math.random() * 495);
    setGhazalID(falID);
    +setIsFetching(true);
    axios
      .all([
        axios.get(haffezGhazalApi(falID)),
        axios.get(haffezInterpretationApi(falID)),
      ])
      .then(([responseGhazal, responseInterpretation]) => {
        setInterpretation(responseInterpretation.data);
        setGhazal(responseGhazal.data.split("\n\n"));
        setIsFetching(false);
      });
  }, []);
  if (pageLoader === "dashboard") {
    return <DashboardLoader />;
  } else {
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
        <main className="bg-worldcup1 w-full h-screen">
          <Main interpretation={interpretation} ghazal={ghazal} />
          <div className="bg-worldcup1">
            {/* <Container>
              <AboutOfSubject textColor="white" bgColor="#020F2A" />
            </Container> */}
          </div>
        </main>
      </>
    );
  }
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const locale = context.locale;
  const stateCookie = await handleOrganization(context, false);
  const lnd_org = stateCookie?.lnd_org;
  const token = stateCookie?.token;
  try {
    const match = await getMatchRoundData(token as string, lnd_org as any);
    const data = await match.data;
    const stages = await getStagesData(token as string, lnd_org as any);
    const stage = await stages.data;
    const standing = getStandingsData(token as string, lnd_org as any);
    const stand = await (await standing).data;
    return {
      props: {
        ...(await serverSideTranslations(locale as any, ["home"])),
        match: data,
        stages: stage,
        standing: stand,
      },
    };
  } catch (error) {
    return {
      props: {
        ...(await serverSideTranslations(locale as any, ["home"])),
        match: [],
        stages: [],
        standing: [],
      },
    };
  }
};
export default Home;
