import VideoPlayer from "components/layout/VideoPlayer";
import Image from "next/image";
import Link from "next/link";
import { Parallax } from "react-scroll-parallax";
import { useDispatch } from "react-redux";
import { setAdsPlaying } from "slices/playerSlice";
import styles from "../styles/Book.module.css";
import { useEffect, useState } from "react";

const ParallaxTab = ({ interpretation, ghazal }: any) => {
  const [getNew, setGetNew] = useState("false");
  useEffect(() => {}, []);
  console.log(ghazal);

  return (
    <>
      <div className="w-[100%] h-[100vh] md:h-[auto] flex flex-col justify-center items-center relative overflow-hidden">
        <div className={styles["book-lights"]}>
          <Image
            src={"/images/parallax/lights.svg"}
            alt="table"
            layout="fill"
          />
        </div>
        <div className="flex flex-col md:flex-row-reverse justify-evenly items-center">
          <div className="mt-[150px] w-[120%] md:w-full mr-[0] h-[auto] relative flex justify-center md:justify-end">
            <div className={styles["book-container"]}>
              <ul className={styles["align"]}>
                <li
                  className={
                    getNew === "true"
                      ? styles["active-center"]
                      : "diactive-center"
                  }
                >
                  <figure className={styles["book"]} title={getNew}>
                    <ul className={styles["hardcover_front"]}>
                      <li>
                        <div className={styles["coverDesign"]}></div>
                      </li>
                      <li></li>
                    </ul>

                    <ul className={styles["page"]}>
                      <li></li>
                      <li>
                        <p className={styles["textt"]}>
                          <p>{interpretation}</p>
                        </p>
                      </li>
                      <li>
                        <p
                          className={styles["textt"]}
                          style={{ transform: "scale(-1, .7)" }}
                        >
                          {ghazal.map((item: any, index: number) => {
                            return <p key={index}>{item}</p>;
                          })}
                        </p>
                      </li>
                      <li></li>
                      <li></li>
                    </ul>

                    <ul className={styles["hardcover_back"]}>
                      <li></li>
                      <li></li>
                    </ul>
                    <ul className={styles["book_spine"]}>
                      <li></li>
                      <li></li>
                    </ul>
                  </figure>
                </li>
              </ul>
            </div>
            <Image
              src={"/images/parallax/table.png"}
              alt="table"
              width={700}
              height={700}
              objectFit={"contain"}
            />
            <div className="mt-[-10px] md:mt-[50px] w-[150px] h-[150px] absolute top-[55px] left-[100px] md:left-[200px]">
              <Image
                src={"/images/parallax/frouts.svg"}
                alt="table"
                layout="fill"
              />
            </div>
            <div className="mt-[-50px] w-[200px] h-[250px] absolute top-[0px] md:mt-[20px] left-[0px] md:left-[45px]">
              <Image
                src={"/images/parallax/sam.svg"}
                alt="table"
                layout="fill"
              />
            </div>
          </div>
          <div className="w-full text-center flex flex-col items-center justify-center mt-[-70px] z-[100]">
            <p className="text-[#fff] mb-2">فال حافظ</p>
            <button
              className="text-[#fff] bg-[#EC1B4B] z-[150] w-[180px] h-[50px] flex justify-center items-center text-[22px] mb-5 rounded-full font-bold shadow-[0_4px_20px_#EC1B4B]"
              onClick={() => {
                if (getNew === "true") {
                  setGetNew("false");
                } else {
                  setGetNew("true");
                }
              }}
            >
                 {getNew === "true" ? "بستن فال" : "نیت کن"}
            </button>
            <p className="text-[#fff] my-2 font-thin">
              برای گرفتن فال تو شب یلدا میتونی روی دکمه بالا بزنی
            </p>
            <h3 className="text-[#fff] text-[16px] md:text-[20px] mb-[20px] bold my-2 font-bold">
              شب یَلدا یا شب چلّه یکی از کهن‌ترین جشن‌های ایرانی است و از شامگاه
              سه شنبه ۳۰ آذر تا بامداد روز اول دی ماه سال ۱۴۰۱ هست.
            </h3>
            <p className="text-[#fff] text-[12px] md:text-[20px] mb-[20px] font-thin">
              به شمسی: چهارشنبه، ۳۰ آذر ۱۴۰۱ به میلادی: Wednesday, December 21,
              2022 به قمری: الأربعاء‬، ٢٦ جمادي الاولي ١٤٤٤
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParallaxTab;
