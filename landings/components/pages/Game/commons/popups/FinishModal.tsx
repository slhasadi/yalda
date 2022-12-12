// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
const FinishPopUp = ({
  selectedGame,
  playAgain,
  score,
  closeFinishPopUp,
  history,
  high_score,
}: any) => {
  useEffect(() => {
    if (selectedGame.game.landscape) {
      document.getElementById("finish").classList.add("rotate");
      document.getElementById("finish-back").classList.add("rotate");
    }
  }, []);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const platform = useSelector((state) => state.platform);
  // const [token] = useCookies(["token"]);
  const [organization_id] = useCookies(["organization_id"]);
  // const [selectedMode] = useCookies(["selected-mode"]);
  // const resume = () => {
  //   let hint_id = selectedGame.game.hints[0].id;

  //   let req = {
  //     organization_id: Number.parseInt(organization_id),
  //     game_setup_id: selectedGame.id,
  //     hint_id,
  //   };

  //   postHint(token, req, sendNewCoin, notEnoughCoin);
  // };
  // const notEnoughCoin = () => {
  //   dispatch(
  //     pushToast({
  //       status: "error",
  //       message: "کلید طلایی کافی ندارید",
  //     })
  //   );
  // };
  // const sendNewCoin = (data, type) => {
  //   let { game } = selectedGame;

  //   const req = {
  //     type: "NEW_COIN",
  //     payload: {
  //       coin: data.coin,
  //       heart: data.heart,
  //       golden_key: data.golden_key,
  //     },
  //   };
  //   dispatch(setUserInfo(data));
  //   sendToiframe(req);
  //   getGameHistory(token, game.id, setGameHistory);
  // };
  // const setGameHistory = (gameHistory) => {
  //   let { game } = selectedGame;

  //   const data = {
  //     type: "START",
  //     payload: {
  //       mode: selectedMode,
  //       score,
  //       user_id: game.user_id,
  //       game_history: gameHistory.text,
  //     },
  //   };

  //   sendToiframe(data);
  //   closeFinishPopUp();
  // };

  // const sendToiframe = (data) => {
  //   if (window.document.getElementById("game-iframe")) {
  //     window.document
  //       .getElementById("game-iframe")
  //       .contentWindow.postMessage(JSON.stringify(data), "*");
  //   }
  // };
  const goToHome = () => {
    navigate("/");
  };
  const leader = () => {
    navigate("/leader");
  };

  return (
    <div
      id={"finish"}
      onClick={(event) => event.stopPropagation()}
      className={"finish"}
    >
      <div className={"finish__top"}>
        <img
          alt=""
          className={"finish__top__logo"}
          src={selectedGame.game.image}
        />
      </div>
      <img
        alt=""
        onClick={() => leader()}
        className={"finish__leader"}
        src="/images/assets/img/nav_leader_e.png"
      />

      <div className={"finish__config"}>
        <div>
          {"بالاترین امتیاز شما: " + digitsEnToFa(`${high_score.toString()}`)}
        </div>
        <div>{"امتیاز شما: " + digitsEnToFa(`${score.toString()}`)}</div>
      </div>
      <div className={"finish__button"}>
        <div
          style={{ backgroundColor: "#8bc43f" }}
          onClick={() => goToHome()}
          className={"finish__button__item"}
        >
          صفحه اصلی
        </div>

        {/* <div style={{ backgroundColor: '#f79321'}} onClick={() => this.resume()} className={"finish__button__item"}>
                                {'ادامه (یک کلید طلایی)'} 
                            </div> */}
      </div>
    </div>
  );
};

export default FinishPopUp;
