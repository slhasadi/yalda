import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./styles/Payment.module.scss";

const PaymentPage = () => {
    const router = useRouter();
    const goBack = () => {
        router.push("/");
    };
    return (
        <div className={styles["payment"]}>
            <div className={styles["payment__logo"]}>
                <Image
                    alt="payment"
                    src={router.query.status === "succeed" ? "/images/payment/pay-success.svg" : "/images/payment/pay-faild.svg"}
                    width={500}
                    height={440}
                />
                <div
                    onClick={() => {
                        goBack();
                    }}
                    className={styles["back-btn"]}
                >
                    بازگشت به صفحه اصلی
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
