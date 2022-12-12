import { playoffRoundItemDataIFace } from "interfaces/interfaces";
import React from "react";
import GroupTeamBox from "./GroupTeamBox";
import JM from "jalali-moment";

const OctantRoundChart: React.FC<{
  roundData: playoffRoundItemDataIFace;
  classes?: string;
}> = ({ roundData, classes = "" }) => {
  const matchData = [
    {
      date_top: JM(roundData.matches[0].match_date)
        .locale("fa")
        .format("YYYY/MM/DD"),
      time_top: roundData.matches[0].match_time,
      home_team_top: {
        name: roundData.matches[0].match_hometeam_name,
        badge: roundData.matches[0].team_home_badge,
      },
      away_team_top: {
        name: roundData.matches[0].match_awayteam_name,
        badge: roundData.matches[0].team_away_badge,
      },
      score_top: {
        home_score: roundData.matches[0].match_hometeam_score,
        away_score: roundData.matches[0].match_awayteam_score,
      },
      date_bottom: JM(roundData.matches[1].match_date)
        .locale("fa")
        .format("YYYY/MM/DD"),
      time_bottom: roundData.matches[1].match_time,
      home_team_bottom: {
        name: roundData.matches[1].match_hometeam_name,
        badge: roundData.matches[1].team_home_badge,
      },
      away_team_bottom: {
        name: roundData.matches[1].match_awayteam_name,
        badge: roundData.matches[1].team_away_badge,
      },
      score_bottom: {
        home_score: roundData.matches[1].match_hometeam_score,
        away_score: roundData.matches[1].match_awayteam_score,
      },
    },
    {
      date_top: JM(roundData.matches[2].match_date)
        .locale("fa")
        .format("YYYY/MM/DD"),
      time_top: roundData.matches[2].match_time,
      home_team_top: {
        name: roundData.matches[2].match_hometeam_name,
        badge: roundData.matches[2].team_home_badge,
      },
      away_team_top: {
        name: roundData.matches[2].match_awayteam_name,
        badge: roundData.matches[2].team_away_badge,
      },
      score_top: {
        home_score: roundData.matches[2].match_hometeam_score,
        away_score: roundData.matches[2].match_awayteam_score,
      },
      date_bottom: JM(roundData.matches[3].match_date)
        .locale("fa")
        .format("YYYY/MM/DD"),
      time_bottom: roundData.matches[3].match_time,
      away_team: {
        name: roundData.matches[3].match_awayteam_name,
        badge: roundData.matches[3].team_away_badge,
      },
      home_team_bottom: {
        name: roundData.matches[3].match_hometeam_name,
        badge: roundData.matches[3].team_home_badge,
      },
      away_team_bottom: {
        name: roundData.matches[3].match_awayteam_name,
        badge: roundData.matches[3].team_away_badge,
      },
      score_bottom: {
        home_score: roundData.matches[3].match_hometeam_score,
        away_score: roundData.matches[3].match_awayteam_score,
      },
    },
    {
      date_top: JM(roundData.matches[4].match_date)
        .locale("fa")
        .format("YYYY/MM/DD"),
      time_top: roundData.matches[4].match_time,
      home_team_top: {
        name: roundData.matches[4].match_hometeam_name,
        badge: roundData.matches[4].team_home_badge,
      },
      away_team_top: {
        name: roundData.matches[4].match_awayteam_name,
        badge: roundData.matches[4].team_away_badge,
      },
      score_top: {
        home_score: roundData.matches[4].match_hometeam_score,
        away_score: roundData.matches[4].match_awayteam_score,
      },
      date_bottom: JM(roundData.matches[5].match_date)
        .locale("fa")
        .format("YYYY/MM/DD"),
      time_bottom: roundData.matches[5].match_time,
      home_team_bottom: {
        name: roundData.matches[5].match_hometeam_name,
        badge: roundData.matches[5].team_home_badge,
      },
      away_team_bottom: {
        name: roundData.matches[5].match_awayteam_name,
        badge: roundData.matches[5].team_away_badge,
      },
      score_bottom: {
        home_score: roundData.matches[5].match_hometeam_score,
        away_score: roundData.matches[5].match_awayteam_score,
      },
    },
    {
      date_top: JM(roundData.matches[6].match_date)
        .locale("fa")
        .format("YYYY/MM/DD"),
      time_top: roundData.matches[6].match_time,
      home_team_top: {
        name: roundData.matches[6].match_hometeam_name,
        badge: roundData.matches[6].team_home_badge,
      },
      away_team_top: {
        name: roundData.matches[6].match_awayteam_name,
        badge: roundData.matches[6].team_away_badge,
      },
      score_top: {
        home_score: roundData.matches[6].match_hometeam_score,
        away_score: roundData.matches[6].match_awayteam_score,
      },
      date_bottom: JM(roundData.matches[7].match_date)
        .locale("fa")
        .format("YYYY/MM/DD"),
      time_bottom: roundData.matches[7].match_time,
      home_team_bottom: {
        name: roundData.matches[7].match_hometeam_name,
        badge: roundData.matches[7].team_home_badge,
      },
      away_team_bottom: {
        name: roundData.matches[7].match_awayteam_name,
        badge: roundData.matches[7].team_away_badge,
      },
      score_bottom: {
        home_score: roundData.matches[7].match_hometeam_score,
        away_score: roundData.matches[7].match_awayteam_score,
      },
    },
  ];

  return (
    <div className={`ml-[110px] lg:ml-0 lg:block ${classes}`}>
      {matchData.map((item, index) => (
        <div className="pt-10 first:pt-0" key={index}>
          <div className="relative">
            <div className="absolute w-[30px] border-2 border-gray-300 left-[-80px] top-[46px] bottom-[46px] border-r-0">
              <div className="absolute top-[-25px] right-[50%] translate-x-[50%]">
                {item.score_top.home_score}
              </div>
              <div className="absolute top-[0] right-[50%] translate-x-[50%]">
                {item.score_top.away_score}
              </div>
              <div className="absolute bottom-[0] right-[50%] translate-x-[50%]">
                {item.score_bottom.home_score}
              </div>
              <div className="absolute bottom-[-25px] right-[50%] translate-x-[50%]">
                {item.score_bottom.away_score}
              </div>
            </div>
            <div className="absolute w-[30px] h-[2px] left-[-110px] top-[50%] bg-gray-300 translate-y-[-50%]" />
            <div className="relative">
              <div className="absolute w-[30px] border-2 border-gray-300 left-[-40px] top-[16px] bottom-[16px] border-r-0">
                <div className="absolute rotate-90 top-[50%] translate-y-[-50%] text-center left-[-30%]">
                  <div className="text-[11px]">{item.date_top}</div>
                  <div className="text-[13px] dir-ltr">{item.time_top}</div>
                </div>
              </div>
              <GroupTeamBox
                teamInfo={{
                  name: item.home_team_top.name,
                  logo: item.home_team_top.badge,
                }}
              />
              <GroupTeamBox
                teamInfo={{
                  name: item.away_team_top.name,
                  logo: item.away_team_top.badge,
                }}
                classes="mt-7"
              />
            </div>
            <div className="relative">
              <div className="absolute w-[30px] border-2 border-gray-300 left-[-40px] top-[16px] bottom-[16px] border-r-0">
                <div className="absolute rotate-90 top-[50%] translate-y-[-50%] text-center left-[-30%]">
                  <div className="text-[11px]">{item.date_bottom}</div>
                  <div className="text-[13px] dir-ltr">{item.time_bottom}</div>
                </div>
              </div>
              <GroupTeamBox
                teamInfo={{
                  name: item.home_team_bottom.name,
                  logo: item.home_team_bottom.badge,
                }}
                classes="mt-7"
              />
              <GroupTeamBox
                teamInfo={{
                  name: item.away_team_bottom.name,
                  logo: item.away_team_bottom.badge,
                }}
                classes="mt-7"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OctantRoundChart;
