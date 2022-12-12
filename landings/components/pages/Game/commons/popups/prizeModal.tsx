import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { Session, Winner } from "../../interfaces/interfaces";
type props ={
    styles:any; 
    winners:Session;
    setWinners:(winners:Session)=> void; 
    sessionWinners:Winner[]; 
    setShowWinnersPopup:(value:boolean)=> void; 
}
const Dashboard = ({styles, setWinners, setShowWinnersPopup, sessionWinners, winners}:props) => {
    return (
        <div className={styles["main-page-leaderboard-popup-outer-container-xs"]}>
            <AnimatePresence>
            <motion.div
                key="modal"
                initial={{ y: 500, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -500, opacity: 0 }}
                className={styles["main-page-leaderboard-popup-inner-container-xs"]}
            >
                <div
                className={styles["main-page-leaderboard-popup-close-xs"]}
                onClick={() => {
                    setShowWinnersPopup(false);
                    setWinners({} as Session);
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
                className={
                    styles["main-page-leaderboard-popup-top-container-xs"]
                }
                >
                <p
                    className={
                    styles["main-page-leaderboard-popup-top-title-xs"]
                    }
                >
                    برندگان این لیگ
                </p>
                </div>
                {Object.keys(sessionWinners).length > 0 ? (
                <div className={styles["main-page-leaderboard-popup-xs"]}>
                <div
                    className={styles["main-page-leaderboard-popup-table-xs"]}
                >
                    <table
                    className={styles["main-page-leaderboard-popup-top-xs"]}
                    >
                    <thead
                        className={
                        styles["main-page-leaderboard-popup-top-tr-xs"]
                        }
                    >
                        <tr>
                        <th>نام کاربری</th>
                        <th>جایزه</th>
                        </tr>
                    </thead>
                    {sessionWinners.slice(0, 5).map((player, index) => {
                        return (
                        <tbody
                            key={index + player.winner_name}
                            className={
                            styles["main-page-leaderboard-popup-top-xs"]
                            }
                        >
                            <tr>
                            <td data-th="phone">
                                {digitsEnToFa(`${player?.winner_name}`)}
                            </td>
                            <td
                                data-th={
                                winners.type === "day"
                                    ? "prize-day"
                                    : "prize-night"
                                }
                            ></td>
                            </tr>
                        </tbody>
                        );
                    })}
                    </table>
                </div>
                </div>
                ) : (
                <div className="mt-[40px]">
                    <Image
                    src="/images/loading.gif"
                    alt="loading"
                    height={45}
                    width={45}
                    />
                </div>
                )}
                
            </motion.div>
            </AnimatePresence>
        </div> 
    );
};

export default Dashboard;
