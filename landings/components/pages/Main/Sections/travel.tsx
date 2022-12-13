import { saveClicks } from "networks/activity";
import Image from "next/image";
import Link from "next/link";
import { useCookies } from "react-cookie";
import styles from "../styles/Main.module.scss";

const Travel = () => {
  const [cookies] = useCookies(["token", "lnd_org"]);
  return (
    <section className={styles["main-sessions-container"]} id="session">
      <div className="flex flex-col relative mx-auto">
        <div className="flex flex-col justify-center flex-[50] mb-[30px]">
          <div className="flex  flex-col items-center text-white">
            <h3 className="text-[32px] font-bold">سفر به درون</h3>
            <p className="text-[18px]">{"(تست روانشناسی)"}</p>
          </div>
          <p className=" px-3 text-[13px] md:text-[20px] text-white text-center my-2">
            پیش‌بینی کنید و برنده جوایز ارزشمندی شوید! کافی است پیگیر اخبار
            تیم‌ها باشید تا نتایج مسابقات
          </p>
        </div>
        <div className="flex">
          <div className="flex flex-col relative mx-auto justify-between lg:px-6 px-3">
            <div className=" flex justify-cennter items-center">
              <div className="flex flex-[50] mt-[-30px]">
                <Image
                  src={"/images/parallax/travel1.svg"}
                  alt="game"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col mb-[20px] items-center flex-[50] text-white">
                <h3 className="text-[2.7vw] md:text-[1.5vw]">
                  مقبولیت اجتماعی کودکان
                </h3>
              </div>
              <div className="w-full h-[30px] relative flex justify-center items-center">
                <Link href="/contest/14">
                  <a
                    className="w-[80%] px-[5px] py-[10px] rounded-full text-center text-[14px] md:text-[20px] font-bold text-[#fff] bg-[#038652] absolute bottom-[0px]"
                    onClick={() =>
                      saveClicks(
                        "game",
                        "page",
                        cookies["lnd_org"],
                        cookies["token"]
                      )
                    }
                  >
                    دیدن مطلب
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col relative mx-auto lg:px-6 px-3">
            <div className=" flex justify-cennter items-center">
              <div className="flex flex-[50]">
                <Image
                  src={"/images/parallax/travel2.svg"}
                  alt="game"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col mb-[20px] items-center flex-[50] text-white">
                <h3 className="text-[2.7vw] md:text-[1.5vw]">
                  مقیاس وسواس فکری
                </h3>
              </div>
              <div className="w-full h-[30px] relative flex justify-center items-center">
                <Link href="/contest/17">
                  <a
                    className="w-[80%] px-[5px] py-[10px] rounded-full text-center text-[14px] md:text-[20px] font-bold text-[#fff] bg-[#038652] absolute bottom-[0px]"
                    onClick={() =>
                      saveClicks(
                        "game",
                        "page",
                        cookies["lnd_org"],
                        cookies["token"]
                      )
                    }
                  >
                    دیدن مطلب
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col relative mx-auto justify-between lg:px-6 px-3">
            <div className=" flex justify-cennter items-center">
              <div className="flex flex-[50] mt-[-30px]">
                <Image
                  src={"/images/parallax/travel3.svg"}
                  alt="game"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col mb-[20px] items-center flex-[50] text-white">
                <h3 className="text-[2.7vw] md:text-[1.5vw]">
                  رضایت زناشویی اینریچ
                </h3>
              </div>
              <div className="w-full h-[30px] relative flex justify-center items-center">
                <Link href="/contest/16">
                  <a
                    className="w-[80%] px-[5px] py-[10px] rounded-full text-center text-[14px] md:text-[20px] font-bold text-[#fff] bg-[#038652] absolute bottom-[0px]"
                    onClick={() =>
                      saveClicks(
                        "game",
                        "page",
                        cookies["lnd_org"],
                        cookies["token"]
                      )
                    }
                  >
                    دیدن مطلب
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Travel;
