import Image from "next/image";
import { basePath, serverSideFileURL } from "../../../globals";
import MusicFeed from "./Feed";
import { Feed, Item } from "../../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { play, setPlaylist } from "../../../slices/playerSlice";
import {MutableRefObject, useRef} from "react";
import {useDraggable} from "react-use-draggable-scroll";
type Props = {
  feed: Feed;
  playing:any;
  setVideo: (video: Item) => void;
};

const Wednesday = ({ feed, setVideo, playing }: Props) => {
  const dispatch = useDispatch();
  const wdRef =
    useRef<HTMLDivElement>() as MutableRefObject<HTMLInputElement>;
  const wdEvs = useDraggable(wdRef);

  return (
    <div className="w-full">
      <div className="bg-gradient-bg hide-scroll overflow-x-scroll rounded-lg flex flex-row p-4"
           {...wdEvs.events}
           ref={wdRef}
      >
        <div className="w-80 lg:w-96 lg:mr-8 mt-4 z-20">
          <div className="w-[23em]">
            <Image
              src={basePath + "/images/music/wndsday.png"}
              alt="music section"
              width="312"
              height="297"
            />
          </div>
        </div>

        <div className="grid grid-rows-2 grid-flow-col gap-[10px] min-w-[670px] max-w-[772px] overflow-x-scroll hide-scroll bg-[#FFFFFF] rounded-[10px]  h-[359px] pl-[15px] pr-[15px]">
          {feed.items.map((song: Item, index: number) => {
            return (
              <div
                key={index}
                className={`flex flex-col items-center justify-start mt-[18px] `}
              >
                <div
                  onClick={() => {
                    playing(song);
                    dispatch(play({ song: song }));
                    dispatch(setPlaylist({ playlist: feed.items }));
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

export default Wednesday;
