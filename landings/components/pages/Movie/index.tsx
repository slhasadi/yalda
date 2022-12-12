/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Item } from "../../../interfaces/interfaces";
import { basePath } from "../../../globals";
import { useSelector } from "react-redux";
import { RootState } from "store";
const VideoPlayer = dynamic(() => import("components/layout/VideoPlayer"), {
  ssr: false,
});

type Props = {
  video?: Item;
  setVideo: (video: Item | null) => void;
};
const Video = ({ video, setVideo }: Props) => {
  // const adsPlaying = useSelector((state: RootState) => state.player.adsPlaying);
  useEffect(() => {
    // window.video_plyr = new Plyr("#video-player", {
    //   autoplay: true,
    // });
  }, []);

  useEffect(() => {
    // if (video) {
    //   if (Hls.isSupported()) {
    //     const hls = new Hls();
    //     hls.loadSource(`${video.links[0].url}`);
    //     hls.attachMedia(
    //       document.getElementById("video-player") as HTMLMediaElement
    //     );
    //   }
    //   window.video_plyr.play();
    // }
  }, [video]);

  const closeVideoPlayer = () => {
    // window.video_plyr.stop();
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
          }}
        />
      </div>
      {/* } */}
      <div className="w-full px-[24px]">
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
