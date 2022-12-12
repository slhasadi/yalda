import Image from "next/image";
import {basePath, fileBaseURL, serverSideFileURL} from "../../../globals";
import { Item, Feed } from "../../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { play, setPlaylist } from "../../../slices/playerSlice";
import {MutableRefObject, useEffect, useRef} from "react";
import {useDraggable} from "react-use-draggable-scroll";
type Props = {
  feed: Feed;
  playing: any;
  setVideo: (video: Item) => void;
};
const Instrumental = ({ feed, playing }: Props) => {
  const dispatch = useDispatch();

  const inRef =
    useRef<HTMLDivElement>() as MutableRefObject<HTMLInputElement>;
  const inEvs = useDraggable(inRef);
  return (
    <div className="w-full">
      <div className="bg-[#F3D0D1] hide-scroll overflow-x-scroll rounded-lg flex flex-row p-4"
           {...inEvs.events}
           ref={inRef}
      >
        <div className="w-80 lg:w-96 lg:mr-4 z-20 flex items-center justify-center">
          <div className="w-[19em]">
            <Image
                className=" "
                src={basePath + "/images/music/instrumental.png"}
                alt="موزیک بی کلام"
                width="414"
                height="96"
            />
          </div>
        </div>
        <div className="grid grid-rows-1 grid-flow-col gap-[10px] mr-4 h-[205px] rounded-[10px] bg-[#FFFFFF] z-10 pl-[15px] pr-[15px]">
          {feed.items.map((song: Item, index: number) => {
            return (
                <div
                    key={index}
                    className={`flex flex-col items-center justify-start my-[18px]`}
                >
                  <div
                      onClick={() => {
                        dispatch(play({ song: song }));
                        dispatch(setPlaylist({ playlist: feed.items }));
                        playing(song);
                      }}
                      className="cursor-pointer flex rounded-lg overflow-hidden flex-row justify-center h-[120px] w-[120px]"
                  >
                    {song.cover ? (
                        <Image
                            className="rounded-[5px]"
                            src={`${serverSideFileURL}${song.cover}`}
                            height={120}
                            width={120}
                            alt={song.meta_title}
                        />
                    ) : (
                        <></>
                    )}
                  </div>
                  <p className="truncate w-11/12 text-center cursor-pointer mt-[2px] font-semibold font-yekanBakh text-romanSilver text-base">
                    {song.title}
                  </p>
                  <p className="truncate w-11/12 text-center font-yekanBakh mt-[2px] text-romanSilver text-sm">
                    {song.links[0].title}
                  </p>
                </div>
            );
          })}
      </div>
      </div>
    </div>
  );
};

export default Instrumental;
