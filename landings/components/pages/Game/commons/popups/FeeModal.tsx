import React from "react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { useCookies } from "react-cookie";
import { postHintData } from "networks/sessionns";
// const WIDTH = document.body.offsetWidth;
const FeePopUp = ({
  feePopUpPopUpData,
  selectedGame,
  showPopUp,
  sendToiframe,
}:any) => {
  const [token] = useCookies(["token"]);
  const [organization_id] = useCookies(["organization"]);

  const payFee = () => {
    const { id } = selectedGame;

    let { hint_id } = feePopUpPopUpData;

    let req = {
      organization_id: Number.parseInt(organization_id as any),
      game_setup_id: id,
      hint_id: hint_id,
    };
    postHintData(token as any, req, req.organization_id).then(async (response: any) => {
      sendNewCoin(response.data, undefined);
    })

  };
  const errHappened = () => {
    //this.setLoadingShown(false);
  };
  const sendNewCoin = (data:any, type:any) => {
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
      const req2 = {
        type: "GO_TO_DUEL",
      };
      //setLoadingShown(false);

      sendToiframe(req2);
      showPopUp(false);
    }
  };
  const close = () => {
    showPopUp(false);
  };

  let { title, type, amount } = feePopUpPopUpData;
  let icon = type === "coin" ? "coin" : type === "heart" ? "heart" : "key";
  return (
    <div onClick={() => close()} className={"feepopup"}>
      <div
        onClick={(event) => event.stopPropagation()}
        className={"feepopup__body"}
      >
        <div className={"game-title"}>{selectedGame.game.title}</div>
        <div className={"title"}>{digitsEnToFa(`${title}`)}</div>
        <img
          className={"close"}
          alt=""
          onClick={() => close()}
          src="/images/main/close.png"
        />
        <div onClick={() => payFee()} className={"btn"}>
          <img
            className={"icon"}
            alt=""
            src={"/images/sessionns/" + icon + ".png"}
          />
          <span>{digitsEnToFa(`${amount}`)}</span>
        </div>
      </div>
    </div>
  );
};

export default FeePopUp;
