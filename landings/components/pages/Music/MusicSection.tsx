import { Feed, Item } from "../../../interfaces/interfaces";
import MusicFeed from "./Feed";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Modal from "components/commons/Modal/Modal";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
type Props = {
  list: Feed[];
  setVideo: (video: Item) => void;
};

const MusicSection = ({ list, setVideo }: Props) => {
  const pagesData = useSelector((state: RootState) => state.pages.list);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [cookies, setCookies] = useCookies([
    "lnd_org",
    "token",
    "music_modal"
  ]);
  useEffect(() => {
    if (!cookies.music_modal && pagesData.length>0) {
      setIsOpenModal(true);
      setCookies("music_modal", "true");
    }
  }, [pagesData]);
  return (
    <>
      {
        list.map((item, index) => <MusicFeed
            key={index}
            feed={item}
            hasTitle={true}
            type="audio"
            setVideo={setVideo}
            textColor="black"
        />)
      }
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
    </>
  );
};

export default MusicSection;
