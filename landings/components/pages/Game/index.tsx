import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { setUserInfo } from "../../../slices/userSlice";
import { RootState } from "../../../store";
import styles from "./styles/GamePage.module.scss";
import {
  Banner2,
  CategoryList,
  WheelLocked,
  BonusList,
  Leaderboard,
  WheelPopup,
  WheelGift,
  Video,
  Game,
  ShareData,
  SessionRoot,
  Session,
  SkuShop,
  PaySku,
  UserInfo,
} from "./interfaces/interfaces";
import { useSelector } from "react-redux";
import Container from "../../commons/Container";
import GuestModal from "./commons/popups/guestModal";
import { getBannerData, getParentSessionData, getParentSessionLdbData, getSessionLdbData, getUserInfoApiData, getWheelData, postPayData } from "networks/sessionns";
const Game = dynamic(() => import("./game"),{ ssr: false });
const SessionPage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [leaderboard, setLeaderboard] = useState<Leaderboard>(
    {} as Leaderboard
  );
  const router = useRouter();
  const [cookies, setCookies] = useCookies([
    "organization",
    "token",
    "pToken",
    "parent_session",
  ]);
  const [showGameStartModal, setShowGameStartModal] = useState<any>(null);
  const [banners, setBanners] = useState<Banner2[] | null>(null);
  const [width, setWidth] = useState<number>(530);
  const [categories, setCategories] = useState<CategoryList[]>([] as CategoryList[]);
  const [feedList, setFeedList] = useState<CategoryList[]>([] as CategoryList[]);
  const [showShopList, setShowShopList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shopList, setShopList] = useState<any[]>({} as any);
  const [sessionParentLeaderboard, setSessionParentLeaderboard] = useState({});
  const [showParentLeaderboard, setShowParentLeaderboard] = useState(false);
  const [sessionLeaderboard, setSessionLeaderboard] = useState({});
  const [wheelPopup, setWheelPopup] = useState<WheelPopup | null>(null);
  const [ruleAnimation, setRuleAnimation] = useState(true);
  const [wheelLight, setWheelLight] = useState(true);
  const [wheelGift, setWheelGift] = useState<WheelGift>({} as WheelGift);
  const [wheelWait, setWheelWait] = useState<WheelLocked>({} as WheelLocked);
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [gameRulePopup, setGameRulePopup] = useState<Game>({} as Game);
  const [showTreasureModal, setShowTreasureModal] = useState(false);
  const [giftCode, setGiftCode] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareData, setShareData] = useState<ShareData>({} as ShareData);
  const [bonus, setBonus] = useState<BonusList>({} as BonusList);
  const [video, setVideo] = useState<Video>({} as Video);
  const [showCloseAd, setShowCloseAd] = useState(false);
  const [showWinnersPopup, setShowWinnersPopup] = useState(false);
  const [showLoadeing, setShowLoading] = useState(true);
  const [winnersAnimation, setWinnersAnimation] = useState(true);
  const [showDayLeaderboardPopup, setDayLeaderboardPopup] = useState({} as Session);
  const [dayLeaderboardAnimation, setDayLeaderboardAnimation] = useState(true);
  const [shopAnimation, setShopAnimation] = useState(true);
  const [playGameAnimation, setPlayGameAnimation] = useState(true);
  const [gameRuleAnimation, setGameRuleAnimation] = useState(true);
  const [videoType, setVideoType] = useState("");
  const [duration, setDuration] = useState(0);
  const [wheelTimer, SetWheelTimer] = useState("00:00:00");
  const [hasUrlParam, setHasurlParam] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<string | null>("");
  const [isLoading, setIsLoadings] = useState(false);
  const [sessionList, setSessionList] = useState<SessionRoot>({} as SessionRoot);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(video)?.length) {
      setShowCloseAd(false);
    }
  }, [video]);
  const getPayUrl = (data: PaySku, item: SkuShop) => {
    const { detail, token, platform_token } = data;
    if (detail === "succeed") {
      window.location.href = platform_token;
    }
  };
  const buySku = (item: SkuShop) => {
    let req = {
      sku_id: item.id,
      gateway: "sadad",
    };
    postPayData(cookies.token, req, cookies.organization).then(async (response: any) => {
      getPayUrl(response.data, item);
    });
  };
  var repeat = 0;
  var checkSum = 0;
  var user_info: UserInfo | undefined;
  var session_size = 0;
  const setIsLoading = (flag: boolean) => {
    if (isLoading) {
      setIsLoadings(flag);
    }
  };
  const checkLoading = () => {
    checkSum++;
    if (user_info?.bzg_username != "" && checkSum > 2 && session_size > 0) {
      dispatch(setUserInfo(user_info));

      setIsLoading(false);
    }
  };
  useEffect(() => {
    let token = cookies.token;
    getUserInfoApi(token);
    let headers = {}
    if(token){
     headers= {Authorization: `jwt ${token}`}
    }
      if (sessionList?.id) {
        getSessionLBDApi(headers, cookies.organization);
      }
      getBannersApi(cookies.organization);
      getParentSessionsApi(headers, cookies.organization);
      getWheelApi(headers, cookies.organization);
    if (router.query?.paymentMessage) {
      setPaymentMessage(router.query.paymentMessage as string);
    }
  }, [cookies.organization]);
  const getUserInfoApi = (token: any) => {
    if (cookies.token) {
      getUserInfoApiData(cookies.token, cookies.organization).then(async (response: any) => {
        if (response.status == 200) {
          user_info = response.data;
          checkLoading();
        } else if (repeat < 15) {
          repeat++;
          getUserInfoApi(token);
        } else {
          setIsLoading(false);
        }
      }).catch((err) => {
        if (repeat < 15) {
          repeat++;
          getUserInfoApi(token);
        } else {
          setIsLoading(false);
        }
      })
    }
  };
  const getSessionLBDApi = (headers: any, org: any) => {
    getSessionLdbData(cookies.token, sessionList?.id, org).then(async (response: any) => {
      if (response.status === 200) {
        setLeaderboard(response.data);
        checkLoading();
      } else if (repeat < 15) {
        repeat++;
        getSessionLBDApi(headers, org);
      } else {
        setIsLoading(false);
      }
    }).catch((err) => {
      if (repeat < 15) {
        repeat++;
        getSessionLBDApi(headers, org);
      } else {
        setIsLoading(false);
      }
    })
  };
  const getBannersApi = (org: any) => {
    getBannerData(cookies.token, org).then(async (response: any) => {
      if (response.status == 200) {
        setBanners(response.data);
        checkLoading();
      } else if (repeat < 15) {
        repeat++;
        getBannersApi(org);
      } else {
        setIsLoading(false);
      }
    }).catch((err) => {
      if (repeat < 15) {
        repeat++;
        getBannersApi(org);
      } else {
        setIsLoading(false);
      }
    })
  };
  const getParentSessionsApi = (headers: any, org: any) => {
      getParentSessionData(cookies.token, org).then(async (response: any) => {
        if (response.status == 200) {
          setSessionList(response.data[0]);
          setLoading(false)
          session_size = 1;
          checkLoading();
        } else if (repeat < 15) {
          repeat++;
          getParentSessionsApi(headers, org);
        } else {
          setIsLoading(false);
        }
      }).catch((err) => {
        if (repeat < 15) {
          repeat++;
          getParentSessionsApi(headers, org);
        } else {
          setIsLoading(false);
        }
      })
  };
  const getWheelApi = (headers: any, org: any) => {
      getWheelData(cookies.token, org).then(async (response: any) => {
        if (response.status == 200) {
          setWheelPopup(response.data);
          checkLoading();
        } else if (repeat < 15) {
          repeat++;
          getWheelApi(headers, org);
        } else {
          setIsLoading(false);
        }
      }).catch((err) => {
        if (repeat < 15) {
          repeat++;
          getWheelApi(headers, org);
        } else {
          setIsLoading(false);
        }
      })
  };
  useEffect(() => {
    if (duration > 0) {
      setTimeout(() => {
        setShowCloseAd(true);
      }, (duration / 3) * 1000);
    }
  }, [duration]);
  // const triggerZarebinLogin = (pToken: string) => {
  //   setCookies("pToken", pToken, {
  //     maxAge: 2147483647,
  //   });
  //   axios({
  //     method: "post",
  //     url: `${sessionsBackendURL}v1/usr/tp/zare/token/`,
  //     data: {
  //       token: pToken,
  //     },
  //     timeout: 8000,
  //   })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setHasurlParam(true);
  //         setCookies("token", response.data.token, {
  //           maxAge: 2147483647,
  //         });

  //         user_info = response.data.user;
  //         checkLoading();
  //       } else if (repeat < 15) {
  //         repeat++;
  //         triggerZarebinLogin(pToken);
  //       } else {
  //         setHasurlParam(false);
  //         setIsLoading(false);
  //       }
  //     })
  //     .catch((err) => {
  //       if (repeat < 15) {
  //         repeat++;
  //         triggerZarebinLogin(pToken);
  //       } else {
  //         setHasurlParam(false);
  //         setIsLoading(false);
  //       }
  //     });
  // };
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [router.query.search]);
  useEffect(() => {
    if (sessionList?.id) {
      getParentSessionLdbData(cookies.token, sessionList?.id, cookies.organization).then(async (response: any) => {
        if (response.status === 200) {
          setSessionParentLeaderboard(response.data);
          checkLoading();
        }
      })
    }
  }, [sessionList, cookies.token]);

  if(!sessionList){
    return(
      <div className={styles["main-page-active-session-container-xs"]}>
          <p>سشن فعالی وجود ندارد</p>
      </div>
    )
  }
  else if(!loading){
    return (
      <Container>
        <Game
          showGameStartModal={showGameStartModal}
          setShowGameStartModal={setShowGameStartModal}
          width={width}
          setWidth={setWidth}
          banners={banners}
          feedList={feedList}
          categories={categories}
          sessionList={sessionList}
          wheelPopup={wheelPopup}
          setWheelPopup={setWheelPopup}
          wheelLight={wheelLight}
          wheelGift={wheelGift}
          setWheelGift={setWheelGift}
          wheelWait={wheelWait}
          setWheelWait={setWheelWait}
          leaderboard={leaderboard}
          sessionParentLeaderboard={sessionParentLeaderboard}
          showParentLeaderboard={showParentLeaderboard}
          setShowParentLeaderboard={setShowParentLeaderboard}
          gameRulePopup={gameRulePopup}
          setGameRulePopup={setGameRulePopup}
          sessionLeaderboard={sessionLeaderboard}
          setSessionLeaderboard={setSessionLeaderboard}
          showTreasureModal={showTreasureModal}
          setShowTreasureModal={setShowTreasureModal}
          giftCode={giftCode}
          setGiftCode={setGiftCode}
          showShareModal={showShareModal}
          setShowShareModal={setShowShareModal}
          bonus={bonus}
          setBonus={setBonus}
          showCloseAd={showCloseAd}
          video={video}
          setVideo={setVideo}
          duration={duration}
          setDuration={setDuration}
          shareData={shareData}
          setShareData={setShareData}
          showGuestPopup={showGuestPopup}
          setShowGuestPopup={setShowGuestPopup}
          showShopList={showShopList}
          shopList={shopList}
          setShopList={setShopList}
          setShowShopList={setShowShopList}
          shopAnimation={shopAnimation}
          setShopAnimation={setShopAnimation}
          playGameAnimation={playGameAnimation}
          setPlayGameAnimation={setPlayGameAnimation}
          gameRuleAnimation={gameRuleAnimation}
          setGameRuleAnimation={setGameRuleAnimation}
          showWinnersPopup={showWinnersPopup}
          setShowWinnersPopup={setShowWinnersPopup}
          winnersAnimation={winnersAnimation}
          setWinnersAnimation={setWinnersAnimation}
          showDayLeaderboardPopup={showDayLeaderboardPopup}
          setDayLeaderboardPopup={setDayLeaderboardPopup}
          dayLeaderboardAnimation={dayLeaderboardAnimation}
          setDayLeaderboardAnimation={setDayLeaderboardAnimation}
          setVideoType={setVideoType}
          videoType={videoType}
          showLoadeing={showLoadeing}
          setShowLoadeing={setShowLoading}
          org_id={cookies.organization}
          user={user}
          ruleAnimation={ruleAnimation}
          setRuleAnimation={setRuleAnimation}
          wheelTimer={wheelTimer}
          SetWheelTimer={SetWheelTimer}
          buySku={buySku}
          isLoading={isLoading}
          paymentMessage={paymentMessage}
          setPaymentMessage={setPaymentMessage}
        />
        {showGuestPopup &&
          <GuestModal
            styles={styles}
            setShowGuestPopup={setShowGuestPopup}
          />
        }
      </Container>
    )
  }
  else{
    return(
      <div className={styles["main-page-active-session-container-xs"]}>
        <Image
        src="/images/loading.gif"
        alt="loading"
        width={120}
        height={120}
        />
      </div>
    )
  }
};
export default SessionPage;
