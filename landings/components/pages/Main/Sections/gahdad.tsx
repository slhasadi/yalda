import { saveClicks } from "networks/activity";
import Image from "next/image";
import Link from "next/link";
import { useCookies } from "react-cookie";
import styles from "../styles/Main.module.scss";

const Gahdad = () => {
  const [cookies] = useCookies(["token", "lnd_org"]);
  return (
    <section className={styles["main-gahdad-container"]} id="session">
      <div className="flex relative mx-auto">
        <div className="flex flex-col justify-center flex-[50]">
          <div className="flex  flex-col items-center text-white">
            <h3 className="text-[32px] font-bold">گاهداد</h3>
            <p className="text-[18px]">{"(تقویم)"}</p>
          </div>
          <p className=" px-3 text-[13px] md:text-[25px] text-white text-center">
            شب یَلدا یا شب چلّه یکی از کهن‌ترین جشن‌های ایرانی است و از شامگاه
            سه شنبه ۳۰ آذر تا بامداد روز اول دی ماه سال ۱۴۰۱ هست.
          </p>
        </div>
        <div className="flex flex-[50] justify-center">
          <Image
            src={"/images/parallax/gahdad.svg"}
            alt="game"
            width={600}
            height={700}
          />
        </div>
      </div>
    </section>
  );
};

export default Gahdad;
