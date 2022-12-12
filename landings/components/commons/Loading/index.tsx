import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center">
      <div className="main-loader">
        <Image
          src="/images/loading.gif"
          alt="loading"
          width={120}
          height={120}
        />
      </div>
    </div>
  );
};

export default Loading;
