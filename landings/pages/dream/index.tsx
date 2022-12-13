import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// import "./styles.scss";
// import Search from "../../assets/icons/ic-search.svg";
import { GetDreamList } from "../../networks/contest";

const DreamPage = (props: any) => {
  const alphabets = [
    "ا",
    "ب",
    "پ",
    "ت",
    "ث",
    "ج",
    "چ",
    "ح",
    "خ",
    "د",
    "ذ",
    "ر",
    "ز",
    "ژ",
    "س",
    "ش",
    "ص",
    "ض",
    "ط",
    "ظ",
    "ع",
    "غ",
    "ف",
    "ق",
    "ک",
    "گ",
    "ل",
    "م",
    "ن",
    "و",
    "ه",
    "ی",
  ];
  const router = useRouter();
  const [searchRes, setSearchres] = useState([]);
  const [selectedChar, setSelectedChar] = useState(alphabets[0]);
  let [wordsList, setWords] = useState([]);
  let [page, setPage] = useState(1);
  useEffect(() => {
    getWords();
  }, [selectedChar]);
  const getWords = () => {
    console.log("selectedChar", selectedChar);

    GetDreamList(selectedChar, page).then((res) => {
      let newWords = wordsList.concat(res.data.results);
      setWords((old) => [...old, ...newWords]);
    });
  };
  const onChangeHandler = (e: any) => {
    let word = e.target.value;
    if (word.length >= 2) {
      GetDreamList(word, page)
        .then((res) => {
          // console.log(res.data);
          setSearchres(res.data.results);
        })
        .catch((e) => {
          console.error(e);
        });
    } else if (word.length === 0) {
      setSearchres([]);
    }
  };
  const onScroll = (e: any) => {
    const bottom =
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight;
    if (bottom) {
      setPage(++page);
      getWords();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
  }, []);
  return (
    <div className="bg-gradient-to-b from-[#2D2360] to-[#201C42] pt-16 px-5 min-h-[100vh]">
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
      <div className="main noPadding">
        <div className="searchBarContainer">
          <p className="text-white">منبع: اپلیکیشن تعبیر خواب بنفش 2</p>
          <div className="relative">
            <input
              onChange={(e) => onChangeHandler(e)}
              autoFocus={true}
              placeholder={"جستجوی موضوع خواب"}
              className="w-full h-[50px] rounded-md my-[10px] bg-[#A9A6BC] relative"
            />
            {searchRes.length !== 0 && (
              <div className="absolute top-[5rem] w-[100%] bg-[#A9A6BC] z-[9]">
                {searchRes.map((item: any, i) => (
                  <p
                    onClick={() => router.push("/dream/" + item.id)}
                    key={item.id + "-" + i}
                  >
                    {item.subject}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div className="w-full overflow-auto pb-[15px]">
            <div className="flex w-max">
              {alphabets.map((char, index) => (
                <p
                  onClick={() => {
                    setSelectedChar(char);
                    setPage(1);
                    setWords([]);
                  }}
                  className={
                    selectedChar === char
                      ? "w-[30px] text-center flex items-center justify-center rounded-md text-white bg-[#433A7D]"
                      : "w-[30px] text-center flex items-center justify-center rounded-md text-white"
                  }
                  key={char + index}
                >
                  {char}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="wordsList">
          {wordsList.length !== 0 && (
            <div>
              {wordsList.map((word: any, i) => (
                <p
                  onClick={() => {
                    router.push("/dream/" + word.id);
                    setPage(1);
                  }}
                  className="w-[100%] h-[60px] text-white bg-[#433A7D] text-center my-[10px] rounded-md flex items-center justify-center"
                  key={word.id + "-" + i}
                >
                  {word.subject}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default DreamPage;
