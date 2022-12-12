import { serverSideFileURL } from "../../../globals";
import Image from "next/image";
import { Item } from "../../../interfaces/interfaces";

type Props = {
  imageList: Item[];
  setShowImage: (bool: boolean) => void;

  imageIndex: number;
  setImageIndex: (number: number) => void;
};
const Gallery = ({ imageList, setShowImage, setImageIndex }: Props) => {
  return (
    <div className="w-full mt-4 flex flex-col items-center  justify-center">
      <div
        dir="ltr"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  auto-rows-fr mb-[56px] "
      >
        {imageList &&
          imageList.map((image: any, index) =>
            index === 0 ? (
              <div
                key={image.id}
                className="gallery-image row-span-2 border border-white cursor-pointer col-span-2"
                onClick={() => {
                  setImageIndex(index);
                  setShowImage(true);
                }}
              >
                <Image
                  width="500px"
                  height="500px"
                  key={imageList[0].id}
                  src={`${serverSideFileURL}${imageList[0].links[0].file}`}
                  alt="نوروز "
                />
              </div>
            ) : (
              <div
                key={image.id}
                className="gallery-image cursor-pointer border border-white "
                onClick={() => {
                  setImageIndex(index);
                  setShowImage(true);
                }}
              >
                <Image
                  onClick={() => {
                    setImageIndex(index);
                  }}
                  width="300px"
                  height="300px"
                  key={image.id}
                  src={`${serverSideFileURL}${image.cover}`}
                  alt={image.title}
                />
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default Gallery;
