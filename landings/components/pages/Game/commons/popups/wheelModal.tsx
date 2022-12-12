import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { useDispatch } from "react-redux";
import { Session, WheelGift, WheelLocked, WheelPopup, Winner } from "../../interfaces/interfaces";
import { updateUserAsync } from "slices/userSlice";
import { postWheelAgainData } from "networks/sessionns";
type props ={
    styles:any;
    popupRef:any;
    wheel:any;
    token:string;
    organization:number;
    wheelPopup:WheelPopup;
    wheelGift:WheelGift;
    setWheelWait:(value:WheelLocked)=> void;
    setWheelGift:(wheelGift:WheelGift)=> void;
    setWheelPopupAnimation:(value:boolean)=> void;
    setShowBrokePopup:(value:boolean)=> void;
    setWheelBrokeAnimation:(value:boolean)=> void;
    setWheelWaitAnimation:(value:boolean)=> void;
}
const Dashboard = ({
    styles,
    token,
    organization,
    popupRef,
    wheel,
    setWheelWait,
    wheelPopup,
    setWheelGift,
    wheelGift,
    setWheelPopupAnimation,
    setShowBrokePopup,
    setWheelBrokeAnimation,
    setWheelWaitAnimation
}:props) => {
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
              className={styles["main-page-wheel-fead-popup-inner-container-xs"]}
            >
              <div
                className={styles["main-page-wheel-fead-popup-close-xs"]}
                onClick={() => {
                  setWheelWait({} as WheelLocked);
                  setWheelGift({} as WheelGift);
                  setWheelPopupAnimation(true);
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
                  {wheelGift.item_type === "چرخاندن دوباره گردونه" ? (
                    "شانس مجدد گردونه"
                  ) : (
                    <>{`تبریک!`}</>
                  )}{" "}
                </p>
              </div>
              <div className={styles["main-page-wheel-fead-popup-image-xs"]}>
                <Image
                  src={wheelGift?.popup_image}
                  alt="wheel popup"
                  layout="fill"
                />
              </div>

              <p className={styles["main-page-wheel-fead-popup-text-win-xs"]}>
                {wheelGift.item_type === "چرخاندن دوباره گردونه" ? (
                  "دوباره امتحان کن!"
                ) : (
                  <>
                    {`  برنده
                ${digitsEnToFa(wheelGift.amount) + " " + digitsEnToFa(wheelGift.item_name)} شدی`}
                  </>
                )}
              </p>
              {wheelGift.item_type === "چرخاندن دوباره گردونه" ? (
                <p className={styles["main-page-wheel-fead-popup-text-sub-xs"]}>
                  این بار حتما برنده‌ای.
                </p>
              ) : (
                <>
                  <p className={styles["main-page-wheel-fead-popup-text-sub-xs"]}>
                  {wheelGift.description}
                  </p>
                </>
              )}

              {wheelGift.item_type === "چرخاندن دوباره گردونه" ? (
                <button
                  className={styles["main-page-wheel-fead-popup-button-xs"]}
                  onClick={() => {
                    document.getElementsByTagName("body")[0].style.overflow =
                      "visible";
                      postWheelAgainData(token, organization).then(async (response: any) => {
                        if (response.status === 200) {
                          setWheelGift({} as WheelGift);
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
                          setShowBrokePopup(true);
                          setWheelBrokeAnimation(true);
                        }
                      });
                  }}
                >
                  دوباره بچرخون
                </button>
              ) : (
                <button
                  className={styles["main-page-wheel-fead-popup-button-xs"]}
                  onClick={() => {
                    setWheelWait({} as WheelLocked);
                    setWheelGift({} as WheelGift);

                    document.getElementsByTagName("body")[0].style.overflow =
                      "visible";
                  }}
                >
                  متوجه شدم !
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      );
};

export default Dashboard;
