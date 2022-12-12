import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { Leaderboard, ListLeaderboard, Session } from "../../interfaces/interfaces";
type props = {
    styles:any;
    setSessionLbd:(sessionLbd:Leaderboard | null)=> void;
    setDayLeaderboardPopup:(showDayLeaderboardPopup: Session) => void;
    showLoadeing:boolean;
    showDayLeaderboardPopup:Session;
    userRank:number | undefined;
    sessionLbd:Leaderboard | null;
}
const Dashboard = ({styles, setSessionLbd, setDayLeaderboardPopup, showLoadeing, showDayLeaderboardPopup, userRank, sessionLbd}:props) => {
    const renderItemsLeaderBpard = () => {
        return (
            <>
            {sessionLbd?.leaderboard.slice(0, 5).map((player:ListLeaderboard, index:number) => {
                return (
                <tbody
                    key={index + player.bzg_username}
                    className={styles["main-page-leaderboard-popup-top-td-xs"]}
                >
                    <tr>
                    <td data-th="rank">
                        {player?.rank > 1 ? digitsEnToFa(`${player?.rank}`) : ""}
                    </td>
                    <td data-th="name">{digitsEnToFa(`${player?.phone}`)}</td>
                    <td
                        data-th={
                        showDayLeaderboardPopup.type === "day"
                            ? "prize-day"
                            : "prize-night"
                        }
                    ></td>
                    <td data-th="score">{digitsEnToFa(`${player?.score}`)}</td>
                    </tr>
                </tbody>
                );
            })}
            {sessionLbd?.profile[0]?.rank && (
                <tbody
                className={styles["main-page-leaderboard-popup-active-top-xs"]}
                >
                <tr>
                    <td data-th="rank">
                    {digitsEnToFa(`${sessionLbd?.profile[0]?.rank}`)}
                    </td>
                    <td data-th="name">
                    {digitsEnToFa(`${sessionLbd?.profile[0]?.phone}`)}
                    </td>
                    <td data-th="prize">-</td>
                    <td data-th="score">
                    {digitsEnToFa(`${sessionLbd?.profile[0]?.score}`)}
                    </td>
                </tr>
                </tbody>
            )}
            </>
        );
    };
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
                        setSessionLbd(null);
                        setDayLeaderboardPopup({} as Session);
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
                        رتبه بندی این لیگ
                    </p>
                    </div>
                    {showLoadeing ? (
                    ""
                    ) : (
                    <div className={styles["main-page-leaderboard-popup-xs"]}>
                    <div
                        className={styles["main-page-leaderboard-popup-table-xs"]}
                    >
                        <table
                        className={styles["main-page-leaderboard-popup-top-xs"]}
                        >
                        <thead>
                            <tr
                            className={
                                styles["main-page-leaderboard-popup-top-tr-xs"]
                            }
                            >
                            <th>رتبه</th>
                            <th>نام</th>
                            <th>جایزه</th>
                            <th>امتیاز</th>
                            </tr>
                        </thead>
                        {userRank && userRank <= 5
                            ? sessionLbd?.leaderboard
                                .slice(0, 5)
                                .map((player:ListLeaderboard, index:number) => {
                                return (
                                    <tbody key={index + player.bzg_username}>
                                    <tr
                                        className={
                                        player.bzg_username ===
                                        sessionLbd?.profile[0].bzg_username
                                            ? styles[
                                                "main-page-leaderboard-popup-active-top-xs"
                                            ]
                                            : styles[
                                                "main-page-leaderboard-popup-top-xs"
                                            ]
                                        }
                                    >
                                        <td data-th="rank">
                                        {player?.rank <= 1
                                            ? ""
                                            : digitsEnToFa(player?.rank)}
                                        </td>
                                        <td data-th="phone">
                                        {digitsEnToFa(`${player?.phone}`)}
                                        </td>
                                        <td
                                        data-th={
                                            showDayLeaderboardPopup.type === "day"
                                            ? "prize-day"
                                            : "prize-night"
                                        }
                                        ></td>
                                        <td data-th="score">{`${digitsEnToFa(
                                        player?.score
                                        )}`}</td>
                                    </tr>
                                    </tbody>
                                );
                                })
                            : renderItemsLeaderBpard()}
                        </table>
                    </div>
                    </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
