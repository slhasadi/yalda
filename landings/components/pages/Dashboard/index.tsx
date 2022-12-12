/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { GetProfileResponseData } from "../../../interfaces/interfaces";
import Menu from "./commons/Menu";
import Content from "./commons/Content";

const Dashboard: React.FC<{profile: GetProfileResponseData}> = ({profile: items}) => {
  return (
    <div className="fixed mt-[70px] md:mt-[50px] inset-0 bg-opacity-95 bg-[#AA2E64] flex flex-col md:flex-row">
      <Menu info={items?.info} />
      <Content
        items={items}
      />
    </div>
  );
};

export default Dashboard;
