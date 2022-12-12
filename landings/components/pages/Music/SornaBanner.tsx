import Image from "next/image";
import { basePath } from "../../../globals";

import { useDispatch } from "react-redux";
import { play, setPlaylist } from "../../../slices/playerSlice";
import { useState } from "react";
import {Item, Link, Tag} from "../../../interfaces/interfaces";
import {array} from "prop-types";

type Props = {
  playing: any;
};
const SornaBanner = ({ playing }: Props) => {
  const dispatch = useDispatch();
  // const song: Item = {
  //   meta_description: "", meta_title: "", tags: [],
  //   id: 111111,
  //   order: 1,
  //   slug: 'پخش سرنای نوروز',
  //   title: 'پخش سرنای نوروز',
  //   description: 'پخش سرنای نوروز',
  //   type: 'audio',
  //   cover: `${basePath}/_next/image?url=${basePath}/images/music/sorna.png&w=48&q=75`,
  //   links: [{
  //     url: '', meta: '',
  //     id: 121212,
  //     title: 'پخش سرنای نوروز',
  //     type: 'audio',
  //     file: basePath + "/musics/sorna.mp3"
  //   }],
  // }
  return (
    <div
      onClick={() => {
        // playing(song);
        // dispatch(play({ song: song }));
      }}
      className="bg-[#F9DBD0] h-20 lg:h-64 flex flex-row justify-around items-center rounded-lg cursor-pointer px-2 py-8"
    >
      <div className="w-2/6 h-auto flex flex-col items-center justify-center content-around px-2">
        <div className="text-md lg:text-4xl text-center font-yekanBakh">پخش سرنای نوروز</div>
        <div className={`h-[2px] lg:h-[4px] w-[85%] bg-[#DB0031] mt-1`} />
      </div>
      <div className="w-4/6 flex fex-row justify-center">
        <Image
          className="max-h-full "
          src={basePath + "/images/music/sorna.png"}
          alt="play sorna"
          width="665"
          height="355"
        />
      </div>
    </div>
  );
};

export default SornaBanner;
