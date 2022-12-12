import Image from "next/image";
import Link from "next/link";
import Nav from "./nav";
import NavDashboard from "./navDashboard";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader_page } from "slices/pageLoader";
import { Show_Modal } from "slices/guestModal";
import { shopList } from "slices/shopModal";
import { RootState } from "store";
import { getDate } from "helpers/utilities/functions";
import moment from "jalali-moment";

const HeaderLogo = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [cookies] = useCookies(["token", "data"]);
  const [logo, setLogo] = useState("/images/logo.svg");
  const [active, setActive] = useState(true);
  const [subText, setSubText] = useState("");
  const user = useSelector((state: RootState) => state.user.user);
  const userTill = user?.subscription?.subscribed_till;
  const days = moment(userTill).diff(
    moment(getDate("today", "en", "YYYY-MM-DD")),
    "days"
  );
  useEffect(() => {
    if (cookies.data?.logo) {
      setLogo(cookies.data?.logo);
    }
  }, [cookies?.data]);
  useEffect(() => {
    if (user?.subscription?.subscribed) {
      setSubText(`${days} روز`);
    } else if (user?.subscription === null) {
      setSubText("");
    } else {
      setSubText("خرید اشتراک");
    }
  }, [user]);

  return (
    <div className="absolute top-0 w-full h-[70px] z-[160]">
      <div className="flex container mx-auto w-full h-16  z-10">
        <>
          <div className="hidden md:flex flex-[20] mr-[10px] md:mr-[0]">
            <div className="flex flex-[20] mr-[10px] md:mr-[0] py-[4px]">
              <div className="flex items-center relative w-[100px]">
                <Image
                  src={logo}
                  alt="logo"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
          <Nav />
        </>
      </div>
    </div>
  );
};

export default HeaderLogo;
