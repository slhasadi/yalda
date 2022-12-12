import BannerAds from "components/commons/BannerAds";
import Modal from "components/commons/Modal/Modal";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { Feed, Item } from "../../../interfaces/interfaces";
import Divider from "../../commons/Divider";
import MovieFeed from "./MovieFeed";
type Props = {
  list: Feed[];
  movieFeed: Feed[];
  setVideo: (video: Item) => void;
  footerPage: any;
};
const VideoSection = ({ list, movieFeed, setVideo, footerPage }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [cookies, setCookies] = useCookies(["mov_modal"]);
  const pageData = useSelector((state: RootState) => state.pages.list);
  useEffect(() => {
    if (!cookies.mov_modal) {
      setIsOpenModal(true);
      setCookies("mov_modal", "true");
    }
  }, []);
  return (
    <div className="relative w-full mt-14 bottom-14">
      {movieFeed.map((item, index) => {
        return (
          <div key={index}>
            <MovieFeed
              feed={item}
              hasTitle={true}
              type="video"
              setVideo={setVideo}
              textColor="black"
            />
            {item.slug === "movie" && <Divider />}
          </div>
        );
      })}
      <div className="w-full text-center">
        {/* <BannerAds parentClass="mx-auto aspect-[3.88/1] max-w-[970px]"> */}
          <div id="mediaad-DA6Ee" className="h-full"></div>
        {/* </BannerAds> */}
      </div>
      
      {list.map((item, index) => {
        return (
          <div key={index}>
            <MovieFeed
              feed={item}
              hasTitle={true}
              type="video"
              setVideo={setVideo}
              textColor="black"
            />
            {item.slug === "movie" && <Divider />}
          </div>
        );
      })}
      <Modal
        open={isOpenModal}
        setOpen={setIsOpenModal}
        title={pageData[0]?.popup?.title}
      >
        <p
          className="mb-2 text-[14px]"
          dangerouslySetInnerHTML={{
            __html: pageData[0]?.popup?.description,
          }}
        ></p>
      </Modal>
    </div>
  );
};

export default VideoSection;
