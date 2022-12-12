import dynamic from "next/dynamic";
import React, { useEffect, useState, useRef } from "react";
import Plyr from "plyr";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAsync } from "../../../slices/userSlice";
import styles from "./styles/GamePage.module.scss";
import {
  UserInfo,
  Banner2,
  BonusList,
  CategoryList,
  WheelLocked,
  Leaderboard,
  WheelPopup,
  WheelGift,
  Game,
  Video,
  ShareData,
  SessionRoot,
  Winner,
  SessionGame,
  Session,
  SkuShop,
} from "./interfaces/interfaces";
import {
  getSessionLeaderBoardData,
  getSessionWinnersData,
  getSkuListData,
  postAdsSeenData,
} from "../../../networks/sessionns";
import BannerAds from "components/commons/BannerAds";
import { RootState } from "store";
import Modal from "components/commons/Modal/Modal";
const Sessions = dynamic(() => import("./commons/sections/sessions"), {});
const Wheel = dynamic(() => import("./commons/sections/wheel"), {});
const Banner = dynamic(() => import("./commons/sections/banner"), {});
const Leaderboard = dynamic(() => import("./commons/sections/leaderboard"), {});
const Prize = dynamic(() => import("./commons/sections/prizes"));
const Dashborad = dynamic(() => import("./commons/sections/dashboard"));
const Top = dynamic(() => import("./commons/sections/top"), {});
const Rule = dynamic(() => import("./commons/popups/ruleModal"), {});
const ShopModal = dynamic(() => import("./commons/popups/shopModal"), {});
const GameStartModal = dynamic(
  () => import("./commons/popups/gameStartModal"),
  {}
);
const PaymentModal = dynamic(() => import("./commons/popups/PayModal"), {});
const LeaderBoardModal = dynamic(
  () => import("./commons/popups/leaderBoardModal"),
  {}
);
const GameRuleModal = dynamic(
  () => import("./commons/popups/gameRulePopup"),
  {}
);
const PrizeModal = dynamic(() => import("./commons/popups/prizeModal"), {});
const AdsModal = dynamic(() => import("./commons/popups/adsModal"), {});
const ImageAdsModal = dynamic(
  () => import("./commons/popups/adsImageModal"),
  {}
);
const WheelModal = dynamic(() => import("./commons/popups/wheelModal"), {});
const WheelLockedModal = dynamic(
  () => import("./commons/popups/wheelLockedModal"),
  {}
);
const WheelBrokeModal = dynamic(
  () => import("./commons/popups/wheelBrokeModal"),
  {}
);
type props = {
  banners: Banner2[] | any;
  feedList: CategoryList[];
  categories: CategoryList[];
  width: number;
  setWidth: (width: number) => void;
  sessionList: SessionRoot;
  wheelPopup: WheelPopup | any;
  setWheelPopup: (wheelPopup: WheelPopup) => void;
  wheelGift: WheelGift;
  setWheelGift: (wheelGift: WheelGift) => void;
  leaderboard: Leaderboard;
  sessionParentLeaderboard: any;
  showParentLeaderboard: any;
  setShowParentLeaderboard: (showParentLeaderboard: any) => void;
  gameRulePopup: Game;
  setGameRulePopup: (gameRulePopup: Game) => void;
  sessionLeaderboard: any;
  setSessionLeaderboard: (sessionLeaderboard: any) => void;
  showTreasureModal: boolean;
  setShowTreasureModal: (showTreasureModal: boolean) => void;
  video: Video;
  setVideo: (video: Video) => void;
  duration: number;
  setDuration: (duration: number) => void;
  showGuestPopup: boolean;
  setShowGuestPopup: (showGuestPopup: boolean) => void;
  org_id: any;
  wheelLight: boolean;
  wheelWait: WheelLocked;
  setWheelWait: (wheelWait: WheelLocked) => void;
  user: UserInfo;
  giftCode: string;
  setGiftCode: (giftCode: string) => void;
  showShareModal: boolean;
  setShowShareModal: (showShareModal: boolean) => void;
  bonus: BonusList;
  setBonus: (bonus: BonusList) => void;
  shareData: ShareData;
  setShareData: (shareData: ShareData) => void;
  showCloseAd: boolean;
  showGameStartModal: any;
  setShowGameStartModal: (show: any) => void;
  setShowShopList: (showShopList: boolean) => void;
  showShopList: boolean;
  shopList: any[];
  setShopList: (shopList: any[]) => void;
  shopAnimation: boolean;
  setShopAnimation: (shopAnimation: boolean) => void;
  playGameAnimation: boolean;
  setPlayGameAnimation: (playGameAnimation: boolean) => void;
  gameRuleAnimation: boolean;
  setGameRuleAnimation: (gameRuleAnimation: boolean) => void;
  showWinnersPopup: boolean;
  setShowWinnersPopup: (showWinnersPopup: boolean) => void;
  winnersAnimation: boolean;
  setWinnersAnimation: (winnersAnimation: boolean) => void;
  showDayLeaderboardPopup: Session;
  setDayLeaderboardPopup: (showDayLeaderboardPopup: Session) => void;
  dayLeaderboardAnimation: boolean;
  setDayLeaderboardAnimation: (dayLeaderboardAnimation: boolean) => void;
  videoType: string;
  setVideoType: (videoType: string) => void;
  ruleAnimation: boolean;
  setRuleAnimation: (ruleAnimation: boolean) => void;
  showLoadeing: boolean;
  setShowLoadeing: (showLoadeing: boolean) => void;
  SetWheelTimer: (showLoadeing: string) => void;
  wheelTimer: string;
  buySku: (item: SkuShop) => void;
  isLoading: boolean;
  paymentMessage: string | null;
  setPaymentMessage: (paymentMessage: string | null) => void;
};
var player: Plyr;
const GamePage = ({
  showGameStartModal,
  setShowGameStartModal,
  banners,
  sessionList,
  wheelPopup,
  setWheelPopup,
  wheelLight,
  wheelGift,
  setWheelGift,
  wheelWait,
  setWheelWait,
  sessionParentLeaderboard,
  gameRulePopup,
  setGameRulePopup,
  showCloseAd,
  paymentMessage,
  setPaymentMessage,
  setPlayGameAnimation,
  video,
  setVideo,
  setDuration,
  showGuestPopup,
  setShowGuestPopup,
  showShopList,
  shopList,
  setShopList,
  setShowShopList,
  setShopAnimation,
  setGameRuleAnimation,
  showWinnersPopup,
  setShowWinnersPopup,
  setWinnersAnimation,
  showDayLeaderboardPopup,
  setDayLeaderboardPopup,
  setDayLeaderboardAnimation,
  videoType,
  setVideoType,
  showLoadeing,
  setShowLoadeing,
  user,
  buySku,
  isLoading,
}: props) => {
  const dispatch = useDispatch<any>();

  const [remaingTime, setRemainingTime] = useState("");
  const [sessionLbd, setSessionLbd] = useState<Leaderboard | null>(null);
  const [gameSetup, setGameSetup] = useState<SessionGame>();
  const [isShopModal, setIsShopModal] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showAdsImage, setShowAdsImage] = useState(false);
  const [winners, setWinners] = useState<Session>({} as Session);
  const [sessionWinners, setSessionWinners] = useState<Winner[]>(
    {} as Winner[]
  );
  // wheel consts
  const [showWheelPopup, setShowWheelPopup] = useState(false);
  const [wheelBrokeAnimation, setWheelBrokeAnimation] = useState(true);
  const [showBrokePopup, setShowBrokePopup] = useState(false);
  const [wheelPopupAnimation, setWheelPopupAnimation] = useState(true);
  const [wheelWaitAnimation, setWheelWaitAnimation] = useState(true);
  const [rules, setRules] = useState<string | null>(null);
  const [rulesPopup, setRulesPopup] = useState<boolean>(false);

  // -------------refs
  const playRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const wheel = useRef<any>(null);
  const wheelButtonRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const userRank = 0;
  const shopLists = useSelector((state: RootState) => state.shop.ShopList);
  const [cookies, setCookies] = useCookies([
    "game-type",
    "selected-game-id",
    "session-game-id",
    "session-id",
    "token",
    "organization",
    "sessionId",
    "parrent_session-id",
    "game_modal",
  ]);
  const pagesData = useSelector((state: RootState) => state.pages.list);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const getSessionInfo = (id: number) => {
    getSessionLeaderBoardData(
      cookies.token,
      id as any,
      cookies.organization
    ).then(async (response: any) => {
      setSessionLbd(response.data);
      setShowLoadeing(false);
    });
  };
  useEffect(() => {
    if (!cookies.game_modal && rules) {
      setIsOpenModal(true);
      setCookies("game_modal", "true");
    }
  }, [rules]);

  useEffect(() => {
    setTimeout(() => setRemainingTime(getRemainigTime() as any), 60000);
  }, [remaingTime, sessionList]);

  useEffect(() => {
    setRemainingTime(getRemainigTime() as any);
  }, [sessionList]);
  const openShopModal = () => {
    getSkuListData(cookies.token, cookies.organization).then(
      async (response: any) => {
        setShowGameStartModal(null);
        document.getElementsByTagName("body")[0].style.overflow = "visible";
        setShopList(response.data.reverse());
        setShowShopList(true);
      }
    );
  };
  const getSessionWinners = (id: number) => {
    getSessionWinnersData(cookies.token, id, cookies.organization).then(
      async (response: any) => {
        setSessionWinners(response.data);
        setShowWinnersPopup(true);
        setWinnersAnimation(true);
      }
    );
  };
  useEffect(() => {
    if (showVideo) {
      let playerClass = "#player-sm";
      if (window.innerWidth >= 768) {
        playerClass = "#player-xl";
      } else if (window.innerWidth <= 480) {
        playerClass = "#player-xs";
      }
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
        if (videoType === "begin-game") {
          postAdsSeenData(cookies.token, cookies.organization).then(
            async (response: any) => {
              setShowVideo(false);
              setShowAdsImage(true);
            }
          );
        } else if (videoType === "end-game") {
          setWheelGift({
            amount: 20,
            item_type: "ژتون",
            item_name: "",
            description: "",
            popup_image: "",
            wheel_win_item: undefined,
          });
          dispatch(updateUserAsync());
          setVideoType("");
          setShowGameStartModal(null);
        }
      });
      player.on("playing", () => {
        setDuration(player.duration);
      });
    }
  }, [showVideo, video]);
  function getRemainigTime() {
    if (sessionList) {
      let activeSession = sessionList.sessions?.filter(
        (item: any) => item.is_for_today === true && item.is_active
      )[0];
      let mili = Date.parse(activeSession?.end_datetime) - new Date().getTime();

      let ms = mili % 1000;
      mili = (mili - ms) / 1000;
      let secs = mili % 60;
      mili = (mili - secs) / 60;
      let mins = mili % 60;
      let hrs = (mili - mins) / 60;
      return secs >= 0
        ? hrs.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          }) +
            ":" +
            mins.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            }) +
            ":" +
            "00"
        : // secs.toLocaleString("en-US", {
          //   minimumIntegerDigits: 2,
          //   useGrouping: false,
          // })
          "00:00:00";
    }
  }
  const calculateTime = (datetime: string) => {
    let time = datetime.split("T")[1];
    let hour = time.split(":")[0];
    let minute = time.split(":")[1];
    return `${hour}:${minute}`;
  };
  const calculatePriceType = (type: string) => {
    if (type === "coin") {
      return (
        <img
          src="/images/sessions/coin.svg"
          className={
            styles["main-page-session-list-item-game-data-text-cost-icon-xs"]
          }
          alt="coin"
        />
      );
    }
    if (type === "heart") {
      return (
        <img
          src="/images/sessions/heart.svg"
          className={
            styles["main-page-session-list-item-game-data-text-cost-icon-xs"]
          }
          alt="heart"
        />
      );
    }
    if (type === "golden_key") {
      return (
        <img
          src="/images/sessions/key.svg"
          className={
            styles["main-page-session-list-item-game-data-text-cost-icon-xs"]
          }
          alt="key"
        />
      );
    }
  };
  const calculatePrice = (item: any) => {
    if (user?.fair_access)
      if (item.user_play_count === 0) {
        return (
          <></>
          // <p
          //   className={
          //     styles["main-page-session-list-item-game-data-text-cost-xs"]
          //   }
          // >
          //   رایگان
          // </p>
        );
      }
    if (item.user_play_count === 1) {
      if (item.first_price) {
        return (
          <>
            {/* {calculatePriceType(item.price_type)}
            <p
              className={
                styles["main-page-session-list-item-game-data-text-cost-xs"]
              }
            >
              {digitsEnToFa(`${item.first_price}`)}
            </p> */}
          </>
        );
      } else {
        return (
          <></>
          // <p
          //   className={
          //     styles["main-page-session-list-item-game-data-text-cost-xs"]
          //   }
          // >
          //   رایگان
          // </p>
        );
      }
    }
    if (item.user_play_count === 2) {
      if (item.second_price) {
        return (
          <>
            {/* {calculatePriceType(item.price_type)}
            <p
              className={
                styles["main-page-session-list-item-game-data-text-cost-xs"]
              }
            >
              {digitsEnToFa(`${item.second_price}`)}
            </p> */}
          </>
        );
      } else {
        return (
          <></>
          // <p
          //   className={
          //     styles["main-page-session-list-item-game-data-text-cost-xs"]
          //   }
          // >
          //   رایگان
          // </p>
        );
      }
    }
    if (item.user_play_count >= 3) {
      if (item.third_price) {
        return (
          <>
            {/* {calculatePriceType(item.price_type)}
            <p
              className={
                styles["main-page-session-list-item-game-data-text-cost-xs"]
              }
            >
              {digitsEnToFa(`${item.third_price}`)}
            </p> */}
          </>
        );
      } else {
        return (
          <></>
          // <p
          //   className={
          //     styles["main-page-session-list-item-game-data-text-cost-xs"]
          //   }
          // >
          //   رایگان
          // </p>
        );
      }
    }
  };
  const calculatePriceFairAccess = () => {
    return (
      <></>
      // <p
      //   className={styles["main-page-session-list-item-game-data-text-cost-xs"]}
      // >
      //   رایگان
      // </p>
    );
  };
  const OfHiddenBody = () => {
    return (document.getElementsByTagName("body")[0].style.overflow = "hidden");
  };
  return (
    <>
      {!isLoading && (
        <main className={styles["main-page-outer-container-xs"]}>
          <div className={styles["main-page-inner-container-xs"]}>
            <div
              ref={playRef}
              className={styles["main-page-session-list-parent-container-xs"]}
            >
              <Top
                styles={styles}
                setRules={setRules}
                setRulesPopup={setRulesPopup}
                organization={cookies.organization}
                token={cookies.token}
              />
              {sessionList?.sessions?.length > 0 && (
                <Sessions
                  styles={styles}
                  setPlayGameAnimation={setPlayGameAnimation}
                  setShowGameStartModal={setShowGameStartModal}
                  sessionList={sessionList}
                  user={user}
                  getSessionWinners={getSessionWinners}
                  getSessionInfo={getSessionInfo}
                  setDayLeaderboardAnimation={setDayLeaderboardAnimation}
                  setDayLeaderboardPopup={setDayLeaderboardPopup}
                  calculateTime={calculateTime}
                  calculatePrice={calculatePrice}
                  remaingTime={remaingTime}
                  calculatePriceFairAccess={calculatePriceFairAccess}
                  setGameRulePopup={setGameRulePopup}
                  setGameRuleAnimation={setGameRuleAnimation}
                  setWinners={setWinners}
                />
              )}
            </div>
            <div className="w-full text-center">
              {/* <BannerAds parentClass="mx-auto aspect-[3.88/1] max-w-[970px]"> */}
                <div id="mediaad-MGAE1" className="h-full">
                </div>
              {/* </BannerAds> */}
            </div>
            <div
              ref={wheelRef}
              className={styles["main-page-wheel-section-xs"]}
            >
              <Wheel
                styles={styles}
                wheelPopup={wheelPopup}
                user={user}
                setWheelPopup={setWheelPopup}
                setShowGuestPopup={setShowGuestPopup}
                setWheelGift={setWheelGift}
                setWheelWait={setWheelWait}
                setShowBrokePopup={setShowBrokePopup}
                wheel={wheel}
                wheelButtonRef={wheelButtonRef}
              />
            </div>
            <Prize styles={styles} sessionList={sessionList} />
            <div className={styles["main-page-dashboard-leader-parent-xs"]}>
              {sessionParentLeaderboard &&
                Object.keys(sessionParentLeaderboard)?.length && (
                  <Dashborad
                    styles={styles}
                    dashboardRef={dashboardRef}
                    playRef={playRef}
                    wheelRef={wheelRef}
                    user={user}
                    sessionParentLeaderboard={sessionParentLeaderboard}
                  />
                )}
              {Object.keys(sessionParentLeaderboard).length && (
                <Leaderboard
                  styles={styles}
                  token={cookies.token}
                  sessionParentLeaderboard={sessionParentLeaderboard}
                />
              )}
            </div>
          </div>
          {Object.keys(video).length > 0 && showVideo && (
            <AdsModal
              styles={styles}
              setShowVideo={setShowVideo}
              showCloseAd={showCloseAd}
            />
          )}
          {showAdsImage && (
            <ImageAdsModal
              styles={styles}
              sessionList={sessionList}
              gameSetup={gameSetup}
              setShowGameStartModal={setShowGameStartModal}
              video={video}
              setShowAdsImage={setShowAdsImage}
              setVideoType={setVideoType}
            />
          )}
          {Object.keys(gameRulePopup).length > 0 && (
            <GameRuleModal
              styles={styles}
              gameRulePopup={gameRulePopup}
              setGameRulePopup={setGameRulePopup}
            />
          )}
          {showGameStartModal && (
            <GameStartModal
              setPlayGameAnimation={setPlayGameAnimation}
              setShowGameStartModal={setShowGameStartModal}
              showGameStartModal={showGameStartModal}
              sessionList={sessionList}
              user={user}
              setGameSetup={setGameSetup}
              openShopModal={openShopModal}
              setIsShopModal={setIsShopModal}
              setShopList={setShopList}
              setShowGuestPopup={setShowGuestPopup}
              setShopAnimation={setShopAnimation}
              setShowShopList={setShowShopList}
            />
          )}
          <Modal
              open={isOpenModal}
              setOpen={setIsOpenModal}
              title={pagesData[0]?.popup?.title}
          >
              <p
              className="mb-2 text-[14px]"
              dangerouslySetInnerHTML={{
                  __html: pagesData[0]?.popup?.description,
              }}
              ></p>
          </Modal>
          {/* {shopLists.length > 0 && (
            <ShopModal
              styles={styles}
              setShowGuestPopup={setShowGuestPopup}
              user={user}
              setShowShopList={setShowShopList}
              setShowGameStartModal={setShowGameStartModal}
              isShopModal={isShopModal}
              buySku={buySku}
              shopLists={shopLists}
              showGameStartModal={showGameStartModal}
              setVideoType={setVideoType}
              setVideo={setVideo}
              setShowVideo={setShowVideo}
            />
          )} */}
          {showWinnersPopup && (
            <PrizeModal
              styles={styles}
              setWinners={setWinners}
              setShowWinnersPopup={setShowWinnersPopup}
              sessionWinners={sessionWinners}
              winners={winners}
            />
          )}
          {Object.keys(showDayLeaderboardPopup).length > 0 && (
            <LeaderBoardModal
              styles={styles}
              setSessionLbd={setSessionLbd}
              setDayLeaderboardPopup={setDayLeaderboardPopup}
              showLoadeing={showLoadeing}
              showDayLeaderboardPopup={showDayLeaderboardPopup}
              userRank={userRank}
              sessionLbd={sessionLbd}
            />
          )}
          {paymentMessage && paymentMessage?.length > 0 && (
            <PaymentModal
              styles={styles}
              paymentMessage={paymentMessage}
              setPaymentMessage={setPaymentMessage}
            />
          )}
          {rulesPopup && (
            <Rule
              styles={styles}
              setRules={setRules}
              rules={rules}
              setRulesPopup={setRulesPopup}
            />
          )}
          {Object.keys(wheelGift).length > 0 && (
            <WheelModal
              styles={styles}
              popupRef={popupRef}
              wheel={wheel}
              token={cookies.token}
              organization={cookies.organization}
              wheelPopup={wheelPopup}
              wheelGift={wheelGift}
              setWheelWait={setWheelWait}
              setWheelGift={setWheelGift}
              setWheelPopupAnimation={setWheelPopupAnimation}
              setShowBrokePopup={setShowBrokePopup}
              setWheelBrokeAnimation={setWheelBrokeAnimation}
              setWheelWaitAnimation={setWheelWaitAnimation}
            />
          )}
          {Object.keys(wheelWait).length > 0 && (
            <WheelLockedModal
              styles={styles}
              popupRef={popupRef}
              wheel={wheel}
              token={cookies.token}
              organization={cookies.organization}
              wheelPopup={wheelPopup}
              wheelWait={wheelWait}
              remaingTime={remaingTime}
              user={user}
              setWheelWait={setWheelWait}
              setWheelGift={setWheelGift}
              setWheelPopupAnimation={setWheelPopupAnimation}
              setShowBrokePopup={setShowBrokePopup}
              setWheelBrokeAnimation={setWheelBrokeAnimation}
              setWheelWaitAnimation={setWheelWaitAnimation}
            />
          )}
          {showBrokePopup && (
            <WheelBrokeModal
              styles={styles}
              openShopModal={openShopModal}
              setShowBrokePopup={setShowBrokePopup}
              setIsShopModal={setIsShopModal}
            />
          )}
          {rulesPopup && OfHiddenBody()}
          {Object.keys(wheelGift).length > 0 && OfHiddenBody()}
          {Object.keys(wheelWait).length > 0 && OfHiddenBody()}
          {Object.keys(showDayLeaderboardPopup).length > 0 && OfHiddenBody()}
          {showWinnersPopup && OfHiddenBody()}
          {showShopList && OfHiddenBody()}
          {showGameStartModal && OfHiddenBody()}
          {showGuestPopup && OfHiddenBody()}
        </main>
      )}
    </>
  );
};
export default GamePage;
