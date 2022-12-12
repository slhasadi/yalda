import { saveClicks } from "networks/activity";
import Image from "next/image";
import Link from "next/link";
import { useCookies } from "react-cookie";
import styles from "../styles/Main.module.scss";

const Prediction = () => {
  const [cookies] = useCookies(["token", "lnd_org"]);
  return (
    <section className={styles["main-prediction-container"]} id="predict">
      <div className="container block md:flex relative mx-auto lg:px-6 px-3">
        <div className={styles["main-prediction-content-parent"]}>
          <h3>پیش بینی</h3>
          <p>
            پیش‌بینی کنید و برنده جوایز ارزشمندی شوید! کافی است پیگیر اخبار
            تیم‌ها باشید تا نتایج مسابقات را دقیق‌تر حدس بزنید. برای پیش‌بینی
            نیازی به پرداخت هزینه نخواهید داشت. وقت را از دست ندهید و پیش‌بینی
            فوتبال امشب را انجام دهید. با کمی دقت می‌توانید به رتبه‌های بالایی
            برسید و از جوایز نفیس‌تری بهره‌مند شوید.
          </p>
          <div className="w-[150px] h-[37px] relative flex">
          <Link href="/prediction">
            <a
              onClick={() =>
                saveClicks(
                  "prediction",
                  "page",
                  cookies["lnd_org"],
                  cookies["token"]
                )
              }
            >
              پیش بینی کن
            </a>
          </Link>
          <Link href="/prediction">
            <a
            className="animate-[ping_1000ms_ease-in-out_infinite] z-[2] opacity-75 w-[90px] text-[#fff] h-[35px] bg-[#F18800] absolute bottom-[0px] right-[5px]"
              onClick={() =>
                saveClicks(
                  "prediction",
                  "page",
                  cookies["lnd_org"],
                  cookies["token"]
                )
              }
            >
            </a>
          </Link>
          </div>
        </div>
        <Image
          src={"/images/main-page/predict-sec.png"}
          alt="predict"
          width={600}
          height={400}
        />
      </div>
    </section>
  );
};

export default Prediction;
