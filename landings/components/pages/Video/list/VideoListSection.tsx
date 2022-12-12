import { Feed, Item } from "../../../../interfaces/interfaces";
import VideoList from "./VideoList";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Modal from "components/commons/Modal/Modal";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
type Props = {
  list: Feed;
  setVideo: (video: Item) => void;
};
const VideoSection = ({ list, setVideo }: Props) => {
  const pagesData = useSelector((state: RootState) => state.pages.list);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [cookies, setCookies] = useCookies(["lnd_org", "token", "video_modal"]);
  useEffect(() => {
    if (!cookies.video_modal && pagesData.length > 0) {
      setIsOpenModal(true);
      setCookies("video_modal", "true");
    }
  }, [pagesData]);
  console.log(list);

  return (
    <div className="w-full mt-14 ">
      {Object.keys(list).length > 0 && (
        <VideoList
          feed={list}
          hasTitle={true}
          type="video"
          setVideo={setVideo}
        />
      )}
      <Modal
        open={isOpenModal}
        setOpen={setIsOpenModal}
        title={pagesData[0]?.popup?.title}
      >
        <p
          className="mb-2 text-[14px]"
          dangerouslySetInnerHTML={{
            __html: pagesData[0]?.popup?.description,
          }}
        ></p>
      </Modal>
    </div>
  );
};

export default VideoSection;
