import Image from "next/image";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { updateUserAsync } from "../../../../../slices/userSlice";
import { motion, AnimatePresence } from "framer-motion";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import {
  UserInfo,
  WheelPopup,
  WheelGift,
  WheelLocked,
} from "../../interfaces/interfaces";
import "react-notifications-component/dist/theme.css";
import { pushToast } from "../../../../../slices/toastSlice";
import { getWheelResultData } from "networks/sessionns";
type props = {
  styles:any;
  wheelPopup: WheelPopup;
  setWheelPopup: (wheelPopup: WheelPopup) => void;
  user: UserInfo;
  setShowGuestPopup: (showGuestPopup: boolean) => void;
  setWheelGift: (wheelGift: WheelGift) => void;
  setWheelWait: (wheelWait: WheelLocked) => void;
  setShowBrokePopup: (showbrokePopup: boolean) => void;
  wheel:any;
  wheelButtonRef:any;
};

const WheelSection = ({
  styles,
  setWheelGift,
  setShowGuestPopup,
  user,
  setWheelWait,
  wheelPopup,
  setWheelPopup,
  wheel,
  setShowBrokePopup,
  wheelButtonRef
}: props) => {
  const dispatch = useDispatch<any>();
  const [cookies, setCookies] = useCookies(["token", "organization"]);
  const renderWheelPopup = () => {
    return (
      <div className={styles["main-page-wheel-popup-outer-container-xs"]}>
        <div className={styles["main-page-wheel-popup-inner-container-xs"]}>
          <div className={styles["main-page-wheel-popup-rotate-container-xs"]}>
            <div className={styles["main-page-wheel-popup-rotate-button-xs"]}>
              <Image
                src="/images/sessions/wheel/wheel-button.svg"
                alt="wheel-button"
                width={76}
                height={78}
              />
            </div>
            <div className={styles["main-page-wheel-popup-rotate-marker-xs"]}>
              <Image
                src="/images/game/wheel/marker.png"
                alt="wheel-marker"
                width={37}
                height={50}
              />
            </div>
            <div className={styles["main-page-wheel-popup-rotate-frame-xs"]}>
              <div className={styles["main-page-wheel-popup-rotate-frame1-xs"]}>
                <Image
                  src="/images/game/wheel/top.png"
                  alt="wheel-frame"
                  layout="fill"
                />
              </div>
              <motion.div
                id={"GR52"}
                whileTap={{ scale: 0.95 }}
                ref={wheelButtonRef}
                onClick={() => {
                  //uncomment here to work again

                  if (!user) {
                    setShowGuestPopup(true);
                    return;
                  }
                  if (user?.is_guest) {
                    setShowGuestPopup(true);
                  } else if (user && wheelPopup.data.can_use) {
                    setWheelPopup({
                      ...wheelPopup,
                      data: { ...wheelPopup.data, can_use: false },
                    });
                      getWheelResultData(cookies.token, cookies.organization).then(async (response: any) => {
                        if (response.status === 200) {
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
                        }
                        if (response.status === 423) {
                          setWheelWait({
                            status: "locked",
                            time: wheelPopup.data.wait,
                          });
                        }
                      })
                      .catch((error) => {
                        if (error.response.status === 423) {
                          setWheelWait({
                            status: "locked",
                            time: wheelPopup.data.wait,
                          });
                        }
                        if (error.response.status === 402) {
                          setShowBrokePopup(true);
                        }
                      });
                  } else {
                    setWheelWait({
                      status: "can not turn",
                      time: wheelPopup.data.wait,
                    });
                  }

                  // comment here to work again
                  //  dispatch(
                  //           pushToast({
                  //             status: "error",
                  //             message:  "لیگ بازی به پایان رسیده",
                  //           })
                  //         );

                }}
                className={styles["main-page-wheel-popup-rotate-btn-xs"]}
              >
              </motion.div>
              <div className={styles["main-page-wheel-popup-rotate-frame2-xs"]}>
                <Image
                  src="/images/game/wheel/bottom.png"
                  alt="wheel-frame"
                  layout="fill"
                />
              </div>
              <div className={styles["main-page-wheel-popup-rotate-ghost-xs"]}>
                <Image
                  src="/images/game/wheel/ghost.png"
                  alt="wheel-frame"
                  layout="fill"
                />
              </div>
            </div>
            <div
              className={styles["main-page-wheel-popup-rotate-image-xs"]}
              ref={wheel}
            >
              <Image
                src={
                  wheelPopup?.image?.replace("https:", "http:") ||
                  "/images/sessions/wheel/placeholder.png"
                }
                alt="wheel of fortune"
                width={285}
                height={285}
              />
            </div>{" "}
          </div>{" "}
          <p className={styles["main-page-wheel-popup-description-xs"]} onClick={()=>{
            if (!user) {
              setShowGuestPopup(true);
              return;
            }
            if (user?.is_guest) {
              setShowGuestPopup(true);
            } else if (user && wheelPopup.data.can_use) {
              setWheelPopup({
                ...wheelPopup,
                data: { ...wheelPopup.data, can_use: false },
              });
              getWheelResultData(cookies.token, cookies.organization).then(async (response: any) => {
                if (response.status === 200) {
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
                }
                if (response.status === 423) {
                  setWheelWait({
                    status: "locked",
                    time: wheelPopup.data.wait,
                  });
                }
              })
              .catch((error) => {
                if (error.response.status === 423) {
                  setWheelWait({
                    status: "locked",
                    time: wheelPopup.data.wait,
                  });
                }
                if (error.response.status === 402) {
                  setShowBrokePopup(true);
                }
              });
            } else {
              setWheelWait({
                status: "can not turn",
                time: wheelPopup.data.wait,
              });
            }
          }}>
            {digitsEnToFa("بچرخون")}
          </p>
        </div>{" "}
        <div className={styles["main-page-wheel-popup-inner-text-container-xs"]}>
          <Image
            src="/images/game/wheel/text.png"
            alt="text"
            width={320}
            height={100}
          />
        </div>
        <div className={styles["main-page-wheel-popup-highlight-xs"]}></div>
      </div>
    );
  };
  return <>{renderWheelPopup()}</>;
};
export default WheelSection;
