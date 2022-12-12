import React, { useRef } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import ClipLoader from "react-spinners/ClipLoader";
import Link from "next/link";
import Slider from "rc-slider";
import Draggable from "react-draggable";
import { Transition } from "react-transition-group";
import Image from "next/image";
import { DownloadItem, Playlist, Singer, Song } from "../../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { setIndex, stop } from "../../../slices/playerSlice";
import { pushToast } from "../../../slices/toastSlice";
import { useRouter } from "next/router";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import styles from "./styles/PlayerXs.module.scss";
import { useCookies } from "react-cookie";

type props = {
  song: Song;
  singer: Singer;
  played: number;
  playing: boolean;
  getPlaylists: () => void;
  setPlayed: (played: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
  loop: boolean;
  setLoop: (loop: boolean) => void;
  seekTo: (time: number) => void;
  bottom: boolean;
  volume: number;
  setVolume: (volume: number) => void;
  full: boolean;
  setFull: (full: boolean) => void;
  menu: boolean;
  setMenu: (menue: boolean) => void;
  downloadLink: string | null;
  setDownloadLink: (link: string | null) => void;
  downloadList: DownloadItem[];
  setDownloadList: (links: DownloadItem[]) => void;
  playlists: Playlist[];
  setPlaylists: (playlists: Playlist[]) => void;
  playlistModal: Playlist;
  setPlaylistModal: (playlist: Playlist) => void;
  selectedList: number | null;
  setSelectedList: (selected: number | null) => void;
  addPlaylist: boolean;
  setAddPlaylist: (value: boolean) => void;
  playlistTitle: string;
  setPlaylistTitle: (title: string) => void;
  playlistLoading: boolean;
  setPlaylistLoading: (value: boolean) => void;
  shuffle: boolean;
  setShuffle: (value: boolean) => void;
  mute: boolean;
  setMute: (value: boolean) => void;
  ready: boolean;
  setReady: (value: boolean) => void;
  speedMenu: boolean;
  setSpeedMenu: (value: boolean) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  driving: boolean;
  setDriving: (value: boolean) => void;
  pageLoading: boolean;
  setPageLoading: (value: boolean) => void;
  lyrics: boolean;
  setLyrics: (value: boolean) => void;
  savePlayedAmount: () => void;
  drivingDrag: { x: number; y: number };
  setDrivingDrag: (drag: { x: number; y: number }) => void;
  lyricsDrag: { x: number; y: number };
  setLyricsDrag: (drag: { x: number; y: number }) => void;
  speedMenuDrag: { x: number; y: number };
  setSpeedMenuDrag: (drag: { x: number; y: number }) => void;
  menuDrag: { x: number; y: number };
  setMenuDrag: (drag: { x: number; y: number }) => void;
  showPlaylist: boolean;
  setShowPlaylist: (value: boolean) => void;
  songDrag: { x: number; y: number };
  setSongDrag: (drag: { x: number; y: number }) => void;
  listDrag: { x: number; y: number };
  setListDrag: (drag: { x: number; y: number }) => void;
  playSong: (song: Song, singer?: Singer) => void;
  playlist: Playlist[];
  pauseAll: () => void;
  forward: (time: number) => void;
  backward: (time: number) => void;
  index: number;
  setShowPlayer:(value:boolean)=>void
  createPlaylist: (title: string) => void;
  adsPlaying:boolean;
};
declare global {
  interface Window {
    AndroidWebView?: any;
  }
}
const PlayerXs = ({
  played,
  setPlayed,
  duration,
  setDuration,
  loop,
  setLoop,
  seekTo,
  bottom,
  volume,
  setVolume,
  full,
  setFull,
  menu,
  setMenu,
  downloadLink,
  setDownloadLink,
  downloadList,
  setDownloadList,
  playlists,
  setPlaylists,
  playlistModal,
  setPlaylistModal,
  selectedList,
  setSelectedList,
  addPlaylist,
  setAddPlaylist,
  playlistTitle,
  setPlaylistTitle,
  playlistLoading,
  setPlaylistLoading,
  shuffle,
  setShuffle,
  mute,
  setMute,
  ready,
  setReady,
  speedMenu,
  setSpeedMenu,
  speed,
  setSpeed,
  driving,
  setDriving,
  pageLoading,
  setPageLoading,
  lyrics,
  setLyrics,
  savePlayedAmount,
  drivingDrag,
  setDrivingDrag,
  lyricsDrag,
  setLyricsDrag,
  speedMenuDrag,
  setSpeedMenuDrag,
  menuDrag,
  setMenuDrag,
  showPlaylist,
  setShowPlaylist,
  songDrag,
  setSongDrag,
  listDrag,
  setListDrag,
  playSong,
  song,
  singer,
  playlist,
  playing,
  pauseAll,
  getPlaylists,
  forward,
  backward,
  index,  
  setShowPlayer,
  createPlaylist,
  adsPlaying,
}: props) => {
  const download_xs = useRef<HTMLDivElement>(null);
  const playlist_xs = useRef<HTMLDivElement>(null);
  const full_xs = useRef<HTMLDivElement>(null);
  const [cookies] = useCookies(["token"]);
  const dispatch = useDispatch();
  const router = useRouter();
  const renderPlayPauseIcon = () => {
    return (
      <div className={styles["player-icon-outer-container-xs"]}>
        <div className={styles["player-icon-inner-container-xs"]}>
          {!ready ? (
            <div className={styles["player-icon-loader-container-xs"]}>
              <div className={styles["player-icon-loader-xs"]}>
                <ClipLoader size={32} color="#8F9BB3" />
              </div>
            </div>
          ) : playing ? (
            <Image
              width={50}
              height={50}
              onClick={() => {
                if(!adsPlaying){
                  pauseAll();
                }
              }}
              src={"/images/player/pause.svg"}
              alt=""
              className={styles["player-icon-xs"]}
            />
          ) : (
            <Image
              width={50}
              height={50}
              onClick={() => {
                if(!adsPlaying){
                  playSong(song, singer);
                }
              }}
              src={"/images/player/play.svg"}
              alt=""
              className={styles["player-icon-xs"]}
            />
          )}
        </div>
      </div>
    );
  };

  const renderSongData = () => {
    return (
      <div
        onClick={() => {
          setFull(true);
        }}
        className={styles["player-data-outer-container-xs"]}
      >
        <div className={styles["player-data-inner-container-xs"]}>
          <div className={styles["player-data-container-xs"]}>
            <p className={styles["player-data-song-xs"]}>{adsPlaying ? "تبلیغات صوتی" : song.title}</p>
            <p className={styles["player-data-singer-xs"]}>
              {singer.name + " " + singer.family}
            </p>
          </div>
          <div className={styles["player-data-image-xs"]}>
            {adsPlaying 
            ? 
            <Link href="http://chaargoosh.com/audiobook/%D8%B1%D9%88%D8%B2%DB%8C-%D8%B1%D9%88%D8%B2%DA%AF%D8%A7%D8%B1%DB%8C-%D9%81%D9%88%D8%AA%D8%A8%D8%A7%D9%84-%D8%AD%D9%85%DB%8C%D8%AF%D8%B1%D8%B6%D8%A7-%D8%B5%D8%AF%D8%B1">
              <a>
              <Image
                width={50}
                height={50}
                src={"/images/ads/ads.svg"}
                alt={"تبلیغات صوتی"} 
              />
              </a>
            </Link>
            :
            <Image
              width={50}
              height={50}
              src={song.cover}
              alt={song.title}
            />
            }
          </div>
          <i
            onClick={() => {
              if(!adsPlaying){
                setShowPlayer(false);
                dispatch(stop());
              }
            }}
            className={styles["player-data-close-button-xs"]}
          >
            <Image
              width={15}
              height={15}
              src={"/images/player/close.svg"}
              alt="playlist"
            />
          </i>
        </div>
      </div>
    );
  };

  const renderMinimizeHandle = () => {
    return (
      <div className={styles["player-full-icon-container-xs"]}>
        <div
          onClick={() => {
            setFull(false);
          }}
          className={styles["player-full-icon-xs"]}
        >
          <Image
            width={24}
            height={24}
            alt="minimize"
            src={"/images/player/handle.svg"}
          />
        </div>
      </div>
    );
  };

  const renderFullSongData = () => {
    return (
      <div className={styles["player-full-data-outer-container-xs"]}>
        <div className={styles["player-full-data-inner-container-xs"]}>
          <div className={styles["player-full-data-cover-xs"]}>
          {adsPlaying 
            ? 
            <Link href="http://chaargoosh.com/audiobook/%D8%B1%D9%88%D8%B2%DB%8C-%D8%B1%D9%88%D8%B2%DA%AF%D8%A7%D8%B1%DB%8C-%D9%81%D9%88%D8%AA%D8%A8%D8%A7%D9%84-%D8%AD%D9%85%DB%8C%D8%AF%D8%B1%D8%B6%D8%A7-%D8%B5%D8%AF%D8%B1">
              <a>
              <Image width={180} height={180} alt={"تبلیغات صوتی"} src={"/images/ads/ads.svg"} />
              </a>
            </Link>
            :
            <Image width={180} height={180} alt={song.title} src={song.cover} />
            }
            
          </div>
          <p className={styles["player-full-data-song-xs"]}>{adsPlaying ? "تبلیغات صوتی" : song.title}</p>
          <p className={styles["player-full-data-singer-xs"]}>
            {singer.name + " " + singer.family}
          </p>
        </div>
      </div>
    );
  };

  const renderProgressBar = () => {
    return (
      <div className={styles["player-progress-bar-outer-container-xs"]}>
        <div className={styles["player-progress-bar-inner-container-xs"]}>
          <div className={styles["player-progress-bar-container-xs"]}>
            <Slider
              handleStyle={{
                border: "0px",
                boxShadow: "0px",
                height: "12px",
                width: "12px",
                marginTop: "-4px",
                backgroundColor: "#8F9BB3",
                cursor: "pointer",
              }}
              activeDotStyle={{
                border: "0px",
              }}
              trackStyle={{
                backgroundColor: "#8F9BB3",
                height: "3px",
              }}
              railStyle={{
                backgroundColor: "#EDF1F7",
                height: "3px",
              }}
              value={played ? played / duration : 0}
              min={0}
              step={0.001}
              max={1}
              onChange={(played: any) => {
                setPlayed(duration * played);
                seekTo(duration * played);
              }}
            />
          </div>
          <div className={styles["player-time-outer-container-xs"]}>
            {renderTime(played)}
            {renderTime(duration)}
          </div>
        </div>
      </div>
    );
  };

  const renderTime = (time: number) => {
    let hour = parseInt((time / 3600).toString());
    let minute = parseInt(((time - hour * 3600) / 60).toString());
    let second = parseInt((time - (minute * 60 + hour * 3600)).toString());
    return (
      <p className={styles["player-time-container-xs"]}>
        <span className={styles["player-time-segment-xs"]}>
          {hour === 0 ? "" : hour + ":"}
        </span>
        <span className={styles["player-time-segment-xs"]}>
          {minute === 0 ? "00:" : minute + ":"}
        </span>
        <span className={styles["player-time-segment-xs"]}>
          {second === 0 ? "00" : second < 10 ? "0" + second : second}
        </span>
      </p>
    );
  };

  const renderDrivingTime = (time: number) => {
    let hour = parseInt((time / 3600).toString());
    let minute = parseInt(((time - hour * 3600) / 60).toString());
    let second = parseInt((time - (minute * 60 + hour * 3600)).toString());
    return (
      <p className={styles["player-driving-time-container-xs"]}>
        <span className={styles["player-driving-time-segment-xs"]}>
          {hour === 0 ? "" : hour + ":"}
        </span>
        <span className={styles["player-driving-time-segment-xs"]}>
          {minute === 0 ? "00:" : minute + ":"}
        </span>
        <span className={styles["player-driving-time-segment-xs"]}>
          {second === 0 ? "00" : second < 10 ? "0" + second : second}
        </span>
      </p>
    );
  };

  const renderPrimaryIcons = () => {
    return (
      <div className={styles["player-primary-icon-outer-container-xs"]}>
        <div className={styles["player-primary-icon-inner-container-xs"]}>
          {loop ? (
            <div
              onClick={() => {
                if(!adsPlaying){
                  setLoop(false);
                }
              }}
              className={styles["player-primary-icon-repeat-xs"]}
            >
              <Image
                width={24}
                height={24}
                alt="repeat"
                src={"/images/player/repeat-active.svg"}
              />
            </div>
          ) : (
            <div
              onClick={() => {
                if(!adsPlaying){
                  setLoop(true);
                }
              }}
              className={styles["player-primary-icon-repeat-xs"]}
            >
              <Image
                width={24}
                height={24}
                alt="repeat"
                src={"/images/player/repeat.svg"}
              />
            </div>
          )}
          {playlist.length > 1 && index ? (
            <div
              onClick={() => {
                if(!adsPlaying){
                  playSong(playlist[index - 1].song, playlist[index - 1].singer);
                  dispatch(setIndex(index - 1));
                }
              }}
              className={styles["player-primary-icon-previous-xs"]}
            >
              <Image
                width={24}
                height={24}
                alt="previous"
                src={"/images/player/previous-active.svg"}
              />
            </div>
          ) : (
            <div
              onClick={() => {}}
              className={styles["player-primary-icon-previous-xs"]}
            >
              <Image
                width={24}
                height={24}
                alt="previous"
                src={"/images/player/previous.svg"}
              />
            </div>
          )}
          {!ready ? (
            <div className={styles["player-primary-icon-loader-container-xs"]}>
              <div className={styles["player-primary-icon-loader-xs"]}>
                <ClipLoader size={32} color="#8F9BB3" />
              </div>
            </div>
          ) : playing ? (
            <div
              onClick={() => {
                if(!adsPlaying){
                  pauseAll();
                }
              }}
              className={styles["player-primary-icon-play-xs"]}
            >
              <Image
                width={50}
                height={50}
                alt="pause"
                src={"/images/player/pause.svg"}
              />
            </div>
          ) : (
            <div
              onClick={() => {
                if(!adsPlaying){
                  playSong(song, singer);
                }
              }}
              className={styles["player-primary-icon-play-xs"]}
            >
              <Image
                width={50}
                height={50}
                alt="play"
                src={"/images/player/play.svg"}
              />
            </div>
          )}
          {playlist.length > 1 && index !== playlist.length - 1 ? (
            <div
              onClick={() => {
                if(!adsPlaying){
                  playSong(playlist[index + 1].song, playlist[index + 1].singer);
                  dispatch(setIndex(index + 1));
                }
              }}
              className={styles["player-primary-icon-next-xs"]}
            >
              <Image
                width={24}
                height={24}
                alt="next"
                src={"/images/player/next-active.svg"}
              />
            </div>
          ) : (
            <div
              onClick={() => {}}
              className={styles["player-primary-icon-next-xs"]}
            >
              <Image
                width={24}
                height={24}
                src={"/images/player/next.svg"}
                alt="next"
              />
            </div>
          )}
          {shuffle ? (
            <div
              onClick={() => {
                if(!adsPlaying){
                  setShuffle(false);
                }
              }}
              className={styles["player-primary-icon-shuffle-xs"]}
            >
              <Image
                width={22}
                height={22}
                alt="shuffle"
                src={"/images/player/shuffle-active.svg"}
              />
            </div>
          ) : (
            <div
              onClick={() => {
                if(!adsPlaying){
                  setShuffle(true);
                }
              }}
              className={styles["player-primary-icon-shuffle-xs"]}
            >
              <Image
                width={22}
                height={22}
                alt="shuffle"
                src={"/images/player/shuffle.svg"}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSecondaryIcons = () => {
    return (
      <div className={styles["player-second-icon-outer-container-xs"]}>
        <div className={styles["player-second-icon-inner-container-xs"]}>
          <div className={styles["player-second-icon-container-xs"]}>
            <div
              onClick={() => {
                if(!adsPlaying){
                  backward(15);
                }
              }}
              className={styles["player-second-icon-backward-xs"]}
            >
              <Image
                width={20}
                height={24}
                alt="fast-backward"
                src={"/images/player/fast-backward.svg"}
              />
            </div>
          </div>
          <div className={styles["player-second-icon-container-xs"]}>
            <div
              onClick={() => {
                if(!adsPlaying){
                  setDriving(true);
                }
              }}
              className={styles["player-second-icon-car-xs"]}
            >
              <Image
                width={25}
                height={25}
                alt="car"
                src={"/images/player/car.svg"}
              />
            </div>
          </div>
          <div className={styles["player-second-icon-container-xs"]}>
            <div
              onClick={() => {
                if(!adsPlaying){
                  forward(15);
                }
              }}
              className={styles["player-second-icon-forward-xs"]}
            >
              <Image
                width={20}
                height={24}
                alt="fast-forward"
                src={"/images/player/fast-forward.svg"}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMenuButton = () => {
    return (
      <div className={styles["player-menu-button-container-xs"]}>
        {/* <div
          className={styles["player-menu-button-queue-xs"]}
          onClick={() => {
            full_xs.current?.scrollTo({
              top: window.innerHeight,
              left: 0,
              behavior: "smooth",
            });
          }}
        >
          <Image
            width={15}
            height={15}
            alt="queue"
            src={"/images/player/queue.svg"}
          />
        </div> */}
        {/* <div
          onClick={() => {
            setMenu(true);
          }}
          className={styles["player-menu-button-xs"]}
        >
          {" "}
          <Image
            width={18}
            height={4}
            alt="menu"
            src={"/images/player/menu.svg"}
          />
        </div> */}
      </div>
    );
  };

  const renderMenu = () => {
    const transitionStyles: any = {
      entering: { bottom: "-300px" },
      entered: { bottom: "0px" },
      exiting: { bottom: "-300px" },
      exited: { bottom: "-300px" },
    };
    return (
      <Transition
        appear={true}
        in={menu}
        timeout={{
          enter: 0,
          exit: 500,
        }}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        {(state) => (
          <div className={styles["player-menu-outer-container-xs"]}>
            <Draggable
              bounds={{ top: 0, left: 0, right: 0 }}
              onStop={(_event, data) => {
                if (data.y >= 20) {
                  setMenu(false);
                } else {
                  setMenuDrag({ x: 0, y: 0 });
                }
              }}
              handle="strong"
              onDrag={(_event, data) => {
                setMenuDrag({ x: data.x, y: data.y });
              }}
              position={{ x: menuDrag.x, y: menuDrag.y }}
              axis="y"
            >
              <div
                style={{ ...transitionStyles[state] }}
                className={styles["player-menu-inner-container-xs"]}
              >
                <strong className={styles["player-menu-handle-xs"]}></strong>
                <div className={styles["player-menu-data-outer-container-xs"]}>
                  <div
                    className={styles["player-menu-data-inner-container-xs"]}
                  >
                    <div className={styles["player-menu-data-container-xs"]}>
                      <p className={styles["player-menu-data-song-xs"]}>
                        {song.title}
                      </p>
                      <p className={styles["player-menu-data-singer-xs"]}>
                        {singer.name + " " + singer.family}
                      </p>
                    </div>
                    <div className={styles["player-menu-data-image-xs"]}>
                      <Image
                        width={60}
                        height={60}
                        src={song.cover}
                        alt={song.title}
                      />
                    </div>
                  </div>
                </div>
                {playlist.length ? (
                  <div
                    className={styles["player-menu-item-outer-container-xs"]}
                  >
                    <div
                      className={styles["player-menu-item-inner-container-xs"]}
                    >
                      <div className={styles["player-menu-item-queue-xs"]}>
                        <div className={styles["player-menu-item-queue-xs"]}>
                          <Image
                            width={14}
                            height={14}
                            alt="queue"
                            src={"/images/player/queue.svg"}
                          />
                        </div>
                      </div>
                      <p
                        onClick={() => {
                          setMenu(false);
                          setShowPlaylist(true);
                        }}
                        className={styles["player-menu-item-title-xs"]}
                      >
                        لیست پخش
                      </p>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className={styles["player-menu-item-outer-container-xs"]}>
                  <div
                    className={styles["player-menu-item-inner-container-xs"]}
                  >
                    <div className={styles["player-menu-item-icon-xs"]}>
                      <Image
                        width={20}
                        height={20}
                        alt="share"
                        src={"/images/player/share.svg"}
                      />
                    </div>
                    <CopyToClipboard
                      text={
                        "https://chaargoosh.com/" +
                        song.link.type +
                        "/" +
                        song.slug_url +
                        "/"
                      }
                    >
                      <p
                        onClick={() => {
                          dispatch(
                            pushToast({
                              status: "success",
                              message: "لینک با موفقیت کپی شد",
                            })
                          );

                          setMenu(false);
                        }}
                        className={styles["player-menu-item-title-xs"]}
                      >
                        اشتراک‌گذاری
                      </p>
                    </CopyToClipboard>
                  </div>
                </div>
                <div className={styles["player-menu-item-outer-container-xs"]}>
                  <div
                    className={styles["player-menu-item-inner-container-xs"]}
                  >
                    <div className={styles["player-menu-item-icon-xs"]}>
                      <Image
                        width={20}
                        height={20}
                        alt="download"
                        src={"/images/player/download.svg"}
                      />
                    </div>
                    <p
                      onClick={() => {
                        let list = [];
                        if (song.audio_hq) {
                          list.push({
                            link: song.audio_hq,
                            quality: 320,
                            title: "عالی",
                          });
                        }
                        if (song.audio_lq) {
                          list.push({
                            link: song.audio_lq,
                            quality: 128,
                            title: "خوب",
                          });
                        }
                        setDownloadList(list);
                        setMenu(false);
                      }}
                      className={styles["player-menu-item-title-xs"]}
                    >
                      دانلود
                    </p>
                  </div>
                </div>
                {song.type === "track" ? (
                  <></>
                ) : (
                  <div
                    className={styles["player-menu-item-outer-container-xs"]}
                  >
                    <div
                      className={styles["player-menu-item-inner-container-xs"]}
                    >
                      <div className={styles["player-menu-item-icon-xs"]}>
                        <Image
                          width={20}
                          height={20}
                          alt="speed"
                          src={"/images/player/speed.svg"}
                        />
                      </div>
                      <p
                        onClick={() => {
                          setMenu(false);
                          setSpeedMenu(true);
                        }}
                        className={styles["player-menu-item-title-xs"]}
                      >
                        سرعت پخش
                      </p>
                    </div>
                  </div>
                )}
                {song.type === "track" ? (
                  <div
                    className={styles["player-menu-item-outer-container-xs"]}
                  >
                    <div
                      className={styles["player-menu-item-inner-container-xs"]}
                    >
                      <div className={styles["player-menu-item-icon-xs"]}>
                        <Image
                          width={20}
                          height={20}
                          alt="playlist"
                          src={"/images/player/playlist.svg"}
                        />
                      </div>
                      <p
                        onClick={() => {
                          setMenu(false);
                          if (cookies.token) {
                            setPageLoading(true);
                            getPlaylists();
                          } else {
                            router.push(
                              "/login/?return_url=" + window.location.href
                            );
                          }
                        }}
                        className={styles["player-menu-item-title-xs"]}
                      >
                        اضافه کردن به پلی‌لیست
                      </p>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {song.lyrics ? (
                  <div
                    className={styles["player-menu-item-outer-container-xs"]}
                  >
                    <div
                      className={styles["player-menu-item-inner-container-xs"]}
                    >
                      <div className={styles["player-menu-item-icon-xs"]}>
                        <Image
                          width={20}
                          height={20}
                          alt="lyrics"
                          src={"/images/player/lyrics.svg"}
                        />
                      </div>
                      <p
                        onClick={() => {
                          setMenu(false);
                          setLyrics(true);
                        }}
                        className={styles["player-menu-item-title-xs"]}
                      >
                        متن آهنگ
                      </p>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className={styles["player-menu-item-outer-container-xs"]}>
                  <div
                    className={styles["player-menu-item-inner-container-xs"]}
                  >
                    <div className={styles["player-menu-item-icon-xs"]}>
                      <Image
                        width={20}
                        height={20}
                        alt="comment"
                        src={"/images/player/comment.svg"}
                      />
                    </div>
                    <p
                      onClick={() => {
                        router.push(
                          "/" +
                            song.link.type +
                            "/" +
                            song.slug_url +
                            "/"
                        );
                        setMenu(false);
                        setFull(false);
                      }}
                      className={styles["player-menu-item-title-xs"]}
                    >
                      نظر دادن
                    </p>
                  </div>
                </div>
              </div>
            </Draggable>
          </div>
        )}
      </Transition>
    );
  };

  const renderDownloadModal = () => {
    if (downloadList.length) {
      return (
        <div
          onClick={(event) => {
            if (!download_xs.current?.contains(event.target as Node)) {
              setDownloadList([]);
              setDownloadLink(null);
            }
          }}
          className={styles["player-download-modal-container-xs"]}
        >
          <div
            ref={download_xs}
            className={styles["player-download-modal-box-xs"]}
          >
            <p className={styles["player-download-modal-title-xs"]}>
              دانلود با کیفیت
            </p>
            <hr className={styles["player-download-modal-hr-xs"]} />
            {downloadList.map((item, index) => {
              return (
                <div
                  key={index}
                  className={styles["player-download-modal-item-container-xs"]}
                >
                  <div
                    onClick={() => {
                      setDownloadLink(item.link);
                    }}
                    className={
                      downloadLink === item.link
                        ? song.type === "track"
                          ? styles[
                              "player-download-modal-item-text-container-active-music-xs"
                            ]
                          : styles[
                              "player-download-modal-item-text-container-active-book-xs"
                            ]
                        : styles[
                            "player-download-modal-item-text-container-inactive-xs"
                          ]
                    }
                  >
                    <p
                      className={
                        styles["player-download-modal-item-text-quality-xs"]
                      }
                    >
                      {item.quality}
                    </p>
                    <p
                      className={
                        styles["player-download-modal-item-text-title-xs"]
                      }
                    >
                      {item.title}
                    </p>
                  </div>
                  <hr className={styles["player-download-modal-item-hr-xs"]} />
                </div>
              );
            })}
            {downloadLink ? (
              <a
                onClick={() => {
                  if (window.AndroidWebView) {
                    window.AndroidWebView.onMessage(
                      JSON.stringify({
                        type: "ACTION_OPEN_URL",
                        url: downloadLink,
                      })
                    );
                  }
                }}
                href={downloadLink}
                style={{
                  backgroundColor:
                    song.type === "track" ? "#784AC4" : "#00af5d",
                }}
                className={styles["player-download-modal-link-active-xs"]}
              >
                دانلود
              </a>
            ) : (
              <button
                className={styles["player-download-modal-link-inactive-xs"]}
              >
                دانلود
              </button>
            )}
          </div>
        </div>
      );
    }
  };

  const renderPlaylistModal = () => {
    if (Object.keys(playlistModal).length) {
      return (
        <div
          onClick={(event) => {
            if (!playlist_xs.current?.contains(event.target as Node)) {
              setPlaylistModal({} as Playlist);
            }
          }}
          className={styles["player-playlist-modal-outer-container-xs"]}
        >
          <div
            ref={playlist_xs}
            className={styles["player-playlist-modal-inner-container-xs"]}
          >
            <div className={styles["player-playlist-modal-top-container-xs"]}>
              <p className={styles["player-playlist-modal-top-title-xs"]}>
                اضافه کردن به پلی‌لیست
              </p>
            </div>
            {playlists.map((item, index) => {
              return (
                <div
                  className={
                    styles["player-playlist-modal-list-item-container-xs"]
                  }
                  key={index}
                >
                  <p
                    className={
                      styles["player-playlist-modal-list-item-title-xs"]
                    }
                  >
                    {item.title}
                  </p>
                  <div
                    onClick={() => {
                      setSelectedList(item.id);
                    }}
                    className={
                      selectedList === item.id
                        ? styles["player-playlist-modal-list-item-selected-xs"]
                        : styles[
                            "player-playlist-modal-list-item-not-selected-xs"
                          ]
                    }
                  ></div>
                </div>
              );
            })}
            <hr className={styles["player-playlist-modal-list-item-hr-xs"]} />
            {/* FIXME: animation */}
            {addPlaylist ? (
              <div>
                <p className={styles["player-playlist-modal-add-title-xs"]}>
                  نام
                </p>
                <input
                  value={playlistTitle}
                  onChange={(event) => {
                    setPlaylistTitle(event.target.value);
                  }}
                  placeholder="نام پلی‌لیست را وارد کنید..."
                  autoFocus={true}
                  className={styles["player-playlist-modal-add-input-xs"]}
                  maxLength={30}
                  tabIndex={2}
                />
                <hr className={styles["player-playlist-modal-add-hr-xs"]} />
                <button
                  onClick={() => {
                    if (!playlistLoading) {
                      if (playlistTitle) {
                        setPlaylistLoading(true);
                        createPlaylist(playlistTitle);
                      } else {
                        dispatch(
                          pushToast({
                            status: "error",
                            message: "لطفا نام پلی‌لیست را وارد کنید",
                          })
                        );
                      }
                    }
                  }}
                  className={styles["player-playlist-modal-add-button-xs"]}
                >
                  {playlistLoading ? (
                    <div
                      className={
                        styles["player-playlist-modal-add-button-loading-xs"]
                      }
                    >
                      <ClipLoader color="white" size={15} />
                    </div>
                  ) : (
                    "ایجاد"
                  )}
                </button>
              </div>
            ) : (
              <p
                onClick={() => {
                  setAddPlaylist(true);
                }}
                className={styles["player-playlist-modal-add-title-xs"]}
              >
                <span
                  className={styles["player-playlist-modal-add-title-plus-xs"]}
                >
                  +
                </span>
                <span
                  className={
                    styles["player-playlist-modal-add-title-description-xs"]
                  }
                >
                  اضافه کردن پلی‌لیست جدید
                </span>
              </p>
            )}
          </div>
        </div>
      );
    }
  };

  const renderLyrics = () => {
    const transitionStyles: any = {
      entering: { bottom: "-600px" },
      entered: { bottom: "0px" },
      exiting: { bottom: "-600px" },
      exited: { bottom: "-600px" },
    };
    return (
      <Transition
        appear={true}
        in={lyrics}
        timeout={{
          enter: 0,
          exit: 500,
        }}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        {(state) => (
          <div className={styles["player-lyrics-outer-container-xs"]}>
            <Draggable
              bounds={{ top: 0, left: 0, right: 0 }}
              onStop={(_event, data) => {
                if (data.y >= 20) {
                  setLyrics(false);
                } else {
                  setLyricsDrag({ x: 0, y: 0 });
                }
              }}
              handle="strong"
              onDrag={(_event, data) => {
                setLyricsDrag({ x: data.x, y: data.y });
              }}
              position={{ x: lyricsDrag.x, y: lyricsDrag.y }}
              axis="y"
            >
              <div
                style={{ ...transitionStyles[state] }}
                className={styles["player-lyrics-inner-container-xs"]}
              >
                <strong className={styles["player-lyrics-handle-xs"]}></strong>
                <p className={styles["player-lyrics-title-xs"]}>متن آهنگ</p>
                <div className={styles["player-lyrics-container-xs"]}>
                  <div
                    dangerouslySetInnerHTML={renderLyricsContent()}
                    className={styles["player-lyrics-xs"]}
                  ></div>
                </div>
              </div>
            </Draggable>
          </div>
        )}
      </Transition>
    );
  };

  const renderLyricsContent = () => {
    return {
      __html: song.lyrics,
    };
  };

  const renderSpeedMenu = () => {
    const transitionStyles: any = {
      entering: { bottom: "-300px" },
      entered: { bottom: "0px" },
      exiting: { bottom: "-300px" },
      exited: { bottom: "-300px" },
    };
    return (
      <Transition
        appear={true}
        in={speedMenu}
        timeout={{
          enter: 0,
          exit: 500,
        }}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        {(state) => (
          <div className={styles["player-speed-menu-outer-container-xs"]}>
            <Draggable
              bounds={{ top: 0, left: 0, right: 0 }}
              onStop={(_event, data) => {
                if (data.y >= 20) {
                  setSpeedMenu(false);
                } else {
                  setSpeedMenuDrag({ x: 0, y: 0 });
                }
              }}
              handle="strong"
              onDrag={(_event, data) => {
                setSpeedMenuDrag({ x: data.x, y: data.y });
              }}
              position={{ x: speedMenuDrag.x, y: speedMenuDrag.y }}
              axis="y"
            >
              <div
                style={{ ...transitionStyles[state] }}
                className={styles["player-speed-menu-inner-container-xs"]}
              >
                <strong
                  className={styles["player-speed-menu-handle-xs"]}
                ></strong>
                <p className={styles["player-speed-menu-title-xs"]}>سرعت پخش</p>
                <div
                  className={
                    styles["player-speed-menu-option-list-outer-container-xs"]
                  }
                >
                  <div
                    className={
                      styles["player-speed-menu-option-list-inner-container-xs"]
                    }
                  >
                    <div
                      onClick={() => {
                        setSpeed(0.5);
                      }}
                      style={{
                        backgroundColor: speed === 0.5 ? "#8F9BB3" : "white",
                      }}
                      className={
                        styles[
                          "player-speed-menu-option-list-item-container-xs"
                        ]
                      }
                    >
                      <p
                        style={{
                          color: speed === 0.5 ? "white" : "#8F9BB3",
                        }}
                        className={
                          styles["player-speed-menu-option-list-item-xs"]
                        }
                      >
                        0.5x
                      </p>
                    </div>
                    <div
                      onClick={() => {
                        setSpeed(1);
                      }}
                      style={{
                        backgroundColor: speed === 1 ? "#8F9BB3" : "white",
                      }}
                      className={
                        styles[
                          "player-speed-menu-option-list-item-container-xs"
                        ]
                      }
                    >
                      <p
                        style={{
                          color: speed === 1 ? "white" : "#8F9BB3",
                        }}
                        className={
                          styles["player-speed-menu-option-list-item-xs"]
                        }
                      >
                        1.0x
                      </p>
                    </div>
                    <div
                      onClick={() => {
                        setSpeed(1.2);
                      }}
                      style={{
                        backgroundColor: speed === 1.2 ? "#8F9BB3" : "white",
                      }}
                      className={
                        styles[
                          "player-speed-menu-option-list-item-container-xs"
                        ]
                      }
                    >
                      <p
                        style={{
                          color: speed === 1.2 ? "white" : "#8F9BB3",
                        }}
                        className={
                          styles["player-speed-menu-option-list-item-xs"]
                        }
                      >
                        1.2x
                      </p>
                    </div>
                    <div
                      onClick={() => {
                        setSpeed(1.4);
                      }}
                      style={{
                        backgroundColor: speed === 1.4 ? "#8F9BB3" : "white",
                      }}
                      className={
                        styles[
                          "player-speed-menu-option-list-item-container-xs"
                        ]
                      }
                    >
                      <p
                        style={{
                          color: speed === 1.4 ? "white" : "#8F9BB3",
                        }}
                        className={
                          styles["player-speed-menu-option-list-item-xs"]
                        }
                      >
                        1.4x
                      </p>
                    </div>
                    <div
                      onClick={() => {
                        setSpeed(1.6);
                      }}
                      style={{
                        backgroundColor: speed === 1.6 ? "#8F9BB3" : "white",
                      }}
                      className={
                        styles[
                          "player-speed-menu-option-list-item-container-xs"
                        ]
                      }
                    >
                      <p
                        style={{
                          color: speed === 1.6 ? "white" : "#8F9BB3",
                        }}
                        className={
                          styles["player-speed-menu-option-list-item-xs"]
                        }
                      >
                        1.6x
                      </p>
                    </div>
                    <div
                      onClick={() => {
                        setSpeed(1.8);
                      }}
                      style={{
                        backgroundColor: speed === 1.8 ? "#8F9BB3" : "white",
                      }}
                      className={
                        styles[
                          "player-speed-menu-option-list-item-container-xs"
                        ]
                      }
                    >
                      <p
                        style={{
                          color: speed === 1.8 ? "white" : "#8F9BB3",
                        }}
                        className={
                          styles["player-speed-menu-option-list-item-xs"]
                        }
                      >
                        1.8x
                      </p>
                    </div>
                    <div
                      onClick={() => {
                        setSpeed(2);
                      }}
                      style={{
                        backgroundColor: speed === 2 ? "#8F9BB3" : "white",
                      }}
                      className={
                        styles[
                          "player-speed-menu-option-list-item-container-xs"
                        ]
                      }
                    >
                      <p
                        style={{
                          color: speed === 2 ? "white" : "#8F9BB3",
                        }}
                        className={
                          styles["player-speed-menu-option-list-item-xs"]
                        }
                      >
                        2.0x
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Draggable>
          </div>
        )}
      </Transition>
    );
  };

  const renderDriving = () => {
    const transitionStyles: any = {
      entering: { bottom: "-300px" },
      entered: { bottom: "0px" },
      exiting: { bottom: "-300px" },
      exited: { bottom: "-300px" },
    };
    return (
      <Transition
        appear={true}
        in={driving}
        timeout={{
          enter: 0,
          exit: 500,
        }}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        {(state) => (
          <div className={styles["player-driving-outer-container-xs"]}>
            <Draggable
              bounds={{ top: 0, left: 0, right: 0 }}
              onStop={(_event, data) => {
                if (data.y >= 20) {
                  setDriving(false);
                } else {
                  setDrivingDrag({ x: 0, y: 0 });
                }
              }}
              handle="strong"
              onDrag={(_event, data) => {
                setDrivingDrag({ x: data.x, y: data.y });
              }}
              position={{ x: drivingDrag.x, y: drivingDrag.y }}
              axis="y"
            >
              <div
                style={{ ...transitionStyles[state] }}
                className={styles["player-driving-inner-container-xs"]}
              >
                <strong className={styles["player-driving-handle-xs"]}></strong>
                <p className={styles["player-driving-title-xs"]}>
                  حالت رانندگی
                </p>
                {renderDrivingTime(played)}
                {ready ? (
                  playing ? (
                    <div
                      className={styles["player-driving-icon-xs"]}
                      onClick={() => {
                        if(!adsPlaying){
                          pauseAll();
                        }
                      }}
                    >
                      <Image
                        width={80}
                        height={80}
                        src={"/images/player/pause.svg"}
                        alt="pause"
                      />
                    </div>
                  ) : (
                    <div
                      className={styles["player-driving-icon-xs"]}
                      onClick={() => {
                        if(!adsPlaying){
                          playSong(song, singer);
                        }
                      }}
                    >
                      <Image
                        width={80}
                        height={80}
                        src={"/images/player/play.svg"}
                        alt="play"
                      />
                    </div>
                  )
                ) : (
                  <div className={styles["player-driving-loader-container-xs"]}>
                    <div className={styles["player-driving-loader-xs"]}>
                      <ClipLoader size={50} color="#8F9BB3" />
                    </div>
                  </div>
                )}
                <div
                  className={
                    styles["player-driving-second-icon-outer-container-xs"]
                  }
                >
                  <div
                    className={
                      styles["player-driving-second-icon-inner-container-xs"]
                    }
                  >
                    <div
                      onClick={() => {
                        if(!adsPlaying){
                          forward(15);
                        }
                      }}
                      className={styles["player-driving-second-icon-xs"]}
                    >
                      <Image
                        width={50}
                        height={60}
                        src={"/images/player/forward-driving.svg"}
                        alt="forward"
                      />
                    </div>
                    <div
                      onClick={() => {
                        if(!adsPlaying){
                          backward(15);
                        }
                      }}
                      className={styles["player-driving-second-icon-xs"]}
                    >
                      <Image
                        width={50}
                        height={60}
                        src={"/images/player/backward-driving.svg"}
                        alt="backward"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Draggable>
          </div>
        )}
      </Transition>
    );
  };

  const renderPlaylist = () => {
    if (playlist.length) {
      return (
        <>
          <div className={styles["player-playlist-outer-container-xs"]}>
            <div className={styles["player-playlist-inner-container-xs"]}>
              <section className={styles["player-playlist-title-container-xs"]}>
                <p className={styles["player-playlist-title-xs"]}>لیست پخش</p>
                <p className={styles["player-playlist-title-count-xs"]}>
                  {digitsEnToFa(`${playlist?.length}`)} موزیک
                </p>
              </section>
              <div className={styles["player-playlist-list-outer-container-xs"]}>
                <div className={styles["player-playlist-list-inner-container-xs"]}>
                  {playlist?.length > 0 &&
                    playlist?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={
                            styles["player-playlist-list-item-outer-container-xs"]
                          }
                        >
                          <div
                            className={
                              styles["player-playlist-list-item-inner-container-xs"]
                            }
                          >
                            {song.id === item.song.id ? (
                              <div
                                className={
                                  styles["player-playlist-list-item-equalizer-xs"]
                                }
                              >
                                <Image
                                  src="/images/player/eq.gif"
                                  width={30}
                                  height={30}
                                  alt="equalizer"
                                />
                              </div>
                            ) : item.song.duration ? (
                              <section
                                className={
                                  styles["player-playlist-list-item-duration-xs"]
                                }
                              >
                                {item.song.duration.split(":")[1].toString()}:
                                {
                                  item.song.duration
                                    .split(":")[2]
                                    .split(":")[0]
                                    .split(".")[0]
                                }
                              </section>
                            ) : (
                              <></>
                            )}
                            <div
                              className={
                                styles[
                                  "player-playlist-list-item-data-container-xs"
                                ]
                              }
                            >
                              <p
                                onClick={() => {
                                  if (item.song.id === song.id && playing) {
                                    pauseAll();
                                  } else {
                                    playSong(item.song, item.singer);
                                  }
                                }}
                                className={
                                  styles["player-playlist-list-item-data-title-xs"]
                                }
                              >
                                {item.song.title}
                              </p>
                              <p
                                className={
                                  styles["player-playlist-list-item-data-singer-xs"]
                                }
                              >
                                {item.singer.name} {item.singer.family}
                              </p>
                            </div>
                            <div
                              onClick={() => {
                                if (item.song.id === song.id && playing) {
                                  pauseAll();
                                } else {
                                  playSong(item.song, item.singer);
                                }
                              }}
                              className={
                                styles["player-playlist-list-item-cover-xs"]
                              }
                            >
                              <Image
                                width={50}
                                height={50}
                                src={item.song.cover}
                                alt={item.song.title}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
    else{
      return (
        <>
        </>
      );
    }
  };

  const renderFullPlayer = () => {
    const transitionStyles: any = {
      entering: { transform: "translate(0px, 100vh)" },
      entered: { transform: "translate(0px, 0px)" },
      exiting: { transform: "translate(0px, 100vh)" },
      exited: { transform: "translate(0px, 100vh)" },
    };
    return (
      <>
        <Transition
          appear={true}
          in={full && !driving}
          timeout={{
            enter: 0,
            exit: 500,
          }}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          {(state) => (
            <div
              ref={full_xs}
              style={{ ...transitionStyles[state] }}
              className={styles["player-full-outer-container-xs"]}
            >
              <div className={styles["player-full-inner-container-xs"]}>
                {renderMenuButton()}
                {renderMinimizeHandle()}
                <div className={styles["player-full-bottom-container-xs"]}>
                  {renderFullSongData()}
                  <div className={styles["player-full-playback-container-xs"]}>
                    {renderProgressBar()}
                    {renderPrimaryIcons()}
                  </div>
                  {renderSecondaryIcons()}
                </div>
                { !adsPlaying && renderMenu()}
                {renderSpeedMenu()}
                {renderLyrics()}
              </div>
              {!adsPlaying && renderPlaylist()}
            </div>
          )}
        </Transition>
      </>
    );
  };

  return (
    <>
      {renderDownloadModal()}
      {renderPlaylistModal()}
      {/* {renderPageLoading()} */}
      {renderDriving()}
      {renderFullPlayer()}
      {full ? (
        <></>
      ) : (
        <div
          style={{ bottom: bottom === true ? "0px" : "0" }}
          className={styles["player-outer-container-xs"]}
        >
          <div className={styles["player-inner-container-xs"]}>
            {renderPlayPauseIcon()}
            {renderSongData()}
          </div>
        </div>
      )}
    </>
  );
};

export default PlayerXs;
