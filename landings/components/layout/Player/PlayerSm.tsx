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
import styles from "./styles/PlayerSm.module.scss";
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
const PlayerSm = ({
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
  const download_sm = useRef<HTMLDivElement>(null);
  const playlist_sm = useRef<HTMLDivElement>(null);
  const full_sm = useRef<HTMLDivElement>(null);
  const [cookies] = useCookies(["token"]);
  const dispatch = useDispatch();
  const router = useRouter();
  const renderPlayPauseIcon = () => {
    return (
      <div className={styles["player-icon-outer-container-sm"]}>
        <div className={styles["player-icon-inner-container-sm"]}>
          {!ready ? (
            <div className={styles["player-icon-loader-container-sm"]}>
              <div className={styles["player-icon-loader-sm"]}>
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
              className={styles["player-icon-sm"]}
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
              className={styles["player-icon-sm"]}
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
        className={styles["player-data-outer-container-sm"]}
      >
        <div className={styles["player-data-inner-container-sm"]}>
          <div className={styles["player-data-container-sm"]}>
            <p className={styles["player-data-song-sm"]}>{adsPlaying ? "تبلیغات صوتی" : song.title}</p>
            <p className={styles["player-data-singer-sm"]}>
              {singer.name + " " + singer.family}
            </p>
          </div>
          <div className={styles["player-data-image-sm"]}>
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
            className={styles["player-data-close-button-sm"]}
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
      <div className={styles["player-full-icon-container-sm"]}>
        <div
          onClick={() => {
            setFull(false);
          }}
          className={styles["player-full-icon-sm"]}
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
      <div className={styles["player-full-data-outer-container-sm"]}>
        <div className={styles["player-full-data-inner-container-sm"]}>
          <div className={styles["player-full-data-cover-sm"]}>
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
          <p className={styles["player-full-data-song-sm"]}>{adsPlaying ? "تبلیغات صوتی" : song.title}</p>
          <p className={styles["player-full-data-singer-sm"]}>
            {singer.name + " " + singer.family}
          </p>
        </div>
      </div>
    );
  };

  const renderProgressBar = () => {
    return (
      <div className={styles["player-progress-bar-outer-container-sm"]}>
        <div className={styles["player-progress-bar-inner-container-sm"]}>
          <div className={styles["player-progress-bar-container-sm"]}>
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
          <div className={styles["player-time-outer-container-sm"]}>
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
      <p className={styles["player-time-container-sm"]}>
        <span className={styles["player-time-segment-sm"]}>
          {hour === 0 ? "" : hour + ":"}
        </span>
        <span className={styles["player-time-segment-sm"]}>
          {minute === 0 ? "00:" : minute + ":"}
        </span>
        <span className={styles["player-time-segment-sm"]}>
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
      <p className={styles["player-driving-time-container-sm"]}>
        <span className={styles["player-driving-time-segment-sm"]}>
          {hour === 0 ? "" : hour + ":"}
        </span>
        <span className={styles["player-driving-time-segment-sm"]}>
          {minute === 0 ? "00:" : minute + ":"}
        </span>
        <span className={styles["player-driving-time-segment-sm"]}>
          {second === 0 ? "00" : second < 10 ? "0" + second : second}
        </span>
      </p>
    );
  };

  const renderPrimaryIcons = () => {
    return (
      <div className={styles["player-primary-icon-outer-container-sm"]}>
        <div className={styles["player-primary-icon-inner-container-sm"]}>
          {loop ? (
            <div
              onClick={() => {
                if(!adsPlaying){
                  setLoop(false);
                }
              }}
              className={styles["player-primary-icon-repeat-sm"]}
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
              className={styles["player-primary-icon-repeat-sm"]}
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
              className={styles["player-primary-icon-previous-sm"]}
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
              className={styles["player-primary-icon-previous-sm"]}
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
            <div className={styles["player-primary-icon-loader-container-sm"]}>
              <div className={styles["player-primary-icon-loader-sm"]}>
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
              className={styles["player-primary-icon-play-sm"]}
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
              className={styles["player-primary-icon-play-sm"]}
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
              className={styles["player-primary-icon-next-sm"]}
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
              className={styles["player-primary-icon-next-sm"]}
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
              className={styles["player-primary-icon-shuffle-sm"]}
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
              className={styles["player-primary-icon-shuffle-sm"]}
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
      <div className={styles["player-second-icon-outer-container-sm"]}>
        <div className={styles["player-second-icon-inner-container-sm"]}>
          <div className={styles["player-second-icon-container-sm"]}>
            <div
              onClick={() => {
                if(!adsPlaying){
                  backward(15);
                }
              }}
              className={styles["player-second-icon-backward-sm"]}
            >
              <Image
                width={20}
                height={24}
                alt="fast-backward"
                src={"/images/player/fast-backward.svg"}
              />
            </div>
          </div>
          <div className={styles["player-second-icon-container-sm"]}>
            <div
              onClick={() => {
                if(!adsPlaying){
                  setDriving(true);
                }
              }}
              className={styles["player-second-icon-car-sm"]}
            >
              <Image
                width={25}
                height={25}
                alt="car"
                src={"/images/player/car.svg"}
              />
            </div>
          </div>
          <div className={styles["player-second-icon-container-sm"]}>
            <div
              onClick={() => {
                if(!adsPlaying){
                  forward(15);
                }
              }}
              className={styles["player-second-icon-forward-sm"]}
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
      <div className={styles["player-menu-button-container-sm"]}>
        {/* <div
          className={styles["player-menu-button-queue-sm"]}
          onClick={() => {
            full_sm.current?.scrollTo({
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
          className={styles["player-menu-button-sm"]}
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
          <div className={styles["player-menu-outer-container-sm"]}>
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
                className={styles["player-menu-inner-container-sm"]}
              >
                <strong className={styles["player-menu-handle-sm"]}></strong>
                <div className={styles["player-menu-data-outer-container-sm"]}>
                  <div
                    className={styles["player-menu-data-inner-container-sm"]}
                  >
                    <div className={styles["player-menu-data-container-sm"]}>
                      <p className={styles["player-menu-data-song-sm"]}>
                        {song.title}
                      </p>
                      <p className={styles["player-menu-data-singer-sm"]}>
                        {singer.name + " " + singer.family}
                      </p>
                    </div>
                    <div className={styles["player-menu-data-image-sm"]}>
                      <Image
                        width={60}
                        height={60}
                        src={song.cover}
                        alt={song.title}
                      />
                    </div>
                  </div>
                </div>
                {/* {playlist.length ? (
                  <div
                    className={styles["player-menu-item-outer-container-sm"]}
                  >
                    <div
                      className={styles["player-menu-item-inner-container-sm"]}
                    >
                      <div className={styles["player-menu-item-queue-sm"]}>
                        <div className={styles["player-menu-item-queue-sm"]}>
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
                        className={styles["player-menu-item-title-sm"]}
                      >
                        لیست پخش
                      </p>
                    </div>
                  </div>
                ) : (
                  <></>
                )} */}
                <div className={styles["player-menu-item-outer-container-sm"]}>
                  <div
                    className={styles["player-menu-item-inner-container-sm"]}
                  >
                    <div className={styles["player-menu-item-icon-sm"]}>
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
                        className={styles["player-menu-item-title-sm"]}
                      >
                        اشتراک‌گذاری
                      </p>
                    </CopyToClipboard>
                  </div>
                </div>
                <div className={styles["player-menu-item-outer-container-sm"]}>
                  <div
                    className={styles["player-menu-item-inner-container-sm"]}
                  >
                    <div className={styles["player-menu-item-icon-sm"]}>
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
                      className={styles["player-menu-item-title-sm"]}
                    >
                      دانلود
                    </p>
                  </div>
                </div>
                {song.type === "track" ? (
                  <></>
                ) : (
                  <div
                    className={styles["player-menu-item-outer-container-sm"]}
                  >
                    <div
                      className={styles["player-menu-item-inner-container-sm"]}
                    >
                      <div className={styles["player-menu-item-icon-sm"]}>
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
                        className={styles["player-menu-item-title-sm"]}
                      >
                        سرعت پخش
                      </p>
                    </div>
                  </div>
                )}
                {song.type === "track" ? (
                  <div
                    className={styles["player-menu-item-outer-container-sm"]}
                  >
                    <div
                      className={styles["player-menu-item-inner-container-sm"]}
                    >
                      <div className={styles["player-menu-item-icon-sm"]}>
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
                        className={styles["player-menu-item-title-sm"]}
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
                    className={styles["player-menu-item-outer-container-sm"]}
                  >
                    <div
                      className={styles["player-menu-item-inner-container-sm"]}
                    >
                      <div className={styles["player-menu-item-icon-sm"]}>
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
                        className={styles["player-menu-item-title-sm"]}
                      >
                        متن آهنگ
                      </p>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className={styles["player-menu-item-outer-container-sm"]}>
                  <div
                    className={styles["player-menu-item-inner-container-sm"]}
                  >
                    <div className={styles["player-menu-item-icon-sm"]}>
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
                      className={styles["player-menu-item-title-sm"]}
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
            if (!download_sm.current?.contains(event.target as Node)) {
              setDownloadList([]);
              setDownloadLink(null);
            }
          }}
          className={styles["player-download-modal-container-sm"]}
        >
          <div
            ref={download_sm}
            className={styles["player-download-modal-box-sm"]}
          >
            <p className={styles["player-download-modal-title-sm"]}>
              دانلود با کیفیت
            </p>
            <hr className={styles["player-download-modal-hr-sm"]} />
            {downloadList.map((item, index) => {
              return (
                <div
                  key={index}
                  className={styles["player-download-modal-item-container-sm"]}
                >
                  <div
                    onClick={() => {
                      setDownloadLink(item.link);
                    }}
                    className={
                      downloadLink === item.link
                        ? song.type === "track"
                          ? styles[
                              "player-download-modal-item-text-container-active-music-sm"
                            ]
                          : styles[
                              "player-download-modal-item-text-container-active-book-sm"
                            ]
                        : styles[
                            "player-download-modal-item-text-container-inactive-sm"
                          ]
                    }
                  >
                    <p
                      className={
                        styles["player-download-modal-item-text-quality-sm"]
                      }
                    >
                      {item.quality}
                    </p>
                    <p
                      className={
                        styles["player-download-modal-item-text-title-sm"]
                      }
                    >
                      {item.title}
                    </p>
                  </div>
                  <hr className={styles["player-download-modal-item-hr-sm"]} />
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
                className={styles["player-download-modal-link-active-sm"]}
              >
                دانلود
              </a>
            ) : (
              <button
                className={styles["player-download-modal-link-inactive-sm"]}
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
            if (!playlist_sm.current?.contains(event.target as Node)) {
              setPlaylistModal({} as Playlist);
            }
          }}
          className={styles["player-playlist-modal-outer-container-sm"]}
        >
          <div
            ref={playlist_sm}
            className={styles["player-playlist-modal-inner-container-sm"]}
          >
            <div className={styles["player-playlist-modal-top-container-sm"]}>
              <p className={styles["player-playlist-modal-top-title-sm"]}>
                اضافه کردن به پلی‌لیست
              </p>
            </div>
            {playlists.map((item, index) => {
              return (
                <div
                  className={
                    styles["player-playlist-modal-list-item-container-sm"]
                  }
                  key={index}
                >
                  <p
                    className={
                      styles["player-playlist-modal-list-item-title-sm"]
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
                        ? styles["player-playlist-modal-list-item-selected-sm"]
                        : styles[
                            "player-playlist-modal-list-item-not-selected-sm"
                          ]
                    }
                  ></div>
                </div>
              );
            })}
            <hr className={styles["player-playlist-modal-list-item-hr-sm"]} />
            {/* FIXME: animation */}
            {addPlaylist ? (
              <div>
                <p className={styles["player-playlist-modal-add-title-sm"]}>
                  نام
                </p>
                <input
                  value={playlistTitle}
                  onChange={(event) => {
                    setPlaylistTitle(event.target.value);
                  }}
                  placeholder="نام پلی‌لیست را وارد کنید..."
                  autoFocus={true}
                  className={styles["player-playlist-modal-add-input-sm"]}
                  maxLength={30}
                  tabIndex={2}
                />
                <hr className={styles["player-playlist-modal-add-hr-sm"]} />
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
                  className={styles["player-playlist-modal-add-button-sm"]}
                >
                  {playlistLoading ? (
                    <div
                      className={
                        styles["player-playlist-modal-add-button-loading-sm"]
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
                className={styles["player-playlist-modal-add-title-sm"]}
              >
                <span
                  className={styles["player-playlist-modal-add-title-plus-sm"]}
                >
                  +
                </span>
                <span
                  className={
                    styles["player-playlist-modal-add-title-description-sm"]
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
          <div className={styles["player-lyrics-outer-container-sm"]}>
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
                className={styles["player-lyrics-inner-container-sm"]}
              >
                <strong className={styles["player-lyrics-handle-sm"]}></strong>
                <p className={styles["player-lyrics-title-sm"]}>متن آهنگ</p>
                <div className={styles["player-lyrics-container-sm"]}>
                  <div
                    dangerouslySetInnerHTML={renderLyricsContent()}
                    className={styles["player-lyrics-sm"]}
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
          <div className={styles["player-speed-menu-outer-container-sm"]}>
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
                className={styles["player-speed-menu-inner-container-sm"]}
              >
                <strong
                  className={styles["player-speed-menu-handle-sm"]}
                ></strong>
                <p className={styles["player-speed-menu-title-sm"]}>سرعت پخش</p>
                <div
                  className={
                    styles["player-speed-menu-option-list-outer-container-sm"]
                  }
                >
                  <div
                    className={
                      styles["player-speed-menu-option-list-inner-container-sm"]
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
                          "player-speed-menu-option-list-item-container-sm"
                        ]
                      }
                    >
                      <p
                        style={{
                          color: speed === 0.5 ? "white" : "#8F9BB3",
                        }}
                        className={
                          styles["player-speed-menu-option-list-item-sm"]
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
                          "player-speed-menu-option-list-item-container-sm"
                        ]
                      }
                    >
                      <p
                        style={{
                          color: speed === 1 ? "white" : "#8F9BB3",
                        }}
                        className={
                          styles["player-speed-menu-option-list-item-sm"]
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
                          "player-speed-menu-option-list-item-container-sm"
                        ]
                      }
                    >
                      <p
                        style={{
                          color: speed === 1.2 ? "white" : "#8F9BB3",
                        }}
                        className={
                          styles["player-speed-menu-option-list-item-sm"]
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
                          "player-speed-menu-option-list-item-container-sm"
                        ]
                      }
                    >
                      <p
                        style={{
                          color: speed === 1.4 ? "white" : "#8F9BB3",
                        }}
                        className={
                          styles["player-speed-menu-option-list-item-sm"]
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
                          "player-speed-menu-option-list-item-container-sm"
                        ]
                      }
                    >
                      <p
                        style={{
                          color: speed === 1.6 ? "white" : "#8F9BB3",
                        }}
                        className={
                          styles["player-speed-menu-option-list-item-sm"]
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
                          "player-speed-menu-option-list-item-container-sm"
                        ]
                      }
                    >
                      <p
                        style={{
                          color: speed === 1.8 ? "white" : "#8F9BB3",
                        }}
                        className={
                          styles["player-speed-menu-option-list-item-sm"]
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
                          "player-speed-menu-option-list-item-container-sm"
                        ]
                      }
                    >
                      <p
                        style={{
                          color: speed === 2 ? "white" : "#8F9BB3",
                        }}
                        className={
                          styles["player-speed-menu-option-list-item-sm"]
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
          <div className={styles["player-driving-outer-container-sm"]}>
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
                className={styles["player-driving-inner-container-sm"]}
              >
                <strong className={styles["player-driving-handle-sm"]}></strong>
                <p className={styles["player-driving-title-sm"]}>
                  حالت رانندگی
                </p>
                {renderDrivingTime(played)}
                {ready ? (
                  playing ? (
                    <div
                      className={styles["player-driving-icon-sm"]}
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
                      className={styles["player-driving-icon-sm"]}
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
                  <div className={styles["player-driving-loader-container-sm"]}>
                    <div className={styles["player-driving-loader-sm"]}>
                      <ClipLoader size={50} color="#8F9BB3" />
                    </div>
                  </div>
                )}
                <div
                  className={
                    styles["player-driving-second-icon-outer-container-sm"]
                  }
                >
                  <div
                    className={
                      styles["player-driving-second-icon-inner-container-sm"]
                    }
                  >
                    <div
                      onClick={() => {
                        if(!adsPlaying){
                          forward(15);
                        }
                      }}
                      className={styles["player-driving-second-icon-sm"]}
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
                      className={styles["player-driving-second-icon-sm"]}
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
    if (song.type === "podcast" || song.type === "audiobook_access") {
      return (
        <div className={styles["player-playlist-outer-container-sm"]}>
          {/* <div className={styles["player-playlist-inner-container-sm"]}>
            <section className={styles["player-playlist-title-container-sm"]}>
              <p className={styles["player-playlist-title-sm"]}>لیست پخش</p>
              <p className={styles["player-playlist-title-count-sm"]}>
                {digitsEnToFa(`${playlist?.length}`)} کتاب
              </p>
            </section>
            <div className={styles["player-playlist-list-outer-container-sm"]}>
              <div className={styles["player-playlist-list-inner-container-sm"]}>
                {playlist?.length > 0 &&
                  playlist?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          styles["player-playlist-list-item-outer-container-sm"]
                        }
                      >
                        <div
                          className={
                            styles["player-playlist-list-item-inner-container-sm"]
                          }
                        >
                          {song.id === item.song.id ? (
                            <div
                              className={
                                styles["player-playlist-list-item-equalizer-sm"]
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
                                styles["player-playlist-list-item-duration-sm"]
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
                                "player-playlist-list-item-data-container-sm"
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
                                styles["player-playlist-list-item-data-title-sm"]
                              }
                            >
                              {item.song.title}
                            </p>
                            <p
                              className={
                                styles["player-playlist-list-item-data-singer-sm"]
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
                              styles["player-playlist-list-item-cover-sm"]
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
          </div> */}
        </div>
      );
    }else{
      return <></>
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
            ref={full_sm}
            style={{ ...transitionStyles[state] }}
            className={styles["player-full-outer-container-sm"]}
          >
            <div className={styles["player-full-inner-container-sm"]}>
              {renderMenuButton()}
              {renderMinimizeHandle()}
              <div className={styles["player-full-bottom-container-sm"]}>
                {renderFullSongData()}
                <div className={styles["player-full-playback-container-sm"]}>
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
          className={styles["player-outer-container-sm"]}
        >
          <div className={styles["player-inner-container-sm"]}>
            {renderPlayPauseIcon()}
            {renderSongData()}
          </div>
        </div>
      )}
    </>
  );
};

export default PlayerSm;
