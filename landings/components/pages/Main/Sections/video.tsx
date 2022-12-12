import { saveClicks } from "networks/activity";
import Image from "next/image";
import Link from "next/link";
import { useCookies } from "react-cookie";
import styles from "../styles/Main.module.scss";

const Video = () => {
  const [cookies] = useCookies(["token", "lnd_org"]);
  return (
    <section className={styles["main-sessions-container"]} id="session">
      <div className="container block md:flex relative mx-auto lg:px-6 px-3">
        <div className=" flex justify-cennter items-center">
          <div className="flex flex-[50]">
            <Image
              src={"/images/parallax/videos.png"}
              alt="game"
              width={600}
              height={700}
            />
          </div>
          <div className="flex md:hidden  flex-col items-center flex-[50] text-white">
            <h3 className="text-[32px] font-bold">خونچه چین</h3>
            <p className="text-[18px]">{"(ویدیو)"}</p>
          </div>
        </div>
        <div className={styles["main-prediction-content-parent"]}>
          <div className="hidden md:flex  flex-col items-center flex-[50] text-white">
            <h3 className="text-[32px] font-bold">خونچه چین</h3>
            <p className="text-[18px] md:text-[25px] mb-[20px]">{"(ویدیو)"}</p>
          </div>
          <p className="md:text-[25px] mb-[20px]">
            بپیش‌بینی کنید و برنده جوایز ارزشمندی شوید! کافی است پیگیر اخبار
            تیم‌ها باشید تا نتایج مسابقات
          </p>
          <div className="mb-[30px]">
            <ul className="text-[#fff]">
              <li className="flex items-center">
                زلم زیمبو <i className=" w-[30px] h-[2px] bg-white mx-[7px]" />
                تزئین
              </li>
              <li className="flex items-center">
                نوش جان <i className=" w-[30px] h-[2px] bg-white mx-[7px]" />
                غذا
              </li>
              <li className="flex items-center">
                کافی شاپ <i className=" w-[30px] h-[2px] bg-white mx-[7px]" />
                دسر و آبمیوه
              </li>
            </ul>
          </div>
          <div className="w-full h-[50px] relative flex justify-center items-center">
            <Link href="/video">
              <a
                onClick={() =>
                  saveClicks(
                    "game",
                    "page",
                    cookies["lnd_org"],
                    cookies["token"]
                  )
                }
              >
                دیدن ویدیو
              </a>
            </Link>
            <Link href="/video">
              <a
                className="animate-[ping_1000ms_ease-in-out_infinite] z-[2] opacity-75 w-[60px] text-[#fff] h-[50px] bg-[#F18800] absolute bottom-[0px]"
                onClick={() =>
                  saveClicks(
                    "game",
                    "page",
                    cookies["lnd_org"],
                    cookies["token"]
                  )
                }
              ></a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Video;
