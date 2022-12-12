import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Banner } from "interfaces/interfaces";
const Banner = () => {
  const router = useRouter();
  const [bgColor, setBgColor] = useState("#8a1638");
  const [banner, setBanner] = useState<Banner>({} as Banner);
  const [tabs] = useState([
    {
        title: "اخبار",
        link: "news",
        banner: "/images/banners/news.png",
        bannerMobile: "/images/calendar/banner-mobile.jpg",
        bgColor: "#F79F2E",
    },
    {
        title: "فیلم و سریال",
        link: "movie",
        banner: "/images/banners/movie.png",
        bannerMobile: "/images/calendar/banner-mobile.jpg",
        bgColor: "#F79F2E",
    },
    {
        title: "پیش بینی",
        link: "prediction",
        banner: "/images/banners/prediction.jpg",
        bannerMobile: "/images/tabs/prediction-m.jpg",
        bgColor: "#F79F2E",
    },
    {
        title: "کتاب",
        link: "book",
        banner: "/images/banners/book.png",
        bannerMobile: "/images/haft-sin/banner-mobile.jpeg",
        bgColor: "#7AC077",
    },

    {
        title: "موسیقی",
        link: "music",
        banner: "/images/banners/music.png",
        bannerMobile: "/images/haft-sin/banner-mobile.jpeg",
        bgColor: "#7AC077",
    },
    {
        title: "ویدیو",
        link: "video",
        banner: "/images/banners/video.png",
        bannerMobile: "/images/clothes/banner-mobile.jpeg",
        bgColor: "#8a1638",
    },
    {
        title: "بازی",
        link: "game",
        banner: "/images/banners/game.jpg",
        bannerMobile: "/images/tabs/banner.svg",
        bgColor: "#8a1638",
    },
]);
  useEffect(() => {
    const filter =tabs.filter(function(tab) {
      return tab.link === router.asPath.split("/")[1];
    });
    if(filter.length){
      setBanner(filter[0]);
    }else{
      setBanner({
        title: "index",
        link: "",
        banner: "/images/tabs/banner.svg",
        bannerMobile: "/images/tabs/banner.svg",
        bgColor: "#8a1638",
    });
    }
  }, [router.asPath]);

  return (
    <>
      <div
        style={{ background: `${bgColor}` }}
        className={`w-full flex bg-[${bgColor}] flex-row items-center justify-center`}
      >
        <div
          style={{ background: `${bgColor}` }}
          className={`w-full bg-[${bgColor}] lg:block relative banner-w mt-16`}
        >
          <Image
            src={banner.banner ? banner.banner : "/images/tabs/banner.svg"}
            width={2000} 
            height={300} 
            layout="responsive" 
            objectFit="cover"
            alt={banner.title}
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
