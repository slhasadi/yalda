import PlayVideo from "../../../components/commons/Icons/PlayVideo";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Swiper as Slider, SwiperSlide } from "swiper/react";
import Swiper, { Navigation } from "swiper";
import { Feed, Item } from "../../../interfaces/interfaces";
import { basePath, serverSideFileURL } from "../../../globals";
import { useDispatch } from "react-redux";
import { stop } from "slices/playerSlice";
import { play, setPlaylist } from "../../../slices/playerSlice";
import H2 from "../../commons/Typography/H2";
import { saveClicks } from "networks/activity";
import { useCookies } from "react-cookie";
import Button from "./commons/Button";
import Modal from "components/commons/Modal/Modal";

Swiper.use([Navigation]);

type Props = {
  feed: Feed;
  hasTitle: boolean;
  type: string;
  playing?:any;
  setVideo: (video: Item) => void;
  size?: string;
  shape?: string;
  textColor?: string;
};
const MovieFeed = ({
  feed,
  hasTitle,
  playing,
  type,
  setVideo,
  textColor,
  size = "larg",
  shape = "square",
}: Props) => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState<number>(0);
  const [cookies] = useCookies([
    "lnd_org",
    "token"
]);
  const [isOpenGuideModal, setIsOpenGuideModal] = useState(false)
  return (
  <>
    <div className="w-full mt-6 flex flex-col items-start justify-center">
      {hasTitle ? (
        <H2 className={`mb-2 text-${textColor}`}>{feed.title_fa}</H2>
      ) : (
        <></>
      )}
      {type === "video" ? (
        <div className="w-full mt-2 flex flex-row justify-center">
          <Slider
            slidesPerView={4}
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
            navigation={{
              nextEl: ".prev-element",
              prevEl: ".next-element",
              disabledClass: "disabled-element",
            }}
            onInit={(event) => {
              setWidth(event.width);
            }}
            onResize={(event) => {
              setWidth(event.width);
            }}
            freeMode={true}
            initialSlide={0}
            className="flex flex-row justify-start w-full h-60 items-center"
          >
            <div
              className={`flex flex-row justify-center items-center z-10 cursor-pointer shadow-lg next-element absolute right-0 bg-white h-10 w-10 rounded-full`}
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
                <SwiperSlide key={index}>
                  <div className="flex flex-col items-center justify-start relative">
                    <div
                      className="cursor-pointer flex rounded-lg overflow-hidden flex-row justify-center"
                      onClick={() => {
                        // setVideo(song)
                        // saveClicks(song.id ,song.type ,cookies.lnd_org ,cookies.token);
                        // dispatch(stop());

                      }}
                    >
                      {song.cover ? (
                        <div className="relative flex">
                          <div className="absolute z-10 h-[600px] w-[400px] flex justify-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                          </div>
                          <Image
                            src={`${serverSideFileURL}${song.cover}`}
                            height={600}
                            width={400}
                            alt={song.meta_title}
                          />
                        <Button item={song} setVideo={setVideo} lnd_org={cookies.lnd_org } token={cookies.token} setIsOpenGuideModal={setIsOpenGuideModal} />
                        </div>
                      ) : (
                        <></>
                        )}
                    </div>
                    <p className="truncate w-11/12 text-center cursor-pointer mt-2 font-semibold font-yekanBakh text-romanSilver text-base">
                      {song.links[0].title}
                    </p>
                    <p className="truncate w-11/12 text-center cursor-pointer mt-2 font-normal font-yekanBakh text-romanSilver text-sm">
                      {song.links[0].subtitle}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
            <div
              className={`flex flex-row justify-center items-center z-10 cursor-pointer shadow-lg prev-element absolute left-0 bg-white h-10 w-10 rounded-full`}
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
    <Modal open={isOpenGuideModal} setOpen={setIsOpenGuideModal} title={" تهیه اشتراک"}>
        <p className='mb-2 text-[14px]'>کاربر گرامی، برای مشاهده این فیلم نیاز به تهیه اشتراک دارید. لطفا از بخش خرید اشتراک، نسبت به تهیه اشتراک هفتگی و یا جام جهانی اقدام نمایید</p>
    </Modal>
  </>
  );
};

export default MovieFeed;
