import { GetMatchesResponseData } from "interfaces/interfaces";
import React from "react";
import GamePlansTable from "./GamePlansTable";

const GroupsGamePlans: React.FC<{ plans: GetMatchesResponseData }> = ({
  plans,
}) => {
  return (
    <div className="px-2 sm:px-10 py-6 sm:py-8">
      <h3 className="text-xl font-bold">تاریخ و ساعت بازی های جام جهانی</h3>
      <p className="mt-2 text-lg">لیست بازی های بعدی جام جهانی به همراه تاریخ و ساعت </p>
      <div className="mt-4">
        <GamePlansTable plans={plans} />
      </div>
    </div>
  );
};

export default GroupsGamePlans;
