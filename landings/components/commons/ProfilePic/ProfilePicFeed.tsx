import { useState } from "react";
import Image from "next/image";
import { Swiper as Slider, SwiperSlide } from "swiper/react";
import Swiper, { Navigation } from "swiper";
import { imageAlbum } from "../../../interfaces/interfaces";


import {basePath} from "../../../globals";

Swiper.use([Navigation]);

type Props = {
  albums: imageAlbum[];
  setGallery: (slug: string) => void;
  setShowTrigger: (value: boolean) => void;
};
const ProfilePicFeed = ({ albums, setShowTrigger, setGallery }: Props) => {
  const [width, setWidth] = useState<number>(0);
  return (
    <div className="postal-card">
      <div className=" w-full mt-4  flex flex-col items-start h-427 justify-center">
        <div className="w-full mt-2  flex flex-row  h-full justify-start">
          <Slider
            dir="ltr"
            slidesPerView={width > 1150 ? width / 330 : width / 273}
            onInit={(event) => {
              setWidth(event.width);
            }}
            initialSlide={0}
            navigation={{
              nextEl: ".prev-element",
              prevEl: ".next-element",
              disabledClass: "disabled-element",
            }}
            onResize={(event) => {
              setWidth(event.width);
            }}
            className="flex flex-row justify-start w-full h-full items-center"
          >
            <div
              className={`flex flex-row justify-center items-center z-10 cursor-pointer shadow-lg next-element absolute top-auto right-0 bg-white h-10 w-10 rounded-full`}
            >
              <Image
                height={30}
                width={30}
                src={"/images/music/right.svg"}
                alt="right"
              />
            </div>
            <div
              className="swiper-wrapper"
              style={{ transform: " translate3d(0px, 0px, 0px) " }}
            >
              {albums.map((album: imageAlbum) => {
                return (
                  <SwiperSlide key={album.id}>
                    <div className="flex flex-col items-center justify-start relative w-305 h-full">
                      <div
                        onClick={() => {
                          setGallery(album.slug);
                          setShowTrigger(true);
                        }}
                        className="cursor-pointer flex rounded-lg overflow-hidden flex-row justify-center h-[357px] w-[255px] "
                      >
                        {album.title ? (
                          <Image
                            src={album.cover}
                            height="427px"
                            width="305px"
                            alt={album.title_fa}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                      <p
                        style={{ bottom: "78px" }}
                        className="truncate w-11/12 text-white drop-shadow-sm text-center cursor-pointer mt-2 font-semibold font-yekanBakh  text-2xl absolute bottom-78"
                      >
                        {album.title_fa}
                      </p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </div>

            <div
              className={`flex flex-row justify-center items-center z-10 cursor-pointer shadow-lg prev-element absolute top-auto left-0 bg-white h-10 w-10 rounded-full`}
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
        <></>
      </div>
    </div>
  );
};

export default ProfilePicFeed;
