import React from "react";

interface ContentSideLayoutPropsIFace {
  title: string;
}

const ContentSideLayout: React.FC<ContentSideLayoutPropsIFace> = ({
  children,
  title,
}) => {
  return (
    <div className="pt-0 pb-4 md:py-4 h-full">
      <div className="bg-white p-[14px] md:p-6 rounded-r-2xl rounded-l-2xl md:rounded-l-none h-auto">
        <div className="flex flex-col h-full">
          <div className="bg-gray-300 px-3 md:px-6 py-3 md:py-4 rounded-t-2xl font-bold">
            {title}
          </div>
          <div className="p-3 md:p-6 bg-gray-200 min-h-[300px] md:min-h-[500px] relative rounded-b-2xl flex-grow">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ContentSideLayout;
