import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import ReactGA from "react-ga";
import router from "next/router";
import axios from "axios";
import { useCookies } from "react-cookie";
import { baseURL } from "../../globals";
import { Feed, Item } from "../../interfaces/interfaces";
import Video from "../../components/pages/Video/Video";
import VideSection from "../../components/pages/Video/VideoSection";
import Container from "../../components/commons/Container";
import AboutOfSubject from "../../components/commons/AboutOfSubject";
import Loading from "../../components/commons/Loading";
import Footer from "components/commons/Footer/Footer";
import { NextSeo } from "next-seo";
import handleOrganization from "../../helpers/handleOrganization";
import { useSelector } from "react-redux";
import { RootState } from "store";

const MusicLanding = () => {
  const [width, setWidth] = useState<number>(0);
  const [video, setVideo] = useState<Item | any>(null);
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [footerPage, setFooterPage] = useState<any>([]);
  const pageData = useSelector((state: RootState) => state.pages.list);
  const [loading, setLoading] = useState(false);
  const feedList = ["Coffee_Shop", "noosh_jan", "zalam_zimbo"];
  const [cookies] = useCookies(["lnd_org"]);
  useEffect(() => {
    if (window.innerWidth > 768) {
      setWidth(window.innerWidth * (2 / 3));
    }
    ReactGA.pageview(router.asPath);
    const handleRouteChange = (url: string, { shallow }: any) => {
      setLoading(true);
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
  useEffect(() => {
    if (cookies.lnd_org) {
      axios
        .get(`${baseURL}feeds/video/`, {
          headers: {
            organization: cookies.lnd_org,
          },
        })
        .then((response) => {
          let feed = (response.data as Feed[]).filter((item) =>
            feedList.includes(item.slug)
          );
          setFeeds(feed);
          setLoading(false);
        });
    }
  }, [cookies.lnd_org]);
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
      {loading ? (
        <Loading />
      ) : (
        <main className="w-full pb-10 flex flex-col items-center justify-start">
          <Container>
            <VideSection list={feeds} setVideo={setVideo} />
            {feeds && <AboutOfSubject />}
          </Container>
          {video ? <Video video={video} setVideo={setVideo} /> : <></>}
        </main>
      )}
      {feeds && <Footer />}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stateCookie = await handleOrganization(context, false);
  return {
    props: {},
  };
};
export default MusicLanding;
