import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { SessionRoot, Awards } from "../../interfaces/interfaces";
type props ={
    styles:any;
    sessionList:SessionRoot
}
const Prizes = ({styles,sessionList}:props) => {
    return (
        <>
            <div className={styles["main-page-presents-outer-container-xs"]}>
            <div className={styles["main-page-presents-title-xs"]}>
                <div className={styles["main-page-presents-title-line-xs"]}></div>
                <span className={styles["main-page-presents-title-text-xs"]}>
                جوایز
                </span>
            </div>
            <div className={styles["main-page-presents-inner-container-xs"]}>
                <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={5}
                breakpoints={{
                    300: {
                    slidesPerView: 3,
                    spaceBetween: -50,
                    },
                    768: {
                    slidesPerView: 4,
                    spaceBetween: -50,
                    },
                    1024: {
                    slidesPerView: 5,
                    spaceBetween: -50,
                    },
                }}
                loop={true}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                }}
                freeMode
                modules={[EffectCoverflow]}
                className={styles["main-page-presents-my-swiper-xs"]}
                >
                    {sessionList.awards.map((item:Awards,index:number)=>{
                        return(
                            <SwiperSlide
                                className={styles["main-page-presents-swiper-slider"]}
                                key={index}
                            >
                                <Image
                                priority
                                src={item.image}
                                alt={item.alt_image}
                                width={690}
                                height={690}
                                />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
            </div>
        </>
    );
};

export default Prizes;
