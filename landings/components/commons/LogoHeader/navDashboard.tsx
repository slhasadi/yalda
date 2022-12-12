import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dashboard_Active_Tab } from "slices/dashboardSlice";
import { updateUserAsync } from "../../../slices/userSlice";
import { RootState } from "store";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
const Nav = ({active,setActive}:any) => {
    const activeTab = useSelector(
        (state: RootState) => state.dashboard.activeMenuItem
      );
      const user = useSelector((state: RootState) => state.user.user);
      const dispatch = useDispatch();
      const router = useRouter();
        const [cookies] = useCookies([
            "lnd_org"
        ]);
      useEffect(()=>{
        dispatch(updateUserAsync());
      },[])
    return (
        <>
           <div className="flex flex-[50] md:hidden">
        <div
          className="p-[10px]"
          onClick={() => {
            setActive(true);
          }}
        >
          
        </div>
        {active && (
          <div className="block md:hidden h-screen fixed right-0 top-[70px] w-full z-10 bg-[#AA2E64]">
            <div className="w-full mt-[10px] p-2 flex flex-col item-center text-white">
                <div className="mb-[20px]" onClick={()=>{
                    setActive(false)
                }}>
                </div>
                <div className="w-full h-[13%] bg-[#791231] rounded-2xl mb[20px] flex item-center p-2 mb-[20px]">
                    <Image
                        src="/images/dashboard/profile.svg"
                        alt="logo"
                        width={90}
                        height={90}
                    />
                    <div className="text-white text-[24px] flex justify-center flex-col mr-[10px]">
                    <p>{user.last_name && user.first_name ? user.last_name + " " + user.first_name: "نام کاربری"}</p>
                    <p>{user?.phone}</p>
                    </div>
                </div>
                <div
                className="mb-[10px] flex w-full cursor-pointer justify-center"
                onClick={() => {
                  dispatch(Dashboard_Active_Tab("movies"))
                  setActive(false);
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
                    className="mb-[10px] flex w-full cursor-pointer justify-center"
                    onClick={() => {
                    dispatch(Dashboard_Active_Tab("prediction"))
                    setActive(false);
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
                    className="mb-[10px] flex w-full cursor-pointer justify-center"
                    onClick={() => {
                    dispatch(Dashboard_Active_Tab("musics"))
                    setActive(false);
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
                    className="mb-[10px] flex w-full cursor-pointer justify-center"
                    onClick={() => {
                    dispatch(Dashboard_Active_Tab("sales"))
                    setActive(false);
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
                    className="mb-[10px] flex w-full cursor-pointer justify-center"
                    onClick={() => {
                    dispatch(Dashboard_Active_Tab("edit"))
                    setActive(false);
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
                        alt="logo"
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
                    className="mb-[10px] flex w-full cursor-pointer justify-center"
                    onClick={() => {
                    dispatch(Dashboard_Active_Tab("signout"))
                    setActive(false);
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
          </div>
        )}
      </div>
        </>
    )
}

export default Nav;