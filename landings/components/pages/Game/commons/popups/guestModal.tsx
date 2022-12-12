import { SSO_PATH } from "../../../../../globals";
type props ={
    styles:any;
    setShowGuestPopup:(value:boolean)=>void;
}
const Guest = ({styles, setShowGuestPopup}:props) => {
    return (
        <div className={styles["main-page-guest-popup-outer-container-xs"]}>
          <div className={styles["main-page-guest-popup-inner-container-xs"]}>
            <img
              onClick={() => {
                setShowGuestPopup(false);
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
              برای این کار باید ثبت نام کنید یا وارد شوید.
            </p>
            <div className={styles["main-page-guest-popup-replay-container"]}>
              <div
                onClick={() => {
                  setShowGuestPopup(false);
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
};

export default Guest;
