import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Game } from "../../interfaces/interfaces";
import {sessionsBackendURL} from "../../../../../globals"
type props ={
    styles:any;
    gameRulePopup: Game;
    setGameRulePopup: (gameRulePopup: Game)=>void;
}
const Dashboard = ({styles, gameRulePopup, setGameRulePopup}:props) => {
    return (
        <div className={styles["main-page-game-rule-popup-outer-container-xs"]}>
            <AnimatePresence>
            <motion.div
                key="modal"
                initial={{ y: 500, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -500, opacity: 0 }}
                className={styles["main-page-game-rule-popup-inner-container-xs"]}
            >
                <img
                onClick={() => {
                    setGameRulePopup({} as Game);
                    document.getElementsByTagName("body")[0].style.overflow =
                    "visible";
                }}
                alt="close"
                src="/images/sessions/close.png"
                className={styles["main-page-game-rule-popup-close-xs"]}
                />
                <div
                className={styles["main-page-game-rule-popup-top-container-xs"]}
                >
                <p className={styles["main-page-game-rule-popup-top-title-xs"]}>
                    راهنمای بازی
                </p>
                </div>
                <div className={styles["main-page-game-rule-popup-image-xs"]}>
                <Image
                    src={`${sessionsBackendURL}${gameRulePopup.image}`}
                    className={styles["main-page-game-rule-popup-image-xs"]}
                    alt={gameRulePopup.title}
                    layout="fill"
                />
                </div>
                <h2>{gameRulePopup.title}</h2>
                <p
                dangerouslySetInnerHTML={{ __html: gameRulePopup.description }}
                className={styles["main-page-game-rule-popup-text-xs"]}
                ></p>
            </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
