import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
type props ={
    styles:any;
    rules:string;
    setRules:(rules:string)=> void;
}
const Dashboard = ({styles, setRules, rules, setRulesPopup}:any) => {
    return (
        <div className={styles["main-page-rule-popup-outer-container-xs"]}>
          <AnimatePresence>
            <motion.div
              key="modal"
              initial={{ y: 500, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={styles["main-page-rule-popup-inner-container-xs"]}
            >
              <div className={styles["main-page-rule-popup-top-container-xs"]}>
                <div
                  className={styles["main-page-rule-popup-close-xs"]}
                  onClick={() => {
                    setRulesPopup(false)
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
                <p className={styles["main-page-rule-popup-top-title-xs"]}>
                   قوانین و مقررات
                </p>
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html: rules,
                }}
                className={styles["main-page-rule-popup-text-xs"]}
              ></p>
            </motion.div>
          </AnimatePresence>
        </div>
    );
};

export default Dashboard;
