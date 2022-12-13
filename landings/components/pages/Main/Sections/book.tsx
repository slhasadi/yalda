import { saveClicks } from "networks/activity";
import Image from "next/image";
import Link from "next/link";
import { useCookies } from "react-cookie";
import styles from "../styles/Main.module.scss";

const Interpretation = () => {
  const [cookies] = useCookies(["token", "lnd_org"]);
  return (
    <section className={styles["main-book-container"]} id="session">
      <div className="flex relative mx-auto">
        <div className="flex flex-[50] justify-center">
          <Image
            src={"/images/parallax/boook.svg"}
            alt="game"
            width={600}
            height={700}
          />
        </div>
        <div className="flex flex-col justify-center flex-[50]">
          <div className="flex  flex-col items-center text-white">
            <h3 className="text-[22px] font-bold">کتاب صوتی دورهمــــی</h3>
          </div>
          <p className=" px-3 text-[13px] md:text-[25px] text-white text-center">
            در مورد دورهمی های ایرانی بیشتر بدانیم
          </p>
        </div>
      </div>
      <div className="w-full md:w-[650px] m-auto h-[50px] relative flex justify-center items-center mt-[20px]">
        <Link href="/book">
          <a
            className="w-[50%] px-[5px] py-[10px] rounded-full text-center text-[18px] font-bold text-[#fff] bg-[#038652] absolute bottom-[0px]"
            onClick={() =>
              saveClicks("game", "page", cookies["lnd_org"], cookies["token"])
            }
          >
            گوش کن
          </a>
        </Link>
      </div>
    </section>
  );
};

export default Interpretation;
