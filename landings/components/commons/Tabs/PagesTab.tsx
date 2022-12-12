import { Swiper as Slider, SwiperSlide, useSwiper } from "swiper/react";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { basePath } from "../../../globals";
import Link from "../Link";
import Book from "../Icons/Book";
import Stack from "../Stack";
import Game from "../Icons/Game";
import Music from "../Icons/Music";
import Video from "../Icons/Video";
import Prediction from "../Icons/Prediction";
import News from "../Icons/News";
import FilmSerial from "../Icons/FilmSerial";
import Container from "../Container";
import Divider from "../Divider";
import { Navigation } from "swiper";
import { BASE_PATH_NEWS_PAGE } from "../../../helpers/links";
import { useCookies } from "react-cookie";
import { saveClicks } from "networks/activity";
import { getPagesData } from "networks/pages";
import { Pages } from "interfaces/interfaces";
import { replaceUrl } from "../../../globals";
import { useDispatch } from "react-redux";
import { Pages_Data } from "slices/pagesDataSlice";
const PagesTab = () => {
  type Tab = {
    title: string;
    link: string;
    banner: string;
    bannerMobile: string;
    icon: any;
    bgColor: string;
    slug: string;
  };
  const [pages, setPages] = useState<Pages[]>([] as Pages[]);
  const [pagesActive, setPagesActive] = useState(true);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(`/${router.asPath.split("/")[1]}`);
  const [cookies, setCookies] = useCookies(["token", "lnd_org", "menu_items"]);
  const dispatch = useDispatch();
  const handleActiveTab = (link: string | null = null, slug: string) => {
    if (link) {
      setActiveTab(link);
      saveClicks(slug, "page", cookies["lnd_org"], cookies["token"]);
    } else {
      setActiveTab(`/${router.asPath.split("/")[1]}`);
    }
  };
  const [tabs, _setTabs] = useState<Array<Tab>>([
    {
      title: "اخبار",
      link: BASE_PATH_NEWS_PAGE,
      slug: "news",
      banner: basePath + "/images/calendar/banner.jpg",
      bannerMobile: basePath + "/images/calendar/banner-mobile.jpg",
      icon: <News />,
      bgColor: "#F79F2E",
    },
    {
      title: "فیلم و سریال",
      link: "/movie",
      banner: basePath + "/images/calendar/banner.jpg",
      bannerMobile: basePath + "/images/calendar/banner-mobile.jpg",
      icon: <FilmSerial />,
      bgColor: "#F79F2E",
      slug: "movie",
    },
    {
      title: "پیش بینی",
      link: "/prediction",
      banner: basePath + "/images/calendar/banner.jpg",
      bannerMobile: basePath + "/images/calendar/banner-mobile.jpg",
      icon: <Prediction />,
      bgColor: "#F79F2E",
      slug: "prediction",
    },
    {
      title: "کتاب",
      link: "/book",
      banner: basePath + "/images/haft-sin/banner.jpeg",
      bannerMobile: basePath + "/images/haft-sin/banner-mobile.jpeg",
      icon: <Book />,
      bgColor: "#7AC077",
      slug: "book",
    },
    {
      title: "موسیقی",
      link: "/music",
      banner: basePath + "/images/haft-sin/banner.jpeg",
      bannerMobile: basePath + "/images/haft-sin/banner-mobile.jpeg",
      icon: <Music />,
      bgColor: "#7AC077",
      slug: "music",
    },
    {
      title: "ویدیو",
      link: "/video",
      banner: "/images/tabs/banner.svg",
      bannerMobile: basePath + "/images/clothes/banner-mobile.jpeg",
      icon: <Video />,
      bgColor: "#8a1638",
      slug: "video",
    },
    {
      title: "بازی",
      link: "/game",
      banner: "/images/tabs/banner.svg",
      bannerMobile: "/images/tabs/banner.svg",
      icon: <Game />,
      bgColor: "#8a1638",
      slug: "game",
    },
  ]);
  useEffect(() => {
    getPagesData(cookies.lnd_org, cookies.token).then(async (res: any) => {
      setPages(
        res.data.filter(function (el: any) {
          return el.type === "menu";
        })
      );
      dispatch(Pages_Data(res.data));
    });
  }, [router]);
  const renderTab = (
    title: string,
    link: string,
    icon: null | ReactElement,
    slug: string
  ) => {
    const isActive = activeTab === link;
    return (
      <div key={title} className="inline-block mx-4 my-4">
        {!isActive ? (
          <Link href={link} passHref>
            <Stack
              onClick={() => {
                handleActiveTab(link, slug);
                dispatch(Pages_Data([]));
              }}
              className={`flex-col w-32 p-2 md:p-4 lg:p-6 gap-x-2 rounded-xl items-center justify-center ${
                isActive ? "bg-primary" : "bg-box-main"
              }`}
            >
              <span
                className={`h-[32px] w-[32px] md:h-[36px] md:w-[36px] lg:h-[42px] lg:w-[42px]`}
              >
                <Image
                  src={icon ? (icon as any) : "/"}
                  alt=""
                  width={54}
                  height={54}
                />
              </span>
              <span className="lg:text-2xl font-medium text-sm text-black whitespace-nowrap">
                {title}
              </span>
            </Stack>
          </Link>
        ) : (
          <Stack
            onClick={() => handleActiveTab(link, slug)}
            className={`flex-col w-32 p-2 md:p-4 lg:p-6 gap-x-2 rounded-xl items-center justify-center ${
              isActive ? "bg-primary" : "bg-box-main"
            }`}
          >
            <span
              className={`h-[32px] w-[32px] md:h-[36px] md:w-[36px] lg:h-[42px] lg:w-[42px]`}
              style={{
                filter:
                  "invert(98%) sepia(0%) saturate(2476%) hue-rotate(86deg) brightness(198%) contrast(119%)",
              }}
            >
              <Image
                src={icon ? (icon as any) : "/"}
                alt=""
                width={54}
                height={54}
              />
            </span>
            <span className="lg:text-2xl font-medium text-sm text-white whitespace-nowrap">
              {title}
            </span>
          </Stack>
        )}
      </div>
    );
  };
  return (
    <>
      {pages.length > 0 && (
        <Container>
          {router.asPath.split("/")[1] === "org" ? (
            <></>
          ) : (
            <nav className="w-full md:w-full ">
              <div className="hidden lg:flex justify-between w-full overflow-x-auto">
                {pages.map((item, index) => {
                  return renderTab(
                    item.title,
                    item.meta_url,
                    item.icon as any,
                    item.slug
                  );
                })}
              </div>
              <div className="lg:hidden">
                <Slider
                  dir="rtl"
                  slidesPerView="auto"
                  className="tabs-swiper"
                  navigation={true}
                  modules={[Navigation]}
                >
                  {pages.map((item, index) => {
                    return (
                      <SwiperSlide
                        key={index}
                        className="w-auto"
                        style={{
                          width:
                            item.meta_url === activeTab
                              ? "max-content"
                              : "unset",
                          paddingLeft:
                            index === pages.length - 1 ? "36px" : "unset",
                        }}
                      >
                        {renderTab(
                          item.title,
                          item.meta_url,
                          item.icon as any,
                          item.slug
                        )}
                      </SwiperSlide>
                    );
                  })}
                </Slider>
              </div>
              {/* <Divider /> */}
            </nav>
          )}
        </Container>
      )}
    </>
  );
};

export default PagesTab;
