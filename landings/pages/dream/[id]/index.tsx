import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// import "./styles.scss";
import { GetDreamDetails } from "../../../networks/contest";
// import ReactSafeHtml from "react-safe-html";
const DreamDetailsPage = (props: any) => {
  const router = useRouter();
  const dreamId = router.query.id;
  const [dream, setDream] = useState<any>();
  useEffect(() => {
    // props.setLoading(true);
    GetDreamDetails(dreamId as any)
      .then((res) => {
        console.log(res.data);
        setDream(res.data);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        // props.setLoading(false);
      });
  }, []);
  return (
    <div className="bg-gradient-to-b from-[#2D2360] to-[#201C42] pt-16 px-5 min-h-[100vh]">
      <div className="header">
        <div className="back" onClick={() => props.history.goBack()}>
          <Link href="/dream">
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
      </div>
      <div className="main noPadding">
        {dream && (
          <>
            <h4 className="text-white border-b-[1px] border-[#2D4571] pr-[20px] mb-[20px] pb-[10px]">
              {dream.subject}
            </h4>
            <div className="text-white w-full p-[15px] rounded-md bg-[#433A7E]">
              <p>{dream.description}</p>
              {/* {dream.description
                .replace(/<p>/g, "\n")
                .split("\n")
                .map((line, i) => (
                  // <p key={"line-"+i}>{line}</p>
                //   <ReactSafeHtml key={"line-" + i} html={line} />
                ))} */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default DreamDetailsPage;
