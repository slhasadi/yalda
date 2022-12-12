import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
type props ={
    styles:any; 
    openShopModal:()=>void;
    setShowBrokePopup:(value:boolean)=> void; 
    setIsShopModal:(value:boolean)=> void; 
}
const Dashboard = ({styles, setShowBrokePopup, openShopModal, setIsShopModal}:props) => {
    return (
        <div className={styles["main-page-wheel-fead-popup-outer-container-xs"]}>
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
                  setShowBrokePopup(false);
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
                  متاسفیم
                </p>
              </div>
              <div className={styles["main-page-wheel-fead-popup-image-xs"]}>
                <Image
                  src="/images/sessions/popups/wheel-popup.jpg"
                  alt="wheel popup"
                  layout="fill"
                />
              </div>
              <h3> تاسفیم! شما از تمامی فرصت‌های خود در این لیگ برای چرخاندن گردونه استفاده کرده‌اید</h3>
              <p
                className={styles["main-page-wheel-fead-popup-text-no-money-xs"]}
              >
                 برای چرخاندن دوباره، تا لیگ بعدی صبور باشید
              </p>
              {/* <button
                className={styles["main-page-wheel-fead-popup-button-xs"]}
                onClick={() => {
                  openShopModal();
                  setIsShopModal(true);
  
                  setShowBrokePopup(false);
                  document.getElementsByTagName("body")[0].style.overflow =
                    "visible";
                }}
              >
                سکه‌های بیشتری بگیر
              </button> */}
            </motion.div>
          </AnimatePresence>
        </div>
      );
};

export default Dashboard;
