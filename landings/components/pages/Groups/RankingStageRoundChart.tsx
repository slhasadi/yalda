import { playoffRoundItemDataIFace } from "interfaces/interfaces";
import React from "react";
import GroupTeamBox from "./GroupTeamBox";
import JM from "jalali-moment";

const RankingStageRoundChart: React.FC<{
  RankingStageRound: playoffRoundItemDataIFace;
  finalRound: playoffRoundItemDataIFace;
  classes?: string;
}> = ({ RankingStageRound, finalRound, classes = "" }) => {
  return (
    <div
      className={`lg:flex flex-col justify-around ml-[40px] lg:ml-0 ${classes}`}
    >
      <div className="relative">
        <div className="hidden lg:block absolute w-[52px] h-[52px] border-2 border-gray-300 left-[-62px] top-[50%] translate-y-[-50%] rounded-full">
          <div className="absolute rotate-90 top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] font-bold">
            VS
          </div>
          <div className="absolute rotate-90 top-[50%] translate-y-[-50%] text-center right-[100%]">
            <div className="text-[11px]">
              {JM(finalRound.matches[0].match_date)
                .locale("fa")
                .format("YYYY/MM/DD")}
            </div>
            <div className="text-[13px] dir-ltr">
              {finalRound.matches[0].match_time}
            </div>
          </div>
        </div>
        <div className="hidden lg:block absolute w-[2px] h-[193px] left-[-36px] top-[-173px] bg-gray-300">
          <div className="absolute top-[50%] translate-y-[-50%] right-[7px]">
            {finalRound.matches[0].match_hometeam_score}
          </div>
        </div>
        <div className="hidden lg:block absolute w-[2px] h-[193px] left-[-36px] top-[72px] bg-gray-300">
          <div className="absolute top-[50%] translate-y-[-50%] right-[7px]">
            {finalRound.matches[0].match_awayteam_score}
          </div>
        </div>
        <div className="block lg:hidden absolute w-[30px] border-2 border-gray-300 left-[-40px] top-[16px] bottom-[16px] border-r-0">
          <div className="absolute top-[-25px] right-[50%] translate-x-[50%]">
            {RankingStageRound.matches[0].match_hometeam_score}
          </div>
          <div className="absolute bottom-[-25px] right-[50%] translate-x-[50%]">
            {RankingStageRound.matches[0].match_awayteam_score}
          </div>
          <div className="absolute rotate-90 top-[50%] translate-y-[-50%] text-center left-[-30%]">
            <div className="text-[11px]">
              {JM(RankingStageRound.matches[0].match_date)
                .locale("fa")
                .format("YYYY/MM/DD")}
            </div>
            <div className="text-[13px] dir-ltr">
              {RankingStageRound.matches[0].match_time}
            </div>
          </div>
        </div>
        <div className="hidden lg:block absolute w-[30px] border-2 border-gray-300 right-[-40px] top-[16px] bottom-[16px] border-l-0">
          <div className="absolute top-[-25px] right-[50%] translate-x-[50%]">
            {RankingStageRound.matches[0].match_hometeam_score}
          </div>
          <div className="absolute bottom-[-25px] right-[50%] translate-x-[50%]">
            {RankingStageRound.matches[0].match_awayteam_score}
          </div>
          <div className="absolute rotate-90 top-[50%] translate-y-[-50%] text-center left-[-45%]">
            <div className="text-[11px]">
              {JM(RankingStageRound.matches[0].match_date)
                .locale("fa")
                .format("YYYY/MM/DD")}
            </div>
            <div className="text-[13px] dir-ltr">
              {RankingStageRound.matches[0].match_time}
            </div>
          </div>
        </div>
        <GroupTeamBox
          teamInfo={{
            name: RankingStageRound.matches[0].match_hometeam_name,
            logo: RankingStageRound.matches[0].team_home_badge,
          }}
        />
        <GroupTeamBox
          teamInfo={{
            name: RankingStageRound.matches[0].match_awayteam_name,
            logo: RankingStageRound.matches[0].team_away_badge,
          }}
          classes="mt-7"
        />
      </div>
    </div>
  );
};

export default RankingStageRoundChart;
