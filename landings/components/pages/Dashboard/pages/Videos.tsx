import { bookFileBaseURL } from "../../../../globals";
import { ProfileContentItem } from "interfaces/interfaces";
import Image from "next/image";
import React from "react";
import { SwiperSlide } from "swiper/react";
import ContentSideLayout from "../commons/ContentSideLayout";

const Videos: React.FC<{ item?: ProfileContentItem }> = ({ item }) => {
  return (
    <ContentSideLayout title="لیست فیلم های دیده شده">
      {(item?.items.length as any) > 0 ? 
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {item?.items.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div
                className={`flex flex-col rounded-lg items-right justify-start relative`}
              >
                <div
                  className={`flex rounded-lg overflow-hidden flex-row justify-center aspect-[1/1.3]`}
                >
                  {item.cover ? (
                    <div className="relative h-full w-full">
                      <Image
                        layout="fill"
                        src={bookFileBaseURL + item.cover}
                        alt={item.title}
                        objectFit="cover"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="pt-2">
                  <p
                    className={`text-center text-lg font-bold max-width-[95%] font-yekanBakh`}
                  >
                    {item.title}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </div>
      : <p className="text-center">هنوز هیچ ویدیویی مشاهده نکرده اید</p>}
    </ContentSideLayout>
  );
};

export default Videos;
