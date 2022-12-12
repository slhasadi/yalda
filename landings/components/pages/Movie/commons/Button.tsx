import Modal from "components/commons/Modal/Modal";
import { Item } from "interfaces/interfaces";
import { saveClicks } from "networks/activity";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
type props ={
    item:Item;
    setVideo:(value:Item)=>void;
    lnd_org:number;
    token:string;
    setIsOpenGuideModal:(value:boolean)=>void;
}
const VideoSection = ({item, setVideo, lnd_org, token, setIsOpenGuideModal}:props) => {
    
  return (
    <>
    {Object.keys(item).length >0 &&
    <div className="absolute w-full h-full z-20 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] flex justify-center bg-[#0000009e]">
        {!item.show_vip ? 
            <div className="child:fill-primary absolute top-1/2 -translate-y-1/2 z-10 h-[56px] w-[56px]"
                onClick={() => {
                    setVideo(item)
                    saveClicks(item.id ,item.type ,lnd_org ,token);
                    // dispatch(stop());
                    
                }}
            >
                <Image
                    src="/images/player/video-play.svg"
                    alt=""
                    width={50}
                    height={50}
                />
            </div>
            :
            <div className="child:fill-primary absolute top-1/2 -translate-y-1/2 z-10 h-[56px] w-[56px]" 
            onClick={()=>{
                setIsOpenGuideModal(true)
            }}
            >
                <Image
                    src="/images/player/video-lock.svg"
                    alt=""
                    width={50}
                    height={50}
                />
            </div>
        }
    </div>
    }
    </>
  );
};

export default VideoSection;
