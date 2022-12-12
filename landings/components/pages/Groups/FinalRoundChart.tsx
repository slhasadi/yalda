import { playoffRoundItemDataIFace } from "interfaces/interfaces";
import React from "react";
import GroupTeamBox from "./GroupTeamBox";
import JM from "jalali-moment";

const FinalRoundChart: React.FC<{
  roundData: playoffRoundItemDataIFace;
  classes?: string;
}> = ({ roundData, classes = "" }) => {
  return (
    <>
      <div className={`hidden lg:flex flex-col justify-around mr-[15px]`}>
        <div>
          <div className="relative">
            <GroupTeamBox
              teamInfo={{
                name: roundData.matches[0].match_hometeam_name,
                logo: roundData.matches[0].team_home_badge,
              }}
            />
          </div>
        </div>
        <div className="pt-10">
          <div className="relative">
            <GroupTeamBox
              teamInfo={{
                name: roundData.matches[0].match_awayteam_name,
                logo: roundData.matches[0].team_away_badge,
              }}
            />
          </div>
        </div>
      </div>
      <div
        className={`ml-[40px] flex flex-col justify-around lg:hidden ${classes}`}
      >
        <div className="relative">
          <div className="absolute w-[30px] border-2 border-gray-300 left-[-40px] top-[16px] bottom-[16px] border-r-0">
            <div className="absolute top-[-25px] right-[50%] translate-x-[50%]">
              {roundData.matches[0].match_hometeam_score}
            </div>
            <div className="absolute bottom-[-25px] right-[50%] translate-x-[50%]">
              {roundData.matches[0].match_awayteam_score}
            </div>
            <div className="absolute rotate-90 top-[50%] translate-y-[-50%] text-center left-[-30%]">
              <div className="text-[11px]">
                {JM(roundData.matches[0].match_date)
                  .locale("fa")
                  .format("YYYY/MM/DD")}
              </div>
              <div className="text-[13px] dir-ltr">
                {roundData.matches[0].match_time}
              </div>
            </div>
          </div>
          <GroupTeamBox
            teamInfo={{
              name: roundData.matches[0].match_hometeam_name,
              logo: roundData.matches[0].team_home_badge,
            }}
          />
          <GroupTeamBox
            teamInfo={{
              name: roundData.matches[0].match_awayteam_name,
              logo: roundData.matches[0].team_away_badge,
            }}
            classes="mt-7"
          />
        </div>
      </div>
    </>
  );
};

export default FinalRoundChart;
