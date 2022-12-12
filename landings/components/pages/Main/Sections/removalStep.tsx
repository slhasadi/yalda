import Container from "components/commons/Container";
import Image from "next/image";
import { Swiper as Slider, SwiperSlide } from "swiper/react";
import Swiper, { Navigation } from "swiper";
import styles from "../styles/Main.module.scss";
import { MatchRound, playoffRoundItemDataIFace } from "interfaces/interfaces";
import moment from "jalali-moment";
import { useEffect, useState } from "react";
import { getDate } from "helpers/utilities/functions";
import Link from "next/link";
Swiper.use([Navigation]);
type props = {
  stages: playoffRoundItemDataIFace[];
};
const GamesTable = ({ stages }: props) => {
  const [isOpenTab, setIsOpenTab] = useState("16");
  const [round16, setRound16] = useState({} as playoffRoundItemDataIFace);
  const [round8, setRound8] = useState({} as playoffRoundItemDataIFace);
  const [semiFinal, setSemiFinal] = useState({} as playoffRoundItemDataIFace);
  const [placeFinal, setPlaceFinal] = useState({} as playoffRoundItemDataIFace);
  const [final, setFinal] = useState({} as playoffRoundItemDataIFace);
  const [round16Mob, setRound16Mob] = useState<any[]>([]);
  const [round8Mob, setRound8Mob] = useState<any[]>([]);
  const [isMore, setIsMore] = useState(false);
  useEffect(() => {
    let step16 = stages.filter((item) => item.stage_name === "Round of 16");
    const res = step16[0].matches
      .slice(0)
      .sort((a, b) => a.match_status.localeCompare(b.match_status));
    setRound16Mob(res);
    setRound16(step16[0]);
    let step8 = stages.filter((item) => item.stage_name === "Quarter-finals");
    const res2 = step8[0].matches
      .slice(0)
      .sort((a, b) => a.match_status.localeCompare(b.match_status));
    setRound8Mob(res2);
    setRound8(step8[0]);
    let step4 = stages.filter((item) => item.stage_name === "Semi-finals");
    setSemiFinal(step4[0]);
    let step2 = stages.filter((item) => item.stage_name === "3rd Place Final");
    setPlaceFinal(step2[0]);
    let step1 = stages.filter((item) => item.stage_name === "Final");
    setFinal(step1[0]);
  }, []);
  function handleSlice() {
    if (isMore) {
      return round16Mob;
    } else {
      return round16Mob.slice(0, 2);
    }
  }
  function handleSlice2() {
    if (isMore) {
      return round8Mob;
    } else {
      return round8Mob.slice(0, 2);
    }
  }
  const roundOf16Left = () => {
    return (
      <div className={styles["main-game-table-removal-list-16"]}>
        <div className="flex flex-col gap-[10px] w-full relative after:content-[''] after:w-1 after:h-[53%] after:absolute after:top-[24%] after:left-[-12px] after:bg-[#791231]">
          <div className="w-full flex flex-col bg-[#791231] rounded-lg aspect-[2/1] relative after:content-[''] after:w-[12px] after:h-1 after:absolute after:top-[50%] after:left-[-12px] after:bg-[#791231]">
            <div className="w-full h-[30%] bg-white rounded-t-lg">
              <div className="flex items-center h-full px-2 mt-[3px]">
                <p className="flex-[50] justify-start items-center text-[#791231]">
                  {round16?.matches[0]?.match_time}
                </p>
                <p className="flex-[50] justify-end text-left items-center text-[#791231]">
                  {getDate(round16?.matches[0]?.match_date)}
                </p>
              </div>
            </div>
            <div className="w-full h-[70%] flex rounded-b-lg">
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={round16.matches[0]?.team_home_badge}
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {round16.matches[0]?.match_hometeam_name}
                </p>
              </div>
              <div className="w-[40%] h-full flex items-center">
                <div className="bg-[#6A0929] w-full h-[50%] mt-[10px] rounded-[8px] flex items-center justify-center">
                  <span className="text-[#fff]">
                    {round16.matches[0]?.match_hometeam_score
                      ? round16.matches[0]?.match_hometeam_score
                      : "؟"}
                  </span>
                  <span className="text-[#fff] mx-1">-</span>
                  <span className="text-[#fff]">
                    {round16.matches[0]?.match_awayteam_score
                      ? round16.matches[0]?.match_awayteam_score
                      : "؟"}
                  </span>
                </div>
              </div>
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={round16.matches[0]?.team_away_badge}
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {round16.matches[0]?.match_awayteam_name}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col bg-[#791231] rounded-lg aspect-[2/1] relative after:content-[''] after:w-[12px] after:h-1 after:absolute after:top-[50%] after:left-[-12px] after:bg-[#791231]">
            <div className="w-full h-[30%] bg-white rounded-t-lg">
              <div className="flex items-center h-full px-2 mt-[3px]">
                <p className="flex-[50] justify-start items-center text-[#791231]">
                  {round16.matches[1]?.match_time}
                </p>
                <p className="flex-[50] justify-end text-left items-center text-[#791231]">
                  {/* {round16.matches[0]?.match_date} */}
                  {getDate(round16.matches[1]?.match_date)}
                </p>
              </div>
            </div>
            <div className="w-full h-[70%] flex rounded-b-lg">
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={round16.matches[1]?.team_home_badge}
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {round16.matches[1]?.match_hometeam_name}
                </p>
              </div>
              <div className="w-[40%] h-full flex items-center">
                <div className="bg-[#6A0929] w-full h-[50%] mt-[10px] rounded-[8px] flex items-center justify-center">
                  <span className="text-[#fff]">
                    {round16.matches[1]?.match_hometeam_score
                      ? round16.matches[1]?.match_hometeam_score
                      : "؟"}
                  </span>
                  <span className="text-[#fff] mx-1">-</span>
                  <span className="text-[#fff]">
                    {round16.matches[1]?.match_hometeam_score
                      ? round16.matches[1]?.match_awayteam_score
                      : "؟"}
                  </span>
                </div>
              </div>
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={round16.matches[1]?.team_away_badge}
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {round16.matches[1]?.match_awayteam_name}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] w-full relative after:content-[''] after:w-1 after:h-[53%] after:absolute after:top-[24%] after:left-[-12px] after:bg-[#791231]">
          <div className="w-full flex flex-col bg-[#791231] rounded-lg aspect-[2/1] relative after:content-[''] after:w-[12px] after:h-1 after:absolute after:top-[50%] after:left-[-12px] after:bg-[#791231]">
            <div className="w-full h-[30%] bg-white rounded-t-lg">
              <div className="flex items-center h-full px-2 mt-[3px]">
                <p className="flex-[50] justify-start items-center text-[#791231]">
                  {round16.matches[2]?.match_time}
                </p>
                <p className="flex-[50] justify-end text-left items-center text-[#791231]">
                  {getDate(round16.matches[2]?.match_date)}
                </p>
              </div>
            </div>
            <div className="w-full h-[70%] flex rounded-b-lg">
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={round16.matches[2]?.team_home_badge}
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {round16.matches[2]?.match_hometeam_name}
                </p>
              </div>
              <div className="w-[40%] h-full flex items-center">
                <div className="bg-[#6A0929] w-full h-[50%] mt-[10px] rounded-[8px] flex items-center justify-center">
                  <span className="text-[#fff]">
                    {round16.matches[2]?.match_hometeam_score
                      ? round16.matches[2]?.match_hometeam_score
                      : "؟"}
                  </span>
                  <span className="text-[#fff] mx-1">-</span>
                  <span className="text-[#fff]">
                    {round16.matches[2]?.match_awayteam_score
                      ? round16.matches[2]?.match_awayteam_score
                      : "؟"}
                  </span>
                </div>
              </div>
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={round16.matches[2]?.team_away_badge}
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {round16.matches[2]?.match_awayteam_name}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col bg-[#791231] rounded-lg aspect-[2/1] relative after:content-[''] after:w-[12px] after:h-1 after:absolute after:top-[50%] after:left-[-12px] after:bg-[#791231]">
            <div className="w-full h-[30%] bg-white rounded-t-lg">
              <div className="flex items-center h-full px-2 mt-[3px]">
                <p className="flex-[50] justify-start items-center text-[#791231]">
                  {round16.matches[3]?.match_time}
                </p>
                <p className="flex-[50] justify-end text-left items-center text-[#791231]">
                  {getDate(round16.matches[3]?.match_date)}
                </p>
              </div>
            </div>
            <div className="w-full h-[70%] flex rounded-b-lg">
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={round16.matches[3]?.team_home_badge}
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {round16.matches[3]?.match_hometeam_name}
                </p>
              </div>
              <div className="w-[40%] h-full flex items-center">
                <div className="bg-[#6A0929] w-full h-[50%] mt-[10px] rounded-[8px] flex items-center justify-center">
                  <span className="text-[#fff]">
                    {round16.matches[3]?.match_hometeam_score
                      ? round16.matches[3]?.match_hometeam_score
                      : "؟"}
                  </span>
                  <span className="text-[#fff] mx-1">-</span>
                  <span className="text-[#fff]">
                    {round16.matches[3]?.match_awayteam_score
                      ? round16.matches[3]?.match_awayteam_score
                      : "؟"}
                  </span>
                </div>
              </div>
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={round16.matches[3]?.team_away_badge}
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {round16.matches[3]?.match_awayteam_name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const roundOf8Left = () => {
    return (
      <div className={styles["main-game-table-removal-list-8"]}>
        <div className="flex flex-col gap-[10px] w-full h-full justify-center relative after:content-[''] after:w-1 after:h-[53%] after:absolute after:top-[50%] after:left-[-12px] after:bg-[#791231]">
          <div className="w-full flex flex-col bg-[#791231] rounded-lg aspect-[2/1] relative after:content-[''] after:w-[9%] after:h-1 after:absolute after:top-[50%] after:left-[-12px] after:bg-[#791231] before:content-[''] before:w-[9%] before:h-1 before:absolute before:top-[50%] before:right-[-6%] before:bg-[#791231]">
            <div className="w-full h-[30%] bg-white rounded-t-lg">
              <div className="flex items-center h-full px-2 mt-[3px]">
                <p className="flex-[50] justify-start items-center text-[#791231]">
                  {/* {round8.matches[0]?.match_time} */}
                </p>
                <p className="flex-[50] justify-end text-left items-center text-[#791231]">
                  {getDate(round8.matches[0]?.match_date)}
                </p>
              </div>
            </div>
            <div className="w-full h-[70%] flex rounded-b-lg">
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={
                    round8.matches[0]?.team_home_badge
                      ? round8.matches[0]?.team_home_badge
                      : "/images/flags/def.svg"
                  }
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {!round8.matches[0]?.team_home_badge
                    ? ""
                    : round8.matches[0]?.match_hometeam_name}
                </p>
              </div>
              <div className="w-[40%] h-full flex items-center">
                <div className="bg-[#6A0929] w-full h-[50%] mt-[10px] rounded-[8px] flex items-center justify-center">
                  <span className="text-[#fff]">
                    {round8.matches[0]?.match_hometeam_score
                      ? round8.matches[0]?.match_hometeam_score
                      : "؟"}
                  </span>
                  <span className="text-[#fff] mx-1">-</span>
                  <span className="text-[#fff]">
                    {round8.matches[0]?.match_awayteam_score
                      ? round8.matches[0]?.match_awayteam_score
                      : "؟"}
                  </span>
                </div>
              </div>
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={
                    round8.matches[0]?.team_away_badge
                      ? round8.matches[0]?.team_away_badge
                      : "/images/flags/def.svg"
                  }
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px] text-[10px]">
                  {!round8.matches[0]?.team_away_badge
                    ? ""
                    : round8.matches[0]?.match_awayteam_name}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] w-full h-full justify-center relative after:content-[''] after:w-1 after:h-[53%] after:absolute after:bottom-[50%] after:left-[-12px] after:bg-[#791231]">
          <div className="w-full flex flex-col bg-[#791231] rounded-lg aspect-[2/1] relative after:content-[''] after:w-[9%] after:h-1 after:absolute after:top-[50%] after:left-[-12px] after:bg-[#791231] before:content-[''] before:w-[9%] before:h-1 before:absolute before:top-[50%]  before:right-[-6%] before:bg-[#791231]">
            <div className="w-full h-[30%] bg-white rounded-t-lg">
              <div className="flex items-center h-full px-2 mt-[3px]">
                <p className="flex-[50] justify-start items-center text-[#791231]">
                  {round8.matches[1]?.match_time}
                </p>
                <p className="flex-[50] justify-end text-left items-center text-[#791231]">
                  {getDate(round8.matches[1]?.match_date)}
                </p>
              </div>
            </div>
            <div className="w-full h-[70%] flex rounded-b-lg">
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={
                    round8.matches[1]?.team_home_badge
                      ? round8.matches[1]?.team_home_badge
                      : "/images/flags/def.svg"
                  }
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {!round8.matches[1]?.team_home_badge
                    ? ""
                    : round8.matches[1]?.match_hometeam_name}
                </p>
              </div>
              <div className="w-[40%] h-full flex items-center">
                <div className="bg-[#6A0929] w-full h-[50%] mt-[10px] rounded-[8px] flex items-center justify-center">
                  <span className="text-[#fff]">
                    {round8.matches[1]?.match_hometeam_score
                      ? round8.matches[1]?.match_hometeam_score
                      : "؟"}
                  </span>
                  <span className="text-[#fff] mx-1">-</span>
                  <span className="text-[#fff]">
                    {round8.matches[1]?.match_hometeam_score
                      ? round8.matches[1]?.match_hometeam_score
                      : "؟"}
                  </span>
                </div>
              </div>
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={
                    round8.matches[1]?.team_away_badge
                      ? round8.matches[1]?.team_away_badge
                      : "/images/flags/def.svg"
                  }
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {!round8.matches[1]?.team_away_badge
                    ? ""
                    : round8.matches[1]?.match_awayteam_name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const roundOf4Left = () => {
    return (
      <div className={styles["main-game-table-removal-list-4"]}>
        <div className="w-full flex flex-col bg-[#791231] rounded-lg aspect-[2/1] relative after:content-[''] after:w-[9%] after:h-1 after:absolute after:top-[50%] after:left-[-6%] after:bg-[#791231] before:content-[''] before:w-[9%] before:h-1 before:absolute before:top-[50%] before:right-[-6%] before:bg-[#791231]">
          <div className="w-full h-[30%] bg-white rounded-t-lg">
            <div className="flex items-center h-full px-2 mt-[3px]">
              <p className="flex-[50] justify-start items-center text-[#791231]">
                {semiFinal.matches[0]?.match_time}
              </p>
              <p className="flex-[50] justify-end text-left items-center text-[#791231]">
                {getDate(semiFinal.matches[0]?.match_date)}
              </p>
            </div>
          </div>
          <div className="w-full h-[70%] flex rounded-b-lg">
            <div className="w-[30%] flex flex-col justify-center items-center">
              <Image
                src={
                  semiFinal.matches[0]?.team_home_badge
                    ? semiFinal.matches[0]?.team_home_badge
                    : "/images/flags/def.svg"
                }
                alt="flag"
                width={30}
                height={30}
                className="rounded-[80px]"
              />
              <p className="text-[#fff] mt-[2px]">
                {!semiFinal.matches[0]?.team_home_badge
                  ? ""
                  : semiFinal.matches[0]?.match_hometeam_name}
              </p>
            </div>
            <div className="w-[40%] h-full flex items-center">
              <div className="bg-[#6A0929] w-full h-[50%] mt-[10px] rounded-[8px] flex items-center justify-center">
                <span className="text-[#fff]">
                  {semiFinal.matches[0]?.match_hometeam_score
                    ? semiFinal.matches[0]?.match_hometeam_score
                    : "؟"}
                </span>
                <span className="text-[#fff] mx-1">-</span>
                <span className="text-[#fff]">
                  {semiFinal.matches[0]?.match_hometeam_score
                    ? semiFinal.matches[0]?.match_hometeam_score
                    : "؟"}
                </span>
              </div>
            </div>
            <div className="w-[30%] flex flex-col justify-center items-center">
              <Image
                src={
                  semiFinal.matches[0]?.team_away_badge
                    ? semiFinal.matches[0]?.team_away_badge
                    : "/images/flags/def.svg"
                }
                alt="flag"
                width={30}
                height={30}
                className="rounded-[80px]"
              />
              <p className="text-[#fff] mt-[2px]">
                {!semiFinal.matches[0]?.team_away_badge
                  ? ""
                  : semiFinal.matches[0]?.match_awayteam_name}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const roundOf2 = () => {
    return (
      <div className={styles["main-game-table-removal-list-final"]}>
        <div className={styles["main-game-table-removal-list-final-inner"]}>
          <div className="w-full flex h-full justify-between flex-col rounded-lg aspect-[2/1] relative after:content-[''] after:w-[9%] after:h-1 after:absolute after:top-[50%] after:left-[-6%] after:bg-[#791231] before:content-[''] before:w-[9%] before:h-1 before:absolute before:top-[50%] before:right-[-6%] before:bg-[#791231]">
            <div className="bg-[#791231] rounded-lg h-[100px]">
              <div className="w-full h-[30%] bg-white rounded-t-lg">
                <div className="flex items-center h-full px-2 mt-[3px]">
                  <p className="flex-[50] justify-start items-center text-[#791231]">
                    {placeFinal.matches[0]?.match_time}
                  </p>
                  <p className="flex-[50] justify-end text-left items-center text-[#791231]">
                    {getDate(placeFinal.matches[0]?.match_date)}
                  </p>
                </div>
              </div>
              <div className="w-full h-[70%] flex rounded-b-lg">
                <div className="w-[30%] flex flex-col justify-center items-center">
                  <Image
                    src={
                      placeFinal.matches[0]?.team_home_badge
                        ? placeFinal.matches[0]?.team_home_badge
                        : "/images/flags/def.svg"
                    }
                    alt="flag"
                    width={30}
                    height={30}
                    className="rounded-[80px]"
                  />
                  <p className="text-[#fff] mt-[2px]">
                    {!placeFinal.matches[0]?.team_home_badge
                      ? ""
                      : placeFinal.matches[0]?.match_hometeam_name}
                  </p>
                </div>
                <div className="w-[40%] h-full flex items-center">
                  <div className="bg-[#6A0929] w-full h-[50%] mt-[10px] rounded-[8px] flex items-center justify-center">
                    <span className="text-[#fff]">
                      {placeFinal.matches[0]?.match_hometeam_score
                        ? placeFinal.matches[0]?.match_hometeam_score
                        : "؟"}
                    </span>
                    <span className="text-[#fff] mx-1">-</span>
                    <span className="text-[#fff]">
                      {placeFinal.matches[0]?.match_hometeam_score
                        ? placeFinal.matches[0]?.match_hometeam_score
                        : "؟"}
                    </span>
                  </div>
                </div>
                <div className="w-[30%] flex flex-col justify-center items-center">
                  <Image
                    src={
                      placeFinal.matches[0]?.team_away_badge
                        ? placeFinal.matches[0]?.team_away_badge
                        : "/images/flags/def.svg"
                    }
                    alt="flag"
                    width={30}
                    height={30}
                    className="rounded-[80px]"
                  />
                  <p className="text-[#fff] mt-[2px]">
                    {!placeFinal.matches[0]?.team_away_badge
                      ? ""
                      : placeFinal.matches[0]?.match_awayteam_name}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#791231] rounded-lg h-[150px] mb-[-50px]">
              <div className="w-full h-[30%] bg-white rounded-t-lg">
                <div className="flex items-center h-full px-2 mt-[3px]">
                  <p className="flex-[50] justify-start items-center text-[#791231]">
                    {final.matches[0]?.match_time}
                  </p>
                  <p className="flex-[50] justify-end text-left items-center text-[#791231]">
                    {getDate(final.matches[0]?.match_date)}
                  </p>
                </div>
              </div>
              <p className="flex-[100] text-center text-[#fff]">نهایی</p>
              <div className="w-full h-[50%] flex rounded-b-lg">
                <div className="w-[30%] flex flex-col justify-center items-center">
                  <Image
                    src={
                      final.matches[0]?.team_home_badge
                        ? final.matches[0]?.team_home_badge
                        : "/images/flags/def.svg"
                    }
                    alt="flag"
                    width={30}
                    height={30}
                    className="rounded-[80px]"
                  />
                  <p className="text-[#fff] mt-[2px]">
                    {!final.matches[0]?.team_home_badge
                      ? ""
                      : final.matches[0]?.match_hometeam_name}
                  </p>
                </div>
                <div className="w-[40%] h-full flex items-center">
                  <div className="bg-[#6A0929] w-full h-[50%] mt-[10px] rounded-[8px] flex items-center justify-center">
                    <span className="text-[#fff]">
                      {final.matches[0]?.match_hometeam_score
                        ? final.matches[0]?.match_hometeam_score
                        : "؟"}
                    </span>
                    <span className="text-[#fff] mx-1">-</span>
                    <span className="text-[#fff]">
                      {final.matches[0]?.match_hometeam_score
                        ? final.matches[0]?.match_hometeam_score
                        : "؟"}
                    </span>
                  </div>
                </div>
                <div className="w-[30%] flex flex-col justify-center items-center">
                  <Image
                    src={
                      final.matches[0]?.team_away_badge
                        ? final.matches[0]?.team_away_badge
                        : "/images/flags/def.svg"
                    }
                    alt="flag"
                    width={30}
                    height={30}
                    className="rounded-[80px]"
                  />
                  <p className="text-[#fff] mt-[2px]">
                    {!final.matches[0]?.team_away_badge
                      ? ""
                      : final.matches[0]?.match_awayteam_name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const roundOf4Right = () => {
    return (
      <div className={styles["main-game-table-removal-list-4"]}>
        <div className="w-full flex flex-col bg-[#791231] rounded-lg aspect-[2/1] relative after:content-[''] after:w-[9%] after:h-1 after:absolute after:top-[50%] after:left-[-6%] after:bg-[#791231] before:content-[''] before:w-[9%] before:h-1 before:absolute before:top-[50%] before:right-[-6%] before:bg-[#791231]">
          <div className="w-full h-[30%] bg-white rounded-t-lg">
            <div className="flex items-center h-full px-2 mt-[3px]">
              <p className="flex-[50] justify-start items-center text-[#791231]">
                {semiFinal.matches[1]?.match_time}
              </p>
              <p className="flex-[50] justify-end text-left items-center text-[#791231]">
                {getDate(semiFinal.matches[1]?.match_date)}
              </p>
            </div>
          </div>
          <div className="w-full h-[70%] flex rounded-b-lg">
            <div className="w-[30%] flex flex-col justify-center items-center">
              <Image
                src={
                  semiFinal.matches[1]?.team_home_badge
                    ? semiFinal.matches[1]?.team_home_badge
                    : "/images/flags/def.svg"
                }
                alt="flag"
                width={30}
                height={30}
                className="rounded-[80px]"
              />
              <p className="text-[#fff] mt-[2px]">
                {!semiFinal.matches[1]?.team_home_badge
                  ? ""
                  : semiFinal.matches[1]?.match_hometeam_name}
              </p>
            </div>
            <div className="w-[40%] h-full flex items-center">
              <div className="bg-[#6A0929] w-full h-[50%] mt-[10px] rounded-[8px] flex items-center justify-center">
                <span className="text-[#fff]">
                  {semiFinal.matches[1]?.match_hometeam_score
                    ? semiFinal.matches[1]?.match_hometeam_score
                    : "؟"}
                </span>
                <span className="text-[#fff] mx-1">-</span>
                <span className="text-[#fff]">
                  {semiFinal.matches[1]?.match_awayteam_score
                    ? semiFinal.matches[1]?.match_awayteam_score
                    : "؟"}
                </span>
              </div>
            </div>
            <div className="w-[30%] flex flex-col justify-center items-center">
              <Image
                src={
                  semiFinal.matches[1]?.team_away_badge
                    ? semiFinal.matches[1]?.team_away_badge
                    : "/images/flags/def.svg"
                }
                alt="flag"
                width={30}
                height={30}
                className="rounded-[80px]"
              />
              <p className="text-[#fff] mt-[2px]">
                {!semiFinal.matches[1]?.team_away_badge
                  ? ""
                  : semiFinal.matches[1]?.match_awayteam_name}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const roundOf8Right = () => {
    return (
      <div className={styles["main-game-table-removal-list-8"]}>
        <div className="flex flex-col gap-[10px] w-full h-full justify-center relative after:content-[''] after:w-1 after:h-[53%] after:absolute after:top-[50%] after:right-[-12px] after:bg-[#791231]">
          <div className="w-full flex flex-col bg-[#791231] rounded-lg aspect-[2/1] relative after:content-[''] after:w-[9%] after:h-1 after:absolute after:top-[50%] after:left-[-6%] after:bg-[#791231] before:content-[''] before:w-[12px] before:h-1 before:absolute before:top-[50%]  before:right-[-12px] before:bg-[#791231]">
            <div className="w-full h-[30%] bg-white rounded-t-lg">
              <div className="flex items-center h-full px-2 mt-[3px]">
                <p className="flex-[50] justify-start items-center text-[#791231]">
                  {round8.matches[2]?.match_time}
                </p>
                <p className="flex-[50] justify-end text-left items-center text-[#791231]">
                  {getDate(round8.matches[2]?.match_date)}
                </p>
              </div>
            </div>
            <div className="w-full h-[70%] flex rounded-b-lg">
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={
                    round8.matches[2]?.team_home_badge
                      ? round8.matches[2]?.team_home_badge
                      : "/images/flags/def.svg"
                  }
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {!round8.matches[2]?.team_home_badge
                    ? ""
                    : round8.matches[2]?.match_hometeam_name}
                </p>
              </div>
              <div className="w-[40%] h-full flex items-center">
                <div className="bg-[#6A0929] w-full h-[50%] mt-[10px] rounded-[8px] flex items-center justify-center">
                  <span className="text-[#fff]">
                    {round8.matches[2]?.match_hometeam_score
                      ? round8.matches[2]?.match_hometeam_score
                      : "؟"}
                  </span>
                  <span className="text-[#fff] mx-1">-</span>
                  <span className="text-[#fff]">
                    {round8.matches[2]?.match_hometeam_score
                      ? round8.matches[2]?.match_hometeam_score
                      : "؟"}
                  </span>
                </div>
              </div>
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={
                    round8.matches[2]?.team_away_badge
                      ? round8.matches[2]?.team_away_badge
                      : "/images/flags/def.svg"
                  }
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {!round8.matches[2]?.team_away_badge
                    ? ""
                    : round8.matches[2]?.match_awayteam_name}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] w-full h-full justify-center relative after:content-[''] after:w-1 after:h-[53%] after:absolute after:bottom-[50%] after:right-[-12px] after:bg-[#791231]">
          <div className="w-full flex flex-col bg-[#791231] rounded-lg aspect-[2/1] relative after:content-[''] after:w-[9%] after:h-1 after:absolute after:top-[50%] after:left-[-6%] after:bg-[#791231] before:content-[''] before:w-[12px] before:h-1 before:absolute before:top-[50%]  before:right-[-12px] before:bg-[#791231]">
            <div className="w-full h-[30%] bg-white rounded-t-lg">
              <div className="flex items-center h-full px-2 mt-[3px]">
                <p className="flex-[50] justify-start items-center text-[#791231]">
                  {round8.matches[3]?.match_time}
                </p>
                <p className="flex-[50] justify-end text-left items-center text-[#791231]">
                  {getDate(round8.matches[3]?.match_date)}
                </p>
              </div>
            </div>
            <div className="w-full h-[70%] flex rounded-b-lg">
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={
                    round8.matches[3]?.team_home_badge
                      ? round8.matches[3]?.team_home_badge
                      : "/images/flags/def.svg"
                  }
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {!round8.matches[3]?.team_home_badge
                    ? ""
                    : round8.matches[3]?.match_hometeam_name}
                </p>
              </div>
              <div className="w-[40%] h-full flex items-center">
                <div className="bg-[#6A0929] w-full h-[50%] mt-[10px] rounded-[8px] flex items-center justify-center">
                  <span className="text-[#fff]">
                    {round8.matches[3]?.match_hometeam_score
                      ? round8.matches[3]?.match_hometeam_score
                      : "؟"}
                  </span>
                  <span className="text-[#fff] mx-1">-</span>
                  <span className="text-[#fff]">
                    {round8.matches[3]?.match_hometeam_score
                      ? round8.matches[3]?.match_hometeam_score
                      : "؟"}
                  </span>
                </div>
              </div>
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={
                    round8.matches[3]?.team_away_badge
                      ? round8.matches[3]?.team_away_badge
                      : "/images/flags/def.svg"
                  }
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {!round8.matches[3]?.team_away_badge
                    ? ""
                    : round8.matches[3]?.match_awayteam_name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const roundOf16Right = () => {
    return (
      <div className={styles["main-game-table-removal-list-16"]}>
        <div className="flex flex-col gap-[10px] w-full relative after:content-[''] after:w-1 after:h-[53%] after:absolute after:top-[24%] after:right-[-12px] after:bg-[#791231]">
          <div className="w-full flex flex-col bg-[#791231] rounded-lg aspect-[2/1] relative after:content-[''] after:w-[12px] after:h-1 after:absolute after:top-[50%] after:right-[-12px] after:bg-[#791231]">
            <div className="w-full h-[30%] bg-white rounded-t-lg">
              <div className="flex items-center h-full px-2 mt-[3px]">
                <p className="flex-[50] justify-start items-center text-[#791231]">
                  {round16.matches[4]?.match_time}
                </p>
                <p className="flex-[50] justify-end text-left items-center text-[#791231]">
                  {getDate(round16.matches[4]?.match_date)}
                </p>
              </div>
            </div>
            <div className="w-full h-[70%] flex rounded-b-lg">
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={round16.matches[4]?.team_home_badge}
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {round16.matches[4]?.match_hometeam_name}
                </p>
              </div>
              <div className="w-[40%] h-full flex items-center">
                <div className="bg-[#6A0929] w-full h-[50%] mt-[10px] rounded-[8px] flex items-center justify-center">
                  <span className="text-[#fff]">
                    {round16.matches[4]?.match_hometeam_score
                      ? round16.matches[4]?.match_hometeam_score
                      : "؟"}
                  </span>
                  <span className="text-[#fff] mx-1">-</span>
                  <span className="text-[#fff]">
                    {round16.matches[4]?.match_awayteam_score
                      ? round16.matches[4]?.match_awayteam_score
                      : "؟"}
                  </span>
                </div>
              </div>
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={round16.matches[4]?.team_away_badge}
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {round16.matches[4]?.match_awayteam_name}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col bg-[#791231] rounded-lg aspect-[2/1] relative after:content-[''] after:w-[12px] after:h-1 after:absolute after:top-[50%] after:right-[-12px] after:bg-[#791231]">
            <div className="w-full h-[30%] bg-white rounded-t-lg">
              <div className="flex items-center h-full px-2 mt-[3px]">
                <p className="flex-[50] justify-start items-center text-[#791231]">
                  {round16.matches[5]?.match_time}
                </p>
                <p className="flex-[50] justify-end text-left items-center text-[#791231]">
                  {getDate(round16.matches[5]?.match_date)}
                </p>
              </div>
            </div>
            <div className="w-full h-[70%] flex rounded-b-lg">
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={round16.matches[5]?.team_home_badge}
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {round16.matches[5]?.match_hometeam_name}
                </p>
              </div>
              <div className="w-[40%] h-full flex items-center">
                <div className="bg-[#6A0929] w-full h-[50%] mt-[10px] rounded-[8px] flex items-center justify-center">
                  <span className="text-[#fff]">
                    {round16.matches[5]?.match_hometeam_score
                      ? round16.matches[5]?.match_hometeam_score
                      : "؟"}
                  </span>
                  <span className="text-[#fff] mx-1">-</span>
                  <span className="text-[#fff]">
                    {round16.matches[5]?.match_awayteam_score
                      ? round16.matches[5]?.match_awayteam_score
                      : "؟"}
                  </span>
                </div>
              </div>
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={round16.matches[5]?.team_away_badge}
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {round16.matches[5]?.match_awayteam_name}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] w-full relative after:content-[''] after:w-1 after:h-[53%] after:absolute after:top-[24%] after:right-[-12px] after:bg-[#791231]">
          <div className="w-full flex flex-col bg-[#791231] rounded-lg aspect-[2/1] relative after:content-[''] after:w-[12px] after:h-1 after:absolute after:top-[50%] after:right-[-12px] after:bg-[#791231]">
            <div className="w-full h-[30%] bg-white rounded-t-lg">
              <div className="flex items-center h-full px-2 mt-[3px]">
                <p className="flex-[50] justify-start items-center text-[#791231]">
                  {round16.matches[6]?.match_time}
                </p>
                <p className="flex-[50] justify-end text-left items-center text-[#791231]">
                  {getDate(round16.matches[6]?.match_date)}
                </p>
              </div>
            </div>
            <div className="w-full h-[70%] flex rounded-b-lg">
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={round16.matches[6]?.team_home_badge}
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {round16.matches[6]?.match_hometeam_name}
                </p>
              </div>
              <div className="w-[40%] h-full flex items-center">
                <div className="bg-[#6A0929] w-full h-[50%] mt-[10px] rounded-[8px] flex items-center justify-center">
                  <span className="text-[#fff]">
                    {round16.matches[6]?.match_hometeam_score
                      ? round16.matches[6]?.match_hometeam_score
                      : "؟"}
                  </span>
                  <span className="text-[#fff] mx-1">-</span>
                  <span className="text-[#fff]">
                    {round16.matches[6]?.match_awayteam_score
                      ? round16.matches[6]?.match_awayteam_score
                      : "؟"}
                  </span>
                </div>
              </div>
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={round16.matches[6]?.team_away_badge}
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {round16.matches[6]?.match_awayteam_name}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col bg-[#791231] rounded-lg aspect-[2/1] relative after:content-[''] after:w-[12px] after:h-1 after:absolute after:top-[50%] after:right-[-12px] after:bg-[#791231]">
            <div className="w-full h-[30%] bg-white rounded-t-lg">
              <div className="flex items-center h-full px-2 mt-[3px]">
                <p className="flex-[50] justify-start items-center text-[#791231]">
                  {round16.matches[7]?.match_time}
                </p>
                <p className="flex-[50] justify-end text-left items-center text-[#791231]">
                  {getDate(round16.matches[7]?.match_date)}
                </p>
              </div>
            </div>
            <div className="w-full h-[70%] flex rounded-b-lg">
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={round16.matches[7]?.team_home_badge}
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {round16.matches[7]?.match_hometeam_name}
                </p>
              </div>
              <div className="w-[40%] h-full flex items-center">
                <div className="bg-[#6A0929] w-full h-[50%] mt-[10px] rounded-[8px] flex items-center justify-center">
                  <span className="text-[#fff]">
                    {round16.matches[7]?.match_hometeam_score
                      ? round16.matches[7]?.match_hometeam_score
                      : "؟"}
                  </span>
                  <span className="text-[#fff] mx-1">-</span>
                  <span className="text-[#fff]">
                    {round16.matches[7]?.match_awayteam_score
                      ? round16.matches[7]?.match_awayteam_score
                      : "؟"}
                  </span>
                </div>
              </div>
              <div className="w-[30%] flex flex-col justify-center items-center">
                <Image
                  src={round16.matches[7]?.team_away_badge}
                  alt="flag"
                  width={30}
                  height={30}
                  className="rounded-[80px]"
                />
                <p className="text-[#fff] mt-[2px]">
                  {round16.matches[7]?.match_awayteam_name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <section className={styles["main-game-table-removal-container"]} id="table">
      <div className="container relative mx-auto lg:px-6 px-3 h-[100%] md:h-[90%]">
        <div className={styles["main-game-table-header"]}>
          <h2>{`برنامه بازی ها(مرحله حذفی)`}</h2>
          <Link href="/groups">
            <a className="text-[#fff] text-lg border-2 rounded-full px-2 flex-20">
              جزئیات
            </a>
          </Link>
        </div>

        <div className="w-full h-[72%] hidden justify-around mt-[50px] md:flex">
          {round16.matches && roundOf16Left()}
          {round8.matches && roundOf8Left()}
          {semiFinal.matches && roundOf4Left()}
          {final.matches && roundOf2()}
          {semiFinal.matches && roundOf4Right()}
          {round8.matches && roundOf8Right()}
          {round16.matches && roundOf16Right()}
        </div>
        <div className="w-full h-[100%] flex flex-col justify-between mt-[20px] md:hidden">
          <div className="flex justify-between">
            <div
              className={
                isOpenTab === "16"
                  ? `flex border-b-[2px] mb-[10px]`
                  : `flex mb-[10px]`
              }
              onClick={() => {
                setIsOpenTab("16");
              }}
            >
              <h3 className="text-[#fff]">یک هشتم</h3>
            </div>
            <div
              className={
                isOpenTab === "8"
                  ? `flex border-b-[2px] mb-[10px]`
                  : `flex mb-[10px]`
              }
              onClick={() => {
                setIsOpenTab("8");
              }}
            >
              <h3 className="text-[#fff]">یک چهارم</h3>
            </div>
            <div
              className={
                isOpenTab === "4"
                  ? `flex border-b-[2px] mb-[10px]`
                  : `flex mb-[10px]`
              }
              onClick={() => {
                setIsOpenTab("4");
              }}
            >
              <h3 className="text-[#fff]">نیمه نهایی</h3>
            </div>
            <div
              className={
                isOpenTab === "2"
                  ? `flex border-b-[2px] mb-[10px]`
                  : `flex mb-[10px]`
              }
              onClick={() => {
                setIsOpenTab("2");
              }}
            >
              <h3 className="text-[#fff]">رده بندی</h3>
            </div>
            <div
              className={
                isOpenTab === "1"
                  ? `flex border-b-[2px] mb-[10px]`
                  : `flex mb-[10px]`
              }
              onClick={() => {
                setIsOpenTab("1");
              }}
            >
              <h3 className="text-[#fff]">فینال</h3>
            </div>
          </div>
          <div className="w-full">
            {isOpenTab === "16" && (
              <>
                {round16.matches &&
                  handleSlice().map((matches, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full flex flex-col bg-[#791231] rounded-lg aspect-[2/1] mb-2"
                      >
                        <div className="w-full h-[30%] bg-white rounded-t-lg">
                          <div className="flex items-center h-full px-2 mt-[3px]">
                            <p className="flex-[50] justify-start items-center text-[#791231]">
                              ساعت
                              {": " + matches.match_time}
                            </p>
                            <p className="flex-[50] justify-end text-left items-center text-[#791231]">
                              تاریخ
                              {": " + getDate(matches.match_date)}
                            </p>
                          </div>
                        </div>
                        <div className="w-full h-[70%] flex rounded-b-lg">
                          <div className="w-[30%] flex flex-col justify-center items-center">
                            <Image
                              src={matches.team_home_badge}
                              alt="flag"
                              width={30}
                              height={30}
                              className="rounded-[80px]"
                            />
                            <p className="text-[#fff] mt-[2px]">
                              {matches.match_hometeam_name}
                            </p>
                          </div>
                          <div className="w-[40%] h-full flex items-center">
                            <div className="bg-[#6A0929] w-full h-[50%] mt-[10px] rounded-[8px] flex items-center justify-center">
                              <span className="text-[#fff]">
                                {matches.match_hometeam_score
                                  ? matches.match_hometeam_score
                                  : "؟"}
                              </span>
                              <span className="text-[#fff] mx-1">-</span>
                              <span className="text-[#fff]">
                                {matches.match_awayteam_score
                                  ? matches.match_awayteam_score
                                  : "؟"}
                              </span>
                            </div>
                          </div>
                          <div className="w-[30%] flex flex-col justify-center items-center">
                            <Image
                              src={matches.team_away_badge}
                              alt="flag"
                              width={30}
                              height={30}
                              className="rounded-[80px]"
                            />
                            <p className="text-[#fff] mt-[2px]">
                              {matches.match_awayteam_name}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                <p
                  className="text-[#fff] text-center"
                  onClick={() => {
                    setIsMore(!isMore);
                  }}
                >
                  {isMore ? "کمتر..." : "بیشتر..."}
                </p>
              </>
            )}
          </div>
          <div className="w-full">
            {isOpenTab === "8" && (
              <>
                {round8.matches &&
                  handleSlice2().map((matches, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full flex flex-col bg-[#791231] rounded-lg aspect-[2/1] mb-2"
                      >
                        <div className="w-full h-[30%] bg-white rounded-t-lg">
                          <div className="flex items-center h-full px-2 mt-[3px]">
                            <p className="flex-[50] justify-start items-center text-[#791231]">
                              ساعت
                              {": " + matches.match_time}
                            </p>
                            <p className="flex-[50] justify-end text-left items-center text-[#791231]">
                              تاریخ
                              {": " + getDate(matches.match_date)}
                            </p>
                          </div>
                        </div>
                        <div className="w-full h-[70%] flex rounded-b-lg">
                          <div className="w-[30%] flex flex-col justify-center items-center">
                            <Image
                              src={
                                matches.team_home_badge
                                  ? matches.team_home_badge
                                  : "/images/flags/def.svg"
                              }
                              alt="flag"
                              width={30}
                              height={30}
                              className="rounded-[80px]"
                            />
                            <p className="text-[#fff] mt-[2px]">
                              {matches.match_hometeam_name ===
                                "Winner match 53" ||
                              "Winner match 49" ||
                              "Winner match 55" ||
                              "Winner match 51"
                                ? "؟"
                                : matches.match_hometeam_name}
                            </p>
                          </div>
                          <div className="w-[40%] h-full flex items-center">
                            <div className="bg-[#6A0929] w-full h-[50%] mt-[10px] rounded-[8px] flex items-center justify-center">
                              <span className="text-[#fff]">
                                {matches.match_hometeam_score
                                  ? matches.match_hometeam_score
                                  : "؟"}
                              </span>
                              <span className="text-[#fff] mx-1">-</span>
                              <span className="text-[#fff]">
                                {matches.match_awayteam_score
                                  ? matches.match_awayteam_score
                                  : "؟"}
                              </span>
                            </div>
                          </div>
                          <div className="w-[30%] flex flex-col justify-center items-center">
                            <Image
                              src={
                                matches.team_away_badge
                                  ? matches.team_away_badge
                                  : "/images/flags/def.svg"
                              }
                              alt="flag"
                              width={30}
                              height={30}
                              className="rounded-[80px]"
                            />
                            <p className="text-[#fff] mt-[2px]">
                              {matches.match_awayteam_name ===
                                "Winner match 54" ||
                              "Winner match 50" ||
                              "Winner match 56" ||
                              "Winner match 52"
                                ? "؟"
                                : matches.match_awayteam_name}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                <p
                  className="text-[#fff] text-center"
                  onClick={() => {
                    setIsMore(!isMore);
                  }}
                >
                  {isMore ? "کمتر..." : "بیشتر..."}
                </p>
              </>
            )}
          </div>
          <div className="w-full">
            {isOpenTab === "4" && (
              <>
                {semiFinal.matches &&
                  semiFinal.matches.map((matches, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full flex flex-col bg-[#791231] rounded-lg aspect-[2/1] mb-2"
                      >
                        <div className="w-full h-[30%] bg-white rounded-t-lg">
                          <div className="flex items-center h-full px-2 mt-[3px]">
                            <p className="flex-[50] justify-start items-center text-[#791231]">
                              ساعت
                              {": " + matches.match_time}
                            </p>
                            <p className="flex-[50] justify-end text-left items-center text-[#791231]">
                              تاریخ
                              {": " + getDate(matches.match_date)}
                            </p>
                          </div>
                        </div>
                        <div className="w-full h-[70%] flex rounded-b-lg">
                          <div className="w-[30%] flex flex-col justify-center items-center">
                            <Image
                              src={
                                matches.team_home_badge
                                  ? matches.team_home_badge
                                  : "/images/flags/def.svg"
                              }
                              alt="flag"
                              width={30}
                              height={30}
                              className="rounded-[80px]"
                            />
                            <p className="text-[#fff] mt-[2px]">
                              {matches.match_hometeam_name ===
                                "Winner match 53" ||
                              "Winner match 49" ||
                              "Winner match 55" ||
                              "Winner match 51"
                                ? "؟"
                                : matches.match_hometeam_name}
                            </p>
                          </div>
                          <div className="w-[40%] h-full flex items-center">
                            <div className="bg-[#6A0929] w-full h-[50%] mt-[10px] rounded-[8px] flex items-center justify-center">
                              <span className="text-[#fff]">
                                {matches.match_hometeam_score
                                  ? matches.match_hometeam_score
                                  : "؟"}
                              </span>
                              <span className="text-[#fff] mx-1">-</span>
                              <span className="text-[#fff]">
                                {matches.match_awayteam_score
                                  ? matches.match_awayteam_score
                                  : "؟"}
                              </span>
                            </div>
                          </div>
                          <div className="w-[30%] flex flex-col justify-center items-center">
                            <Image
                              src={
                                matches.team_away_badge
                                  ? matches.team_away_badge
                                  : "/images/flags/def.svg"
                              }
                              alt="flag"
                              width={30}
                              height={30}
                              className="rounded-[80px]"
                            />
                            <p className="text-[#fff] mt-[2px]">
                              {matches.match_awayteam_name ===
                                "Winner match 54" ||
                              "Winner match 50" ||
                              "Winner match 56" ||
                              "Winner match 52"
                                ? "؟"
                                : matches.match_awayteam_name}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
          <div className="w-full">
            {isOpenTab === "2" && (
              <>
                {placeFinal.matches &&
                  placeFinal.matches.map((matches, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full flex flex-col bg-[#791231] rounded-lg aspect-[2/1] mb-2"
                      >
                        <div className="w-full h-[30%] bg-white rounded-t-lg">
                          <div className="flex items-center h-full px-2 mt-[3px]">
                            <p className="flex-[50] justify-start items-center text-[#791231]">
                              ساعت
                              {": " + matches.match_time}
                            </p>
                            <p className="flex-[50] justify-end text-left items-center text-[#791231]">
                              تاریخ
                              {": " + getDate(matches.match_date)}
                            </p>
                          </div>
                        </div>
                        <div className="w-full h-[70%] flex rounded-b-lg">
                          <div className="w-[30%] flex flex-col justify-center items-center">
                            <Image
                              src={
                                matches.team_home_badge
                                  ? matches.team_home_badge
                                  : "/images/flags/def.svg"
                              }
                              alt="flag"
                              width={30}
                              height={30}
                              className="rounded-[80px]"
                            />
                            <p className="text-[#fff] mt-[2px]">
                              {matches.match_hometeam_name ===
                                "Winner match 53" ||
                              "Winner match 49" ||
                              "Winner match 55" ||
                              "Winner match 51"
                                ? "؟"
                                : matches.match_hometeam_name}
                            </p>
                          </div>
                          <div className="w-[40%] h-full flex items-center">
                            <div className="bg-[#6A0929] w-full h-[50%] mt-[10px] rounded-[8px] flex items-center justify-center">
                              <span className="text-[#fff]">
                                {matches.match_hometeam_score
                                  ? matches.match_hometeam_score
                                  : "؟"}
                              </span>
                              <span className="text-[#fff] mx-1">-</span>
                              <span className="text-[#fff]">
                                {matches.match_awayteam_score
                                  ? matches.match_awayteam_score
                                  : "؟"}
                              </span>
                            </div>
                          </div>
                          <div className="w-[30%] flex flex-col justify-center items-center">
                            <Image
                              src={
                                matches.team_away_badge
                                  ? matches.team_away_badge
                                  : "/images/flags/def.svg"
                              }
                              alt="flag"
                              width={30}
                              height={30}
                              className="rounded-[80px]"
                            />
                            <p className="text-[#fff] mt-[2px]">
                              {matches.match_awayteam_name ===
                                "Winner match 54" ||
                              "Winner match 50" ||
                              "Winner match 56" ||
                              "Winner match 52"
                                ? "؟"
                                : matches.match_awayteam_name}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
          <div className="w-full">
            {isOpenTab === "1" && (
              <>
                {final.matches &&
                  final.matches.map((matches, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full flex flex-col bg-[#791231] rounded-lg aspect-[2/1] mb-2"
                      >
                        <div className="w-full h-[30%] bg-white rounded-t-lg">
                          <div className="flex items-center h-full px-2 mt-[3px]">
                            <p className="flex-[50] justify-start items-center text-[#791231]">
                              ساعت
                              {": " + matches.match_time}
                            </p>
                            <p className="flex-[50] justify-end text-left items-center text-[#791231]">
                              تاریخ
                              {": " + getDate(matches.match_date)}
                            </p>
                          </div>
                        </div>
                        <div className="w-full h-[70%] flex rounded-b-lg">
                          <div className="w-[30%] flex flex-col justify-center items-center">
                            <Image
                              src={
                                matches.team_home_badge
                                  ? matches.team_home_badge
                                  : "/images/flags/def.svg"
                              }
                              alt="flag"
                              width={30}
                              height={30}
                              className="rounded-[80px]"
                            />
                            <p className="text-[#fff] mt-[2px]">
                              {matches.match_hometeam_name ===
                                "Winner match 53" ||
                              "Winner match 49" ||
                              "Winner match 55" ||
                              "Winner match 51"
                                ? "؟"
                                : matches.match_hometeam_name}
                            </p>
                          </div>
                          <div className="w-[40%] h-full flex items-center">
                            <div className="bg-[#6A0929] w-full h-[50%] mt-[10px] rounded-[8px] flex items-center justify-center">
                              <span className="text-[#fff]">
                                {matches.match_hometeam_score
                                  ? matches.match_hometeam_score
                                  : "؟"}
                              </span>
                              <span className="text-[#fff] mx-1">-</span>
                              <span className="text-[#fff]">
                                {matches.match_awayteam_score
                                  ? matches.match_awayteam_score
                                  : "؟"}
                              </span>
                            </div>
                          </div>
                          <div className="w-[30%] flex flex-col justify-center items-center">
                            <Image
                              src={
                                matches.team_away_badge
                                  ? matches.team_away_badge
                                  : "/images/flags/def.svg"
                              }
                              alt="flag"
                              width={30}
                              height={30}
                              className="rounded-[80px]"
                            />
                            <p className="text-[#fff] mt-[2px]">
                              {matches.match_awayteam_name ===
                                "Winner match 54" ||
                              "Winner match 50" ||
                              "Winner match 56" ||
                              "Winner match 52"
                                ? "؟"
                                : matches.match_awayteam_name}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamesTable;
