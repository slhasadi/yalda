/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import { Loader_page } from "slices/pageLoader";
const Payment = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(()=>{

    router.replace("/dashboard");

  },[])
  return (
    <div className="pb-8 px-8 pt-[100px] h-screen">
      <div className="flex gap-6 h-full">
        <div className="h-full flex flex-col justify-between w-full md:w-[20%]">
          <div className="h-[20%]">
            <Skeleton height={"100%"} />
          </div>

          <div className="h-[60%]">
            <Skeleton height={"100%"} />
          </div>
          <div className="h-[18%]">
            <Skeleton height={"100%"} />
          </div>
        </div>
        <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center h-full w-[80%]">
          <Skeleton height={"100%"} />
          <Skeleton height={"100%"} />
          <Skeleton height={"100%"} />
          <Skeleton height={"100%"} />
          <Skeleton height={"100%"} />
          <Skeleton height={"100%"} />
          <Skeleton height={"100%"} />
          <Skeleton height={"100%"} />
        </div>
      </div>
    </div>
  );
};
export default Payment;
