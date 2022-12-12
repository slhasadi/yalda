import { motion, AnimatePresence } from "framer-motion";
import { getRulesData, postWheelAgainData } from "networks/sessionns";
import { useEffect } from "react";
const Top = ({styles, setRules, organization, token, setRulesPopup}:any) => {
    useEffect(()=>{
        getRulesData(token, organization).then(async (response: any) => {
            setRules(response.data.text);
        })
    },[])
    return (
        <>
            <div className={styles["main-page-top-section-outer-container-xs"]}>
                <div className={styles["main-page-top-section-inner-container-xs"]}>
                    <div className={styles["main-page-top-section-rules-container-xs"]}>
                    <h2 className={styles["main-page-top-section-title-xs"]}>فوتبالیگا</h2>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                                setRulesPopup(true); 
                            }}
                            className={styles["main-page-top-section-rules-xs"]}
                        >
                            قوانین و مقررات
                        </motion.button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Top;
