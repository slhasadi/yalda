import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { UserInfo, SkuShop, Video } from "../../interfaces/interfaces";
import { useCookies } from "react-cookie";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import React from "react";
import { useDispatch } from "react-redux";
import { setShopData } from "slices/shopModal";

type props = {
  styles:any;
  setShowGameStartModal: (show: any) => void;
  showGameStartModal: any;
  user: UserInfo;
  setShowGuestPopup: (value: boolean) => void;
  setShowShopList: (value: boolean) => void;
  isShopModal: boolean;
  buySku: (skuItem: SkuShop) => void;
  shopLists: SkuShop[];
  setVideoType: (tyoe: string) => void;
  setVideo: (video: Video) => void;
  setShowVideo: (value: boolean) => void;
};

const ShopModal = ({
  styles,
  setShowGuestPopup,
  user,
  setShowShopList,
  setShowGameStartModal,
  isShopModal,
  buySku,
  shopLists,
  setVideoType,
  setVideo,
  setShowVideo,
}: props) => {
  const [cookies, setCookies] = useCookies([
    "game-type",
    "selected-game-id",
    "session-game-id",
    "session-id",
    "token",
    "organization",
    "sessionId",
    "parrent_session-id",
  ]);
  const dispatch = useDispatch()
// if(shopList.length){
  return (
    <div className={styles["main-page-shop-modal-outer-container-xs"]}>
      <AnimatePresence>
        <motion.div
          key="modal"
          initial={{ y: 500, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -500, opacity: 0 }}
          className={styles["main-page-shop-modal-inner-container-xs"]}
        >
          <div className={styles["main-page-shop-modal-top-container-xs"]}>
            <div
              onClick={() => {
                setShowShopList(false);
                setShowGameStartModal && setShowGameStartModal(null);
                document.getElementsByTagName("body")[0].style.overflow ="visible";
                dispatch(setShopData([]));
              }}
              className={styles["main-page-shop-modal-top-close-xs"]}
            >
              <Image
                alt="close"
                height={16}
                width={16}
                src="/images/sessions/close.png"
                priority={true}
              />
            </div>
            <p className={styles["main-page-shop-modal-top-title-xs"]}>
              {isShopModal ? "فروشگاه" : "سکه های شما تمام شده"}
            </p>
          </div>
          <div className={styles["main-page-shop-modal-bottom-container-xs"]}>
            {shopLists.map((sku, index) => {
              return (
                <div
                  key={index}
                  className={styles["main-page-shop-modal-item-container-xs"]}
                >
                  <div className={styles["main-page-shop-modal-item-image-xs"]}>
                    <Image src={sku.picture ? sku.picture : "/images/calendar/gift.png"} alt={sku.title} width={188} height={52} />
                  </div>
                  <div className={styles["main-page-shop-modal-item-text-xs"]}>
                    <p>
                      فقط: <span> {digitsEnToFa(`${sku.price}`)} تومان</span>
                    </p>
                  </div>
                  <button
                    id={"SH52"}
                    onClick={() => {
                      if (user?.is_guest) {
                        setShowGuestPopup(true);
                        setShowShopList(false);
                        setShowGameStartModal(null);
                        document.getElementsByTagName(
                          "body"
                        )[0].style.overflow = "visible";
                      } else {
                        buySku(sku);
                      }
                    }}
                    className={styles["main-page-shop-modal-item-button-xs"]}
                  >
                    خرید بسته
                  </button>
                </div>
              );
            })}
            {/* {isShopModal ? (
              <></>
            ) : (
              <button
                id={"VR53"}
                className={styles["main-page-shop-modal-item-ads-video-xs"]}
                onClick={() => {
                  axios({
                    method: "get",
                    url: `${sessionsBackendURL}v1/tp_utl/advertisement/?org=${cookies.organization}`,
                    headers: {
                      Authorization: `jwt ${cookies.token}`,
                    },
                  }).then((response) => {
                    if (response.status === 200) {
                      if (response.data.can_view) {
                        setShowShopList(false);
                        setVideoType("begin-game");
                        setVideo(response.data);
                        setShowVideo(true);
                      } else {
                        setShowShopList(false);
                        document.getElementsByTagName(
                          "body"
                        )[0].style.overflow = "visible";
                        Store.addNotification({
                          title: "متاسفیم",
                          message:
                            "میزان مجاز مشاهده تبلیغ برای شما به اتمام رسیده است",
                          type: "danger",
                          insert: "top",
                          container: "top-right",
                          animationIn: ["animate__animated", "animate__fadeIn"],
                          animationOut: [
                            "animate__animated",
                            "animate__fadeOut",
                          ],
                          dismiss: {
                            duration: 5000,
                            onScreen: true,
                          },
                        });
                      }
                    }
                  });
                }}
              >
                برای ادامه تبلیغ ببین
              </button>
            )} */}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
// }else{
//   return(
//     <></>
//   )
// }
};

export default React.memo(ShopModal);
