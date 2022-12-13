/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import CountDown from "../commons/CountDown";
import PagesTab from "../commons/Tabs/PagesTab";
import TopBanner from "../commons/TopBanner";
import LogoHeader from "components/commons/LogoHeader";
import BuySub from "components/commons/BuySub";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { useEffect, useState } from "react";
import { updateUserAsync } from "slices/userSlice";
import { useCookies } from "react-cookie";
import ShopModal from "components/commons/ShopModal";
import { getPagesData } from "networks/pages";
import { Pages_Data } from "slices/pagesDataSlice";
import Script from "next/script";
import ReactGA from "react-ga";
import TagManager from "react-gtm-module";

const Header = () => {
  // const [flag, setFlag] = useState(false);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);
  const [cookies, setCookies] = useCookies([
    "token",
    "lnd_org",
    "menu_items",
    "data",
  ]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateUserAsync());
  }, []);
  useEffect(() => {
    getPagesData(cookies.lnd_org, cookies.token).then(async (res: any) => {
      dispatch(Pages_Data(res.data));
    });
  }, [router]);
  useEffect(() => {
    if (cookies.data?.analytics_gtag)
      ReactGA.initialize(cookies.data.analytics_gtag);
    if (cookies.data?.analytics_gtm)
      TagManager.initialize({ gtmId: cookies.data.analytics_gtm });
  }, [cookies.data]);
  return (
    <>
      {cookies.data ? (
        <>
          {cookies.data.ads_banner_type !== "soroush_api" && (
            <>
              <Script strategy="afterInteractive" id={"saba-vision"}>
                {`var sabaVisionWebsiteID = "bcd54b46-e299-4e66-99c5-3604870d718d"; var sabaVisionWebsitePage = "ALL"`}
              </Script>
              <Script
                strategy="afterInteractive"
                src={"https://plus.sabavision.com/dox/dox.min.js"}
              />
              <Script
                strategy="afterInteractive"
                id="media-ad"
                type="text/javascript"
              >
                {`const head = document.getElementsByTagName("head")[0]; const script
                          = document.createElement("script"); script.type = "text/javascript";
                          script.async = true; script.src =
                          "https://s1.mediaad.org/serve/sports.vidaneh.com/loader.js";
                          head.appendChild(script)`}
              </Script>
            </>
          )}
        </>
      ) : (
        <></>
      )}
      <LogoHeader />
      <header className="w-full">
        <TopBanner />
        {/* <CountDown /> */}
        {/* <PagesTab /> */}
        {/* {!user?.subscription?.subscribed && <BuySub />} */}
      </header>
      <ShopModal />
    </>
  );
};

export default Header;
