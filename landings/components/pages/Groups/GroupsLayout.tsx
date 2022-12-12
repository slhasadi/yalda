import HeaderLogo from "components/commons/LogoHeader";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Groups_SET_ACTIVE_MENU_ITEM } from "slices/groupsSlice";
import { RootState } from "store";
import classes from "./GroupsLayout.module.css";

const menu_items = ["مرحله گروهی", "نمودار حذفی", "برنامه بازی ها"];

const GroupsLayout: React.FC = ({ children }) => {
  const activeIndex = useSelector(
    (state: RootState) => state.groups.activeMenuItem
  );
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderLogo />
      <div className="bg-gradient-to-b from-[#700f2e] to-[#b3083e] w-full inline-block mt-[60px]">
        <div className="px-3 pt-[29px] sm:px-10 sm:pt-10 text-white">
          <h1 className="text-5xl font-bold">جام جهانی 2022</h1>
          <ul className="flex mt-4">
            {menu_items.map((item, index) => (
              <li
                key={index}
                className={`${
                  classes.menu_item
                } pb-1 border-b-4 cursor-pointer ${
                  activeIndex === index
                    ? "border-white font-bold"
                    : "border-transparent"
                }`}
                onClick={() => dispatch(Groups_SET_ACTIVE_MENU_ITEM(index))}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {children}
    </div>
  );
};

export default GroupsLayout;
