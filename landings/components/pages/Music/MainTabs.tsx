import Image from "next/image";
import { basePath } from "../../../globals";

type Props = {
  mainTab: string;
  setMainTab: (tab: string) => void;
};

const MainTabs = ({ mainTab, setMainTab }: Props) => {
  return (
    <div className="w-full flex flex-row justify-center mt-14 lg:mt-28">
      <div className="flex flex-row w-full lg:w-80 justify-around lg:justify-between mx-8">
        <div
            onClick={() => setMainTab("music")}
            className={`flex flex-row items-center ${
                mainTab === "music"
                    ? "border-b-4 border-[#DB0031]"
                    : ""
            } cursor-pointer`}
        >
          <div className="flex flex-row items-center px-2 pb-2">
            <Image
                className="max-h-full"
                src={basePath + "/images/music/music.svg"}
                alt="music section"
                width="24"
                height="24"
            />
            <span className="font-yekanBakh pr-3 text-lg lg:text-2xl text-[#81858B]">موسیقی</span>
          </div>
        </div>
        <div
            onClick={() => setMainTab("video")}
            className={`flex flex-row items-center ${
                mainTab === "video"
                    ? "border-b-4 border-[#DB0031]"
                    : ""
            } cursor-pointer`}
        >
          <div className="flex flex-row items-center px-2 pb-2">
            <Image
                className="max-h-full"
                src={basePath + "/images/music/video.svg"}
                alt="music section"
                width="24"
                height="24"
            />
            <span className="font-yekanBakh pr-3 text-lg lg:text-2xl text-[#81858B]">ویدیو</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTabs;
