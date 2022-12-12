// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
// import queryString from "query-string";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import styles from "../iframe/game.module.scss";
import { getUserInfoApiData, getWeeklyLbdData } from "networks/sessionns";

// const WIDTH = document.body.offsetWidth;

const P1PopUp = ({
  selectedGame,
  p1info,
  showPopUp,
  showInfuffPopUp,
  showNoResourcePopup,
  setUserInfo,
  playAgain,
  fromGame,
  score,
  setSelectedGame,
}: any) => {
  const [userRank, setUserRank] = useState(null);
  const [suggestedGame, setSuggestedGame] = useState({} as any);
  const [, setList] = useState();
  const router = useRouter();
  const [cookies] = useCookies(["token", "organization"]);

  useEffect(() => {
    getUserLbd();
  }, []);
  const setLoadingShown = () => {};
  const getUserLbd = () => {
    const { id } = selectedGame;
    getWeeklyLbdData(cookies.token, id, cookies.organization).then(async (response: any) => {
      userLbd(response.data);
    })
  };

  const userLbd = (data: any) => {
    setUserRank(data.profile[0]?.rank);
  };
  const showError = (error: any) => {
    console.log(error);
  };
  const goGame = (data?: any) => {
    if (data) {
      setUserInfo(data);
    }

    if (fromGame) {
      playAgain();
    } else {
      router.push("/iframe-game");
    }
  };
  const errHappened = () => {};
  // const goToHome = () => {
  //   goHome(platform, router.push);
  // };
  const close = () => {
    if (fromGame) {
      router.back();
    } else {
      showPopUp(false);
    }
  };
  // const suggestGame = () => {
  //   let cat_id;
  //   if (cookies.organization_id === "2") {
  //     cat_id = 5;
  //   } else if (cookies.organization_id === "19") {
  //     cat_id = 51;
  //   } else {
  //     cat_id = 8;
  //   }
  //   getSuggestedGame({
  //     cat_id,
  //     setData: suggestedGameList,
  //   });
  // };

  // const suggestedGameList = ({ data }: any) => {
  //   const suggestedRandom = Math.floor(Math.random() * (data.length + 1));
  //   const randomGame = data[suggestedRandom];
  //   gameSelected(randomGame);
  //   setSuggestedGame(data[suggestedRandom]);
  // };
  const isStorageSupported = () => {
    try {
      const testKey = "__some_random_key_you_are_not_going_to_use__";
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  };
  const isCookieSupported = () => {
    try {
      const testKey = "__some_random_key_you_are_not_going_to_use__";
      const expires = new Date();
      expires.setDate(expires.getDate() + 2);
      cookies.set(testKey, testKey, { path: "/" });
      const testRead = cookies.get(testKey);
      if (!testRead) {
        return false;
      }
      cookies.remove(testKey);
      return true;
    } catch (e) {
      return false;
    }
  };
  const gameSelected = (game: any) => {
    if (isCookieSupported()) {
      const expires = new Date();
      expires.setDate(expires.getDate() + 2);

      cookies.set("selected-game-id", JSON.stringify(game.id), { path: "/" });
    } else if (isStorageSupported()) {
      window.localStorage.setItem("selected-game-id", JSON.stringify(game.id));
    } else {
      if (window.fakeStorage) {
        window.fakeStorage["selected-game-id"] = game.id;
      } else {
        window.fakeStorage = {};
        window.fakeStorage["selected-game-id"] = game.id;
      }
    }
    setSelectedGame(game);
    checkToken("iframe-game");
  };
  const checkToken = (kind: any) => {
    if (cookies.token) {
      getUserInfoApiData(cookies.token, cookies.organization).then(async (response: any) => {
        setInfo({ ...response.data, kind });
      })
    } else {
    }
  };

  const setInfo = (data: any) => {
    let gameSlug = suggestedGame.slug;

    let kind = data.kind;

    setUserInfo(data);
    if (kind === "iframe-game") {
      router.push("/sessionplay/" + gameSlug);
      // window.location.reload();
    } else {
      // let token = cookies.token;
      // getGameCat({
      //   token,
      //   ID: cookies.organization_id,
      //   setData: setGameList,
      //   showLoading: null,
      //   retry: errHappened,
      // });
    }
  };

  // const setGameList = (data: any) => {
  //   const { search } = window.location;
  //   let pageUrl = queryString.parse(search, {
  //     parseNumbers: true,
  //     decode: false,
  //   });

  //   for (let items of data) {
  //     if (items.id === pageUrl.id) {
  //       setList(items.gamesetups);
  //     }
  //   }
  // };

  let { title } = selectedGame.game;
  let { slug } = selectedGame;
  const { show_lbd } = selectedGame;

  return (
    <div onClick={() => close()} className={styles["p1popup"]}>
      <div
        onClick={(event) => event.stopPropagation()}
        className={styles["p1popup__body"]}
      >
        <div
          style={{ borderBottomWidth: fromGame ? 0 : 1 }}
          className={styles["head"]}
        >
          {!fromGame && <div>{title}</div>}
        </div>
        {fromGame && (
          <div className={styles["inner"]}>
            <div className={styles["container"]}>
              <div className={styles["header"]}>
                <div onClick={() => close()} className={styles["close"]}>
                  <img src={"/images/main/close.png"} alt="close" />
                </div>

                <p className={styles["title"]}>کارنامه</p>
              </div>
              <div className={styles["content"]}>
                <div className={styles["score-title"]}>
                  <div>:رکورد شما</div>
                </div>
                <div className={styles["score-value"]}>
                  {digitsEnToFa(`${score.toString()}`)}
                </div>

                <div className={styles["score-title"]}>
                  <div>:رتبه شما </div>
                </div>
                {userRank ? (
                  <div className={styles["score-value"]}>
                    {" "}
                    {digitsEnToFa(`${userRank}`)}
                  </div>
                ) : (
                  <></>
                )}
              </div>

              <div
                onClick={() => {
                  goGame();
                }}
                className={styles["replay"]}
              >
                بازی دوباره
              </div>
              {/* <div className={styles["options"]}>
                <div
                  onClick={() => suggestGame()}
                  className={styles["suggested"]}
                >
                  بازی پیشنهادی
                  <img
                    src={"/images/iframe/suggested.png"}
                    alt="بازی پیشنهادی"
                    height={100}
                  />
                </div>
              </div> */}
            </div>
          </div>
        )}
        {/* showLbd false*/}
        {fromGame && !show_lbd && (
          <div className={styles["kids"]}>
            <div className={styles["picture"]}>
              <img
                src={"/images/sessions/popups/end-game-img@2x.png"}
                alt="kids-game"
              />
            </div>
            <div className={styles["container"]}>
              <div className={styles["header"]}>
                <div onClick={() => close()} className={styles["close"]}>
                  <img src={"/images/sessions/popups/close-white.svg"} alt="close" />
                </div>
              </div>
              <div className={styles["options"]}>
                <div
                  onClick={() => {
                    router.push(`/game/${slug}`);
                  }}
                  className={styles["suggested-game"]}
                >
                  <img src={"/images/popups/replay-kids.svg"} alt="kids-game" />
                </div>
                <div
                  onClick={() => {
                    goGame();
                  }}
                  className={styles["replay"]}
                >
                  بازی دوباره
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default P1PopUp;
