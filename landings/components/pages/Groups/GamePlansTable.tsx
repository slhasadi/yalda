import Image from "next/image";
import TeamTextPic from "./TeamTextPic";
import classes from "./GamePlansTable.module.css";
import { networkGetMatchesNextPage } from "networks/predictions";
import { GetMatchesResponseData } from "interfaces/interfaces";
import InfiniteScroll from "react-infinite-scroll-component";
import JM from "jalali-moment";
import usePagination from "hooks/usePagination";

const GamePlansTable: React.FC<{ plans: GetMatchesResponseData }> = ({
  plans,
}) => {
  const { pageData, hasNextPage, nextPage, pageDataLength } =
    usePagination<GetMatchesResponseData>(
      "match-plans",
      plans,
      networkGetMatchesNextPage
    );

  return (
    <>
      <div className="py-4 px-2 sm:px-6 text-lg font-bold text-white bg-gray-400 rounded-t-2xl border-b-2 border-white">
        مرحله حذفی
      </div>
      <InfiniteScroll
        dataLength={pageDataLength()}
        next={nextPage}
        hasMore={hasNextPage()}
        loader={
          <div className="text-center">
            <Image
              src="/images/loading.gif"
              alt="loading"
              width={120}
              height={120}
            />
          </div>
        }
        // scrollThreshold={device === "D" ? 0.6 : 0.4}
      >
        {pageData?.results.map((item, index) => (
          <div
            key={index}
            className={`${classes.row_item} py-4 px-2 sm:px-6 flex items-center text-xs md:text-[16px]`}
          >
            <div className="pl-2">
              <div className="flex items-center">
                <TeamTextPic
                  classes="w-[80px] sm:w-[120px]"
                  data={{
                    pic: item.home_team.picture,
                    name: item.home_team.title,
                  }}
                  reverse
                />
                <span className="text-lg font-bold w-fit mx-3 sm:mx-5 md:mx-10">
                  -
                </span>
                <TeamTextPic
                  data={{
                    pic: item.away_team.picture,
                    name: item.away_team.title,
                  }}
                />
              </div>
            </div>
            <div className="mr-auto">
              <div className="flex items-center">
                <span className="ml-3 text-center sm:px-4 md:px-7">
                  {item.start_time.substring(0, 5)}
                </span>
                {/* <div className="w-[50%] flex items-center justify-center">
                  <Image
                    src={"/images/groups/ant-design_info-circle-twotone.svg"}
                    width={24}
                    height={24}
                    alt={"team_infoinfo"}
                  />
                </div> */}
                <span className="text-center px-2 sm:px-4 md:px-7">
                  {JM(item.date).locale("fa").format("YYYY/MM/DD")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </InfiniteScroll>

      <div className="py-8 px-6 text-lg font-bold text-white bg-gray-400 rounded-b-2xl border-t-2 border-white"></div>
    </>
  );
};

export default GamePlansTable;
