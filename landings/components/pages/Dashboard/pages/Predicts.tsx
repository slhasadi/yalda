import { networkGetPredictedMatches } from "networks/predictions";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ContentSideLayout from "../commons/ContentSideLayout";
import DashboardPredictedRaces from "../commons/DashboardPredictRaces";
const Predict = () => {
  const [cookies] = useCookies(["prd_org", "token"]);
  const [predictedMatches, setPredictedMatches] = useState<any>();
  useEffect(() => {
    networkGetPredictedMatches(cookies["token"], cookies["prd_org"]).then(
      (res) => setPredictedMatches(res.data)
    );
  }, [cookies]);
  return (
    <ContentSideLayout title="پیش بینی های انجام شده">
      {predictedMatches?.length > 0 ? <DashboardPredictedRaces predictedMatches={predictedMatches} /> : <p className="text-center">هنوز هیچ پیش بینی ثبت نکرده اید</p>}
      
    </ContentSideLayout>
  );
};

export default Predict;
