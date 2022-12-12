import { useDispatch, useSelector } from "react-redux";
import { Show_Modal } from "slices/guestModal";
import { RootState } from "store";
import { SSO_PATH } from "../../../globals";
import styles from "./styles/guestModal.module.scss";
const Guest = () => {
  const dospatch = useDispatch();
  const showGuestModal = useSelector((state: RootState) => state.guest.showGuestModal);
  if (showGuestModal) {
    return (
      <div className={styles["main-page-guest-popup-outer-container-xs"]}>
        <div className={styles["main-page-guest-popup-inner-container-xs"]}>
          <img
            onClick={() => {
              dospatch(Show_Modal(false))
              document.getElementsByTagName("body")[0].style.overflow =
                "visible";
            }}
            alt="close"
            src="/images/main/close.png"
            className={styles["main-page-guest-popup-close-xs"]}
          />
          <div className={styles["main-page-guest-popup-top-container-xs"]}>
            <p className={styles["main-page-guest-popup-top-title-xs"]}>
              کاربر میهمان
            </p>
          </div>
          <p className={styles["main-page-guest-popup-score-title-xs"]}>
          برای دسترسی به این بخش ها باید وارد شوید
          </p>
          <div className={styles["main-page-guest-popup-replay-container"]}>
            <div
              onClick={() => {
                dospatch(Show_Modal(false))
                document.getElementsByTagName("body")[0].style.overflow =
                  "visible";
              }}
              className={styles["main-page-guest-popup-replay-button-xs"]}
            >
              <p className={styles["main-page-guest-popup-replay-text-xs"]}>
                بیخیال
              </p>
            </div>
            <div className={styles["main-page-guest-popup-replay-button-xs"]}>
              <a
                href={SSO_PATH(window.location.hostname)}
                className={styles["main-page-guest-popup-replay-text-xs"]}
              >
                ورود
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }else{
    return(
      <></>
    )
  }
};

export default Guest;
