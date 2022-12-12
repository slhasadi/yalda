import PlayVideo from "../../../../components/commons/Icons/PlayVideo";
import Image from "next/image";
import { Feed, Item } from "../../../../interfaces/interfaces";
import { serverSideFileURL } from "../../../../globals";
import H2 from "../../../commons/Typography/H2";
import { saveClicks } from "networks/activity";
import { useCookies } from "react-cookie";
import { NextImageProxy } from "components/commons/Image";
type Props = {
  feed: Feed;
  hasTitle: boolean;
  type: string;
  playing?: any;
  setVideo: (video: Item) => void;
  size?: string;
  shape?: string;
};
const List = ({ feed, hasTitle, setVideo }: Props) => {
  const [cookies] = useCookies(["lnd_org", "token"]);
  return (
    <div className="w-full mt-6 flex flex-col items-start h-[auto] justify-center">
      {hasTitle ? <H2 className="mb-2">{feed.title_fa}</H2> : <></>}
      <div className="w-full mt-2 flex flex-row justify-center md:justify-between flex-wrap gap-[10px]">
        {feed.items.map((song: Item, index: number) => {
          return (
            <div
              className="inline-flex flex-col items-center justify-center relative h-68"
              key={index}
            >
              <div
                onClick={() => {
                  setVideo(song);
                  saveClicks(
                    song.id,
                    song.type,
                    cookies.lnd_org,
                    cookies.token
                  );
                  // dispatch(stop());
                }}
                className="relative cursor-pointer flex rounded-lg overflow-hidden flex-row justify-center h-40"
              >
                {song.cover ? (
                  <>
                    <div className="child:fill-primary absolute top-1/2 -translate-y-1/2 z-10 h-[56px] w-[56px]">
                      <PlayVideo />
                    </div>
                    <div className="w-[300px]">
                      {song.cover?.indexOf("https://") > -1 ? (
                        NextImageProxy(song.cover, 256, 145, song.meta_title)
                      ) : (
                        <Image
                          src={`${serverSideFileURL}${song.cover}`}
                          objectFit="cover"
                          layout="responsive"
                          height={145}
                          width={256}
                          alt={song.meta_title}
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <p className="line-clamp-2 text-right cursor-pointer mt-2 max-w-[300px] h-[100px] font-semibold text-romanSilver text-base xl:text-lg">
                {song.links[0].title}
              </p>
              <p className="text-center cursor-pointer mt-2 font-normal text-romanSilver text-sm">
                {song.links[0].subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
