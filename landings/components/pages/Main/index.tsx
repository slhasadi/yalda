import CountDown from "components/commons/CountDown";
import GamesTable from "./Sections/gamsTable";
import Gahdad from "./Sections/gahdad";
import Pictures from "./Sections/pictures";
import Video from "./Sections/video";
import Travel from "./Sections/travel";
import Particle from "./Sections/particle";
import Game from "./Sections/game";
import Movies from "./Sections/movies";
import Music from "./Sections/music";
import Interpretation from "./Sections/interpretation";
import styles from "./styles/Main.module.scss";
import { useEffect, useState } from "react";
import { fetchNewsData } from "networks/news";
import { useCookies } from "react-cookie";
import { getVideoListData } from "networks/videos";
import { Feed } from "../../../interfaces/interfaces";
import { getMusicListData } from "networks/musics";
import { useRouter } from "next/router";
import { RootState } from "store";
import { useSelector } from "react-redux";
import Parallax from "./Sections/parallax";
const Main = ({ ghazal, interpretation }: any) => {
  const [videoFeed, setVideoFeeds] = useState<Feed[]>([]);
  const [movieFeed, setMovieFeeds] = useState<Feed[]>([]);
  const [musicFeed, setMusicFeeds] = useState<Feed[]>([]);
  const [audioFeed, setAudioFeeds] = useState<Feed[]>([]);
  const [groups, setGroups] = useState({});
  const router = useRouter();
  const pages = useSelector((state: RootState) => state.pages.menu);
  const [cookies] = useCookies(["lnd_org", "token"]);
  useEffect(() => {
    if (cookies.lnd_org) {
      // fetchNewsData(cookies.lnd_org).then(async (response: any) => {
      //   setNews(response.news);
      // });
      getVideoListData(cookies.lnd_org).then(async (response: any) => {
        let video_feed = (response.data as Feed[]).filter(
          (item) => item.slug === "hashie-World-Cup"
        );
        let Movoe_feed = (response.data as Feed[]).filter(
          (item) => item.slug === "documentary"
        );
        setVideoFeeds(video_feed);
        setMovieFeeds(Movoe_feed);
      });
      getMusicListData(cookies.lnd_org).then(async (response: any) => {
        let music_feed = (response.data as Feed[]).filter(
          (item) => item.slug === "meli-music"
        );
        setMusicFeeds(music_feed);
        let audio_feed = (response.data as any[]).filter(
          (item) => item.slug === "book"
        );
        // let book_feed = (audio_feed[0]?.items as any[])?.filter(
        //   (item) => item.slug === "rooz"
        // );
        // setAudioFeeds(book_feed);
      });
    }
  }, [cookies.lnd_org]);
  return (
    <>
      <div className={styles["main-page-outer-container"]}>
        {/* <GamesTable matchRound={matchRound} /> */}
        <Parallax ghazal={ghazal} interpretation={interpretation} />
        {/* <CountDown/> */}
        {/* {Object.keys(groups).length > 0 && <GroupsTable groups={groups} />} */}
        {/* {/* {pages.includes("prediction") && <Prediction />} */}
        <Video />
        {<Game />}
        {<Particle />}
        {<Pictures />}
        {<Interpretation />}
        {<Travel />}
        {<Gahdad />}
        {/* {Object.keys(news).length > 0 && pages.includes("news") && (
          <News news={news} />
        )} */}
        {/* {videoFeed.length && pages.includes("video") && (
          <Videos videoFeed={videoFeed} />
        )} */}
        {/* <Stadiums />
        {movieFeed.length && pages.includes("movie") && (
          <Movies movieFeed={movieFeed} />
        )} */}
        {/* {musicFeed.length && pages.includes("music") && (
          <Music musicFeed={musicFeed} />
        )} */}
        {/* {audioFeed.length && pages.includes("book") && (
          <Books audioFeed={audioFeed} />
        )} */}
      </div>
    </>
  );
};
export default Main;
