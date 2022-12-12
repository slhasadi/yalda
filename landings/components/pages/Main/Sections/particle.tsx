import { saveClicks } from "networks/activity";
import Image from "next/image";
import Link from "next/link";
import { useCookies } from "react-cookie";
import styles from "../styles/Main.module.scss";

const Particle = () => {
  const [cookies] = useCookies(["token", "lnd_org"]);
  return (
    <section className={styles["main-sessions-container"]} id="session">
      <div className="flex flex-col relative mx-auto justify-between lg:px-6 px-3">
        <div className=" flex justify-cennter items-center">
          <div className="flex flex-[50] mt-[-30px]">
            <Image
              src={"/images/parallax/part2.svg"}
              alt="game"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div>
          <div className="flex flex-col mb-[20px] items-center flex-[50] text-white">
            <h3 className="text-[22px] font-bold">گرامافون</h3>
          </div>
          <div className="w-full h-[30px] relative flex justify-center items-center">
            <Link href="/music">
              <a
                className="w-[80%] px-[5px] py-[10px] rounded-full text-center text-[18px] font-bold text-[#fff] bg-[#038652] absolute bottom-[0px]"
                onClick={() =>
                  saveClicks(
                    "game",
                    "page",
                    cookies["lnd_org"],
                    cookies["token"]
                  )
                }
              >
                گوش کن
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col relative mx-auto lg:px-6 px-3">
        <div className=" flex justify-cennter items-center">
          <div className="flex flex-[50]">
            <Image
              src={"/images/parallax/part1.svg"}
              alt="game"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div>
          <div className="flex flex-col mb-[20px] items-center flex-[50] text-white">
            <h3 className="text-[22px] font-bold">عافیت</h3>
          </div>
          <div className="w-full h-[30px] relative flex justify-center items-center">
            <Link href="/news">
              <a
                className="w-[80%] px-[5px] py-[10px] rounded-full text-center text-[18px] font-bold text-[#fff] bg-[#038652] absolute bottom-[0px]"
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
    </section>
  );
};

export default Particle;
