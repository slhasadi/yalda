import InviteAndGuide from "components/pages/Prediction/sections/InviteAndGuide";
import Dashboard from "../../../components/pages/Prediction/sections/Dashboard";
import LastWinners from "../../../components/pages/Prediction/sections/LastWinners";
import PredictedRaces from "../../../components/pages/Prediction/sections/PredictedRaces";
import Races from "../../../components/pages/Prediction/sections/Races";
import Divider from "../../commons/Divider";
import {
  PredictionMatches,
  PredictionScores,
  Predicts,
} from "../../../interfaces/interfaces";
import Image from "next/image";
import Container from "../../commons/Container";
import { useCookies } from "react-cookie";
import { Value } from "sass";
const VideoPlayer = dynamic(() => import("components/layout/VideoPlayer"), {
  ssr: false,
});
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { setAdsPlaying } from "slices/playerSlice";
import { RootState } from "store";
type props = {
  score: PredictionScores;
  matches: PredictionMatches[];
  setMatches: (matches: PredictionMatches[]) => void;
  date: string;
  setDate: (date: string) => void;
  predicts: Predicts[];
  setPredicts: (predicts: Predicts[]) => void;
  predictionButton: boolean;
  setPredictionButton: (predictionButton: boolean) => void;
};
const Prediction = ({
  setMatches,
  date,
  setDate,
  predictionButton,
  setPredictionButton,
}: props) => {
  const adsPlaying = useSelector((state: RootState) => state.player.adsPlaying);
  const [showAds, setShowAds] = useState<boolean>(false);
  const [src, setSrc] = useState<string>("");
  const [cookies] = useCookies(["token"]);
  useEffect(() => {
    if (showAds) {
      setSrc(
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiZTc1NjcyNTYtZjJmNy00ODNmLTg3NTUtY2MwOTFhMDQyYWY1IiwiZmlyc3RfbmFtZSI6IiIsImxhc3RfbmFtZSI6IiIsInBob25lX251bWJlciI6Ijk4OTE5NTM1MjA1OSIsImVtYWlsIjoiIiwiY3JlYXRlZF90aW1lIjoxNjY5MDEzNTQyfQ.eMQN5QQPNCsb-gDkzstLWAUzFFqBjUSj7b-AMJT3yWU"
      );
    } else {
      setSrc("");
    }
  }, [showAds]);
  // const dispatch = useDispatch();
  return (
    <Container>
      <Races
        setMatches={setMatches}
        date={date}
        setDate={setDate}
        predictionButton={predictionButton}
        setPredictionButton={setPredictionButton}
        showAds={showAds}
        setShowAds={setShowAds}
      />
      <InviteAndGuide />
      <Divider />
      {cookies.token && <PredictedRaces />}
      <Dashboard />
      {cookies.token && <Divider />}
      {/* <LastWinners /> */}
      <br />
      <br />
      {showAds && (
        <div className="fixed inset-0 z-[110] bg-opacity-95 bg-black flex justify-center items-center">
          {/* <div className="fixed top-10 right-10 z-50 cursor-pointer">
            <Image
                height={30}
                width={30}
                src={"/images/close.png"}
                alt="close"
                onClick={() => {
                setShowAds(false)
                dispatch(setAdsPlaying(false));
                dispatch(stop());
                }}
            />
            </div> */}
          <div className="w-full px-[24px]">
            <VideoPlayer key="trailerSSS" src={src} adsType="prediction" />
          </div>
        </div>
      )}
    </Container>
  );
};

export default Prediction;
