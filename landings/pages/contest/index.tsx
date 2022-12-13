import React from "react";
// import "./styles.scss";
// import Back from "../../assets/icons/back.svg";
import { GetContestList } from "../../networks/contest";
import Link from "next/link";
const ContestListPage = (props: any) => {
  const [contestList, setContest] = React.useState([]);
  React.useEffect(() => {
    // props.setLoading(true);
    getContestList();
  }, []);
  const getContestList = () => {
    GetContestList()
      .then((res) => {
        // console.log(res.data);
        setContest(res.data);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        // props.setLoading(false);
      });
  };
  return (
    <div className="bg-gradient-to-b from-[#2D2360] to-[#201C42] pt-16">
      <div className="header">
        <Link href="/">
          <a className="text-white flex absolute top-[20px] left-[10px] z-[161]">
            بازگشت
            <img
              src="/images/parallax/back.svg"
              alt="back"
              className="backIcon"
            />
          </a>
        </Link>
      </div>
      <div className="flex flex-col items-center">
        {contestList.map((con: any, index) => (
          <Link href={`/contest/${con.id}`} key={con.id + "-" + index}>
            <a className="bg-[#433A7D] w-[300px] h-[100px] rounded-md flex items-center justify-center text-[#fff] my-[10px]">
              {con.title}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default ContestListPage;
