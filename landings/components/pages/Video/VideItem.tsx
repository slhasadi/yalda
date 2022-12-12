import Image from "next/image";
import { Item } from "../../../interfaces/interfaces";
import { basePath, serverSideFileURL } from "../../../globals";
import { NextImageProxy } from "components/commons/Image";
type Props = {
  song: Item;

  setVideo: (video: Item) => void;
};

const VideoItem = ({ setVideo, song }: Props) => {
  return (
    <div className="flex flex-col items-center justify-start relative w-64 h-60">
      <div
        onClick={() => {
          setVideo(song);
        }}
        className="cursor-pointer flex rounded-lg overflow-hidden flex-row justify-center h-40 w-64"
      >
        {song.cover ? (
          <div>
            <div className="absolute z-10 h-[145px] w-[256px] flex  justify-center ">
              {" "}
              <Image
                src={basePath + "/images/music/play-icon.svg"}
                height={43}
                width={43}
                alt={song.meta_title}
              />
            </div>

            <div className="w-[300px]">
            {song.cover?.indexOf('https://') > -1 ? NextImageProxy(
                song.cover,
                256,
                145,
                song.meta_title
              ): <Image
              src={`${serverSideFileURL}${song.cover}`}
              objectFit='cover' layout='responsive'
              height={145}
              width={256}
              alt={song.meta_title}
            />}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <p className="truncate w-11/12 text-center cursor-pointer mt-2 font-semibold font-yekanBakh text-romanSilver text-base">
        {song.links[0].title}
      </p>
      <p className="truncate w-11/12 text-center cursor-pointer mt-2 font-normal font-yekanBakh text-romanSilver text-sm">
        {song.links[0].subtitle}
      </p>
    </div>
  );
};

export default VideoItem;
