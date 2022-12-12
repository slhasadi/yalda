import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import {baseURL, serverSideURL} from "../../globals";
import { Feed, Item } from "../../interfaces/interfaces";
import Video from "../../components/pages/Movie";
import MovieSection from "../../components/pages/Movie/MovieSection";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Container from "../../components/commons/Container";
import AboutOfSubject from "../../components/commons/AboutOfSubject";
import Loading from "../../components/commons/Loading";
import Footer from "components/commons/Footer/Footer";
import { getVideoListData } from "networks/videos";
import { useCookies } from "react-cookie";
import { getFooterPageData } from "networks/musics";
import { NextSeo } from "next-seo";
import handleOrganization from "../../helpers/handleOrganization";
import { useSelector } from "react-redux";
import { RootState } from "store";
const MovieLanding = () => {
    const [video, setVideo] = useState<Item | any>(null);
    const pageData = useSelector((state: RootState) => state.pages.list);
    const [feeds, setFeeds] = useState<Feed[]>([]);
    const [movieFeed, setMovieFeeds] = useState<Feed[]>([]);
    const [footerPage, setFooterPage] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const movieList = [
      "movie",
    ];
    const feedList = [
      "documentary",
      "ted-lasso",
      "pejman",
      "352",
      "take-us-home-leeds-united",
      "this-is-football",
      "all-or-nothing-manchester-city"
    ];
    const [cookies] = useCookies([
      "lnd_org",
    ]);
    useEffect(()=>{
      if (cookies.lnd_org) {
        axios.get(`${baseURL}feeds/video/`, {
          headers: {
            organization: cookies.lnd_org,
          },
        })
        .then((response) => {
          let feed = (response.data as Feed[]).filter(item => feedList.includes(item.slug));
          let movie = (response.data as Feed[]).filter(item => movieList.includes(item.slug));
          setFeeds(feed);
          setMovieFeeds(movie)
        });
      }
    },[cookies.lnd_org]);
  useEffect(() => {
    const handleRouteChange = (url:string, { shallow }:any) => {
      setLoading(true)
    }
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])
    return <>
        <NextSeo
            title={pageData[0]?.meta_title}
            description={pageData[0]?.meta_description}
            openGraph={{
            url: pageData[0]?.meta_url,
            title: pageData[0]?.meta_title,
            description: pageData[0]?.meta_description,
            site_name: 'Vidaneh Sport',
            images: [
              {
                url: '/images/meta/mstile-150x150.png',
                width: 150,
                height: 150,
                alt: pageData[0]?.meta_title,
                type: 'image/png',
              },
            ],
            }}
          />
        {loading ? <Loading /> : <main className="w-full pb-10 flex flex-col items-center justify-start">
            <Container>
                <MovieSection list={feeds} movieFeed={movieFeed} setVideo={setVideo} footerPage={footerPage}  />
                <AboutOfSubject />
            </Container>
            {video ? <Video video={video} setVideo={setVideo} /> : <></>}
        </main> }
        {!loading && <Footer/>}

    </>
};
export const getServerSideProps: GetServerSideProps = async (context) => {
    const stateCookie = await handleOrganization(context, false)
    return {
        props: {},
    };

};

export default MovieLanding;
