import VideoPlayer from "components/layout/VideoPlayer";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setAdsPlaying } from "slices/playerSlice";
import styles from "../styles/Main.module.scss";

const Stadium = (setVideo: any) => {
  const stadiums = [
    {
      id: 1,
      name: "947",
      image: "/images/main-page/stadiums/s1.jpg",
      slug: "Al_Bayt_Stadium",
    },
    {
      id: 2,
      name: "اجوکیشن سیتی",
      image: "/images/main-page/stadiums/s2.jpg",
      slug: "Al_Bayt_Stadium",
    },
    {
      id: 3,
      name: "احمد بن علی",
      image: "/images/main-page/stadiums/s3.jpg",
      slug: "Al_Bayt_Stadium",
    },
    {
      id: 4,
      name: "البیت",
      image: "/images/main-page/stadiums/s4.jpg",
      slug: "Al_Bayt_Stadium",
    },
    {
      id: 5,
      name: "الثمامه",
      image: "/images/main-page/stadiums/s5.jpg",
      slug: "Al_Bayt_Stadium",
    },
    {
      id: 6,
      name: "الجنوب",
      image: "/images/main-page/stadiums/s6.jpg",
      slug: "Al_Bayt_Stadium",
    },
    {
      id: 7,
      name: "بین المللی خلیفه",
      image: "/images/main-page/stadiums/s7.jpg",
      slug: "Al_Bayt_Stadium",
    },
    {
      id: 8,
      name: "لوسیل",
      image: "/images/main-page/stadiums/s8.jpg",
      slug: "Al_Bayt_Stadium",
    },
  ];

  return (
    <section className={styles["main-stadium-container"]}>
      <div className="container relative mx-auto lg:px-6 px-3">
        <h2 className={styles["main-group-table-section-title"]}>
          استادیوم ها
        </h2>
        <div className={styles["main-stadium-items-container"]}>
          {stadiums.map((item, index) => {
            return (
              <div className={styles["main-stadium-parent"]} key={index}>
                <div className={styles["main-stadium-item"]}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={250}
                    height={400}
                    objectFit="cover"
                  />
                  <div className={styles["main-stadium-title-box"]}></div>
                  <p className={styles["main-stadium-title-box2"]}>
                    {item.name}
                  </p>
                  <div className={styles["main-stadium-hover-box"]}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stadium;
