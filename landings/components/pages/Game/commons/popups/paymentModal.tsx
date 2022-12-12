import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
type props ={
    styles:any;
    rules:string;
    setRules:(rules:string)=> void;
}
const Dashboard = ({styles, paymentMessage, setPaymentMessage}:any) => {
    return (
        <div className={styles["main-page-lose-popup-outer-container-xs"]}>
          <div className={styles["main-page-lose-popup-inner-container-xs"]}>
            <div
              className={
                paymentMessage === "succeed"
                  ? styles["main-page-lose-popup-top-suceess-container-xs"]
                  : styles["main-page-lose-popup-top-failed-container-xs"]
              }
            >
              <p
                className={
                  paymentMessage === "succeed"
                    ? styles["main-page-lose-popup-top-suceess-title-xs"]
                    : styles["main-page-lose-popup-top-failed-title-xs"]
                }
              >
                نتیجه پرداخت
              </p>
            </div>
            <p className={styles["main-page-lose-popup-text-xs"]}>
              {paymentMessage === "succeed"
                ? "پرداخت موفقیت آمیز بود"
                : "هنگام پرداخت مشکلی پیش اومد"}
            </p>
            <Link
              href="/game"
            >
              <a onClick={() => {
                setPaymentMessage(null);
              }}
              className={styles["main-page-lose-popup-button-xs"]}>
              بازگشت
              </a>
            </Link>
          </div>
        </div>
      );
};

export default Dashboard;
