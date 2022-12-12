import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shopList } from "slices/shopModal";
import { RootState } from "store";
import ShopModal from "../ShopModal"
const BannerAds: FC = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="w-full h-[100px] flex flex-col items-center justify-center md:flex-row gap-4 bg-[#FF004C] mb-[10px]">
        <p className="text-[#fff]">برای دسترسی به تمامی امکانات فوتبالیگا ، اشتراک تهیه نمایید.</p>
        <div className="relative">
        <button className="animate-[ping_1000ms_ease-in-out_infinite] z-[2] opacity-75 w-[140px] text-[#fff] h-[40px] bg-[#F18800] absolute"
        onClick={()=>{
          dispatch(shopList());
        }}
        ></button>
        <button className="w-[140px] z-10 text-[#fff] h-[40px] bg-[#F18800]"
        onClick={()=>{
          dispatch(shopList());
        }}
        >خرید اشتراک</button>
        </div>
      </div>
    </>
  );
};

export default BannerAds;
