import { Swiper as Slider } from "swiper/react";
import Swiper, { Navigation } from "swiper";
import React from "react";
import Image from "next/image";

Swiper.use([Navigation]);

const ContentSlider: React.FC = ({ children }) => {
  return (
    <div>
      <Slider
        slidesPerView={3}
        breakpoints={{
          300: {
            slidesPerView: 1.5,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
        }}
        navigation={{
          nextEl: "#prev-element",
          prevEl: "#next-element",
          disabledClass: "disabled-element",
        }}
        freeMode={true}
        initialSlide={0}
        className="flex flex-row justify-start w-full h-fit items-center"
      >
        <div
          id="next-element"
          className={`flex flex-row justify-center items-center z-10 cursor-pointer shadow-lg next-element absolute top-[50%] translate-y-[-50%] right-0 bg-white h-10 w-10 rounded-full`}
        >
          <Image
            height={30}
            width={30}
            src={"/images/music/right.svg"}
            alt="right"
          />
        </div>
        {children}
        <div
          id="prev-element"
          className={`flex flex-row justify-center items-center z-10 cursor-pointer shadow-lg prev-element absolute  top-[50%] translate-y-[-50%] left-0 bg-white h-10 w-10 rounded-full`}
        >
          <Image
            height={30}
            width={30}
            src={"/images/music/left.svg"}
            alt="left"
          />
        </div>
      </Slider>
    </div>
  );
};

export default ContentSlider;
