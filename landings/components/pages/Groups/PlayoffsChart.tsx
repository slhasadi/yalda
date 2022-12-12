import { playoffRoundItemDataIFace } from "interfaces/interfaces";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import FinalRoundChart from "./FinalRoundChart";
import OctantRoundChart from "./OctantRoundChart";
import PlayoffsChartMenu from "./PlayoffsChartMenu";
import QuarterRoundChart from "./QuarterRoundChart";
import RankingStageRoundChart from "./RankingStageRoundChart";
import SemiFinalsRoundChart from "./SemiFinalsRoundChart";

const PlayoffsChart: FC<{ playoffs: playoffRoundItemDataIFace[] }> = ({
  playoffs,
}) => {
  const activeRoundItem = useSelector(
    (state: RootState) => state.groups.activeRoundItem
  );
  return (
    <div className="flex-grow flex flex-col">
      <PlayoffsChartMenu />
      <div className="flex-grow flex justify-center px-2 md:px-10 pb-5 md:pb-10 pt-5 md:pt-10 lg:pt-14">
        <OctantRoundChart
          roundData={playoffs.find((it) => it.stage_name === "Round of 16")!}
          classes={activeRoundItem === 0 ? "block" : "hidden"}
        />
        <QuarterRoundChart
          roundData={playoffs.find((it) => it.stage_name === "Quarter-finals")!}
          classes={activeRoundItem === 1 ? "flex" : "hidden"}
        />
        <SemiFinalsRoundChart
          roundData={playoffs.find((it) => it.stage_name === "Semi-finals")!}
          classes={activeRoundItem === 2 ? "block" : "hidden"}
        />
        <RankingStageRoundChart
          RankingStageRound={
            playoffs.find((it) => it.stage_name === "3rd Place Final")!
          }
          finalRound={playoffs.find((it) => it.stage_name === "Final")!}
          classes={activeRoundItem === 3 ? "flex" : "hidden"}
        />
        <FinalRoundChart
          roundData={playoffs.find((it) => it.stage_name === "Final")!}
          classes={activeRoundItem === 4 ? "block" : "hidden"}
        />
      </div>
    </div>
  );
};

export default PlayoffsChart;
