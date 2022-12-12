import { useState } from "react";
import Image from "next/image";
import { Swiper as Slider, SwiperSlide } from "swiper/react";
import Swiper, { Navigation } from "swiper";
import {
  Feed,
  Item,
  SingerPlayer,
  SongPlayer,
} from "../../../interfaces/interfaces";
import { baseURL, playerUrl, serverSideFileURL } from "../../../globals";
import { useDispatch, useSelector } from "react-redux";

import {
  createPlaylist,
  play,
  setIndex,
  setSinger,
} from "../../../slices/playerSlice";
import H2 from "../../commons/Typography/H2";
import { RootState } from "store";
import { useCookies } from "react-cookie";
import { saveClicks } from "networks/activity";

Swiper.use([Navigation]);

type Props = {
  feed: Feed;
  hasTitle: boolean;
  type: string;
  setVideo: (video: Item) => void;
  size?: string;
  shape?: string;
  textColor?: string;
};
const MusicFeed = ({
  feed,
  hasTitle,
  type,
  setVideo,
  textColor,
  size = "larg",
  shape = "square",
}: Props) => {
  const [cookies] = useCookies(["lnd_org", "token"]);
  const adsPlaying = useSelector((state: RootState) => state.player.adsPlaying);
  const playSong = (song: SongPlayer, singerData?: SingerPlayer) => {
    if (singerData) {
      dispatch(setSinger(singerData));
    }
    dispatch(play(song));
  };
  const dispatch = useDispatch();
  const [width, setWidth] = useState<number>(0);

  const setPlaylist = (selected: SongPlayer) => {
    let playlist = [];
    for (let i = 0; i < feed.items.length; i++) {
      let song = {
        audio: playerUrl + feed.items[i].links[0].file,
        audio_hq: playerUrl + feed.items[i].links[0].file,
        audio_lq: null,
        lyrics: null,
        type: feed.items[i].type,
        duration: 0,
        link: {
          type: feed.items[i].links[0].type,
          id: feed.items[i].links[0].id,
          slug_fa: feed.slug,
        },
        cover: playerUrl + feed.items[i].cover,
        title: feed.items[i].title,
        id: feed.items[i].id,
        slug_url: feed.slug,
      };
      if (song.id === selected.id) {
        setIndex(i);
      }
      let singer = {
        name: "",
        family: "",
      };
      playlist.push({ song: song, singer: singer });
    }
    dispatch(createPlaylist(playlist));
  };
  return (
    <div className="w-full mt-6 flex flex-col items-start justify-center">
      {hasTitle ? (
        <H2 className={`mb-2 text-${textColor}`}>{feed.title_fa}</H2>
      ) : (
        <></>
      )}
      <div className="w-full overflow-x-hidden">
        <Slider
          slidesPerView={5}
          onInit={(event) => {
            setWidth(event.width);
          }}
          navigation={{
            nextEl: ".prev-element",
            prevEl: ".next-element",
            disabledClass: "disabled-element",
          }}
          onResize={(event) => {
            setWidth(event.width);
          }}
          freeMode={true}
          initialSlide={0}
          className="!p-[6px]"
          spaceBetween={16}
          breakpoints={{
            300: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            600: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 3.5,
              spaceBetween: 28,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
            1500: {
              slidesPerView: 5,
              spaceBetween: 28,
            },
            1700: {
              slidesPerView: 6,
              spaceBetween: 28,
            },
          }}
        >
          <div
            className={`flex flex-row justify-center items-center z-10 cursor-pointer shadow-lg next-element absolute top-[32%] right-0 bg-white h-10 w-10 rounded-full`}
          >
            <Image
              height={30}
              width={30}
              src={"/images/music/right.svg"}
              alt="right"
            />
          </div>
          {feed.items.map((item: Item, index: number) => {
            return (
              <SwiperSlide className="" key={index}>
                <div
                  className={`inline-flex cursor-pointer flex-col items-center justify-start relative`}
                >
                  <div
                    onClick={() => {
                      let song = {
                        audio: playerUrl + item.links[0].file,
                        audio_hq: playerUrl + item.links[0].file,
                        audio_lq: null,
                        lyrics: null,
                        type: item.type,
                        link: {
                          type: item.links[0].type,
                          id: item.links[0].id,
                          slug_fa: item.slug,
                        },
                        cover: playerUrl + item.cover,
                        title: item.title,
                        id: item.id,
                        slug_url: item.slug,
                      };
                      let singer = {
                        name: "",
                        family: "",
                      };
                      if (!adsPlaying) {
                        playSong(
                          song as unknown as SongPlayer,
                          singer as unknown as SingerPlayer
                        );
                        setPlaylist(song as unknown as SongPlayer);
                      }
                      saveClicks(
                        item.id,
                        item.type,
                        cookies.lnd_org,
                        cookies.token
                      );
                    }}
                    className="cursor-pointer flex rounded-lg overflow-hidden flex-row justify-center shadow-[0px_0px_7px_2px_rgba(0,0,0,0.2)]"
                  >
                    {item.cover ? (
                      <Image
                        src={`${serverSideFileURL}${item.cover}`}
                        height={280}
                        width={280}
                        alt={item.meta_title}
                        id="music_cover_id"
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <p className="truncate w-11/12 text-center cursor-pointer mt-2 font-semibold font-yekanBakh text-romanSilver text-base">
                    {item.title}
                  </p>
                  <p className="truncate w-11/12 text-center font-yekanBakh mt-2 text-romanSilver text-sm">
                    {item.links[0].title}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
          <div
            className={`flex flex-row justify-center items-center z-10 cursor-pointer shadow-lg prev-element absolute top-[32%] left-0 bg-white h-10 w-10 rounded-full`}
          >
            <Image
              height={30}
              width={30}
              src={"/images/music/left.svg"}
              alt="left"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default MusicFeed;
