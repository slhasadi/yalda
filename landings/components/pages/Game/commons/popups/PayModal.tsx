import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
type props ={
    styles: any;
    paymentMessage: string | null;
  setPaymentMessage: (paymentMessage: string | null) => void;
}
const Payment = ({styles, paymentMessage, setPaymentMessage}:props) => {
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
            <a
                href="zarebin://open?fastaccess=true&sso=true&title=لیگ بازی&url=https%3A%2F%2Fzarebin.baazigooshi.com%2F"
                onClick={() => {
                setPaymentMessage("");
                }}
                className={styles["main-page-lose-popup-button-xs"]}
            >
                بازگشت
            </a>
            </div>
        </div>
    );
};

export default Payment;
