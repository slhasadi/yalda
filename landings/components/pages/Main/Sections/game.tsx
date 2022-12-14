import { saveClicks } from "networks/activity";
import Image from "next/image";
import Link from "next/link";
import { useCookies } from "react-cookie";
import styles from "../styles/Main.module.scss";

const Game = () => {
  const [cookies] = useCookies(["token", "lnd_org"]);
  return (
    <section className={styles["main-game-container"]} id="session">
      <div className="flex relative mx-auto">
        <div className="flex flex-col justify-center flex-[50]">
          <div className="flex  flex-col items-center text-white">
            <h3 className="text-[32px] font-bold">تفنن</h3>
            <p className="text-[18px]">{"(بازی)"}</p>
          </div>
          <p className=" px-3 text-[13px] md:text-[25px] mb-[20px] text-white text-center">
            پیش‌بینی کنید و برنده جوایز ارزشمندی شوید! کافی است پیگیر اخبار
            تیم‌ها باشید تا نتایج مسابقات
          </p>
          <div className="w-full h-[50px] relative flex justify-center items-center">
            <Link href="https://dorehami.keylid.com/">
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
                بازی کن
              </a>
            </Link>
          </div>
        </div>
        <div className="flex flex-[50] justify-center">
          <Image
            src={"/images/parallax/game.svg"}
            alt="game"
            width={600}
            height={700}
          />
        </div>
      </div>
    </section>
  );
};

export default Game;
