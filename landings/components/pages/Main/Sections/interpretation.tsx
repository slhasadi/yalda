import { saveClicks } from "networks/activity";
import Image from "next/image";
import Link from "next/link";
import { useCookies } from "react-cookie";
import styles from "../styles/Main.module.scss";

const Interpretation = () => {
  const [cookies] = useCookies(["token", "lnd_org"]);
  return (
    <section className={styles["main-interpretation-container"]} id="session">
      <div className="flex relative mx-auto">
        <div className="flex flex-[50] justify-center">
          <Image
            src={"/images/parallax/interpretation.svg"}
            alt="game"
            width={600}
            height={700}
          />
        </div>
        <div className="flex flex-col justify-center flex-[50]">
          <div className="flex  flex-col items-center text-white">
            <h3 className="text-[32px] font-bold">تعبیر خواب</h3>
            <p className="text-[18px]">{"(بازی)"}</p>
          </div>
          <p className=" px-3 text-[13px] md:text-[25px] text-white text-center">
            شب یَلدا یا شب چلّه یکی از کهن‌ترین جشن‌های ایرانی است و از شامگاه
            سه شنبه ۳۰ آذر تا بامداد روز اول دی ماه سال ۱۴۰۱ هست.
          </p>
          <div className="w-full h-[50px] relative flex justify-center items-center">
            <Link href="https://ayneh.tika-team.ir/cafe/dream">
              <a
                className="w-[50%] px-[5px] py-[10px] rounded-full text-center text-[18px] font-bold text-[#fff] bg-[#038652] absolute bottom-[0px]"
                onClick={() =>
                  saveClicks(
                    "game",
                    "page",
                    cookies["lnd_org"],
                    cookies["token"]
                  )
                }
              >
                دیدن تعبیر
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Interpretation;
