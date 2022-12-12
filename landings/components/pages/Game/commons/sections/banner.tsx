import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Banner2 } from "../../interfaces/interfaces";
type props = {
  styles:any;
  banners: Banner2[] | any;
}
const Dashboard = ({styles, banners}:props) => {
    return (
        <div className={styles["main-page-mid-banners-outer-container-xs"]}>
          <div className={styles["main-page-mid-banners-inner-container-xs"]}>
            <Swiper
              className={styles["main-page-mid-banners-container-xs"]}
              slidesPerView={1}
            >
              {banners.map((item: any) => {
                if (item.image && item.type === "small_1column") {
                  return (
                    <SwiperSlide
                      key={item.id}
                      className={
                        styles["main-page-mid-banners-item-container-xs"]
                      } 
                    >
                      <Image
                        src={item.image}
                        className={
                          styles["main-page-mid-banners-item-cover-xs"]
                        }
                        alt={item.title}
                        layout="responsive"
                        width={960}
                        height={250}
                        priority
                      />
                    </SwiperSlide>
                  );
                }
              })}
            </Swiper>
          </div>
        </div>
    );
};

export default Dashboard;
