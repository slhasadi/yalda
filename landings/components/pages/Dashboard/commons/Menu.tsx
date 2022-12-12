import { ProfileInfoDataIFace } from "interfaces/interfaces";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Dashboard_Active_Tab } from "slices/dashboardSlice";
import { RootState } from "store";
type props = {
  info?: ProfileInfoDataIFace;
};
const Menu = ({ info }: props) => {
  const activeTab = useSelector(
    (state: RootState) => state.dashboard.activeMenuItem
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const [cookies] = useCookies([
    "lnd_org"
  ]);
  return (
    <>
      <div className="w-[0%] md:w-[40%] xl:w-[20%] hidden md:block h-screen px-10 py-10">
        <div className="w-full h-[97%] flex flex-col justify-between">
          <div className="w-full h-[13%] bg-[#791231] rounded-2xl mb[20px] flex item-center p-2">
            <Image
              src="/images/dashboard/profile.svg"
              alt="logo"
              width={90}
              height={90}
            />
            <div className="text-white text-[24px] flex justify-center flex-col mr-[10px]">
              <p>{info?.first_name ? info?.first_name + " " + info?.last_name : "نام کاربری"} </p>
              <p>{info?.phone}</p>
            </div>
          </div>
          <div className="w-full h-[65%] bg-[#791231] rounded-2xl mb[20px] p-2 flex flex-col justify-around item-center text-white">
            <div
              className="mb-[10px] flex w-full cursor-pointer"
              onClick={() => {
                dispatch(Dashboard_Active_Tab("movies"))
              }}
            >
              <div
                className={
                  activeTab === "movies"
                    ? "bg-[#ffffff] w-[50px] h-[50px] rounded-xl flex justify-center item-center"
                    : "bg-[#862A46] w-[50px] h-[50px] rounded-xl flex justify-center item-center"
                }
              >
                <Image
                  src={
                    activeTab === "movies"
                      ? "/images/dashboard/video-b.svg"
                      : "/images/dashboard/video-w.svg"
                  }
                  alt="logo"
                  width={35}
                  height={35}
                />
              </div>
              <div
                className={
                  activeTab === "movies"
                    ? "bg-white w-[80%] h-[50px] flex items-center mr-2 p-3 rounded-xl"
                    : "bg-[#862A46] w-[80%] h-[50px] flex items-center mr-2 p-3 rounded-xl"
                }
              >
                <p
                  className={
                    activeTab === "movies" ? "text-black" : "text-white"
                  }
                >
                  فیلم های دیده شده
                </p>
              </div>
            </div>
            {cookies?.lnd_org !== "2" && 
            <div
              className="mb-[10px] flex w-full cursor-pointer"
              onClick={() => {
                dispatch(Dashboard_Active_Tab("prediction"))
              }}
            >
              <div
                className={
                  activeTab === "prediction"
                    ? "bg-[#ffffff] w-[50px] h-[50px] rounded-xl flex justify-center item-center"
                    : "bg-[#862A46] w-[50px] h-[50px] rounded-xl flex justify-center item-center"
                }
              >
                <Image
                  src={
                    activeTab === "prediction"
                      ? "/images/dashboard/pre-b.svg"
                      : "/images/dashboard/pre-w.svg"
                  }
                  alt="logo"
                  width={35}
                  height={35}
                />
              </div>
              <div
                className={
                  activeTab === "prediction"
                    ? "bg-white w-[80%] h-[50px] flex items-center mr-2 p-3 rounded-xl"
                    : "bg-[#862A46] w-[80%] h-[50px] flex items-center mr-2 p-3 rounded-xl"
                }
              >
                <p
                  className={
                    activeTab === "prediction" ? "text-black" : "text-white"
                  }
                >
                  پیش بینی های انجام شده
                </p>
              </div>
            </div>
            }
            <div
              className="mb-[10px] flex w-full cursor-pointer"
              onClick={() => {
                dispatch(Dashboard_Active_Tab("musics"))
              }}
            >
              <div
                className={
                  activeTab === "musics"
                    ? "bg-[#ffffff] w-[50px] h-[50px] rounded-xl flex justify-center item-center"
                    : "bg-[#862A46] w-[50px] h-[50px] rounded-xl flex justify-center item-center"
                }
              >
                <Image
                  src={
                    activeTab === "musics"
                      ? "/images/dashboard/music-b.svg"
                      : "/images/dashboard/music-w.svg"
                  }
                  alt="logo"
                  width={35}
                  height={35}
                />
              </div>
              <div
                className={
                  activeTab === "musics"
                    ? "bg-white w-[80%] h-[50px] flex items-center mr-2 p-3 rounded-xl"
                    : "bg-[#862A46] w-[80%] h-[50px] flex items-center mr-2 p-3 rounded-xl"
                }
              >
                <p
                  className={
                    activeTab === "musics" ? "text-black" : "text-white"
                  }
                >
                  موسیقی های شنیده شده
                </p>
              </div>
            </div>
            <div
              className="mb-[10px] flex w-full cursor-pointer"
              onClick={() => {
                dispatch(Dashboard_Active_Tab("sales"))
              }}
            >
              <div
                className={
                  activeTab === "sales"
                    ? "bg-[#ffffff] w-[50px] h-[50px] rounded-xl flex justify-center item-center"
                    : "bg-[#862A46] w-[50px] h-[50px] rounded-xl flex justify-center item-center"
                }
              >
                <Image
                  src={
                    activeTab === "sales"
                      ? "/images/dashboard/basket-b.svg"
                      : "/images/dashboard/basket-w.svg"
                  }
                  alt="logo"
                  width={35}
                  height={35}
                />
              </div>
              <div
                className={
                  activeTab === "sales"
                    ? "bg-white w-[80%] h-[50px] flex items-center mr-2 p-3 rounded-xl"
                    : "bg-[#862A46] w-[80%] h-[50px] flex items-center mr-2 p-3 rounded-xl"
                }
              >
                <p
                  className={
                    activeTab === "sales" ? "text-black" : "text-white"
                  }
                >
                  خریدهای انجام شده
                </p>
              </div>
            </div>
            <div
              className="mb-[10px] flex w-full cursor-pointer"
              onClick={() => {
                dispatch(Dashboard_Active_Tab("edit"));
                router.replace("https://accounts.kplus.holdings/?srv=land_worldcup&page=profile")
              }}
            >
              <div
                className={
                  activeTab === "edit"
                    ? "bg-[#ffffff] w-[50px] h-[50px] rounded-xl flex justify-center item-center"
                    : "bg-[#862A46] w-[50px] h-[50px] rounded-xl flex justify-center item-center"
                }
              >
                <Image
                  src={
                    activeTab === "edit"
                      ? "/images/dashboard/edit-profile-b.svg"
                      : "/images/dashboard/edit-profile-w.svg"
                  }
                  alt="edit"
                  width={35}
                  height={35}
                />
              </div>
              <div
                className={
                  activeTab === "edit"
                    ? "bg-white w-[80%] h-[50px] flex items-center mr-2 p-3 rounded-xl"
                    : "bg-[#862A46] w-[80%] h-[50px] flex items-center mr-2 p-3 rounded-xl"
                }
              >
                <p
                  className={
                    activeTab === "edit" ? "text-black" : "text-white"
                  }
                >
                  ویرایش پروفایل
                </p>
              </div>
            </div>
            {cookies?.lnd_org !== "2" && 
            <div
              className="mb-[10px] flex w-full cursor-pointer"
              onClick={() => {
                dispatch(Dashboard_Active_Tab("signout"))
              }}
            >
              <div
                className={
                  activeTab === "signout"
                    ? "bg-[#ffffff] w-[50px] h-[50px] rounded-xl flex justify-center item-center"
                    : "bg-[#862A46] w-[50px] h-[50px] rounded-xl flex justify-center item-center"
                }
              >
                <Image
                  src={
                    activeTab === "signout"
                      ? "/images/dashboard/signout-b.svg"
                      : "/images/dashboard/signout-w.svg"
                  }
                  alt="logo"
                  width={35}
                  height={35}
                />
              </div>
              <div
                className={
                  activeTab === "signout"
                    ? "bg-white w-[80%] h-[50px] flex items-center mr-2 p-3 rounded-xl"
                    : "bg-[#862A46] w-[80%] h-[50px] flex items-center mr-2 p-3 rounded-xl"
                }
              >
                <p
                  className={
                    activeTab === "signout" ? "text-black" : "text-white"
                  }
                >
                  خروج از حساب کاربری
                </p>
              </div>
            </div>
            }
          </div>
          <div className="w-full h-auto bg-[#791231] rounded-2xl p-[20px] text-right">
            <p className="text-[#fff] text-[12px]">صفحه فوق با نام لندینگ جام جهانی، به صورت تخصصی به جام جهانی فوتبال قطر می‌پردازد. این صفحه به همت موسسه کلید طلایی جهان معاصر ساخته شده است.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
