import Image from "next/image";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { motion, AnimatePresence } from "framer-motion";
import { LegacyRef } from "react";
import { UserInfo } from "../../interfaces/interfaces";
type props = {
    styles:any;
    dashboardRef: LegacyRef<HTMLDivElement> | undefined;
    playRef: any;
    wheelRef: any;
    sessionParentLeaderboard: any;
    user: UserInfo;
  };
const Dashboard = ({styles, dashboardRef, playRef, wheelRef, sessionParentLeaderboard, user}:props) => {
    const handleScroll = (ref: HTMLDivElement) => {
        window.scrollTo({
            top: ref.offsetTop + 440,
            left: 0,
            behavior: "smooth",
        });
    };
    const handleScroll2 = (ref: HTMLDivElement) => {
        window.scrollTo({
            top: ref.offsetTop - 40,
            left: 0,
            behavior: "smooth",
        });
    };
    
    
    return (
        <>
            <div
                ref={dashboardRef}
                className={styles["main-page-dashboard-outer-container-xs"]}
            >
                <div className={styles["main-page-presents-title-xs"]}>
                <div className={styles["main-page-presents-title-line-xs"]}></div>
                <span className={styles["main-page-presents-title-text-xs"]}>
                    داشبورد
                </span>
                </div>
                <div
                className={styles["main-page-dashboard-inner-parent-container-xs"]}
                >
                <div className={styles["main-page-dashboard-inner-container-xs"]}>
                    <div className={styles["main-page-dashboard-top-xs"]}>
                    <div className={styles["main-page-dashboard-top-name-xs"]}>
                        {(user && digitsEnToFa(`${user?.phone}`)) || "-"}
                    </div>
                    <div className={styles["main-page-dashboard-top-coin-xs"]}>
                        <div className={styles["main-page-dashboard-top-coin-icon-xs"]}>
                        <Image
                            src="/images/sessions/starr.png"
                            width={20}
                            height={20}
                            alt="star"
                        />
                        </div>
                        <div
                        className={styles["main-page-dashboard-top-coin-value-xs"]}
                        >{user?.subscription?.subscribed ? "نامحدود" : 
                        (user && digitsEnToFa(`${user?.coin}`)) || "0"}
                        </div>
                    </div>
                    </div>
                    <div className={styles["main-page-dashboard-score-xs"]}>
                    <div className={styles["main-page-dashboard-score-item-xs"]}>
                        <div
                        className={styles["main-page-dashboard-score-item-value-xs"]}
                        >
                        {sessionParentLeaderboard?.profile[0]?.rank
                            ? digitsEnToFa(
                                `${sessionParentLeaderboard?.profile[0]?.rank}`
                            )
                            : "-"}
                        </div>

                        <div
                        className={styles["main-page-dashboard-score-item-text-xs"]}
                        >
                        رتبه تا این لحظه
                        </div>
                    </div>
                    <span
                        className={styles["main-page-dashboard-score-line-xs"]}
                    ></span>
                    <div className={styles["main-page-dashboard-score-item-xs"]}>
                        <div
                        className={styles["main-page-dashboard-score-item-value-xs"]}
                        >
                        {sessionParentLeaderboard?.profile[0]?.score
                            ? digitsEnToFa(
                                `${sessionParentLeaderboard?.profile[0]?.score}`
                            )
                            : "-"}
                        </div>

                        <div
                        className={styles["main-page-dashboard-score-item-text-xs"]}
                        >
                        امتیاز تا این لحظه
                        </div>
                    </div>
                    </div>
                    <div className={styles["main-page-dashboard-perize-xs"]}>
                    <div className={styles["main-page-dashboard-perize-value-xs"]}>
                        {/* {(user && digitsEnToFa(`${user?.wheel_iphone_chance}`)) || "0"} */}
                    </div>{" "}
                    <div className={styles["main-page-dashboard-perize-text-xs"]}>
                        شانس قرعه کشی گوشی A23
                        <br />
                        <span className="w-full text-center">({user?.wheel_iphone_chance})</span>
                    </div>
                    </div>
                    <div className={styles["main-page-dashboard-cta-xs"]}>
                    <div className={styles["main-page-dashboard-cta-item-xs"]}>
                        <div
                        className={styles["main-page-dashboard-cta-item-title-xs"]}
                        >
                        گردونه رو بچرخون و شانستو بیشتر کن!
                        </div>
                        <motion.div
                        whileTap={{ scale: 0.95 }}
                        className={styles["main-page-dashboard-cta-item-button-xs"]}
                        onClick={() => {
                            handleScroll2(wheelRef.current!);
                        }}
                        >
                        <span
                        >
                            بچرخون
                        </span>
                        </motion.div>
                    </div>
                    <div className={styles["main-page-dashboard-cta-item-xs"]}>
                        <div
                        className={styles["main-page-dashboard-cta-item-title-xs"]}
                        >
                        بازی کن و رکورد بهتر ثبت کن
                        </div>
                        <motion.div
                        whileTap={{ scale: 0.95 }}
                        className={styles["main-page-dashboard-cta-item-button-xs"]}
                        onClick={() => {
                            playRef.current && handleScroll(playRef.current!);
                        }}
                        >
                        <span
                        >
                            شروع بازی
                        </span>
                        </motion.div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
