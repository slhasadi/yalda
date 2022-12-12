import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { Session, UserInfo, WheelGift, WheelLocked, WheelPopup, Winner } from "../../interfaces/interfaces";
import { updateUserAsync } from "slices/userSlice";
import { useDispatch } from "react-redux";
import { pushToast } from "slices/toastSlice";
import { postWheelAgainData } from "networks/sessionns";
import { shopList } from "slices/shopModal";
type props ={
    styles:any;
    popupRef:any;
    wheel:any;
    token:string;
    organization:number;
    wheelPopup:WheelPopup;
    wheelWait: WheelLocked;
    remaingTime:string;
    user:UserInfo;
    setWheelWait:(value:WheelLocked)=> void;
    setWheelGift:(wheelGift:WheelGift)=> void;
    setWheelPopupAnimation:(value:boolean)=> void;
    setShowBrokePopup:(value:boolean)=> void;
    setWheelBrokeAnimation:(value:boolean)=> void;
    setWheelWaitAnimation:(value:boolean)=> void;
}
const Dashboard = (
    {
        styles,
        token,
        organization,
        popupRef,
        wheel,
        setWheelWait,
        wheelPopup,
        setWheelGift,
        wheelWait,
        remaingTime,
        setShowBrokePopup,
        user,
        setWheelWaitAnimation,
    }:props
) => {
    const dispatch = useDispatch<any>();
    return (
        <div
          ref={popupRef}
          className={styles["main-page-wheel-fead-popup-outer-container-xs"]}
        >
          <AnimatePresence>
            <motion.div
              key="modal"
              initial={{ y: 500, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -500, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={styles["main-page-wheel-fead-popup-inner-container-xs"]}
            >
              <div
                className={styles["main-page-wheel-fead-popup-close-xs"]}
                onClick={() => {
                  setWheelWait({} as WheelLocked);
                  setWheelGift({} as WheelGift);

                  document.getElementsByTagName("body")[0].style.overflow =
                    "visible";
                }}
              >
                <Image
                  alt="close"
                  src="/images/sessions/close.png"
                  width={16}
                  height={16}
                  priority={true}
                />
              </div>
              <div
                className={styles["main-page-wheel-fead-popup-top-container-xs"]}
              >
                <p className={styles["main-page-wheel-fead-popup-top-title-xs"]}>
                  صبور باشید
                </p>
              </div>
              {/* <div className={styles["main-page-wheel-fead-popup-image-xs"]}>
                <Image
                  src="/images/sessions/popups/wheel-popup.jpg"
                  alt="wheel popup"
                  layout="fill"
                />
              </div> */}
              {wheelWait.status !== "locked-sesion" ? (<>
                <h3>متاسفیم! شما از فرصت‌ رایگان خود برای چرخاندن گردونه در این لیگ استفاده کرده‌اید</h3>
                  <div className={styles["main-page-wheel-fead-popup-mid-xs"]}>
                    <span className={styles["main-page-wheel-fead-popup-text-xs"]}>
                      برای چرخوندن دوباره
                    </span>
                    <span className={styles["main-page-wheel-fead-popup-time-xs"]}>
                      {` ${digitsEnToFa(remaingTime)} صبر کنید`}
                    </span>
                    <span
                      className={styles["main-page-wheel-fead-popup-time-image-xs"]}
                    >
                      <Image
                        width={55}
                        height={60}
                        src="/images/sessions/timer.svg"
                        alt="timer"
                      />
                    </span>
                  </div>
                </>
              ) : (
                <>
                <h3>
                  متاسفیم! شما از تمامی فرصت‌های خود در این لیگ برای چرخاندن گردونه استفاده کرده‌اید
                </h3>
                <div className={styles["main-page-wheel-fead-popup-mid-xs"]}>
                    <span className={styles["main-page-wheel-fead-popup-text-xs"]}>
                      برای چرخوندن دوباره
                    </span>
                    <span className={styles["main-page-wheel-fead-popup-time-xs"]}>
                      {` ${digitsEnToFa(remaingTime)} صبر کنید`}
                    </span>
                    <span
                      className={styles["main-page-wheel-fead-popup-time-image-xs"]}
                    >
                      <Image
                        width={55}
                        height={60}
                        src="/images/sessions/timer.svg"
                        alt="timer"
                      />
                    </span>
                  </div>
                </>
              )}
              {wheelWait.status !== "locked-sesion" && (
                <div className={styles["main-page-wheel-fead-popup-or-xs"]}>
                  و یا از فرصت‌های اشتراک خود برای چرخاندن گردونه استفاده نمایید
                </div>
              )}{" "}
              <button
                className={styles["main-page-wheel-fead-popup-button-xs"]}
                onClick={() => {
                  if (user?.subscription?.subscribed) {
                    if (wheelWait.status === "locked-sesion") {
                        setWheelWait({} as WheelLocked);
                        document.getElementsByTagName("body")[0].style.overflow =
                          "visible";
                    }
                    if (wheelWait.status !== "locked-sesion") {
                      postWheelAgainData(token, organization).then(async (response: any) => {
                        if (response.status === 200) {
                          popupRef.current!.style.opacity = "0";

                          let rotate_times = response.data.rotate_times;
                          let order = response.data.wheel_win_item.order;
                          let wheel_items_number =
                            response.data.wheel_items_number;
                          dispatch(updateUserAsync());
                          wheel.current.style.transition = `transform 3s ease-in-out`;
                          wheel.current.style.transform = `rotate(${
                            rotate_times * 360 -
                            order * (360 / wheel_items_number)
                          }deg)`;
                          wheel.current.style.transition = ``;

                          setTimeout(() => {
                            setWheelGift(response.data.wheel_win_item);
                            wheel.current.style.transition = `transform .1s ease-in-out`;
                            wheel.current.style.transform = `rotate(0deg)`;
                          }, 5000);

                          setTimeout(() => {
                            setWheelWait({} as WheelLocked);
                            setWheelGift(response.data.wheel_win_item);
                            setWheelWaitAnimation(true);
                            document.getElementsByTagName(
                              "body"
                            )[0].style.overflow = "visible";
                          }, 5200);
                        }
                      })
                      .catch((error) => {
                        if (error.response.status === 423) {
                          setWheelWait({
                            status: "locked-sesion",
                            time: wheelPopup.data.wait,
                          });
                        }
                        if (error.response.status === 402) {
                          setWheelWait({} as WheelLocked);
                          setWheelGift({} as WheelGift);

                          setShowBrokePopup(true);
                        }
                      });
                    }
                  } else {
                    setWheelWaitAnimation(false);
                    // setShowBrokePopup(true);
                    dispatch(shopList());

                    setWheelWait({} as WheelLocked);
                    setWheelGift({} as WheelGift);

                    document.getElementsByTagName("body")[0].style.overflow =
                      "visible";
                  }
                }}
              >
                {wheelWait.status !== "locked-sesion" ? (
                  <>
                    <span
                      className={
                        styles["main-page-wheel-fead-popup-button-text-xs"]
                      }
                    >
                      {"استفاده از فرصت اشتراک"}
                    </span>{" "}
                    {/* <span
                      className={
                        styles["main-page-wheel-fead-popup-button-icon-xs"]
                      }
                    >
                      <Image
                        src="/images/sessions/starr-white.svg"
                        alt="coin"
                        width="20"
                        height={20}
                      />{" "}
                    </span>
                    <span>{digitsEnToFa(100)}</span> */}
                  </>
                ) : (
                  <span
                    onClick={() => {
                      setWheelWait({} as WheelLocked);
                      setWheelGift({} as WheelGift);
                      document.getElementsByTagName("body")[0].style.overflow =
                        "visible";
                    }}
                  >
                    {"بستن"}
                  </span>
                )}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
    );
};

export default Dashboard;
