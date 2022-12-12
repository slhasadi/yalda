import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { sessionsBackendURL } from "../../../../../globals";
import {
  Session,
  SessionGame,
  SessionRoot,
  UserInfo,
} from "../../interfaces/interfaces";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { updateUserAsync } from "../../../../../slices/userSlice";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import styles from "../../styles/GamePage.module.scss";
import React from "react";
import { getSkuListData, postInfoData, postStartGameData } from "networks/sessionns";
import { shopList } from "slices/shopModal";

type props = {
  setPlayGameAnimation: (value: boolean) => void;
  setShowGameStartModal: (show: any) => void;
  showGameStartModal: any;
  sessionList: SessionRoot;
  user: UserInfo;
  setGameSetup: (setup: SessionGame) => void;
  openShopModal: () => void;
  setIsShopModal: (value: boolean) => void;
  setShopList: (list: any[]) => void;
  setShowGuestPopup: (value: boolean) => void;
  setShopAnimation: (value: boolean) => void;
  setShowShopList: (value: boolean) => void;
};
const GameStartModal = ({
  setPlayGameAnimation,
  setShowGameStartModal,
  showGameStartModal,
  sessionList,
  user,
  setGameSetup,
  openShopModal,
  setIsShopModal,
  setShopList,
  setShowGuestPopup,
  setShopAnimation,
  setShowShopList,
}: props) => {
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const [cookies, setCookies] = useCookies([
    "game-type",
    "selected-game-id",
    "session-game-id",
    "session-id",
    "token",
    "organization",
    "sessionId",
    "parrent_session-id",
  ]);

  const startGame = (activeSession: Session) => {
    let data = {
      session_id: activeSession.id,
      game_setup_id: showGameStartModal.game_setup_id,
    };
      postStartGameData(cookies.token, data, cookies.organization).then(async (response: any) => {
        if (response.status === 200) {
          setShowGameStartModal(null);
          document.getElementsByTagName("body")[0].style.overflow = "visible";

          setCookies("session-game-id", response.data.game_session_id, {
            path: "/",
          });
          setCookies("game-type", "session", {
            path: "/",
          });
          setCookies("parrent_session-id", sessionList.id);
          setCookies("session-id", activeSession.id);
          setCookies("selected-game-id", showGameStartModal.game_setup_id, {
            path: "/",
          });

          // setCookies("sessionId", activeSession.);
          localStorage.setItem("egk", response.data.egk);
          router.push(`/sessionplay/${showGameStartModal.game.title}`);
          document.getElementsByTagName("body")[0].style.overflow = "visible";
        }
        else if(response.status === 403){
          setGameSetup(showGameStartModal);
          setIsShopModal(false);
          openShopModal();
        }
    })
    .catch((error) => {
      if(error === "login"){
        setShowGameStartModal(false);
        setShowGuestPopup(true);
      }
      else if (error === "forbidden") {
        setGameSetup(showGameStartModal);
        setIsShopModal(false);
        openShopModal();
      }
    })
  };
  const handleStartGame = () => {
    let activeSession = sessionList.sessions?.filter(
      (item: any) => item.is_for_today === true && item.is_active
    )[0];
    let price = showGameStartModal.first_price;
    let data ={
      game_setup_id: showGameStartModal.game_setup_id,
    };
    if (showGameStartModal.user_play_count === 0) {
      price = 0;
    } else if (showGameStartModal.user_play_count === 1) {
      price = showGameStartModal.second_price;
    } else if (showGameStartModal.user_play_count === 2) {
      price = showGameStartModal.third_price;
    }
    if (!user) {
      setShowGameStartModal(null);
      setShowGuestPopup(true);
      document.getElementsByTagName("body")[0].style.overflow = "visible";
    }
    else if (!user?.is_guest) {
      if (user?.subscription?.subscribed) {
        postInfoData(cookies.token, data, cookies.organization).then(async (response: any) => {
          if (response.status === 200) {
            dispatch(updateUserAsync());
            startGame(activeSession);
          }
        })
      }else{
        if (user?.coin >= price) {
          postInfoData(cookies.token, data, cookies.organization).then(async (response: any) => {
            if (response.status === 200) {
              dispatch(updateUserAsync());
              startGame(activeSession);
            }
          })
        } else {
          setGameSetup(showGameStartModal);
          getSkuListData(cookies.token, cookies.organization).then(async (response: any) => {
            setShowGameStartModal(null);
            document.getElementsByTagName("body")[0].style.overflow = "visible";
            dispatch(shopList());
            setShopList(response.data);
            setShowShopList(true);
            setShopAnimation(true);
        })
      }
      }
    }
  };
  return (
    <div className={styles["main-page-start-modal-outer-container-xs"]}>
      <AnimatePresence>
        <motion.div
          key="modal"
          initial={{ y: 500, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -500, opacity: 0 }}
          className={styles["main-page-start-modal-inner-container-xs"]}
        >
          <div className={styles["main-page-start-modal-top-container-xs"]}>
            <div
              onClick={() => {
                setShowGameStartModal(null);
                document.getElementsByTagName("body")[0].style.overflow =
                  "visible";
              }}
              className={styles["main-page-start-modal-top-close-xs"]}
            >
              <Image
                alt="close"
                height={16}
                width={16}
                src="/images/sessions/close.png"
                priority={true}
              />
            </div>
            <p className={styles["main-page-start-modal-top-title-xs"]}>
              {showGameStartModal.game.title}
            </p>
          </div>
          <div className={styles["main-page-start-modal-top-image-xs"]}>
            <Image
              layout="fill"
              src={`${sessionsBackendURL}${showGameStartModal.game.image.slice(1)}`}
              alt={showGameStartModal.game.title}
              objectFit="cover"
              objectPosition={"center"}
            />
            <div
              id={showGameStartModal.game_setup_id}
              onClick={() => {
                handleStartGame();
                document.getElementsByTagName("body")[0].style.overflow ="visible";
              }}
              className={styles["main-page-start-modal-top-play-container-xs"]}
            >
              <div className={styles["main-page-start-modal-top-play-xs"]}>
                <Image
                  height={30}
                  width={30}
                  alt="play session game"
                  src={"/images/sessions/play.svg"}
                />
              </div>
            </div>
          </div>
          <div className={styles["main-page-start-modal-bottom-container-xs"]}>
            <b className={styles["main-page-start-modal-bottom-title-xs"]}>
              {"شروع بازی"}
            </b>
            <p className={styles["main-page-start-modal-bottom-text-xs"]}>
              اولین دفعه بازی
            </p>
            <p className={styles["main-page-start-modal-bottom-sub-text-xs"]}>
              {digitsEnToFa(
                `به ${showGameStartModal.first_price} سکه نیاز داری`
              )}
            </p>
            <p className={styles["main-page-start-modal-bottom-text-xs"]}>
              دومین دفعه بازی
            </p>
            <p className={styles["main-page-start-modal-bottom-sub-text-xs"]}>
              {digitsEnToFa(
                ` به ${showGameStartModal.second_price} سکه نیاز داری`
              )}
            </p>
            <p className={styles["main-page-start-modal-bottom-text-xs"]}>
              سومین دفعه بازی
            </p>
            <p className={styles["main-page-start-modal-bottom-sub-text-xs"]}>
              {digitsEnToFa(
                ` به ${showGameStartModal.third_price} سکه نیاز داری`
              )}
            </p>
            <p className={styles["main-page-start-modal-bottom-text-vip-xs"]}>
              کاربران VIP
            </p>
            <p
              className={styles["main-page-start-modal-bottom-sub-text-vip-xs"]}
            >
              بازی برای کاربران VIP رایگان است
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default React.memo(GameStartModal);
