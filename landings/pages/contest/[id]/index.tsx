import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// import "./styles.scss";
// import Back from "../../assets/icons/back.svg";
import { GetContestDetail, GetContestResult } from "../../../networks/contest";
const ContestInnerPgae = (props: any) => {
  const router = useRouter();
  const constestId = router.query.id;
  const [detail, setDetail] = useState<any>();
  const [modalVisibility, setVisible] = useState<any>(false);
  const [contestRes, setContestRes] = useState<any>();
  useEffect(() => {
    getContestDetail();
  }, []);
  const getContestDetail = () => {
    GetContestDetail(constestId as any)
      .then((res) => {
        setDetail(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const onSubmitHandler = (e: any) => {
    let answers: any = {};
    e.preventDefault();
    // @ts-ignore
    var formData: any = new FormData(document.getElementById("form"));
    for (var pair of formData.entries()) {
      answers[parseInt(pair[0])] = parseInt(pair[1]);
    }
    for (let i = 0; i < JSON.parse(detail?.questions).length; i++) {
      const element = i + 1;
      if (!(element in answers)) {
        answers[element] = 0;
      }
    }
    let finalAnswers = [];
    for (const key in answers) {
      finalAnswers.push(answers[key]);
    }
    const body = {
      id: constestId,
      answers: finalAnswers,
    };
    GetContestResult(body)
      .then((res) => {
        console.log(res.data);
        setContestRes(res.data);
        setVisible(true);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const getRes = () => {
    let result;
    for (let i = 0; i < detail.contest_result.length; i++) {
      const res = detail.contest_result[i];
      if (contestRes.score >= res.min && contestRes.score < res.max) {
        result = res;
      }
    }
    return result;
  };
  return (
    <div className="bg-gradient-to-b from-[#2D2360] to-[#201C42] pt-16 min-h-[100vh]">
      <div className="header">
        <div className="back" onClick={() => props.history.goBack()}>
          <Link href="/contest">
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
        {detail && (
          <p className="text-[#fff] border-b-[1px] border-[#2D4571] pr-[20px] mb-[20px] pb-[10px]">
            {detail.title}
          </p>
        )}
      </div>
      {!modalVisibility && (
        <div className="main noPadding">
          <form
            id={"form"}
            onSubmit={(e) => onSubmitHandler(e)}
            className="text-center"
          >
            {detail &&
              JSON.parse(detail.questions).map((que: any, i: number) => (
                <div className="w-[100%] m-auto px-[20px]" key={que.title + i}>
                  <h6 className="text-white my-[10px] text-right">{`سوال ${
                    i + 1
                  }`}</h6>
                  <div className="w-full p-[15px] rounded-md bg-[#433A7E]">
                    <p className="text-white text-right mb-[10px]">
                      {que.title}
                    </p>
                    {que.options.map((option: any, j: number) => (
                      <div
                        key={option.score + "-" + j}
                        className="flex justify-between"
                      >
                        <label
                          htmlFor={option.score + "-" + j + "-" + i}
                          className="text-white"
                        >
                          {option.title}
                        </label>
                        <input
                          type="radio"
                          id={option.score + "-" + j + "-" + i}
                          name={(i + 1).toString()}
                          defaultValue={option.score}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            <button
              className="bg-[#EC1B4B] w-[240px] h-[60px] rounded-full text-[#fff] my-[10px]"
              type={"submit"}
            >
              مشاهده نتایج
            </button>
          </form>
        </div>
      )}
      {modalVisibility && (
        <div className="resultContainer">
          <div className="header">
            <Link href="/contest">
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
          <div className="text-center">
            <div className="text-white">
              <span>{"امتیاز شما: "}</span>
              <span>{contestRes.score}</span>
            </div>
            <div className="text-white">
              <h5 className="title">{getRes().title}</h5>
              <p className="desc">{getRes().description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ContestInnerPgae;
