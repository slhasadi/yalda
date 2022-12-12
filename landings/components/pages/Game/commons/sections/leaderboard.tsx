import Image from "next/image";
import React, { useRef } from "react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { motion, AnimatePresence } from "framer-motion";
type props = {
  styles:any;
  token: string;
  sessionParentLeaderboard: any;
};

const leaderboard = ({ styles, token, sessionParentLeaderboard }: props) => {
  const renderLeaderBoardData = () => {
    if (token) {
      if (sessionParentLeaderboard.profile[0]?.rank <= 3) {
        let userRank = sessionParentLeaderboard.profile[0]?.rank;
        return (
          <table className={styles["main-page-leaderboard-top-xs"]}>
            <thead>
              <tr className={styles["main-page-leaderboard-top-tr-xs"]}>
                <th>رتبه</th>
                <th>نام کاربری</th>
                <th>جایزه</th>
                <th>امتیاز</th>
              </tr>
            </thead>
            {sessionParentLeaderboard.leaderboard
              .slice(0, 3)
              .map((item: any, index: number) => {
                return (
                  <tbody
                    key={index}
                    className={
                      userRank === item.rank
                        ? styles["main-page-leaderboard-top-active-xs"]
                        : ""
                    }
                  >
                    <tr>
                      <td data-th="rank">
                        {/* <Image
                          src="/images/sessions/rank-1.svg"
                          alt="rank 1"
                          width={80}
                          height={55}
                        /> */}
                      </td>
                      <td data-th="name">{digitsEnToFa(`${item.phone}`)}</td>
                      <td data-th="pize">
                        {/* <Image
                          src="/images/leaderboard/09.png"
                          alt="ps5"
                          width={50}
                          height={50}
                        /> */}
                      </td>
                      <td data-th="score">{digitsEnToFa(`${item.score}`)}</td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        );
      } else {
        return (
          <table className={styles["main-page-leaderboard-top-xs"]}>
            <thead>
              <tr className={styles["main-page-leaderboard-top-tr-xs"]}>
                <th>رتبه</th>
                <th>نام کاربری</th>
                <th>جایزه</th>
                <th>امتیاز</th>
              </tr>
            </thead>
            {sessionParentLeaderboard.leaderboard[0] && (
              <tbody>
                <tr>
                  <td data-th="rank">
                    <Image
                      src="/images/rate-badge/golden-cup.png"
                      alt="rank 1"
                      width={60}
                      height={55}
                    />
                  </td>
                  <td data-th="name">
                    {digitsEnToFa(
                      `${sessionParentLeaderboard.leaderboard[0].phone}`
                    )}
                  </td>
                  <td data-th="pize">
                    <Image
                      src="/images/awards/award-1.png"
                      alt="ps5"
                      width={50}
                      height={50}
                    />
                  </td>
                  <td data-th="score">
                    {digitsEnToFa(
                      `${sessionParentLeaderboard.leaderboard[0].score}`
                    )}
                  </td>
                </tr>
              </tbody>
            )}
            {sessionParentLeaderboard.leaderboard[1] && (
              <tbody>
                <tr>
                  <td data-th="rank">
                    <Image
                      src="/images/rate-badge/silver-cup.png"
                      alt="rank 3"
                      width={60}
                      height={55}
                    />
                  </td>
                  <td data-th="name">
                    {digitsEnToFa(
                      `${sessionParentLeaderboard.leaderboard[1].phone}`
                    )}
                  </td>
                  <td data-th="pize">
                    <Image
                      src="/images/awards/award-2.png"
                      alt="ps5"
                      width={50}
                      height={50}
                    />
                  </td>
                  <td data-th="score">
                    {digitsEnToFa(
                      `${sessionParentLeaderboard.leaderboard[1].score}`
                    )}
                  </td>
                </tr>
              </tbody>
            )}
            {sessionParentLeaderboard.leaderboard[2] && (
              <tbody>
                <tr>
                  <td data-th="rank">
                    <Image
                      src="/images/rate-badge/bronze-cup.png"
                      alt="rank 5"
                      width={60}
                      height={55}
                    />
                  </td>
                  <td data-th="name">
                    {digitsEnToFa(
                      `${sessionParentLeaderboard.leaderboard[2].phone}`
                    )}
                  </td>
                  <td data-th="pize">
                    <Image
                      src="/images/awards/award-3.png"
                      alt="ps5"
                      width={50}
                      height={50}
                    />
                  </td>
                  <td data-th="score">
                    {digitsEnToFa(
                      `${sessionParentLeaderboard?.leaderboard[2]?.score || ""}`
                    )}
                  </td>
                </tr>
              </tbody>
            )}
            {sessionParentLeaderboard.leaderboard[3] && (
              <tbody>
                <tr>
                  <td data-th="rank">
                    <span>
                      {digitsEnToFa(
                        `${sessionParentLeaderboard.leaderboard[3]?.rank}`
                      )}
                    </span>
                  </td>
                  <td data-th="name">
                    {digitsEnToFa(
                      `${sessionParentLeaderboard.leaderboard[3].phone}`
                    )}
                  </td>
                  <td data-th="pize">
                    <Image
                      src="/images/awards/award-4.png"
                      alt="ps5"
                      width={50}
                      height={50}
                    />
                  </td>
                  <td data-th="score">
                    {digitsEnToFa(
                      `${sessionParentLeaderboard?.leaderboard[3]?.score || ""}`
                    )}
                  </td>
                </tr>
              </tbody>
            )}
            {sessionParentLeaderboard?.profile[0]?.rank && (
              <tbody>
                <tr className={styles["main-page-leaderboard-top-active-xs"]}>
                  <td data-th="rank">
                    <span>
                      {digitsEnToFa(
                        `${sessionParentLeaderboard?.profile[0]?.rank}`
                      )}
                    </span>
                  </td>
                  <td data-th="name">
                    {digitsEnToFa(
                      `${sessionParentLeaderboard.profile[0].phone}`
                    )}
                  </td>
                  <td data-th="pize">-</td>
                  <td data-th="score">
                    {digitsEnToFa(
                      `${sessionParentLeaderboard?.profile[0]?.score}`
                    )}
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        );
      }
    } else {
      return (
        <table className={styles["main-page-leaderboard-top-xs"]}>
          <thead>
            <tr className={styles["main-page-leaderboard-top-tr-xs"]}>
              <th>رتبه</th>
              <th>نام کاربری</th>
              <th>جایزه</th>
              <th>امتیاز</th>
            </tr>
          </thead>
          {sessionParentLeaderboard.leaderboard[0] && (
            <tbody>
              <tr>
                <td data-th="rank">
                  <Image
                    src="/images/sessions/rank-1.svg"
                    alt="rank 1"
                    width={80}
                    height={55}
                  />
                </td>
                <td data-th="name">
                  {digitsEnToFa(
                    `${sessionParentLeaderboard.leaderboard[0].phone}`
                  )}
                </td>
                <td data-th="pize">
                  <Image
                    src="/images/leaderboard/09.png"
                    alt="ps5"
                    width={50}
                    height={50}
                  />
                </td>
                <td data-th="score">
                  {digitsEnToFa(
                    `${sessionParentLeaderboard.leaderboard[0].score}`
                  )}
                </td>
              </tr>
            </tbody>
          )}
          {sessionParentLeaderboard.leaderboard[1] && (
            <tbody>
              <tr>
                <td data-th="rank">
                  <Image
                    src="/images/sessions/rank-2.svg"
                    alt="rank 3"
                    width={80}
                    height={55}
                  />
                </td>
                <td data-th="name">
                  {digitsEnToFa(
                    `${sessionParentLeaderboard.leaderboard[1].phone}`
                  )}
                </td>
                <td data-th="pize">
                  <Image
                    src="/images/leaderboard/07.png"
                    alt="ps5"
                    width={50}
                    height={50}
                  />
                </td>
                <td data-th="score">
                  {digitsEnToFa(
                    `${sessionParentLeaderboard.leaderboard[1].score}`
                  )}
                </td>
              </tr>
            </tbody>
          )}
          {sessionParentLeaderboard.leaderboard[2] && (
            <tbody>
              <tr>
                <td data-th="rank">
                  <Image
                    src="/images/rate-badge/bronze-cup.png"
                    alt="rank 5"
                    width={70}
                    height={55}
                  />
                </td>
                <td data-th="name">
                  {digitsEnToFa(
                    `${sessionParentLeaderboard.leaderboard[2].phone}`
                  )}
                </td>
                <td data-th="pize">
                  <Image
                    src="/images/leaderboard/04.png"
                    alt="ps5"
                    width={50}
                    height={50}
                  />
                </td>
                <td data-th="score">
                  {digitsEnToFa(
                    `${sessionParentLeaderboard?.leaderboard[2]?.score}`
                  )}
                </td>
              </tr>
            </tbody>
          )}
        </table>
      );
    }
  };
  if (sessionParentLeaderboard.leaderboard.length) {
    return (
      <div className={styles["main-page-leaderboard-outer-container-xs"]}>
        <div className={styles["main-page-presents-title-xs"]}>
          <div className={styles["main-page-presents-title-line-xs"]}></div>
          <span className={styles["main-page-presents-title-text-xs"]}>
            جدول رده بندی</span>
        </div>
        <div className={styles["main-page-leaderboard-xs"]}>
          <div>{renderLeaderBoardData()}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles["main-page-leaderboard-outer-container-xs"]}>
        <div className={styles["main-page-presents-title-xs"]}>
          <div className={styles["main-page-presents-title-line-xs"]}></div>
          <span className={styles["main-page-presents-title-text-xs"]}>
            جدول رده بندی</span>
        </div>
        <div className={styles["main-page-leaderboard-xs"]}>
          <div>
            <table className={styles["main-page-leaderboard-top-xs"]}>
              <tr className={styles["main-page-leaderboard-top-tr-xs"]}>
                <th>رتبه</th>
                <th>نام کاربری</th>
                <th>جایزه</th>
                <th>امتیاز</th>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
};

export default React.memo(leaderboard);
