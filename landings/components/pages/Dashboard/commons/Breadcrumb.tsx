import Image from "next/image"
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Dashboard_Active_Tab } from "slices/dashboardSlice";
import { RootState } from "store";
const Content = () => {
  const activeTab = useSelector(
    (state: RootState) => state.dashboard.activeMenuItem
  );
  const dispatch = useDispatch();
    function checkTab (){
        let breadcrumb = ""
        if (activeTab === "movies") {
          breadcrumb = "ویدیو ها";
        } else if (activeTab === "prediction") {
          breadcrumb = "پیش بینی";
        } else if (activeTab === "musics") {
          breadcrumb = "موسیقی";
        } else if (activeTab === "sales") {
          breadcrumb = "خرید ها";
        } else if (activeTab === "signout") {
          breadcrumb = "خروج";
        } else if (activeTab === "games") {
          breadcrumb = "بازی ها";
        }
        return breadcrumb
    }
  return (
    <div className="w-[100%] h-[50px] flex items-center">  
        <p className="cursor-pointer text-[#000000]" onClick={()=>{
          dispatch(Dashboard_Active_Tab("movies"))
        }}>داشبورد</p>
    <Image src="/images/music/left.svg" alt="" width={20} height={20} />
        <p className="text-[#838C8D]">{checkTab()}</p>
    </div>
  );
};

export default Content;
