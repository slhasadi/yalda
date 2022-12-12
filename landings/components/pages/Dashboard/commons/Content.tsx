import Games from "../pages/Games";
import Videos from "../pages/Videos";
import Musics from "../pages/Musics";
import Sale from "../pages/Sale";
import Breadcrumb from "./Breadcrumb";
import Predict from "../pages/Predicts";
import Edit from "../pages/Edit";
import SignOut from "../pages/SignOut";
import Footer from "./Footer";
import { GetProfileResponseData } from "interfaces/interfaces";
import {Dashboard_Active_Tab} from "../../../../slices/dashboardSlice"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
type props = {
  items?: GetProfileResponseData;
};

const Content = ({ items }: props) => {
  const activeTabs = useSelector(
    (state: RootState) => state.dashboard.activeMenuItem
  );
  return (
    <div className="md:w-[80%] px-3 md:px-0 flex md:min-h-screen py-4 md:py-10 flex-grow md:flex-grow-0 overflow-auto">
      <div className="bg-gray-200 flex flex-col w-full h-[97%] relative py-[25px] px-2 md:p-[36px] md:pl-0 rounded-r-2xl rounded-l-2xl md:rounded-l-none">
        <Breadcrumb />
        <div className="flex-grow overflow-auto">
          {activeTabs === "movies" && (
            <Videos
              item={items?.items.find((it) => it.content_type === "video")}
            />
          )}
          {activeTabs === "games" && <Games />}
          {activeTabs === "musics" && (
            <Musics
              item={items?.items.find((it) => it.content_type === "audio")}
            />
          )}
          {activeTabs === "sales" && <Sale items={items}/>}
          {activeTabs === "prediction" && <Predict />}
          {activeTabs === "edit" && <Edit />}
          {activeTabs === "signout" && <SignOut />}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Content;
