import PlayVideo from "../../../components/commons/Icons/PlayVideo";
import { useState } from "react";
import Image from "next/image";
import { Swiper as Slider, SwiperSlide } from "swiper/react";
import Swiper, { Navigation } from "swiper";
import { Feed, Item } from "../../../interfaces/interfaces";
import { basePath, serverSideFileURL } from "../../../globals";
import { useDispatch } from "react-redux";
import { stop } from "slices/playerSlice";
import H2 from "../../commons/Typography/H2";
import { saveClicks } from "networks/activity";
import { useCookies } from "react-cookie";
import { NextImageProxy } from "components/commons/Image";
import Link from "next/link";

Swiper.use([Navigation]);

type Props = {
  feed: Feed;
  hasTitle: boolean;
  type: string;
  playing?: any;
  setVideo: (video: Item) => void;
  size?: string;
  shape?: string;
};
const Feed = ({
  feed,
  hasTitle,
  playing,
  type,
  setVideo,
  size = "larg",
  shape = "square",
}: Props) => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState<number>(0);
  const [cookies] = useCookies(["lnd_org", "token"]);
  return (
    <div className="w-full mt-6 flex flex-col items-start h-72 justify-center">
      <div className="flex w-full items-center">
        {hasTitle ? <H2 className="mb-2">{feed.title_fa}</H2> : <></>}
        <Link href={`/video/${feed.slug}`}>
          <a className="flex-[20] text-end">بیشتر ...</a>
        </Link>
      </div>
      <div className="w-full mt-2 flex flex-row justify-center">
        <Slider
          slidesPerView={3}
          breakpoints={{
            300: {
              slidesPerView: 1.25,
              spaceBetween: 16,
            },
            600: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 28,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 28,
            },
            1500: {
              slidesPerView: 4,
              spaceBetween: 28,
            },
            1700: {
              slidesPerView: 4.8,
              spaceBetween: 28,
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
          {feed.items.map((song: Item, index: number) => {
            return (
              <SwiperSlide key={index} dir={"rtl"}>
                <div className="inline-flex flex-col items-center justify-start relative h-60">
                  <div
                    onClick={() => {
                      setVideo(song);
                      saveClicks(
                        song.id,
                        song.type,
                        cookies.lnd_org,
                        cookies.token
                      );
                      // dispatch(stop());
                    }}
                    className="relative cursor-pointer flex rounded-lg overflow-hidden flex-row justify-center h-40"
                  >
                    {song.cover ? (
                      <>
                        <div className="child:fill-primary absolute top-1/2 -translate-y-1/2 z-10 h-[56px] w-[56px]">
                          <PlayVideo />
                        </div>
                        <div className="w-[300px]">
                          {song.cover?.indexOf("https://") > -1 ? (
                            NextImageProxy(
                              song.cover,
                              256,
                              145,
                              song.meta_title
                            )
                          ) : (
                            <Image
                              src={`${serverSideFileURL}${song.cover}`}
                              objectFit="cover"
                              layout="responsive"
                              height={145}
                              width={256}
                              alt={song.meta_title}
                            />
                          )}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>

                  <p className="line-clamp-2 text-right cursor-pointer mt-2 font-semibold text-romanSilver text-base xl:text-lg">
                    {song.links[0].title}
                  </p>
                  <p className="text-center cursor-pointer mt-2 font-normal text-romanSilver text-sm">
                    {song.links[0].subtitle}
                  </p>
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
    </div>
  );
};

export default Feed;
