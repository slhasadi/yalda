import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import Button from "../../commons/Button";
import Stack from "../../commons/Stack";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { predictionURL, SSO_PATH } from "../../../globals";
import { PredictionMatches } from "../../../interfaces/interfaces";
import { pushToast } from "../../../slices/toastSlice";
import { stop } from "../../../slices/playerSlice";
import PredictionContext from "../../../contexts/PredictionContext";
import Modal from "../../commons/Modal/Modal";
import { getDate } from "../../../helpers/utilities/functions";
import { postAdsSeenData, postPredictData } from "networks/predictions";
import { RootState } from "store";
type Props = {
  className?: string;
  match: PredictionMatches;
  predictionButton: boolean;
  setPredictionButton: (predictionButton: boolean) => void;
  date: any;
  showAds: boolean;
  setShowAds: (value: boolean) => void;
  setDate: (value: string) => void;
};
const PredictionForm = ({
  className,
  match,
  predictionButton,
  setPredictionButton,
  date,
  showAds,
  setShowAds,
  setDate,
}: Props) => {
  const adsPlaying = useSelector((state: RootState) => state.player.adsPlaying);
  const [homeGoal, setHomeGoal] = useState<string>("");
  const [awayGoal, setAwayGoal] = useState<string>("");
  const [isPredict, setIsPredict] = useState<boolean>(false);
  const dispatch = useDispatch<any>();
  const { matches, getMatchesOfDate } = useContext(PredictionContext);
  const [openModal, setOpenModal] = useState(false);
  const [openPredictModal, setOpenPredictModal] = useState(false);
  const [openAdsModal, setOpenAdsModal] = useState(false);
  const [cookies] = useCookies(["prd_org", "token"]);
  const homeGoalRef = useRef<HTMLInputElement>(null);
  const awayGoalRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isPredict && !adsPlaying) {
      setPredictionWithAds();
      setHomeGoal("");
      setAwayGoal("");
      setShowAds(false);
      setIsPredict(false);
    }
  }, [adsPlaying]);
  function setPredictionWithAds() {
    const data = {
      match_id: match.id,
    };
    postAdsSeenData(cookies.token, cookies.prd_org, data)
      .then(async (res: any) => {
        setPrediction();
      })
      .catch((err) => {
        dispatch(
          pushToast({
            status: "error",
            message: "مشکلی پیش اومد",
          })
        );
      });
  }

  function setPrediction() {
    const data = {
      match_id: match.id,
      home_goals: homeGoal,
      away_goals: awayGoal,
    };
    postPredictData(cookies.token, cookies.prd_org, data)
      .then(async (res: any) => {
        // setIsPredict(true);
        // setDate(getDate('today', "en") as any);
        setShowAds(false);
        setOpenModal(true);
        getMatchesOfDate(date);
        setPredictionButton(!predictionButton);
      })
      .catch((err) => {
        dispatch(
          pushToast({
            status: "error",
            message: "مشکلی پیش اومده",
          })
        );
      });
  }

  return (
    <>
      <Stack
        className={`w-full justify-between lg:justify-center gap-x-4 ${className}`}
      >
        <Stack className="w-28 md:w-auto justify-center items-center">
          {match.prediction === null || match.can_predict ? (
            <input
              name="first"
              value={homeGoal}
              ref={homeGoalRef}
              type="number"
              pattern="[0-9]"
              min={0}
              max={200}
              placeholder={
                match.prediction !== null ? match.prediction.home_goals : "-"
              }
              className="appearance-none border-none rounded-lg w-[40px] h-[40px] bg-box-input text-center p-0"
              onChange={(e) => {
                setHomeGoal(e.target.value);
              }}
              disabled={!match.can_predict}
            />
          ) : (
            match.prediction.home_goals
          )}
        </Stack>

        <Button
          className="px-6 h-[40px] lg:px-4"
          type={
            !cookies.token
              ? "success"
              : match.can_predict
              ? match.prediction !== null
                ? "warning"
                : "success"
              : "secondary"
          }
          // style={{
          //     pointerEvents: !cookies.token ? "auto" : match.can_predict ? 'auto' : 'none',
          //     width: "125px",
          //     padding: "0 10px"
          // }}
          onClick={() => {
            if (cookies.token) {
              if (!homeGoal) {
                homeGoalRef?.current?.focus();
              }
              if (!awayGoal) {
                awayGoalRef?.current?.focus();
              }
              if (match.prediction === null) {
                if (homeGoal && awayGoal) {
                  setPrediction();
                  setHomeGoal("");
                  setAwayGoal("");
                }
                // else{
                //     dispatch(
                //         pushToast({
                //             status: "error",
                //             message:  "ابتدا پیش بینی خود را وارد کنید",
                //         })
                //     );
                // }
              } else if (match.can_predict) {
                if (homeGoal && awayGoal) {
                  setOpenAdsModal(true);
                  // setTimeout(function(){setRepredict()}, 10000);
                }
                // else{
                //     dispatch(
                //         pushToast({
                //             status: "error",
                //             message:  "ابتدا پیش بینی خود را وارد کنید",
                //         })
                //     );
                // }
              }
            } else {
              setOpenPredictModal(true);
            }
          }}
        >
          {match?.prediction !== null && match.can_predict ? "تغییر" : "ثبت"}
        </Button>
        <Stack className="w-28 md:w-auto items-center justify-center">
          {match.prediction === null || match.can_predict ? (
            <input
              name="two"
              type="number"
              ref={awayGoalRef}
              pattern="[0-9]"
              value={awayGoal}
              min={0}
              max={200}
              placeholder={
                match.prediction !== null ? match.prediction.away_goals : "-"
              }
              className="appearance-none border-none rounded-lg w-[40px] h-[40px] bg-box-input text-center p-0"
              onChange={(e) => {
                setAwayGoal(e.target.value);
              }}
              disabled={!match.can_predict}
            />
          ) : (
            match.prediction.away_goals
          )}
        </Stack>
      </Stack>
      <Modal open={openModal} setOpen={setOpenModal} title={"پیش بینی"}>
        <p>
          پیش بینی شما با موفقیت ثبت گردید بعد از اتمام بازی امتیاز در داشبورد
          شما ثبت خواهد شد
        </p>
      </Modal>
      <Modal
        open={openPredictModal}
        setOpen={setOpenPredictModal}
        title={"ورود"}
      >
        <p className="text-center">برای ثبت پیش بینی باید وارد شوید</p>
        <Button
          className="w-full bg-primary text-white px-6 lg:px-4 rounded-lg mt-5 px-5 py-2.5 block"
          onClick={() => {
            window.location.href = SSO_PATH(window.location.hostname);
          }}
        >
          ورود
        </Button>
      </Modal>
      <Modal open={openAdsModal} setOpen={setOpenAdsModal} title={"ورود"}>
        <p className="text-center">برای تغییر نتیجه باید تبلیغات مشاهده کنید</p>
        <Button
          className="w-full bg-primary text-white px-6 lg:px-4 rounded-lg mt-5 px-5 py-2.5 block"
          onClick={() => {
            setShowAds(true);
            setIsPredict(true);
            setOpenAdsModal(false);
          }}
        >
          مشاهده تبلیغ
        </Button>
      </Modal>
    </>
  );
};

export default PredictionForm;
