import Image from "next/image";
import React from "react";

interface TeamTextPicPropsDataIFace {
  reverse?: boolean;
  data: { pic: string; name: string };
  classes?: string;
}

const TeamTextPic: React.FC<TeamTextPicPropsDataIFace> = ({
  reverse,
  data,
  classes,
}) => {
  return (
    <div
      key={"team-1"}
      className={`flex items-center md:w-[150px] mx-auto ${
        reverse ? "flex-row-reverse" : "flex-row"
      } ${classes}`}
    >
      <Image
        src={data.pic}
        width={34}
        height={34}
        layout="intrinsic"
        alt={data.name}
        className="rounded-full"
      />
      <span className={reverse ? "ml-1 sm:ml-2" : "mr-1 sm:mr-2"}>
        {data.name}
      </span>
    </div>
  );
};

export default TeamTextPic;
