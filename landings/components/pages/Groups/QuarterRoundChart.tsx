import { playoffRoundItemDataIFace } from "interfaces/interfaces";
import GroupTeamBox from "./GroupTeamBox";
import JM from "jalali-moment";

const QuarterRoundChart: React.FC<{
  roundData: playoffRoundItemDataIFace;
  classes?: string;
}> = ({ roundData, classes = "" }) => {
  return (
    <div
      className={`lg:flex flex-col justify-around ml-[70px] lg:ml-0 lg:mr-[120px] ${classes}`}
    >
      {roundData.matches.map((item, index) => (
        <div className="pt-10 first:pt-0" key={index}>
          <div className="relative">
            <div className="absolute w-[30px] h-[2px] left-[-70px] top-[50%] bg-gray-300 translate-y-[-50%]">
              <div className="absolute top-[-22px] right-[50%] translate-x-[50%]">
                {item.match_hometeam_score}
              </div>
              <div className="absolute top-[0px] right-[50%] translate-x-[50%]">
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
  );
};

export default QuarterRoundChart;
