import { useState } from "react";
import Image from "next/image";
import { Swiper as Slider, SwiperSlide } from "swiper/react";
import Swiper, { Navigation } from "swiper";
import { Feed, Item } from "../../../interfaces/interfaces";
import { baseURL, serverSideFileURL } from "../../../globals";
import { useDispatch } from "react-redux";

import { play, setPlaylist } from "../../../slices/playerSlice";
import { NextImageProxy } from "components/commons/Image";

Swiper.use([Navigation]);

type Props = {
  feed: Item[];
  hasTitle: boolean;
  type: string;
  setVideo: (video: Item) => void;
  size?: string;
  shape?: string;
};
const VideoFeed = ({
  feed,
  hasTitle,
  type,
  setVideo,
  size = "larg",
  shape = "square",
}: Props) => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState<number>(0);
  const widthBS = size === "small" ? 220 : 332;
  return (
    <div className="w-full  flex flex-col items-start mt-6 justify-center">
      {hasTitle ? (
        <p className="font-yekanBakh text-base font-bold"></p>
      ) : (
        <></>
      )}

      {type === "video" ? (
        <div className="w-full mt-2 flex flex-row justify-center">
          <Slider
            slidesPerView={3}
            breakpoints={{
              300: {
                slidesPerView: 1.5,
                spaceBetween: 50,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            onInit={(event) => {
              setWidth(event.width);
            }}
            navigation={{
              nextEl: ".prev-element",
              prevEl: ".next-element",
              disabledClass: "disabled-element",
            }}
            onResize={(event) => {
              setWidth(event.width);
            }}
            freeMode={true}
            initialSlide={0}
            className="flex flex-row justify-start w-full h-60 items-center"
          >
            <div
              className={`flex flex-row justify-center items-center z-10 cursor-pointer shadow-lg next-element absolute top-14 right-0 bg-white h-10 w-10 rounded-full`}
            >
              <Image
                height={30}
                width={30}
                src={"/images/music/right.svg"}
                alt="right"
              />
            </div>
            {feed.map((song: Item, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <div
                    className={`flex flex-col rounded-lg items-right justify-start relative h-[${
                      size === "small" ? "112px" : "225px"
                    }] w-[${size === "small" ? "197px" : "305px"}]`}
                  >
                    <div
                      onClick={() => {
                        setVideo(song);
                      }}
                      className={`cursor-pointer flex rounded-lg overflow-hidden flex-row justify-center h-[${
                        size === "small" ? "112px" : "173px"
                      }] w-[${size === "small" ? "197px" : "305px"}]`}
                    >
                      {song.cover ? (
                        <div className="w-[300px]">
                          <div
                            style={{
                              height: size === "small" ? "112px" : "173px",
                            }}
                            className={`absolute z-10 h-[${
                              size === "small" ? "112px" : "173px"
                            }] w-full flex  justify-center items-center `}
                          >
                            {" "}
                            <Image
                              src={"/images/music/play-icon.svg"}
                              height={43}
                              width={43}
                              alt={song.meta_title}
                            />
                          </div>
                          {song.cover?.indexOf('https://') > -1 ? NextImageProxy(
                              song.cover,
                              256,
                              145,
                              song.meta_title
                            ): <Image
                                src={`${serverSideFileURL}${song.cover}`}
                                // objectFit='cover' layout='responsive'
                                height={size === "small" ? 112 : 173}
                                width={size === "small" ? 197 : 305}
                                alt={song.meta_title}
                              />}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="h-[52px] flex flex-col justify-center">
                      <p
                        className={` text-right  cursor-pointer max-width-[95%] font-yekanBakh text-[#FFFFFF] text-[${
                          size === "small" ? "14px" : "18px"
                        }]`}
                      >
                        {song.links[0].title}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
            <div
              className={`flex flex-row justify-center items-center z-10 cursor-pointer shadow-lg prev-element absolute top-14 left-0 bg-white h-10 w-10 rounded-full`}
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
      ) : (
        <></>
      )}
    </div>
  );
};

export default VideoFeed;
