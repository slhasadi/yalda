import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { UserInfo, SkuShop, Video, PaySku } from "../../pages/Game/interfaces/interfaces";
import { useCookies } from "react-cookie";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShopData } from "slices/shopModal";
import { postPayData } from "networks/sessionns";
import styles from "./styles/ShopModal.module.scss"
import { RootState } from "store";

const ShopModal = () => {
  const shopLists = useSelector((state: RootState) => state.shop.ShopList);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies([
    "organization",
    "token",
    "pToken",
    "parent_session",
  ]);
  const getPayUrl = (data: PaySku, item: SkuShop) => {
    const { detail, token, platform_token } = data;
    if (detail === "succeed") {
      window.location.href = platform_token;
    }
  };
  useEffect(()=>{
    if (shopLists.length === 0) {
      document.getElementsByTagName(
        "body"
      )[0].style.overflow = "visible";
    }
  },[shopLists])
  if (shopLists.length >0 ) {
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
                فروشگاه
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
                          // setShowGuestPopup(true);
                          // setShowShopList(false);
                          // setShowGameStartModal(null);
                          document.getElementsByTagName(
                            "body"
                          )[0].style.overflow = "visible";
                        } else {
                            let req = {
                              sku_id: sku.id,
                              gateway: "sadad",
                            };
                            postPayData(cookies.token, req, cookies.organization).then(async (response: any) => {
                              getPayUrl(response.data, sku);
                            });
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
  }else{
    return(
      <></>
    )
  }
};

export default React.memo(ShopModal);
