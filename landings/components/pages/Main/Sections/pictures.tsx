import { saveClicks } from "networks/activity";
import Image from "next/image";
import { Swiper as Slider, SwiperSlide } from "swiper/react";
import Swiper, { Navigation } from "swiper";
import { useCookies } from "react-cookie";
import styles from "../styles/Main.module.scss";
Swiper.use([Navigation]);
const Picture = () => {
  const [cookies] = useCookies(["token", "lnd_org"]);
  return (
    <section className={styles["main-pics-container"]} id="session">
      <div className="flex flex-col relative mx-auto">
        <div className="flex flex-col justify-center flex-[50]">
          <div className="flex  flex-col items-center text-white">
            <h3 className="text-[32px] font-bold">نگاره</h3>
            <p className="text-[18px]">{"(عکس یلدایی)"}</p>
          </div>
          <p className=" px-3 text-[13px] md:text-[25px] text-white text-center my-2">
            پیش‌بینی کنید و برنده جوایز ارزشمندی شوید! کافی است پیگیر اخبار
            تیم‌ها باشید تا نتایج مسابقات
          </p>
        </div>
        <div className="w-full md:w-[50%] m-auto overflow-x-hidden">
          <Slider
            slidesPerView={5}
            navigation={{
              nextEl: ".prev-element",
              prevEl: ".next-element",
              disabledClass: "disabled-element",
            }}
            freeMode={true}
            initialSlide={0}
            className="!p-[6px]"
            spaceBetween={16}
            breakpoints={{
              300: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              600: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1500: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1700: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
            }}
          >
            <div
              className={`flex flex-row justify-center items-center z-10 cursor-pointer shadow-lg next-element absolute top-[42%] right-0 bg-[#EC1B4B] h-10 w-10 rounded-full`}
            >
              <Image
                height={30}
                width={30}
                src={"/images/main/arrow-right.svg"}
                alt="right"
              />
            </div>

            <SwiperSlide>
              <Image
                src={"/images/parallax/pics1.png"}
                alt="game"
                width={350}
                height={500}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={"/images/parallax/pics1.png"}
                alt="game"
                width={350}
                height={500}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={"/images/parallax/pics1.png"}
                alt="game"
                width={350}
                height={500}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={"/images/parallax/pics1.png"}
                alt="game"
                width={350}
                height={500}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={"/images/parallax/pics1.png"}
                alt="game"
                width={350}
                height={500}
              />
            </SwiperSlide>
            <div
              className={`flex flex-row justify-center items-center z-10 cursor-pointer shadow-lg prev-element absolute top-[42%] left-0 bg-[#EC1B4B] h-10 w-10 rounded-full`}
            >
              <Image
                height={30}
                width={30}
                src={"/images/main/arrow-left.svg"}
                alt="left"
              />
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Picture;
