import { Swiper as Slider, SwiperSlide } from "swiper/react";
import Swiper, { Navigation } from "swiper";
import Image from "next/image";
import ReactGA from 'react-ga';
import Axios from "axios";
import fileDownload from "js-file-download";

import { imageAlbum, Item } from "../../../interfaces/interfaces";
import { basePath, fileBaseURL, serverSideFileURL } from "../../../globals";
import { useEffect } from "react";
type Props = {
  imageIndex: number;
  setShowImage: (bool: boolean) => void;
  imageList: Item[];
  setImageList: ([]) => void;
  setShowTrigger: (value: boolean) => void;
};
const ShowGallery = ({
  setShowImage,
  imageIndex,
  imageList,
  setShowTrigger,
}: Props) => {
  const download = (url: string, filename: string) => {
    Axios.get(url, {
      responseType: "blob",
    }).then((res) => {
      fileDownload(res.data, filename);
    });
  };

  Swiper.use([Navigation]);
  return (
    <div className="show-gallery fixed top-0 w-full h-full bg-[#202020c5] z-40">
      <div
        onClick={() => {
          setShowImage(false);
          setShowTrigger(false);
        }}
        className="absolute top-10 cursor-pointer right-10 z-50 "
      >
        {" "}
        <Image height={30} width={30} src={basePath + "/images/close.png"} alt="close" />
      </div>

      <div className="w-full h-full">
        <Slider
          navigation={{
            nextEl: ".prev-element",
            prevEl: ".next-element",
            disabledClass: "news-page-images-disable-icon-xs",
            hiddenClass: "news-page-images-hidden-icon-xs",
          }}
          centeredSlides={true}
          slidesPerView={1}
          slidesPerGroup={1}
          initialSlide={imageIndex}
          className="w-full h-full news-page-images-row-xs"
        >
          <div
            className={`flex m-4 flex-row justify-center items-center z-10 cursor-pointer shadow-lg next-element absolute top-[43%] right-0 bg-white h-10 w-10 rounded-full`}
          >
            <Image
              height={30}
              width={30}
              className=""
              alt="previous"
              src={"/images/music/right.svg"}
            />
          </div>

          {imageList.map((image, index) => (
            <SwiperSlide
              className={
                "h-[80%] w-[80%] flex flex-col justify-center items-center"
              }
              key={index}
            >
              <div className="w-full h-full flex flex-col  justify-center items-center">
                <Image
                  quality={40}
                  objectFit="contain"
                  height={800}
                  width={800}
                  priority={true}
                  alt={image.title}
                  src={`${serverSideFileURL}${image.cover}`}
                />
              </div>
              <div
                onClick={() => {
                  download(
                    `${fileBaseURL}${image.links[0].file}`,
                    `${image.title}.jpg`
                  );
                  ReactGA.event({
                    category: 'nowruz-pic',
                    action: 'download image',
                    label: image.title,
                  });
                }}
                className="w-28 h-10 mb-[-3rem] font-yekanBakh cursor-pointer font-semibold text-base rounded-full bg-primary text-white flex items-center justify-center z-10"
              >
                دانلود{" "}
              </div>
            </SwiperSlide>
          ))}
          <div
            className={`flex flex-row m-4 justify-center items-center z-10 cursor-pointer shadow-lg prev-element absolute top-[43%] left-0 bg-white h-10 w-10 rounded-full`}
          >
            <Image
              height={30}
              width={30}
              alt="next"
              src={"/images/music/left.svg"}
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default ShowGallery;
