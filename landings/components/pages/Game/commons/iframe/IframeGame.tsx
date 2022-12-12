// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { useRouter } from "next/router";
import Plyr from "plyr";
import { iv } from "../../../../../globals";
import CryptoJS from "crypto-js";
// import RequestsSerilizer from "./RequestsSerializer";
import ShopModal from "../popups/shopModal";
import { motion, AnimatePresence } from "framer-motion";
import { updateUserAsync } from "../../../../../slices/userSlice";
const FeePopUp = dynamic(() => import("../popups/FeeModal"), {});
const P1PopUp = dynamic(() => import("../popups/P1Modal"), {});
const FinishPopUp = dynamic(() => import("../popups/FinishModal"), {});
import { PaySku, SkuShop, Video } from "../../interfaces/interfaces";
import { RootState } from "../../../../../store";
import gameStyle from "./game.module.scss";
import "react-notifications-component/dist/theme.css";
import { pushToast } from "../../../../../slices/toastSlice";
import {
  getAdvertisementData,
  getGameSetupData,
  getParentSessionLdbData,
  getSessionLeaderBoardData,
  getSkuListData,
  postAdsSeenData,
  postEndGameData,
  postPayData,
  postStartGameData,
  getGameHistoryData,
  getUserInfoApiData,
  postScoreData,
  postInfoData,
  postHintData,
  postRaiseData,
  postGameHistoryData
} from "networks/sessionns";
var player: Plyr;
type props = {
  setReaload: () => void;
};
const IframeGame = ({ setReaload }: props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.user.user);
  const router = useRouter();
  const [cookies, setCookies, removeCookies] = useCookies([
    "token",
    "organization",
    "game-type",
    "selected-mode",
    "selected-game-id",
    "session-id",
    "session-game-id",
    "sessionId",
    "parent_session",
    "parrent_session-id",
  ]);
  const iframe = useRef();
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [selectedGame, setSelectedGame] = useState({
    game: { channels: [] },
  } as any);
  const [showFinishPopUp, setShowFinishPopUp] = useState(false);
  const [correctAns, setCorrectAns] = useState(0);
  const [wrongAns, setWrongAns] = useState(0);
  const [showIframe, setShowIframe] = useState(false);
  const [iframeLoadCompleted, setIframeLoadCompleted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showP1Popup, setShowP1PopUp] = useState(false);
  const [sessionEndGame, setSessionEndGame] = useState({} as any);
  const [high_score, setHight_score] = useState();
  const [showNoResourcesPopup] = useState(false);
  const [animationScorePopup, setAnimationScorePopup] = useState(true);
  const [animationSubmitPopup, setAnimationSubmitPopup] = useState(true);
  const [leaderboard, setLeaderboard] = useState<any>({});
  const [sessionLeaderboard, setSessionLeaderboard] = useState({});
  const [p1info, setP1info] = useState({
    start_fee_type: "coin",
    start_fee: 0,
    start_fee_daily: 0,
    daily_pay: false,
  });
  const [feePopUpPopUpData, setFeePopUpPopUpData] = useState({});
  const [showFeePopup, setShowFeePopUp] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [normalEnded, setNormalEnded] = useState(false);
  const [video, setVideo] = useState<Video>({} as Video);
  const [duration, setDuration] = useState(0);
  const [showCloseAd, setShowCloseAd] = useState(false);
  const [rank, setRank] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [showAdsImage, setShowAdsImage] = useState(false);
  const [scoreSet, setScoreSet] = useState(false);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [showShopList, setShowShopList] = useState(false);
  const [shopList, setShopList] = useState<any[]>({} as any);
  const [showSessionEnd, setShowSessionEnd] = useState(false);
  const [videoType, setVideoType] = useState("");
  const [randomValue, setRandomValue] = useState(0);
  //check if session game is ended to send request
  const list = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -500, opacity: 0 },
  };
  useEffect(() => {
  }, [score]);
  useEffect(() => {
    if (showVideo) {
      let playerClass = "#player-2x";
      player = new Plyr(playerClass, {
        autoplay: true,
        controls: ["current-time"],
        hideControls: false,
      });
      player.source = {
        type: "video",
        title: video.text,
        sources: [
          {
            src: video.video,
            type: "video/mp4",
          },
        ],
        poster: video.banner,
      };
      player.on("ended", (response) => {
        postAdsSeenData(cookies.token, cookies.organization).then(async (response: any) => {
          if (response.status === 200) {
            const data = {
              game_session_id: cookies["session-game-id"],
              score: CryptoJS.AES.encrypt(
                JSON.stringify(score * 2),
                CryptoJS.enc.Utf8.parse(
                  window.localStorage
                    .getItem("egk")
                    .substring(window.localStorage.getItem("egk").length - 16)
                ),
                {
                  iv: CryptoJS.enc.Utf8.parse(iv),
                  mode: CryptoJS.mode.CBC,
                }
              ).toString(),
            }
            setShowVideo(false);
            setShowAdsImage(true);
            postEndGameData(cookies.token, data, cookies.organization).then(async (response: any) => {
              if (response.status === 200) {
                if (cookies["token"] && cookies["session-id"]) {
                  getSessionLeaderBoardData(cookies.token, cookies["session-id"], cookies.organization).then(async (response: any) => {
                    if (response.status === 200) {
                      setLeaderboard(response.data);
                    }
                  })
                }
                if (cookies["token"] && cookies["parrent_session-id"]) {
                  getSessionLeaderBoardData(cookies.token, cookies["parrent_session-id"], cookies.organization).then(async (response: any) => {
                    if (response.status === 200) {
                      setRank(response.data.profile[0]?.rank || 0);
                    }
                  })
                }
                setScore(score * 2);
                // dispatch(updateUserAsync());
                setScoreSet(true);
                setSessionEndGame(response.data);
                setSessionEnded(false);
                setShowSessionEnd(true);
                setShowSubmitPopup(false);
              }
            }).catch((error) => {
              if (error.response.status === 406) {
                dispatch(
                  pushToast({
                    status: "error",
                    message:
                      "میزان مجاز مشاهده تبلیغ برای شما به اتمام رسیده است",
                  })
                );

                setTimeout(() => {
                  router.replace("/game");
                }, 300);
              }
            });
          }
        })
      });
      player.on("playing", () => {
        setDuration(player.duration);
      });
    }
  }, [showVideo, video]);
  useEffect(() => {
    if (duration > 0) {
      setTimeout(() => {
        setShowCloseAd(true);
      }, (duration / 3) * 1000);
    }
  }, [duration]);
  useEffect(() => {
    if (sessionEnded) {
      const data ={
        game_session_id: cookies["session-game-id"],
        score: CryptoJS.AES.encrypt(
          JSON.stringify(score),
          CryptoJS.enc.Utf8.parse(
            window.localStorage
              .getItem("egk")
              .substring(window.localStorage.getItem("egk").length - 16)
          ),
          {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC,
          }
        ).toString(),
      }

      postEndGameData(cookies.token, data, cookies.organization).then(async (response: any) => {
        if (response.status === 200) {
          setSessionEnded(false);
          setScoreSet(true);
          setSessionEndGame(response.data);
          getSessionLeaderBoardData(cookies.token, cookies["session-id"], cookies.organization).then(async (response: any) => {
            if (response.status === 200) {
              setLeaderboard(response.data);
            }
          })
          getParentSessionLdbData(cookies.token, cookies["parrent_session-id"], cookies.organization).then(async (response: any) => {
            if (response.status === 200) {
              setRank(response.data.profile[0]?.rank || 0);
            }
          })
        }
        setShowSessionEnd(true);
      }).catch((error) => {
        if (error.response.status === 406) {
          dispatch(
            pushToast({
              status: "error",
              message: "میزان مجاز مشاهده تبلیغ برای شما به اتمام رسیده است",
            })
          );

          setTimeout(() => {
            router.push("/game");
          }, 300);
        }
      });
    }
  }, [sessionEnded]);
  // useEffect(() => {
  //   dispatch(updateUserAsync());
  //   return () => {
  //     if (!scoreSet) {
  //       const data = {
  //         game_session_id: cookies["session-game-id"],
  //         score: CryptoJS.AES.encrypt(
  //           JSON.stringify(score),
  //           CryptoJS.enc.Utf8.parse(
  //             window.localStorage
  //               .getItem("egk")
  //               .substring(window.localStorage.getItem("egk").length - 16)
  //           ),
  //           {
  //             iv: CryptoJS.enc.Utf8.parse(iv),
  //             mode: CryptoJS.mode.CBC,
  //           }
  //         ).toString(),
  //       }
  //       postEndGameData(cookies.token, data, cookies.organization).then(async (response: any) => {})
  //     }
  //   };
  // }, []);
  useEffect(() => {
    if (normalEnded) {
      let req = {
        organization_id: Number.parseInt(cookies.organization),
        score: CryptoJS.AES.encrypt(
          JSON.stringify(score),
          CryptoJS.enc.Utf8.parse(
            `${iv}${cookies.organization}${cookies["selected-game-id"]}`.substring(
              `${iv}${cookies.organization}${cookies["selected-game-id"]}`
                .length - 16
            )
          ),
          {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC,
          }
        ).toString(),
        game_setup_id: cookies["selected-game-id"],
      };
      if (userInfo.is_guest) {
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        postScoreData(cookies.token, req, cookies.organization).then(async (response: any) => {
          SsetScore(response.data);
        })

      }
    }
  }, [normalEnded]);
  useEffect(() => {
    checkOrientation();
    getGameInfo();

    window.addEventListener("message", onMessage, false);
    document.addEventListener("message", onMessageApp, false);

    return () => {
      document.removeEventListener("message", onMessageApp, false);
      window.removeEventListener("message", onMessage, false);

      if (document.getElementById("body-tag"))
        document.getElementById("body-tag")?.classList.remove("rotate");
      if (document.getElementById("base-div"))
        document.getElementById("base-div")?.classList.remove("rotate");
      if (document.getElementById("root"))
        document.getElementById("root")?.classList.remove("rotate");

      if (document.getElementById("game"))
        document.getElementById("game")?.classList.remove("rotate");
    };
  }, []);
  const getPayUrl = (data: PaySku, item: SkuShop) => {
    const { channel_sku_id, charkhoneh_channel_sku_id, skuTitle } = item;

    const { detail, token, platform_token } = data;
    if (detail === "succeed") {
      window.location.href = platform_token;
    }
  };
  const buySku = (item: SkuShop) => {
    let { id } = item;

    let req = {
      sku_id: id,
      gateway: "sadad",
    };
    postPayData(cookies.token, req, cookies.organization).then(async (response: any) => {
      getPayUrl(response.data, item);
    })

  };
  const getGameInfo = () => {
    getGameSetupData(cookies.token, cookies["selected-game-id"], cookies.organization).then(async (response: any) => {
      SSelectedGame(response.data);
      // let reqserilizer = new RequestsSerilizer("gameCat", response.data);
      // reqserilizer.updateStorage();
      // reqserilizer = null;
    })
  };
  const SSelectedGame = (selectedGame: any) => {
    const { standalone, game } = selectedGame;

    setSelectedGame(selectedGame);

    // startTimer(game.p1_type_time);

    setShowIframe(true);
    start();
    if (!standalone) {
      start();
    }
  };
  const start = () => {
    const START_TIMER = setTimeout(() => {
      if (iframeLoadCompleted && isReady) {
        clearTimeout(START_TIMER);
        getGameHistoryData(cookies.token, selectedGame.id, cookies.organization).then(async (response: any) => {
          setGameHistory(response);
        })
      } else {
        start();
      }
    }, 1000);
  };
  const setGameHistory = (gameHistory: any) => {
    const { game } = selectedGame;

    if (selectedGame.game.type === "time") {
      // startTimer();
    }

    const data = {
      type: "START",
      payload: {
        mode: cookies["selected-mode"],
        score: 0,
        user_id: game.user_id,
        game_history: gameHistory.text,
      },
    };

    sendToiframe(data);
  };
  useEffect(() => {
    if (standalone && iframeLoadCompleted) {
      const kind = false;
      const setData = () => {};
      getUserInfoApiData(cookies.token, cookies.organization).then(async (response: any) => {
        setData({ ...response.data, kind });

        // let reqserilizer = new RequestsSerilizer("info", {
        //   ...response.data,
        //   kind
        // });
        // reqserilizer.updateStorage();
        // reqserilizer = null;
      })
    }
    start();
  }, [iframeLoadCompleted, isReady]);
  const onIframeLoad = () => {
    setIframeLoadCompleted(true);
  };
  const checkOrientation = () => {
    const { game } = selectedGame;
    if (game.landscape) {
      if (window.innerHeight > window.innerWidth) {
        document.getElementById("body-tag")?.classList.add("rotate");

        document.getElementById("base-div")?.classList.add("rotate");

        document.getElementById("root")?.classList.add("rotate");

        document.getElementById("game")?.classList.add("rotate");

        // document.getElementById('game-timer').classList.add('rotate')
      }
    }

    if (window.innerHeight > window.innerWidth) {
      const data = {
        type: "ORIENTATION",
        payload: {
          showRotatePopUp: true,
        },
      };
      sendToiframe(data);
    }
    window.addEventListener(
      "orientationchange",
      () => {
        if (window.innerHeight < window.innerWidth) {
          const data = {
            type: "ORIENTATION",
            payload: {
              showRotatePopUp: true,
            },
          };
          sendToiframe(data);
        } else {
          const data = {
            type: "ORIENTATION",
            payload: {
              showRotatePopUp: false,
            },
          };
          sendToiframe(data);
        }
      },
      false
    );
  };
  const SsetScore = (data: any) => {
    let req = {
      game_setup_id: cookies["selected-game-id"],
    };
    setHight_score(data.high_score);
    postInfoData(cookies.token, req, cookies.organization).then(async (response: any) => {
      setP1InfotData(response.data);
    })

  };
  const setP1InfotData = (data: any) => {
    setP1info(data);
    setShowP1PopUp(true);
  };
  const openShopModal = () => {
    getSkuListData(cookies.token, cookies.organization).then(async (response: any) => {
      document.getElementsByTagName("body")[0].style.overflow = "visible";
      setShopList(response.data.reverse());
      setShowShopList(true);
    })
  };
  const onMessage = (event: any) => {
    const string = event.data;

    try {
      const { coin } = userInfo;
      const { game, id } = selectedGame;

      const data = JSON.parse(string);
      if (data.type === "READY") {
        setIsReady(true);
      } else if (data.type === "ACTION_SCORE") {
        // let score_multiple =
        //   selectedGame.game.score_multiple &&
        //   selectedGame.game.score_multiple !== 0
        //     ? selectedGame.game.score_multiple
        //     : 1;
        if (data.payload.type === "inc") {
          setScore(data.payload.score);
          setCorrectAns(correctAns + 1);
        } else if (data.payload.type === "dec") {
          setScore(data.payload.score);
          setWrongAns(wrongAns + 1);
        }
      } else if (data.type === "ACTION_HINT") {
        let status = "ok";
        if (game.hint_required_coin > coin) {
          status = "nok";
        }
        const data = {
          type: "ACTION_PERMISSION",
          payload: {
            status,
          },
        };
        sendToiframe(data);
      } else if (data.type === "ACTION_PAY") {
        //pay
      } else if (data.type === "SHOW_NO_RESOURCE") {
        //payload type =
        // 'coin'
        // 'heart'
        // 'goldenkey'
        // 'package'
      } else if (data.type === "SHOW_FEE_POPUP") {
        //payload type =
        // 'coin'
        // 'heart'
        // 'goldenkey'
        // 'package'
        showFeePopUp(true, data.payload);
      } else if (data.type === "BACK_FROM_SKU_LIST") {
        //settle
      } else if (data.type === "ACTION_DECREASE_COIN") {
        let req = {
          organization_id: Number.parseInt(cookies.organization),
          game_setup_id: id,
          hint_id: data.payload.id,
        };
        postHintData(cookies.token, req, cookies.organization).then(async (response: any) => {
          sendNewCoin(response.data, undefined);
        })
      } else if (data.type === "ACTION_RAISE_RESOURCE") {
        const { type, value } = data.payload;
        let gameUrl = game.channels.filter(
          (item: any) => item.title === "web"
        )[0].url;
        if (cookies.organization === 19 || cookies.organization === "19") {
          if (
            !(
              gameUrl.indexOf("football-quiz") > -1 ||
              gameUrl.indexOf("zanjir") > -1 ||
              gameUrl.indexOf("school-is-cool") > -1 ||
              gameUrl.indexOf("two-cars") > -1 ||
              gameUrl.indexOf("archies-adventures") > -1 ||
              gameUrl.indexOf("cafe-quiz") > -1 ||
              gameUrl.indexOf("numpattern") > -1
            )
          )
            return;
        } else {
          if (
            (gameUrl.indexOf("sudoku") > -1 ||
              gameUrl.indexOf("exblocks") > -1 ||
              gameUrl.indexOf("organize") > -1) &&
            type === "coin"
          )
            return;
        }
        let req = {
          type,
          value,
        };
        postRaiseData(cookies.token, req, cookies.organization).then(async (response: any) => {
          if (response.status === 200) {
            sendNewCoin(response.data, type);
          }
        })
      } else if (data.type === "SEND_VIEW") {
      } else if (data.type === "VICTORY") {
        ///payload win , equal, lose

        if (cookies["game-type"] === "session") {
          setShowSubmitPopup(true);
          setAnimationSubmitPopup(true);
        } else {
          setNormalEnded(true);
        }
      } else if (data.type === "SHOW_AD") {
        if (cookies["game-type"] === "session") {
          const data = {
            game_session_id: cookies["session-game-id"],
            data: {
              game_session_id: cookies["session-game-id"],
              score: CryptoJS.AES.encrypt(
                JSON.stringify(score),
                CryptoJS.enc.Utf8.parse(
                  localStorage
                    .getItem("egk")
                    .substring(localStorage.getItem("egk").length - 16)
                ),
                {
                  iv: CryptoJS.enc.Utf8.parse(iv),
                  mode: CryptoJS.mode.CBC,
                }
              ).toString(),
            },
          }
          postEndGameData(cookies.token, data, cookies.organization).then(async (response: any) => {
            if (response.status === 200) {
              setSessionEndGame(response.data);
            }
          })
        } else {
          let req = {
            organization_id: Number.parseInt(cookies.organization),
            score: CryptoJS.AES.encrypt(
              JSON.stringify(score),
              CryptoJS.enc.Utf8.parse(
                `${iv}${cookies.organization}${cookies["selected-game-id"]}`.substring(
                  `${iv}${cookies.organization}${cookies["selected-game-id"]}`
                    .length - 16
                )
              ),
              {
                iv: CryptoJS.enc.Utf8.parse(iv),
                mode: CryptoJS.mode.CBC,
              }
            ).toString(),
            game_setup_id: selectedGame.id,
          };
          postScoreData(cookies.token, req, cookies.organization).then(async (response: any) => {
            SsetScore(response.data);
          })
        }

        // this.showAdd();
      } else if (data.type === "GAME_HISTORY") {
        let req = {
          text: data.payload.game_history,
        };
        postGameHistoryData(cookies.token, game.id, req, cookies.organization).then(async (response: any) => {});
      }
    } catch (e) {}
  };
  const onMessageApp = (event: any) => {
    const string = event.data;
    const data = JSON.parse(string);
    if (data.type === "ACTION_BACK") {
      router.back();
    }
  };
  const sendNewCoin = (data: any, type: any) => {
    if (type && type === "ruby") {
    } else {
      // this.props.setUserInfo(data)

      const req = {
        type: "NEW_COIN",
        payload: {
          coin: data.coin,
          heart: data.heart,
          golden_key: data.golden_key,
        },
      };
      sendToiframe(req);
    }
  };
  const sendToiframe = (data: any) => {
    if (window.document.getElementById("game-iframe")) {
      window.document
        .getElementById("game-iframe")
        .contentWindow.postMessage(JSON.stringify(data), "*");
    }
  };
  const closeFinishPopUp = () => {
    setShowFinishPopUp(false);
  };
  const playAgain = () => {
    const { game } = selectedGame;
    setShowSessionEnd(false);
    dispatch(updateUserAsync());
    setTimer(game.p1_type_time);
    setScore(0);
    setCorrectAns(0);
    setWrongAns(0);
    setShowIframe(false);
    setIsReady(false);
    setIframeLoadCompleted(false);
    setNormalEnded(false);
    setSessionEnded(false);
    setShowP1PopUp(false);
    setTimeout(() => {
      setShowIframe(true);
      start();
    }, 100);
  };
  const showFeePopUp = (showFeePopUp: any, feePopUpPopUpData: any) => {
    setShowFeePopUp(showFeePopUp);
    setFeePopUpPopUpData(feePopUpPopUpData);
  };
  const calculatePrice = (item: any) => {
    if (
      (item.user_play_count === 1 && userInfo.coin >= item.first_price) ||
      (item.user_play_count === 2 && userInfo.coin >= item.second_price) ||
      (item.user_play_count >= 3 && userInfo.coin >= item.third_price)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const renderVideo = () => {
    return (
      <div className={gameStyle["game-page-video-outer-container-xs"]}>
        <div className={gameStyle["game-page-video-inner-container-xs"]}>
          <div
            className={gameStyle["game-page-video-close-xs"]}
            style={{ visibility: showCloseAd ? "visible" : "hidden" }}
            onClick={() => {
              setShowVideo(false);
              setSessionEnded(true);
              setShowSubmitPopup(false);
            }}
          >
            <Image
              alt="close"
              src="/images/main/close-solid.png"
              height={45}
              width={45}
            />
          </div>

          <video
            id="player-2x"
            className={gameStyle["game-page-video-xs"]}
          ></video>
        </div>
      </div>
    );
  };
  const renderVideoImage = () => {
    return video.banner ? (
      <div className={gameStyle["game-page-ads-outer-container-xs"]}>
        <div className={gameStyle["game-page-ads-inner-container-xs"]}>
          <div
            className={gameStyle["game-page-ads-close-xs"]}
            onClick={() => {
              setShowAdsImage(false);
              setShowSessionEnd(true);
              setShowSubmitPopup(false);
            }}
          >
            <Image
              alt="close"
              src="/images/main/close-solid.png"
              height={45}
              width={45}
            />
          </div>
          <a href={video.link}>
            {" "}
            <div className={gameStyle["game-page-ads-xs"]}>
              {" "}
              <Image src={video.banner} layout="fill" />
            </div>
          </a>
        </div>
      </div>
    ) : (
      <></>
    );
  };
  const renderSessionEndGame = () => {
    if (Object.keys(sessionEndGame).length && Object.keys(leaderboard).length) {
      return (
        <div
          className={gameStyle["game-page-session-end-outer-container-xs"]}
        >
          <AnimatePresence>
            <motion.div
              initial={{ y: 500, opacity: 0 }}
              animate={animationScorePopup ? "visible" : "hidden"}
              variants={list}
              onClick={() => {}}
              className={
                gameStyle["game-page-session-end-inner-container-xs"]
              }
            >
              <div
                className={gameStyle["game-page-session-end-close-xs"]}
                onClick={() => {
                  router.push("/game");
                }}
              >
                <Image
                  width={20}
                  alt="close"
                  src="/images/sessions/close.png"
                  height={20}
                />
              </div>
              <div
                className={
                  gameStyle["game-page-session-end-top-container-xs"]
                }
              >
                <p
                  className={
                    gameStyle["game-page-session-end-top-title-xs"]
                  }
                >
                  پایان بازی
                </p>
              </div>
              <p
                className={
                  gameStyle["game-page-session-end-score-title-xs"]
                }
              >
                امتیاز بازی
              </p>
              <div
                className={
                  gameStyle["game-page-session-end-score-button-xs"]
                }
              >
                {digitsEnToFa(`${score}`)}
              </div>
              <p
                className={
                  gameStyle["game-page-session-end-score-title-xs"]
                }
              >
                رتبه شما در این لیگ
              </p>
              <div
                className={
                  gameStyle["game-page-session-end-score-button-xs"]
                }
              >
                {" "}
                {leaderboard?.profile[0]?.rank
                  ? digitsEnToFa(`${leaderboard.profile[0]?.rank}`)
                  : "-"}
                {/* //FIXME: */}
              </div>
              <p
                className={
                  gameStyle["game-page-session-end-score-title-xs"]
                }
              >
                رتبه در جدول رده بندی              </p>
              <div
                className={
                  gameStyle["game-page-session-end-score-button-xs"]
                }
              >
                {digitsEnToFa(`${rank}`)}
              </div>
              <div
                className={
                  gameStyle["game-page-session-end-score-buttons-xs"]
                }
              >
                {/* <div
                  onClick={() => {
                    axios({
                      method: "get",
                      url: `${sessionsBackendURL}v1/tp_utl/advertisement/?org=${cookies.organization}`,
                      headers: {
                        Authorization: `jwt ${cookies.token}`,
                      },
                    }).then((response) => {
                      if (response.status === 200) {
                        setVideo(response.data);
                      }
                    });
                  }}
                  className={
                    gameStyle["game-page-session-end-replay-button-xs"]
                  }
                >
                  <p
                    className={
                      gameStyle["game-page-session-end-replay-text-xs"]
                    }
                    onClick={() => {}}
                  >
                    تبلیغ ببین!
                  </p>
                  <span>2x</span>
                </div> */}
                <div
                  id={selectedGame.id}
                  onClick={() => {
                    if (
                      userInfo.fair_access ||
                      calculatePrice(sessionEndGame) ||
                      userInfo?.subscription?.subscribed
                    ) {
                      const data = {
                        session_id: sessionEndGame.session_id,
                        game_setup_id: sessionEndGame.game_setup_id,
                      }
                      postStartGameData(cookies.token, data, cookies.organization).then(async (response: any) => {
                        if (response.status === 200) {
                          setCookies(
                            "session-game-id",
                            response.data.game_session_id,
                            { path: "/" }
                          );
                          setCookies("game-type", "session", { path: "/" });
                          localStorage.setItem("egk", response.data.egk);
                          setRandomValue(randomValue + 1);

                          setReaload();
                          playAgain();
                        }
                      })
                    } else {
                      dispatch(
                        pushToast({
                          status: "error",
                          message:
                            "برای بازی مجدد باید اشتراک تهیه کنید",
                        })
                      );
                      setTimeout(() => {
                        // openShopModal();
                        router.push("/game");
                      }, 1000);
                    }
                  }}
                  className={
                    gameStyle["game-page-session-end-replay-button-xs"]
                  }
                >
                  <p
                    className={
                      gameStyle["game-page-session-end-replay-text-xs"]
                    }
                  >
                    شروع بازی دوباره!
                  </p>
                </div>
              </div>
              {/* <div
              className={
                gameStyle["game-page-session-end-replay-cost-container-xs"]
              }
            >
              {calculatePrice(sessionEndGame)}
            </div> */}
            </motion.div>
          </AnimatePresence>
        </div>
      );
    }
  };
  const renderSubmitScore = () => {
    return (
      <div className={gameStyle["game-page-submit-outer-container-xs"]}>
        <AnimatePresence>
          <motion.div
            initial={{ y: 500, opacity: 0 }}
            animate={animationSubmitPopup ? "visible" : "hidden"}
            variants={list}
            onClick={() => {
              setAnimationSubmitPopup(false);
            }}
            className={gameStyle["game-page-submit-inner-container-xs"]}
          >
            <div className={gameStyle["game-page-submit-top-container-xs"]}>
              <p className={gameStyle["game-page-submit-top-title-xs"]}>
                ثبت امتیاز
              </p>
            </div>
            <p className={gameStyle["game-page-submit-score-title-xs"]}>
              امتیاز بازی
            </p>
            <div className={gameStyle["game-page-submit-score-button-xs"]}>
              {digitsEnToFa(`${score}`)}
            </div>
            <div className={gameStyle["game-page-submit-score-buttons-xs"]}>
              <div
                id={"VR52"}
                onClick={() => {
                  getAdvertisementData(cookies.token, cookies.organization).then(async (response: any) => {
                    if (response.status === 200) {
                      if (response.data.can_view) {
                        setShowVideo(true);
                        setVideo(response.data);
                      } else {
                        setSessionEnded(true);
                        setScoreSet(true);

                        setShowSubmitPopup(false);
                        dispatch(
                          pushToast({
                            status: "error",
                            message:
                              "میزان مجاز مشاهده تبلیغ برای شما به اتمام رسیده است",
                          })
                        );
                      }
                    }
                  })
                }}
                className={gameStyle["game-page-submit-replay-button-xs"]}
              >
                <p
                  className={gameStyle["game-page-submit-replay-text-xs"]}
                  onClick={() => {}}
                >
                  تبلیغ ببین!
                </p>
                <span>2x</span>
              </div>
              <div
                onClick={() => {
                  setSessionEnded(true);
                  setScoreSet(true);

                  setShowSubmitPopup(false);
                }}
                className={gameStyle["game-page-submit-replay-button-xs"]}
              >
                <p className={gameStyle["game-page-submit-replay-text-xs"]}>
                  ثبت امتیاز
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };
  const { game, standalone } = selectedGame;
  let webUrl = null;
  let tempUrl = game.channels.filter((item: any) => item.title === "web");
  webUrl =
    (tempUrl[0] ? tempUrl[0].url : "") +
    "?user_id=" +
    game.user_id +
    "&coin=" +
    userInfo.coin +
    "&golden_key=" +
    userInfo.golden_key +
    "&heart=" +
    userInfo.heart;
  let url = !standalone
    ? webUrl
    : webUrl.indexOf("standalone") > -1
    ? webUrl
    : webUrl + "&standalone=true";

  return (
    <div id={"game"} className={gameStyle["game"]}>
      <div
        style={{
          height: standalone
            ? "100%"
            : selectedGame.game.type === "time"
            ? "100%"
            : "100%",
        }}
        className={gameStyle["game__iframe"]}
      >
        {!showIframe && (
          <div className={gameStyle["game-loading-outer-container"]}>
            <div className={gameStyle["game-loading-inner-container"]}></div>
          </div>
        )}
        {showIframe && (
          <iframe
            onLoad={onIframeLoad}
            ref={iframe as any}
            id={"game-iframe"}
            title={"game-iframe"}
            className={gameStyle["game__iframe__iframe"]}
            width="100%"
            height="100%"
            key={randomValue}
            src={url}
          />
        )}
      </div>
      {/* {showFinishPopUp && (
        <div id={"finish-back"} className={"finish__back"}>
          {showFinishPopUp && (
            <FinishPopUp
              high_score={high_score}
              selectedGame={selectedGame}
              score={score}
              gameType={"normal"}
              time={game.p1_type_time}
              wrongAns={wrongAns}
              correctAns={correctAns}
              playAgain={playAgain}
              closeFinishPopUp={closeFinishPopUp}
            />
          )}
        </div>
      )}
      {showP1Popup && selectedGame && (
        <P1PopUp
          playAgain={playAgain}
          score={high_score}
          selectedGame={selectedGame}
          p1info={p1info}
          fromGame={true}
          setSelectedGame={setSelectedGame}
          showPopUp={setShowP1PopUp}
          setScore={setScore}
          showNoResourcesPopup={showNoResourcesPopup}
        />
      )}
      {showFeePopup && (
        <FeePopUp
          selectedGame={selectedGame}
          feePopUpPopUpData={feePopUpPopUpData}
          showPopUp={showFeePopUp}
          sendToiframe={sendToiframe}
        />
      )} */}
      {showSessionEnd && renderSessionEndGame()}
      {Object.keys(video).length && showVideo ? renderVideo() : <></>}
      {showAdsImage && renderVideoImage()}
      {showSubmitPopup && renderSubmitScore()}
      {showShopList && (
        <ShopModal
          user={userInfo}
          setShowShopList={setShowShopList}
          isShopModal={false}
          buySku={buySku}
          shopList={shopList}
          setVideoType={setVideoType}
          setVideo={setVideo}
          setShowVideo={setShowVideo}
          styles={undefined}
          setShowGameStartModal={undefined as any}
          showGameStartModal={undefined}
          setShowGuestPopup={undefined as any}
        />
      )}
    </div>
  );
};

export default IframeGame;
