/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Item } from "../../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { setAdsPlaying } from "slices/playerSlice";

const VideoPlayer = dynamic(() => import("components/layout/VideoPlayer"), {
  ssr: false,
});

type Props = {
  video?: Item;
  setVideo: (video: Item | null) => void;
};

const Video = ({ video, setVideo }: Props) => {
  // const adsPlaying = useSelector((state: RootState) => state.player.adsPlaying);
  const dispatch = useDispatch();
  useEffect(() => {}, [video]);

  const closeVideoPlayer = () => {
    setVideo(null);
  };
  return (
    <div className="fixed inset-0 z-[110] bg-opacity-95 bg-black flex justify-center items-center">
      {/* {adsPlaying &&  */}
      <div className="fixed top-10 right-10 z-50 cursor-pointer">
        <Image
          height={30}
          width={30}
          src={"/images/close.png"}
          alt="close"
          onClick={() => {
            closeVideoPlayer();
            dispatch(setAdsPlaying(false));
          }}
        />
      </div>
      {/* } */}

      <div className="w-full max-w-[900px] px-[24px]">
        <VideoPlayer
          key="trailerSSS"
          src={video?.links[0].url}
          item={video}
          adsType="video"
        />
      </div>
    </div>
  );
};

export default Video;
