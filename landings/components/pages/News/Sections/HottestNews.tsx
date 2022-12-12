import NewsContext from "../../../../contexts/NewsContext";
import {Key, useContext} from "react";
import H2 from "../../../commons/Typography/H2";
import { Swiper as Slider, SwiperSlide } from "swiper/react";
import NewsItem from "../../../commons/Card/NewsItem";
const HottestNews = () => {
    const {hottestNews} = useContext(NewsContext);
    if (!hottestNews) return null
    return <section>
        <H2 className='mb-4'>داغ ترین خبرها</H2>
        <div className='relative'>
            <Slider
                slidesPerView={4.5}
                spaceBetween={24}
                breakpoints={{
                    280: {
                        slidesPerView: 1.2,
                        spaceBetween: 12,
                    },
                    300: {
                        slidesPerView: 1.5,
                        spaceBetween: 12,
                    },
                    400: {
                        slidesPerView: 1.8,
                        spaceBetween: 12,
                    },
                    640: {
                        slidesPerView: 2.5,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2.7,
                        spaceBetween: 24,
                    },
                    900: {
                        slidesPerView: 3.3,
                        spaceBetween: 24,
                    },
                    1024: {
                        slidesPerView: 3.7,
                        spaceBetween: 24,
                    },
                }}
            >
                {
                    hottestNews.items.map((item: any) => {
                        return <SwiperSlide key={item.id}>
                            <NewsItem item={item} color="black" />
                        </SwiperSlide>
                    })
                }

            </Slider>
            <div className='z-[5] absolute top-0 left-0 bg-gradient-to-r from-white w-[92px] h-full'/>
        </div>

    </section>
}

export default HottestNews;
