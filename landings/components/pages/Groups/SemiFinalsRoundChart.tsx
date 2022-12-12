import { playoffRoundItemDataIFace } from "interfaces/interfaces";
import React from "react";
import GroupTeamBox from "./GroupTeamBox";
import JM from "jalali-moment";

const SemiFinalsRoundChart: React.FC<{
  roundData: playoffRoundItemDataIFace;
  classes?: string;
}> = ({ roundData, classes = "" }) => {
  return (
    <>
      <div className={`hidden lg:flex flex-col justify-around lg:mr-[80px]`}>
        <div className="pt-7 lg:pt-10 first:pt-0">
          <div className="relative">
            <div className="hidden lg:block absolute w-[30px] h-[253px] border-2 border-gray-300 left-[-40px] top-[16px] bottom-[16px] border-r-0">
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
            <div className="hidden lg:block absolute w-[105px] h-[2px] left-[-145px]  top-[141px] bg-gray-300">
              <div className="absolute top-[-21px] right-[50%] translate-x-[50%]">
                {roundData.matches[0].match_hometeam_score}
              </div>
              <div className="absolute top-[2px] right-[50%] translate-x-[50%]">
                {roundData.matches[0].match_awayteam_score}
              </div>
            </div>
            <GroupTeamBox
              teamInfo={{
                name: roundData.matches[0].match_hometeam_name,
                logo: roundData.matches[0].team_home_badge,
              }}
            />
          </div>
        </div>
        <div className="pt-7 lg:pt-10">
          <div className="relative">
            <GroupTeamBox
              teamInfo={{
                name: roundData.matches[0].match_awayteam_name,
                logo: roundData.matches[0].team_away_badge,
              }}
            />
          </div>
        </div>
        <div className="pt-7 lg:pt-10 first:pt-0">
          <div className="relative">
            <div className="hidden lg:block absolute w-[30px] h-[253px] border-2 border-gray-300 left-[-40px] top-[16px] bottom-[16px] border-r-0">
              <div className="absolute rotate-90 top-[50%] translate-y-[-50%] text-center left-[-30%]">
                <div className="text-[11px]">
                  {JM(roundData.matches[1].match_date)
                    .locale("fa")
                    .format("YYYY/MM/DD")}
                </div>
                <div className="text-[13px] dir-ltr">
                  {roundData.matches[1].match_time}
                </div>
              </div>
            </div>
            <div className="hidden lg:block absolute w-[105px] h-[2px] left-[-145px]  top-[141px] bg-gray-300">
              <div className="absolute top-[-21px] right-[50%] translate-x-[50%]">
                {roundData.matches[1].match_hometeam_score}
              </div>
              <div className="absolute top-[2px] right-[50%] translate-x-[50%]">
                {roundData.matches[1].match_awayteam_score}
              </div>
            </div>
            <GroupTeamBox
              teamInfo={{
                name: roundData.matches[1].match_hometeam_name,
                logo: roundData.matches[1].team_home_badge,
              }}
            />
          </div>
        </div>
        <div className="pt-7 lg:pt-10">
          <div className="relative">
            <GroupTeamBox
              teamInfo={{
                name: roundData.matches[1].match_awayteam_name,
                logo: roundData.matches[1].team_away_badge,
              }}
            />
          </div>
        </div>
      </div>
      <div
        className={`ml-[70px] flex flex-col justify-around lg:hidden ${classes}`}
      >
        {roundData.matches.map((item, index) => (
          <div className="pt-10 first:pt-0" key={index}>
            <div className="relative">
              <div className="absolute w-[30px] h-[2px] left-[-70px] top-[50%] bg-gray-300 translate-y-[-50%]">
                <div className="absolute top-[-22px] right-[50%] translate-x-[50%]">
                  {item.match_hometeam_score}
                </div>
                <div className="absolute top-[2px] right-[50%] translate-x-[50%]">
                  {item.match_awayteam_score}
                </div>
              </div>
              <div className="relative">
                <div className="absolute w-[30px] border-2 border-gray-300 left-[-40px] top-[16px] bottom-[16px] border-r-0">
                  <div className="absolute rotate-90 top-[50%] translate-y-[-50%] text-center left-[-30%]">
                    <div className="text-[11px]">
                      {JM(item.match_date).locale("fa").format("YYYY/MM/DD")}
                    </div>
                    <div className="text-[13px] dir-ltr">{item.match_time}</div>
                  </div>
                </div>
                <GroupTeamBox
                  teamInfo={{
                    name: item.match_hometeam_name,
                    logo: item.team_home_badge,
                  }}
                />
                <GroupTeamBox
                  teamInfo={{
                    name: item.match_awayteam_name,
                    logo: item.team_away_badge,
                  }}
                  classes="mt-7"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SemiFinalsRoundChart;
