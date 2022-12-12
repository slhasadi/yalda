import Image from "next/image";
import React from "react";

const GroupTeamBox: React.FC<{
  teamInfo?: { name: string; logo: string };
  classes?: string;
}> = ({ teamInfo, classes = "" }) => {
  return (
    <div className={`flex items-center relative ${classes}`}>
      <div className="absolute w-[44px] h-[44px] top-[50%] right-0 translate-y-[-50%]">
        {teamInfo?.logo ? (
          <Image src={teamInfo.logo} alt={teamInfo.name} layout="fill" className="rounded-full" />
        ) : (
          <div className="w-full h-full rounded-full bg-red-700 text-white flex justify-center items-center font-bold text-2xl">
            ?
          </div>
        )}
      </div>
      {teamInfo?.logo ? (
        <p
          className={`py-1 w-[135px] bg-gray-300 rounded-3xl mr-1 text-center`}
        >
          {teamInfo.name}
        </p>
      ) : (
        <p className={`w-[135px] h-[32px] bg-gray-300 rounded-3xl mr-1`}></p>
      )}

      {/* <div className="h-[2px] w-[25px] bg-gray-200 absolute top-[50%] translate-y-[-50%] left-[-35px]"></div> */}
    </div>
  );
};

export default GroupTeamBox;
