import Image from "next/image";

import { motion } from "framer-motion";

import {
  Game,
  SessionRoot,
  UserInfo,
  Session,
} from "../../interfaces/interfaces";

import { digitsEnToFa } from "@persian-tools/persian-tools";

import { Swiper, SwiperSlide } from "swiper/react";

import { EffectCoverflow, Navigation } from "swiper";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import React, { ReactNode, useEffect, useRef } from "react";
import { sessionsBackendURL } from "../../../../../globals";
type props = {
  styles: any;
  setPlayGameAnimation: (value: boolean) => void;
  setShowGameStartModal: (show: any) => void;
  getSessionWinners: (id: number) => void;
  getSessionInfo: (id: number) => void;
  setDayLeaderboardAnimation: (value: boolean) => void;
  setDayLeaderboardPopup: (value: Session) => void;
  sessionList: SessionRoot;
  user: UserInfo;
  calculateTime: (startTime: string) => string;
  remaingTime: string;
  calculatePriceFairAccess: () => ReactNode;
  calculatePrice: (item: Game) => ReactNode;
  setGameRuleAnimation: (value: boolean) => void;
  setGameRulePopup: (game: Game) => void;
  setWinners: (session: Session) => void;
};

const Sessions = ({
  styles,
  setPlayGameAnimation,
  setShowGameStartModal,
  sessionList,
  user,
  getSessionWinners,
  getSessionInfo,
  setDayLeaderboardAnimation,
  setDayLeaderboardPopup,
  calculateTime,
  calculatePrice,
  remaingTime,
  calculatePriceFairAccess,
  setGameRulePopup,
  setGameRuleAnimation,
  setWinners,
}: props) => {
  const sessionRef = useRef<HTMLDivElement>(null);
  const playRef = useRef<HTMLDivElement>(null);
  let index = sessionList.sessions.findIndex((item) => item.is_active);
  return (
    <>
      <div
        ref={playRef}
        className={styles["main-page-session-list-outer-container-xs"]}
      >
        <div
          style={{
            width: "100%",
          }}
          className={styles["main-page-session-list-swiper-xs"]}
        >
          <Swiper
            grabCursor={true}
            slidesPerView={1}
            centeredSlides={true}
            initialSlide={index}
            breakpoints={{
              300: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 1.5,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1280: {
                slidesPerView: 2.5,
                spaceBetween: 10,
              },
              1500: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
            }}
            loop={false}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 0,
              modifier: 1,
            }}
            freeMode
            modules={[Navigation]}
            navigation={{
              nextEl: ".prev-element",
              prevEl: ".next-element",
              disabledClass: "disabled-element",
            }}
            className={styles["main-page-presents-my-swiper-xs"]}
          >
            <div
              className={`flex flex-row justify-center items-center z-10 cursor-pointer shadow-lg next-element absolute top-[50%] right-0 bg-[#8a1638] h-10 w-10 rounded-full`}
            >
              <Image
                height={24}
                width={24}
                src={"/images/game/arrow-point-to-right.png"}
                alt="right"
              />
            </div>
            {sessionList.sessions.map((session: any, index: number) => {
              const sessionMili = new Date(session.start_datetime);

              const sessionDate = new Intl.DateTimeFormat("fa-IR").format(
                sessionMili
              );
              const todayMili = new Date().getTime();

              const hr = new Date().getHours() > 12 ? " 24:00" : " 12:00";
              return (
                <SwiperSlide key={index} dir={"rtl"}>
                  <div
                    ref={session.id === 22 ? sessionRef : null}
                    key={session.id}
                    data-active={session.is_active.toString()}
                    className={styles["main-page-session-list-item-xs"]}
                  >
                    <div
                      className={
                        styles["main-page-session-list-item-container-xs"]
                      }
                    >
                      <div
                        className={
                          styles["main-page-session-list-item-top-container-xs"]
                        }
                      >
                        <div
                          className={
                            styles["main-page-session-list-item-top-buttons-xs"]
                          }
                        >
                          {session.is_active ? (
                            <div
                              data-active={false}
                              className={
                                styles[
                                  "main-page-session-list-item-top-buttons-winners-xs"
                                ]
                              }
                            >
                              برندگان
                            </div>
                          ) : todayMili > sessionMili.getTime() ? (
                            <div
                              data-active={true}
                              className={
                                styles[
                                  "main-page-session-list-item-top-buttons-winners-xs"
                                ]
                              }
                              onClick={() => {
                                if (!session.is_active) {
                                  getSessionWinners(session.id);
                                  setWinners(session);
                                }
                              }}
                            >
                              برندگان
                            </div>
                          ) : (
                            <div
                              data-active={false}
                              className={
                                styles[
                                  "main-page-session-list-item-top-buttons-winners-xs"
                                ]
                              }
                            >
                              برندگان
                            </div>
                          )}
                          {session.is_active ? (
                            <div
                              data-active={true}
                              className={
                                styles[
                                  "main-page-session-list-item-top-buttons-ranks-xs"
                                ]
                              }
                              onClick={() => {
                                getSessionInfo(session.id);
                                setDayLeaderboardPopup(session);
                                setDayLeaderboardAnimation(true);
                              }}
                            >
                              {" "}
                              رتبه بندی
                            </div>
                          ) : todayMili > sessionMili.getTime() ? (
                            <div
                              data-active={true}
                              className={
                                styles[
                                  "main-page-session-list-item-top-buttons-ranks-xs"
                                ]
                              }
                              onClick={() => {
                                getSessionInfo(session.id);
                                setDayLeaderboardPopup(session);
                                setDayLeaderboardAnimation(true);
                              }}
                            >
                              {" "}
                              رتبه بندی
                            </div>
                          ) : (
                            <div
                              data-active={false}
                              className={
                                styles[
                                  "main-page-session-list-item-top-buttons-ranks-xs"
                                ]
                              }
                            >
                              رتبه بندی
                            </div>
                          )}
                        </div>

                        <div
                          className={
                            styles["main-page-session-list-item-top-timer-xs"]
                          }
                        >
                          <div
                            className={
                              styles["main-page-session-list-item-top-count-xs"]
                            }
                          >
                            <span
                              className={
                                styles[
                                  "main-page-session-list-item-top-count-num-xs"
                                ]
                              }
                            ></span>
                            <span
                              className={
                                styles[
                                  "main-page-session-list-item-top-count-title-xs"
                                ]
                              }
                            >
                              {sessionDate}
                            </span>
                          </div>
                          <p
                            className={
                              styles["main-page-session-list-item-top-time-xs"]
                            }
                          >
                            {`  از   
                                  ${digitsEnToFa(
                                    `${calculateTime(session.start_datetime)}`
                                  )}
              
                                  تا   
                                  ${
                                    session.is_active
                                      ? digitsEnToFa(`${hr}`)
                                      : digitsEnToFa(
                                          calculateTime(
                                            session.end_datetime
                                          ) === "23:59"
                                            ? "24:00"
                                            : calculateTime(
                                                session.end_datetime
                                              )
                                        )
                                  }
                                     `}
                          </p>
                        </div>

                        <div
                          className={
                            styles["main-page-session-list-item-top-title-xs"]
                          }
                        >
                          <div
                            className={
                              styles[
                                "main-page-session-list-item-top-title-title-xs"
                              ]
                            }
                          >
                            {session.title}
                          </div>

                          <div
                            className={
                              styles[
                                "main-page-session-list-item-top-timer-remaining-xs"
                              ]
                            }
                          >
                            <div
                              className={
                                styles[
                                  "main-page-session-list-item-top-timer-remaining-time-xs"
                                ]
                              }
                            >
                              <div
                                className={
                                  styles[
                                    "main-page-session-list-item-top-timer-remaining-time-title-xs"
                                  ]
                                }
                              >
                                {session.is_active
                                  ? "مانده به پایان لیگ"
                                  : todayMili > sessionMili.getTime()
                                  ? "تمام شده"
                                  : "شروع نشده"}
                              </div>
                              <div
                                className={
                                  styles[
                                    "main-page-session-list-item-top-timer-remaining-time-time-xs"
                                  ]
                                }
                              >
                                {session.is_active
                                  ? digitsEnToFa(`${remaingTime}`)
                                  : todayMili > sessionMili.getTime()
                                  ? digitsEnToFa("00:00:00")
                                  : digitsEnToFa("00:00:00")}
                              </div>
                            </div>
                            <div
                              className={
                                styles[
                                  "main-page-session-list-item-top-timer-icon-xs"
                                ]
                              }
                            >
                              <Image
                                width={55}
                                height={60}
                                src="/images/sessions/timer.svg"
                                alt="timer"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        data-active={session.is_active.toString()}
                        className={
                          styles[
                            "main-page-session-list-item-game-container-xs"
                          ]
                        }
                      >
                        {session.games.map((item: any, index: any) => {
                          return (
                            <div
                              key={index}
                              className={
                                styles[
                                  "main-page-session-list-item-game-row-xs"
                                ]
                              }
                            >
                              <div
                                className={
                                  styles[
                                    "main-page-session-list-item-game-data-container-xs"
                                  ]
                                }
                              >
                                <div
                                  className={
                                    styles[
                                      "main-page-session-list-item-game-data-text-container-xs"
                                    ]
                                  }
                                >
                                  <div
                                    className={
                                      styles[
                                        "main-page-session-list-item-game-data-container-xs"
                                      ]
                                    }
                                  >
                                    <div
                                      className={
                                        styles[
                                          "main-page-session-list-item-game-image-container-xs"
                                        ]
                                      }
                                    >
                                      <Image
                                        src={`${sessionsBackendURL}${item.game.image}`}
                                        className={
                                          styles[
                                            "main-page-session-list-item-game-image-xs"
                                          ]
                                        }
                                        alt={item.game.title}
                                        height={50}
                                        width={50}
                                        priority={true}
                                      />
                                      {session.is_double_score && (
                                        <img
                                          src="/images/sessions/double.svg"
                                          className={
                                            styles[
                                              "main-page-session-list-item-game-image-double-xs"
                                            ]
                                          }
                                          alt="double score"
                                        />
                                      )}
                                    </div>
                                    <div
                                      className={
                                        styles[
                                          "main-page-session-list-item-game-data-title-container-xs"
                                        ]
                                      }
                                    >
                                      <div
                                        className={
                                          styles[
                                            "main-page-session-list-item-game-data-text-title-xs"
                                          ]
                                        }
                                      >
                                        {item.game.title}
                                      </div>
                                      <div
                                        className={
                                          styles[
                                            "main-page-session-list-item-game-data-text-cost-container-xs"
                                          ]
                                        }
                                      >
                                        {user?.fair_access
                                          ? calculatePriceFairAccess()
                                          : calculatePrice(item)}
                                      </div>
                                    </div>
                                    <motion.button
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => {
                                        setGameRulePopup(item.game);
                                        setGameRuleAnimation(true);
                                      }}
                                      className={
                                        styles[
                                          "main-page-session-list-item-game-data-text-desc-xs"
                                        ]
                                      }
                                    >
                                      راهنمای بازی
                                      <div
                                        className={
                                          styles[
                                            "main-page-session-list-item-game-data-text-desc-icon-xs"
                                          ]
                                        }
                                      >
                                        <Image
                                          height={25}
                                          width={25}
                                          src="/images/sessions/rule-g.svg"
                                        />
                                      </div>
                                    </motion.button>
                                  </div>

                                  <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                      if (session.is_active) {
                                        setShowGameStartModal(item);
                                        setPlayGameAnimation(true);
                                      }
                                    }}
                                    data-active={session.is_active.toString()}
                                    className={
                                      styles[
                                        "main-page-session-list-item-game-button-xs"
                                      ]
                                    }
                                  >
                                    {item?.user_play_count === 0
                                      ? "دستگرمی"
                                      : "شروع"}
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
            <div
              className={`flex flex-row justify-center items-center z-10 cursor-pointer shadow-lg prev-element absolute top-[50%] left-0 bg-[#8a1638] h-10 w-10 rounded-full`}
            >
              <Image
                height={24}
                width={24}
                src={"/images/game/arrow-point-to-left.png"}
                alt="left"
              />
            </div>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default React.memo(Sessions);
