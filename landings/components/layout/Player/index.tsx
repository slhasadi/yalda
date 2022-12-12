// @ts-nocheck
/*eslint react-hooks/exhaustive-deps:off */
import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef, ForwardedRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { pushToast } from "../../../slices/toastSlice";
import "rc-slider/assets/index.css";
import {
  DownloadItem,
  PlayerOption,
  Playlist,
  Singer,
  Song,
} from "../../../interfaces";
import { RootState } from "../../../store";
import axios from "axios";
import { BASE_ADS_URL } from "../../../globals";
import {
  pause,
  play,
  setAdsPlaying,
  setIndex,
  setIsFree,
  setSinger,
} from "../../../slices/playerSlice";
import { useCookies } from "react-cookie";
import {AudioPlayer, Player as MandiPlayer} from "@tika/mandi-player";
import useActivityLog from "../../../hooks/activityWatchLog";

const PlayerXl = dynamic(() => import("./PlayerXl"), { ssr: false });
const PlayerXs = dynamic(() => import("./PlayerXs"), { ssr: false });
const PlayerSm = dynamic(() => import("./PlayerSm"), { ssr: false });
const Player = () => {
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [mute, setMute] = useState(false);
  const [full, setFull] = useState(true);
  const [menu, setMenu] = useState(false);
  const [ready, setReady] = useState(false);
  const [downloadList, setDownloadList] = useState<DownloadItem[]>(
    [] as DownloadItem[]
  );
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [playlistModal, setPlaylistModal] = useState<Playlist>({} as Playlist);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedList, setSelectedList] = useState<number | null>(null);
  const [addPlaylist, setAddPlaylist] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlistLoading, setPlaylistLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [adUrl, setAdUrl] = useState<string | null>(null);
  const [speedMenu, setSpeedMenu] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [lyrics, setLyrics] = useState(false);
  const [driving, setDriving] = useState(false);
  const [drivingDrag, setDrivingDrag] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [lyricsDrag, setLyricsDrag] = useState({ x: 0, y: 0 });
  const [speedMenuDrag, setSpeedMenuDrag] = useState({ x: 0, y: 0 });
  const [menuDrag, setMenuDrag] = useState({ x: 0, y: 0 });
  const [songDrag, setSongDrag] = useState({ x: 0, y: 0 });
  const [listDrag, setListDrag] = useState({ x: 0, y: 0 });
  const [showPlayer, setShowPlayer] = useState(false);
  const [audioAds, setAudioAds] = useState(null);
  const [songCounter, setSongCounter] = useState(0);
  const song = useSelector((state: RootState) => state.player.song);
  const singer = useSelector((state: RootState) => state.player.singer);
  const playing = useSelector((state: RootState) => state.player.playing);
  const adsPlaying = useSelector((state: RootState) => state.player.adsPlaying);
  const playlist = useSelector((state: RootState) => state.player.playlist);
  const index = useSelector((state: RootState) => state.player.index);
  let indexRef = useRef(index);
  let playlistRef = useRef<Playlist[]>(playlist);
  let loopRef = useRef(false);
  let volumeRef = useRef(volume);
  type WrapperHandle = ForwardedRef<typeof AudioPlayer>;
  const wrapperRef = useRef<WrapperHandle>(null);
  const router = useRouter();
  const [cookies] = useCookies(["token", "data"]);
  const { submitNewLog } = useActivityLog();
  const dispatch = useDispatch();
  useEffect(() => {
    if (adsPlaying) {
      setShowPlaylist(false)
    }
  }, [adsPlaying]);
  useEffect(() => {
    if (songCounter === 5) {
      if (window.AndroidWebView) {
        window.AndroidWebView.onMessage(
          JSON.stringify({
            type: "SHOW_SCORE_INTENT",
          })
        );
      }
    }
  }, [songCounter]);
  useEffect(() => {
    indexRef.current = index;
    playlistRef.current = playlist;
  }, [index, playlist]);
  const playSong = (song: Song, singerData?: Singer) => {
    if (singerData) {
      dispatch(setSinger(singerData));
    }
    dispatch(play(song));
  };
  const handleEnd = () => {
    if (!loop) {
      if (shuffle) {
        let list = [];
        for (let i = 0; i < playlist?.length; i++) {
          if (song.id === playlist[i].song.id) {
          } else {
            list.push(playlist[i]);
          }
        }
        let index = Math.floor(Math.random() * list.length);
        let selected_index = null;
        for (let i = 0; i < playlist?.length; i++) {
          if (list[index].song.id === playlist[i].song.id) {
            selected_index = i;
          }
        }
        playSong(list[index].song, list[index].singer);
        dispatch(setIndex(selected_index));
        playSong(list[index].song);
      } else {
        if (
          playlistRef.current.length > 1 &&
          indexRef.current !== playlist?.length - 1
        ) {
          dispatch(setIndex(indexRef.current + 1));
          dispatch(play(playlistRef.current[indexRef.current + 1].song));
          dispatch(setSinger(playlistRef.current[indexRef.current + 1].singer));
          playSong(
            playlistRef.current[indexRef.current + 1].song,
            playlistRef.current[indexRef.current + 1].singer
          );
        } else {
          dispatch(
            pushToast({
              status: "warning",
              message: "پلی لیست تمام شد",
            })
          );
        }
      }
    }
  };
  useEffect(() => {
    if (playing) {
      wrapperRef?.current?.play();
    } else {
      wrapperRef?.current?.pause();
    }
    if (Object.keys(song).length === 0) {
      dispatch(pause());
      wrapperRef?.current?.pause();
      // stop();
    }
  }, [playing]);
  useEffect(() => {
    wrapperRef?.current?.volume(volume * 40);
  }, [volume]);
  useEffect(() => {
    wrapperRef?.current?.muted(mute);
  }, [mute]);
  useEffect(() => {
    wrapperRef?.current?.loop(loop);
  }, [loop]);
  const seekTo = (time: number) => {
    wrapperRef?.current?.seekTo(time);
  };
  const forward = (time: number) => {
    wrapperRef?.current?.fw(time);
  };
  const backward = (time: number) => {
    wrapperRef?.current?.bw(time);
  };
  const pauseAll = () => {
    dispatch(pause());
    wrapperRef?.current?.pause();
  };
  const createPlaylist = (title: string) => {
  };
  const getPlaylists = () => {
  };
  const handlePlayerError = () => {
    dispatch(
      pushToast({
        status: "error",
        message: "هنگام پخش قطعه مشکلی پیش آمد.",
      })
    );
  };
  const onMetaDataLoaded = (duration: number) => {
    setDuration(duration);
    setReady(true);
    // dispatch(setIsFree(false));
  };
  useEffect(() => {
    if (!playlist?.length) {
      setShowPlaylist(false);
    }
  }, [playlist]);
  useEffect(() => {
    if (driving) {
      setDrivingDrag({ x: 0, y: 0 });
    }
  }, [driving]);
  useEffect(() => {
    if (lyrics) {
      setLyricsDrag({ x: 0, y: 0 });
    }
  }, [lyrics]);
  useEffect(() => {
    if (menu) {
      setMenuDrag({ x: 0, y: 0 });
    }
  }, [menu]);
  useEffect(() => {
    if (speedMenu) {
      setSpeedMenuDrag({ x: 0, y: 0 });
    }
  }, [speedMenu]);

  // useEffect(() => {
  //   if (Object.keys(song).length) {
  //     setReady(false);
  //     setFull(true);
  //     setSpeed(1);
  //     setSongCounter((songCounter) => songCounter + 1);
  //   }
  // }, [song]);

  const usePrevious = (value: Song) => {
    const ref = useRef<Song>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  const prevSong = usePrevious(song);
  // useEffect(() => {
  //   wrapperRef?.current?.pause();
  //   setReady(false);
  //   // if selected song is the same as last one so resume playing
  //   if (localStorage.getItem("last-play")) {
  //     let lastSong = JSON.parse(localStorage.getItem("last-play"));
  //     if (Object.keys(song).length && Object.keys(lastSong?.song).length) {
  //       if (song.id !== lastSong?.song?.id) {
  //         localStorage.setItem("last-play", JSON.stringify({ song: song }));
  //         wrapperRef?.current?.play(song.audio ? song.audio : song.audio_hq);
  //         setShowPlayer(true);
  //         // setReady(true);
  //       } else {
  //         wrapperRef?.current?.play();
  //         setShowPlayer(true);
  //         setReady(true);
  //       }
  //     } else {
  //       wrapperRef?.current?.pause();
  //     }
  //   } else {
  //     if (Object.keys(song).length) {
  //       localStorage.setItem("last-play", JSON.stringify({ song: song }));
  //       wrapperRef?.current?.play(song.audio ? song.audio : song.audio_hq);
  //       setShowPlayer(true);
  //       // setReady(true);
  //     } else {
  //       wrapperRef?.current?.pause();
  //     }
  //   }
  // }, [song]);

  useEffect(() => {
    wrapperRef?.current?.stop();
    setReady(false);
    if (song && song.id) {
      // if selected song is the same as last one so resume playing
      if (localStorage.getItem("last-play")) {
        let lastSong = JSON.parse(localStorage.getItem("last-play"));
        if (lastSong && lastSong.song && lastSong.song.id) {
          if (song.slug_url !== lastSong.song.slug_url) {
            localStorage.setItem("last-play", JSON.stringify({ song: song }));
          }
        } else {
          localStorage.setItem("last-play", JSON.stringify({ song: song }));
        }
      } else {
        localStorage.setItem("last-play", JSON.stringify({ song: song }));
      }

      if (Object.keys(song).length) {
        wrapperRef?.current?.play(song.audio ? song.audio : song.audio_hq);
        // wrapperRef?.current?.play();
        setShowPlayer(true);
        setReady(true);
      } else {
        dispatch(pause());
        wrapperRef?.current?.pause();
      }
    }
  }, [song]);

  // useEffect(() => {
  //   if (prevSong) {
  //     if (Object.keys(prevSong).length) {
  //       if (prevSong.type === "audiobook" || prevSong.type === "podcast") {
  //         if (localStorage.getItem("last-played")) {
  //           let list = JSON.parse(localStorage.getItem("last-played")!).list;
  //           let found = false;
  //           for (let i = 0; i < list.length; i++) {
  //             if (
  //               prevSong.id === list[i].id &&
  //               prevSong.type === list[i].type
  //             ) {
  //               list[i].played = played;
  //               found = true;
  //             }
  //           }
  //           if (found) {
  //             localStorage.setItem(
  //               "last-played",
  //               JSON.stringify({ list: list })
  //             );
  //           } else {
  //             if (list.length === 10) {
  //               list.shift();
  //               list.push({
  //                 type: prevSong.type,
  //                 id: prevSong.id,
  //                 played: played,
  //               });
  //               localStorage.setItem(
  //                 "last-played",
  //                 JSON.stringify({ list: list })
  //               );
  //             } else {
  //               list.push({
  //                 type: prevSong.type,
  //                 id: prevSong.id,
  //                 played: played,
  //               });
  //               localStorage.setItem(
  //                 "last-played",
  //                 JSON.stringify({ list: list })
  //               );
  //             }
  //           }
  //         } else {
  //           let list = [];
  //           list.push({ type: prevSong.type, id: prevSong.id, played: played });
  //           localStorage.setItem("last-played", JSON.stringify({ list: list }));
  //         }
  //       } else {
  //         playSong(song);
  //       }
  //     }
  //   }
  // }, [song]);

  useEffect(() => {
    if (selectedList) {
      let id = playlistModal.id;
      setPlaylistModal({} as Playlist);
      setPageLoading(true);
    }
  }, [selectedList]);

  const savePlayedAmount = () => {};

  useEffect(() => {
    if (Object.keys(playlistModal).length) {
      setPlaylistTitle("");
      setPlaylistLoading(false);
      setAddPlaylist(false);
      setSelectedList(null);
    }
  }, [playlistModal]);

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname.indexOf("myket") !== -1 ||
      location.pathname.indexOf("gplay") !== -1 ||
      location.pathname.indexOf("bazaar") !== -1 ||
      location.pathname.indexOf("charkhoneh") !== -1 ||
      location.pathname.indexOf("payment") !== -1 ||
      location.pathname.indexOf("web") !== -1
    ) {
      setBottom(true);
    } else {
      setBottom(false);
    }
  }, [location]);

  // useEffect(() => {
  //   if (Object.keys(song).length) {
  //     if (song.type === "track") {
  //       let list = [];
  //       if (localStorage.getItem("last-visited")) {
  //         list = JSON.parse(localStorage.getItem("last-visited")!).list;
  //       }

  //       let found = false;
  //       for (let i = 0; i < list?.length; i++) {
  //         if (list[i].type === "track" && list[i].title === song.title) {
  //           found = true;
  //         }
  //       }
  //       if (!found) {
  //         let data = { ...song };
  //         data.singers = [{ ...singer }];
  //         data.type = "track";
  //         data.audio = "";
  //         if (list?.length < 20) {
  //           list.push(data);
  //           localStorage.setItem(
  //             "last-visited",
  //             JSON.stringify({ list: list })
  //           );
  //         } else {
  //           list?.shift();
  //           list.push(data);

  //           localStorage.setItem(
  //             "last-visited",
  //             JSON.stringify({ list: list })
  //           );
  //         }
  //       }
  //     }
  //   }
  // }, [song]);
  useEffect(()=>{
    axios({method: "get",
      url: BASE_ADS_URL + "api/v1/ads/campaigns/publisher/?ads_kind=7",
      headers: {
        Authorization: cookies.data?.ads_vas_audio_data,
      },
    }).then((response) => {
      setAudioAds(response.data.vast_url);
    });
  },[]);
  return (
    <>
      {audioAds &&
        <AudioPlayer
          reRender={true}
          options={{
            plugins: {
              vastWaterfall: {
                playing: adsPlaying,
                preroll: [
                  {
                    ads: [
                      audioAds,
                    ],
                  },
                ],
                midroll: [],
                postroll: [],
              },
            },
          }}
          ref={wrapperRef}
          adsUpdated={(ads: boolean) => {
            if (!ads) {
              setAdUrl(null);
            }
            dispatch(setAdsPlaying(ads));
          }}
          loadedMetadata={(metadata: number) => {
            onMetaDataLoaded(metadata)
          }}
          timeUpdate={(t: number) => {
              if (song) {
                  submitNewLog(t, song.id, song.type);
              }
              setPlayed(t)
          }}
          ended={handleEnd}
        >
        </AudioPlayer>
      }

      {Object.keys(song).length &&
      !router.asPath.includes("login") &&
      showPlayer &&
      !router.asPath.includes("user/basket") ? (
        <>
          <PlayerXs
            song={song}
            singer={singer}
            playing={playing}
            playlist={playlist}
            played={played}
            setPlayed={setPlayed}
            duration={duration}
            setDuration={setDuration}
            loop={loop}
            setLoop={setLoop}
            bottom={bottom}
            volume={volume}
            setVolume={setVolume}
            full={full}
            setFull={setFull}
            menu={menu}
            setMenu={setMenu}
            downloadLink={downloadLink}
            setDownloadLink={setDownloadLink}
            downloadList={downloadList}
            setDownloadList={setDownloadList}
            playlists={playlists}
            setPlaylists={setPlaylists}
            playlistModal={playlistModal}
            setPlaylistModal={setPlaylistModal}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
            addPlaylist={addPlaylist}
            setAddPlaylist={setAddPlaylist}
            playlistTitle={playlistTitle}
            setPlaylistTitle={setPlaylistTitle}
            playlistLoading={playlistLoading}
            setPlaylistLoading={setPlaylistLoading}
            shuffle={shuffle}
            setShuffle={setShuffle}
            mute={mute}
            setMute={setMute}
            ready={ready}
            setReady={setReady}
            speedMenu={speedMenu}
            setSpeedMenu={setSpeedMenu}
            speed={speed}
            setSpeed={setSpeed}
            driving={driving}
            setDriving={setDriving}
            pageLoading={pageLoading}
            setPageLoading={setPageLoading}
            lyrics={lyrics}
            setLyrics={setLyrics}
            savePlayedAmount={savePlayedAmount}
            drivingDrag={drivingDrag}
            setDrivingDrag={setDrivingDrag}
            lyricsDrag={lyricsDrag}
            setLyricsDrag={setLyricsDrag}
            speedMenuDrag={speedMenuDrag}
            setSpeedMenuDrag={setSpeedMenuDrag}
            menuDrag={menuDrag}
            setMenuDrag={setMenuDrag}
            showPlaylist={showPlaylist}
            setShowPlaylist={setShowPlaylist}
            songDrag={songDrag}
            setSongDrag={setSongDrag}
            listDrag={listDrag}
            setListDrag={setListDrag}
            playSong={playSong}
            pauseAll={pauseAll}
            getPlaylists={getPlaylists}
            forward={forward}
            backward={backward}
            index={index}
            createPlaylist={createPlaylist}
            seekTo={seekTo}
            setShowPlayer={setShowPlayer}
            adsPlaying={adsPlaying}
          />

          <PlayerSm
            song={song}
            singer={singer}
            playing={playing}
            playlist={playlist}
            played={played}
            setPlayed={setPlayed}
            duration={duration}
            setDuration={setDuration}
            loop={loop}
            setLoop={setLoop}
            bottom={bottom}
            volume={volume}
            setVolume={setVolume}
            full={full}
            setFull={setFull}
            menu={menu}
            setMenu={setMenu}
            downloadLink={downloadLink}
            setDownloadLink={setDownloadLink}
            downloadList={downloadList}
            setDownloadList={setDownloadList}
            playlists={playlists}
            setPlaylists={setPlaylists}
            playlistModal={playlistModal}
            setPlaylistModal={setPlaylistModal}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
            addPlaylist={addPlaylist}
            setAddPlaylist={setAddPlaylist}
            playlistTitle={playlistTitle}
            setPlaylistTitle={setPlaylistTitle}
            playlistLoading={playlistLoading}
            setPlaylistLoading={setPlaylistLoading}
            shuffle={shuffle}
            setShuffle={setShuffle}
            mute={mute}
            setMute={setMute}
            ready={ready}
            setReady={setReady}
            speedMenu={speedMenu}
            setSpeedMenu={setSpeedMenu}
            speed={speed}
            setSpeed={setSpeed}
            driving={driving}
            setDriving={setDriving}
            pageLoading={pageLoading}
            setPageLoading={setPageLoading}
            lyrics={lyrics}
            setLyrics={setLyrics}
            savePlayedAmount={savePlayedAmount}
            drivingDrag={drivingDrag}
            setDrivingDrag={setDrivingDrag}
            lyricsDrag={lyricsDrag}
            setLyricsDrag={setLyricsDrag}
            speedMenuDrag={speedMenuDrag}
            setSpeedMenuDrag={setSpeedMenuDrag}
            menuDrag={menuDrag}
            setMenuDrag={setMenuDrag}
            showPlaylist={showPlaylist}
            setShowPlaylist={setShowPlaylist}
            songDrag={songDrag}
            setSongDrag={setSongDrag}
            listDrag={listDrag}
            setListDrag={setListDrag}
            playSong={playSong}
            pauseAll={pauseAll}
            getPlaylists={getPlaylists}
            forward={forward}
            backward={backward}
            index={index}
            createPlaylist={createPlaylist}
            seekTo={seekTo}
            setShowPlayer={setShowPlayer}
            adsPlaying={adsPlaying}
          />

          <PlayerXl
            song={song}
            singer={singer}
            playing={playing}
            playlist={playlist}
            played={played}
            setPlayed={setPlayed}
            duration={duration}
            setDuration={setDuration}
            loop={loop}
            setLoop={setLoop}
            bottom={bottom}
            volume={volume}
            setVolume={setVolume}
            full={full}
            setFull={setFull}
            menu={menu}
            setMenu={setMenu}
            downloadLink={downloadLink}
            setDownloadLink={setDownloadLink}
            downloadList={downloadList}
            setDownloadList={setDownloadList}
            playlists={playlists}
            setPlaylists={setPlaylists}
            playlistModal={playlistModal}
            setPlaylistModal={setPlaylistModal}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
            addPlaylist={addPlaylist}
            setAddPlaylist={setAddPlaylist}
            playlistTitle={playlistTitle}
            setPlaylistTitle={setPlaylistTitle}
            playlistLoading={playlistLoading}
            setPlaylistLoading={setPlaylistLoading}
            shuffle={shuffle}
            setShuffle={setShuffle}
            mute={mute}
            setMute={setMute}
            ready={ready}
            setReady={setReady}
            speedMenu={speedMenu}
            setSpeedMenu={setSpeedMenu}
            speed={speed}
            setSpeed={setSpeed}
            driving={driving}
            setDriving={setDriving}
            pageLoading={pageLoading}
            setPageLoading={setPageLoading}
            lyrics={lyrics}
            setLyrics={setLyrics}
            savePlayedAmount={savePlayedAmount}
            drivingDrag={drivingDrag}
            setDrivingDrag={setDrivingDrag}
            lyricsDrag={lyricsDrag}
            setLyricsDrag={setLyricsDrag}
            speedMenuDrag={speedMenuDrag}
            setSpeedMenuDrag={setSpeedMenuDrag}
            menuDrag={menuDrag}
            setMenuDrag={setMenuDrag}
            showPlaylist={showPlaylist}
            setShowPlaylist={setShowPlaylist}
            songDrag={songDrag}
            setSongDrag={setSongDrag}
            listDrag={listDrag}
            setListDrag={setListDrag}
            playSong={playSong}
            pauseAll={pauseAll}
            getPlaylists={getPlaylists}
            forward={forward}
            backward={backward}
            index={index}
            createPlaylist={createPlaylist}
            seekTo={seekTo}
            setShowPlayer={setShowPlayer}
            adsPlaying={adsPlaying}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Player;
