import Image from "next/image";
import React, { useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import Slider from "rc-slider";
import { motion } from "framer-motion";

import styles from "./styles/PlayerXl.module.scss";

import { DownloadItem, Playlist, Singer, Song } from "../../../interfaces/interfaces";
import Link from "next/link";
import { useRouter } from "next/router";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { pause, play, setAdsPlaying, setIndex, stop } from "../../../slices/playerSlice";
import { useDispatch } from "react-redux";
import { pushToast } from "../../../slices/toastSlice";
import { Cookies, useCookies } from "react-cookie";
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
  seekTo: (time: number) => void;
  createPlaylist: (title: string) => void;
  setShowPlayer: (value: boolean) => void;
  adsPlaying:boolean;
};
const PlayerXl = ({
  played,
  setPlayed,
  duration,
  setDuration,
  loop,
  setLoop,

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
  seekTo,
  createPlaylist,
  setShowPlayer,
  adsPlaying
}: props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const playlist_xl = useRef<HTMLDivElement>(null);
  const [cookies] = useCookies(["token"]);
  const renderPlayerTools = () => {
    return (
      <div className={styles["player-tools-outer-container-xl"]}>
        <div className={styles["player-tools-inner-container-xl"]}>
          {renderIcons()}
          {renderProgressBar()}
        </div>
      </div>
    );
  };

  const renderSongData = () => {
    return (
      <div className={styles["player-data-outer-container-xl"]}>
        <div className={styles["player-data-inner-container-xl"]}>
          <div className={styles["player-data-container-xl"]}>
            <div>
              <a className={styles["player-data-song-xl"]}>{adsPlaying ? "تبلیغات صوتی" : song.title}</a>
            </div>
            <p className={styles["player-data-singer-xl"]}>
              {singer && singer.name + " " + singer.family}
            </p>
          </div>
          <div>
            <div className={styles["player-data-image-xl"]}>
            {adsPlaying ?
              <Link href={"http://chaargoosh.com/audiobook/%D8%B1%D9%88%D8%B2%DB%8C-%D8%B1%D9%88%D8%B2%DA%AF%D8%A7%D8%B1%DB%8C-%D9%81%D9%88%D8%AA%D8%A8%D8%A7%D9%84-%D8%AD%D9%85%DB%8C%D8%AF%D8%B1%D8%B6%D8%A7-%D8%B5%D8%AF%D8%B1"}>
                <a>
                  <Image width={50} height={50} src={"/images/ads/ads.svg"} alt={"تبلیغات صوتی"} />
                </a>
              </Link>
              :
              <Image width={50} height={50} src={song.cover} alt={song.title} />
            }
            </div>
          </div>
          {song.type === "track" ? (
            pageLoading ? (
              <div className={styles["player-data-loader-container-xl"]}>
                <div className={styles["player-data-loader-xl"]}>
                  <ClipLoader size={15} color="#8F9BB3" loading={pageLoading} />
                </div>
              </div>
            ) : (
              <div
                className={styles["player-data-icon-xl"]}
                onClick={() => {
                  if (cookies.token) {
                    getPlaylists();
                  } else {
                    router.push("/login/?return_url=" + window.location.href);
                  }
                }}
              >
                <Image
                  width={20}
                  height={20}
                  src={"/images/player/playlist.svg"}
                  alt="playlist"
                />
              </div>
            )
          ) : (
            <></>
          )}
          <i
            onClick={() => {
              if (!adsPlaying){
                setShowPlayer(false);
                dispatch(stop());
              }
            }}
            className={styles["player-data-close-button-xl"]}
          >
            <Image
              width={20}
              height={20}
              src={"/images/player/close.svg"}
              alt="playlist"
            />
          </i>
        </div>
      </div>
    );
  };

  const renderSound = () => {
    return (
      <div className={styles["player-sound-outer-container-xl"]}>
        {renderPlaylistIcon()}
        {renderSoundIcon()}
        <div className={styles["player-sound-inner-container-xl"]}>
          <div className={styles["player-sound-bar-container-xl"]}>
            <Slider
              handleStyle={{
                display: "none",
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
              value={mute ? 0 : volume}
              min={0}
              step={0.1}
              max={1}
              onChange={(volume) => {
                setVolume(volume as number);
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderPlaylist = () => {
    return (
      <>
        {showPlaylist && playlist?.length && (
          <motion.div
            style={{ visibility: showPlaylist ? "visible" : "hidden" }}
            className={styles["player-playlist-outer-container-xl"]}
          >
            <div className={styles["player-playlist-inner-container-xl"]}>
              <i
                onClick={() => {
                  setShowPlaylist(false);
                }}
                className={styles["player-playlist-close-button-xl"]}
              ></i>
              <p className={styles["player-playlist-title-xl"]}>لیست پخش</p>
              <p className={styles["player-playlist-count-xl"]}>
                {digitsEnToFa(`${playlist?.length}`)} آهنگ
              </p>
              <div
                className={styles["player-playlist-list-outer-container-xl"]}
              >
                <div
                  className={styles["player-playlist-list-inner-container-xl"]}
                >
                  {playlist.length > 0 &&
                    playlist?.map((item, index) => {                     
                      return (
                        <div
                          key={index}
                          className={
                            styles[
                              "player-playlist-list-item-outer-container-xl"
                            ]
                          }
                        >
                          <div
                            className={
                              styles[
                                "player-playlist-list-item-inner-container-xl"
                              ]
                            }
                          >
                            {song.id === item.song.id ? (
                              <div
                                className={
                                  styles[
                                    "player-playlist-list-item-equalizer-xl"
                                  ]
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
                              <p
                                className={
                                  styles[
                                    "player-playlist-list-item-duration-xl"
                                  ]
                                }
                              >
                                {item.song.duration.split(":")[1].toString()}:
                                {
                                  item.song.duration
                                    .split(":")[2]
                                    .split(":")[0]
                                    .split(".")[0]
                                }
                              </p>
                            ) : (
                              <></>
                            )}
                            <div
                              onClick={() => {
                                if (item.song.id === song.id && playing) {
                                  pauseAll();
                                } else {
                                  playSong(item.song, item.singer);
                                }
                              }}
                              className={
                                styles[
                                  "player-playlist-list-item-data-container-xl"
                                ]
                              }
                            >
                              <p
                                className={
                                  styles[
                                    "player-playlist-list-item-data-title-xl"
                                  ]
                                }
                              >
                                {item.song.title}
                              </p>
                              <p
                                className={
                                  styles[
                                    "player-playlist-list-item-data-singer-xl"
                                  ]
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
                                styles["player-playlist-list-item-cover-xl"]
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
          </motion.div>
        )}
      </>
    );
  };

  const renderPlaylistIcon = () => {
    return (
      <div
        onClick={() => {
          if (!adsPlaying){
            setShowPlaylist(!showPlaylist);
          }
        }}
        className={styles["player-playlist-icon-xl"]}
        style={{ opacity: playlist?.length ? 1 : 0 }}
      >
        <Image width={14} height={14} src={"/images/player/queue.svg"} alt="" />
      </div>
    );
  };

  const renderSoundIcon = () => {
    if (mute) {
      return (
        <div
          onClick={() => {
            if (!adsPlaying){
              setMute(!mute);
            }
          }}
          className={styles["player-sound-bar-icon-xl"]}
        >
          <Image
            width={18}
            height={18}
            src={"/images/player/mute.svg"}
            alt=""
          />
        </div>
      );
    }
    if (volume === 0) {
      return (
        <div
          onClick={() => {
            if (!adsPlaying){
              setMute(!mute);
            }
          }}
          className={styles["player-sound-bar-icon-xl"]}
        >
          <Image
            width={21}
            height={18}
            src={"/images/player/volume-0.svg"}
            alt=""
          />
        </div>
      );
    }
    if (volume > 0 && volume < 0.33) {
      return (
        <div
          onClick={() => {
            if (!adsPlaying){
              setMute(!mute);
            }
          }}
          className={styles["player-sound-bar-icon-xl"]}
        >
          <Image
            width={21}
            height={18}
            src={"/images/player/volume-1.svg"}
            alt=""
          />
        </div>
      );
    }
    if (volume > 0.33 && volume < 0.66) {
      return (
        <div
          onClick={() => {
            if (!adsPlaying){
              setMute(!mute);
            }
          }}
          className={styles["player-sound-bar-icon-xl"]}
        >
          <Image
            width={21}
            height={18}
            src={"/images/player/volume-2.svg"}
            alt=""
          />
        </div>
      );
    }
    if (volume > 0.66) {
      return (
        <div
          onClick={() => {
            if (!adsPlaying){
              setMute(!mute);
            }
          }}
          className={styles["player-sound-bar-icon-xl"]}
        >
          <Image
            width={21}
            height={18}
            src={"/images/player/volume-3.svg"}
            alt=""
          />
        </div>
      );
    }
  };

  const renderIcons = () => {
    return (
      <div className={styles["player-icon-outer-container-xl"]}>
        <div className={styles["player-icon-inner-container-xl"]}>
          <div
            onClick={() => {
              if (!adsPlaying){
                backward(15);
              }
            }}
            className={styles["player-icon-backward-xl"]}
          >
            <Image
              width={21}
              height={18}
              src={"/images/player/fast-backward.svg"}
              alt="fast-backward"
            />
          </div>
          {loop ? (
            <div
              onClick={() => {
                if (!adsPlaying){
                  setLoop(false);
                }
              }}
              className={styles["player-icon-repeat-xl"]}
            >
              <Image
                width={20}
                height={20}
                alt="repeat"
                src={"/images/player/repeat-active.svg"}
              />
            </div>
          ) : (
            <div
              onClick={() => {
                if (!adsPlaying){
                  setLoop(true);
                }
              }}
              className={styles["player-icon-repeat-xl"]}
            >
              <Image
                width={20}
                height={20}
                alt="repeat"
                src={"/images/player/repeat.svg"}
              />
            </div>
          )}
          {playlist?.length > 1 && index ? (
            <div
              onClick={() => {
                playSong(playlist[index - 1].song, playlist[index - 1].singer);

                dispatch(setIndex(index - 1));
              }}
              style={{ cursor: "pointer" }}
              className={styles["player-icon-previous-xl"]}
            >
              <Image
                width={20}
                height={20}
                alt="previous"
                src={"/images/player/previous-active.svg"}
              />
            </div>
          ) : (
            <div
              onClick={() => {}}
              className={styles["player-icon-previous-xl"]}
            >
              <Image
                width={20}
                height={20}
                alt="previous"
                src={"/images/player/previous.svg"}
              />
            </div>
          )}
          {!ready ? (
            <div className={styles["player-icon-loader-container-xl"]}>
              <div className={styles["player-icon-loader-xl"]}>
                <ClipLoader size={32} color="#8F9BB3" />
              </div>
            </div>
          ) : playing ? (
            <div
              onClick={() => {
                if (!adsPlaying){
                  pauseAll();
                }
              }}
              className={styles["player-icon-play-xl"]}
            >
              <Image
                width={40}
                height={40}
                alt="pause"
                src={"/images/player/pause.svg"}
              />
            </div>
          ) : (
            <div
              onClick={() => {
                if (!adsPlaying){
                  playSong(song, singer);
                }
              }}
              className={styles["player-icon-play-xl"]}
            >
              <Image
                width={40}
                height={40}
                alt="play"
                src={"/images/player/play.svg"}
              />
            </div>
          )}
          {playlist?.length > 1 && index !== playlist?.length - 1 ? (
            <div
              onClick={() => {
                if (!adsPlaying){
                  playSong(playlist[index + 1].song, playlist[index + 1].singer);
                  dispatch(setIndex(index + 1));
                }
              }}
              className={styles["player-icon-next-xl"]}
              style={{ cursor: "pointer" }}
            >
              <Image
                width={20}
                height={20}
                alt="next"
                src={"/images/player/next-active.svg"}
              />
            </div>
          ) : (
            <div onClick={() => {}} className={styles["player-icon-next-xl"]}>
              <Image
                width={20}
                height={20}
                alt="next"
                src={"/images/player/next.svg"}
              />
            </div>
          )}
          {shuffle ? (
            <div
              onClick={() => {
                if (!adsPlaying){
                  setShuffle(false);
                }
              }}
              className={styles["player-icon-shuffle-xl"]}
            >
              <Image
                width={20}
                height={20}
                alt="shuffle"
                src={"/images/player/shuffle-active.svg"}
              />
            </div>
          ) : (
            <div
              onClick={() => {
                if (!adsPlaying){
                  setShuffle(true);
                }
              }}
              className={styles["player-icon-shuffle-xl"]}
            >
              <Image
                width={20}
                height={20}
                alt="shuffle"
                src={"/images/player/shuffle.svg"}
              />
            </div>
          )}
          <div
            onClick={() => {
              forward(15);
            }}
            className={styles["player-icon-forward-xl"]}
          >
            <Image
              width={20}
              height={20}
              alt="fast-forward"
              src={"/images/player/fast-forward.svg"}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderProgressBar = () => {
    return (
      <div className={styles["player-progress-bar-outer-container-xl"]}>
        <div className={styles["player-progress-bar-inner-container-xl"]}>
          {renderTime(played)}
          <div className={styles["player-progress-bar-container-xl"]}>
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
          {renderTime(duration)}
        </div>
      </div>
    );
  };

  const renderTime = (time: number) => {
    let hour = parseInt((time / 3600).toString());
    let minute = parseInt(((time - hour * 3600) / 60).toString());
    let second = parseInt((time - (minute * 60 + hour * 3600)).toString());
    return (
      <p className={styles["player-time-container-xl"]}>
        <span className={styles["player-time-segment-xl"]}>
          {hour === 0 ? "" : hour + ":"}
        </span>
        <span className={styles["player-time-segment-xl"]}>
          {minute === 0 ? "00:" : minute + ":"}
        </span>
        <span className={styles["player-time-segment-xl"]}>
          {second === 0 ? "00" : second < 10 ? "0" + second : second}
        </span>
      </p>
    );
  };

  const renderPlaylistModal = () => {
    if (Object.keys(playlistModal).length) {
      return (
        <div
          onClick={(event) => {
            if (!playlist_xl.current?.contains(event.target as Node)) {
              setPlaylistModal({} as Playlist);
            }
          }}
          className={styles["player-playlist-modal-outer-container-xl"]}
        >
          <div
            ref={playlist_xl}
            className={styles["player-playlist-modal-inner-container-xl"]}
          >
            <div className={styles["player-playlist-modal-top-container-xl"]}>
              <p className={styles["player-playlist-modal-top-title-xl"]}>
                اضافه کردن به پلی‌لیست
              </p>
            </div>
            {playlists.map((item, index) => {
              return (
                <div
                  className={
                    styles["player-playlist-modal-list-item-container-xl"]
                  }
                  key={index}
                >
                  <p
                    className={
                      styles["player-playlist-modal-list-item-title-xl"]
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
                        ? styles["player-playlist-modal-list-item-selected-xl"]
                        : styles[
                            "player-playlist-modal-list-item-not-selected-xl"
                          ]
                    }
                  ></div>
                </div>
              );
            })}
            <hr className={styles["player-playlist-modal-list-item-hr-xl"]} />
            {addPlaylist ? (
              <div>
                {" "}
                {/* //FIXME: fade this part */}
                <p className={styles["player-playlist-modal-add-title-xl"]}>
                  نام
                </p>
                <input
                  value={playlistTitle}
                  onChange={(event) => {
                    setPlaylistTitle(event.target.value);
                  }}
                  placeholder="نام پلی‌لیست را وارد کنید..."
                  autoFocus={true}
                  className={styles["player-playlist-modal-add-input-xl"]}
                  maxLength={30}
                  tabIndex={2}
                />
                <hr className={styles["player-playlist-modal-add-hr-xl"]} />
                <button
                  onClick={() => {
                    if (!playlistLoading) {
                      if (playlistTitle) {
                        setPlaylistLoading(true);
                        createPlaylist(playlistTitle);
                      }
                    } else {
                      dispatch(
                        pushToast({
                          status: "error",
                          message: "لطفا نام پلی‌لیست را وارد کنید",
                        })
                      );
                    }
                  }}
                  className={styles["player-playlist-modal-add-button-xl"]}
                >
                  {playlistLoading ? (
                    <div
                      className={
                        styles["player-playlist-modal-add-button-loading-xl"]
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
                className={styles["player-playlist-modal-add-title-xl"]}
              >
                <span
                  className={styles["player-playlist-modal-add-title-plus-xl"]}
                >
                  +
                </span>
                <span
                  className={
                    styles["player-playlist-modal-add-title-description-xl"]
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

  return (
    <div
      style={{ bottom: "0px"}}
      className={styles["player-outer-container-xl"]}
    >
      <div className={styles["player-inner-container-xl"]}>
        {renderSound()}
        {renderPlaylist()}
        {renderPlayerTools()}
        {renderSongData()}
        {!adsPlaying && renderPlaylistModal()}
      </div>
    </div>
  );
};

export default PlayerXl;
