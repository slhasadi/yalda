import PredictionScoreCard from "components/pages/Prediction/components/PredictionScoreCard";
import Stack from "../../../commons/Stack";
import H2 from "../../../commons/Typography/H2";
import Card from "../../../commons/Card";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { predictionURL, SSO_PATH } from "../../../../globals";
import { PredictionLeaderboard } from "../../../../interfaces/interfaces";
import Button from "components/commons/Button";

const Dashboard = () => {
    const [leaderBoard, setLeaderBoard]= useState<PredictionLeaderboard>({} as PredictionLeaderboard);
    const [answers, setAnswers]= useState<any>({});
    const [cookies, setCookies] = useCookies([
        "token",
        "prd_org"
      ]);
    useEffect(() => {
          if (cookies.token) {
            axios({
              method: "get",
              url: `${predictionURL}thp/lbd/${cookies.prd_org}/`,
              headers: {
                Authorization: `jwt ${cookies.token}`,
                organization: cookies.prd_org,
              },
            }).then((response) => {
              if (response.status === 200) {
                setLeaderBoard(response.data);
              }
            });
              axios({
                  method: "get",
                  url: `${predictionURL}usr/info`,
                  headers: {
                      Authorization: `jwt ${cookies.token}`,
                      organization: cookies.prd_org,
                  },
              }).then((response) => {
                  if (response.status === 200) {
                     setAnswers(response.data)
                  }
              });
          }
    }, []);
    return (
        <section>
            {Object.keys(leaderBoard).length > 0 && leaderBoard.leaderboard?.length > 0 && <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className='mb-8 lg:mb-0'>
                    <Stack className='items-center gap-x-4 mb-4'>
                        <H2>داشبورد</H2>
                        <hr className='w-full'/>
                    </Stack>
                    <Card className='bg-primary' bgColor={null} textColor={null}>
                        <div className='m-4 bg-white/[.4] rounded-lg py-8'>
                            {Object.keys(leaderBoard.profile).length > 0 && <Stack className='flex-col items-center'>
                                <p className='text-4xl lg:text-6xl font-bold text-center leading-relaxed' style={{direction:"ltr"}}>{answers.phone}</p>
                                <Stack className='gap-x-8 lg:gap-x-20 justify-between items-center px-0 lg:px-16 lg:mb-8'>

                                    <Stack className='flex-col gap-2 px-4'>
                                        <span className='font-bold text-xl lg:text-lg border-b pb-2 border-primary w-[100px] text-center'>رتبه بندی</span>
                                        <span className='flex font-black text-3xl lg:text-4xl justify-center w-[100px] text-center'>{leaderBoard.profile.rank?leaderBoard.profile.rank : "-" }</span>
                                    </Stack>

                                    <Stack className='flex-col gap-2 px-4'>
                                        <span className='font-bold text-xl lg:text-lg border-b pb-2 border-primary w-[100px] text-center'>امتیاز</span>
                                        <span className='flex font-black text-3xl lg:text-4xl justify-center w-[100px] text-center'>{leaderBoard.profile.score}</span>
                                    </Stack>
                                </Stack>
                            </Stack>}


                            <div className='px-4'>
                                <div className="text-center mb-12">
                                    <span className='text-2xl lg:text-3xl font-bold'>جزئیات امتیازات شما</span>
                                </div>
                                {cookies.token
                                ?
                                <Stack className="flex-col gap-y-4">
                                    <Stack className='flex-row justify-around md:justify-around'>
                                        <PredictionScoreCard title='درست' type='accurate' score={answers.complete_predict} />
                                        <PredictionScoreCard title='تفاضل گل درست' type='goal' score={answers.difference_predict} />
                                    </Stack>

                                    <Stack className='flex-row justify-around md:justify-around'>
                                        <PredictionScoreCard title='تشخیص برنده/ بازنده' type='correct' score={answers.winner_or_loser_predict}/>
                                        <PredictionScoreCard title='اشتباه' type='wrong' score={answers.wrong_predict}/>
                                    </Stack>
                                </Stack>
                                :
                                <Button
                                    className="w-full bg-primary text-white px-6 lg:px-4 rounded-lg mt-5 px-5 py-2.5 block"
                                    onClick={()=>{
                                        window.location.href = SSO_PATH(window.location.hostname);
                                    }}
                                >
                                ورود
                                </Button>
                                }
                            </div>

                        </div>
                    </Card>
                </div>

                <div>
                    <Stack className='items-center gap-x-4 mb-4'>
                        <H2 className='whitespace-nowrap'>رتبه بندی</H2>
                        <hr className='w-full'/>
                    </Stack>

                    <div className='bg-box-main rounded-xl overflow-hidden'>
                        <div className="overflow-x-auto relative">
                            <table className="w-full">
                                <thead className="bg-primary rounded-xl h-[80px] md:h-[93px]">
                                <tr className='text-white child:font-normal child:p-3'>
                                    <th>رتبه</th>
                                    <th>نام کاربری</th>
                                    <th>جایزه</th>
                                    <th>امتیاز</th>
                                </tr>
                                </thead>
                                <tbody className='child:border-b child:px-2'>
                                { Object.keys(leaderBoard.leaderboard).length > 0 && <tr className='text-center bg-light-primary h-[80px] md:h-[110px]'>
                                    <td className='py-2'>
                                        <Image src='/images/rate-badge/golden-cup.png' width={48} height={48} layout='fixed' />
                                    </td>
                                    <td className='py-2' style={{direction: "ltr"}}>{leaderBoard.leaderboard[0]?.phone}</td>
                                    <td className='py-2'>
                                        <Image src='/images/awards/award-1.png' width={53} height={21} layout='fixed' />
                                    </td>
                                    <td className='py-2'>{leaderBoard.leaderboard[0]?.score}</td>
                                </tr>}
                                { Object.keys(leaderBoard.leaderboard).length > 1 && <tr className='text-center bg-light-primary h-[80px] md:h-[110px]'>
                                    <td className='py-2'>
                                        <Image src='/images/rate-badge/silver-cup.png' width={48} height={48} layout='fixed' />
                                    </td>
                                    <td className='py-2' style={{direction: "ltr"}}>{leaderBoard.leaderboard[1]?.phone}</td>
                                    <td className='py-2'>
                                        <Image src='/images/awards/award-2.png' width={53} height={21} layout='fixed' />
                                    </td>
                                    <td className='py-2'>{leaderBoard.leaderboard[1]?.score}</td>
                                </tr>}
                                { Object.keys(leaderBoard.leaderboard).length > 2 && <tr className='text-center bg-light-primary h-[80px] md:h-[110px]'>
                                    <td className='py-2'>
                                        <Image src='/images/rate-badge/bronze-cup.png' width={48} height={48} layout='fixed' />
                                    </td>
                                    <td className='py-2' style={{direction: "ltr"}}>{leaderBoard.leaderboard[2]?.phone}</td>
                                    <td className='py-2'>
                                        <Image src='/images/awards/award-3.png' width={53} height={21} layout='fixed' />
                                    </td>
                                    <td className='py-2'>{leaderBoard.leaderboard[2]?.score}</td>
                                </tr>}

                                { Object.keys(leaderBoard.leaderboard).length > 3 && <tr className='text-center h-[90px] md:h-[120px] bg-light-primary'>
                                    <td className='py-2'>
                                                <span className='font-semibold inline-flex items-center justify-center w-[48px] h-[48px] lg:w-[58px] lg:h-[58px] border border-2 bg-white rounded-full'>
                                                {leaderBoard.leaderboard[3]?.rank}
                                                </span>
                                    </td>
                                    <td className='py-2' style={{direction: "ltr"}}>{leaderBoard.leaderboard[3]?.phone}</td>
                                    <td className='py-2'>
                                        <Image src='/images/awards/award-4.png' width={53} height={21} layout='fixed' />
                                    </td>
                                    <td className='py-2'>{leaderBoard.leaderboard[3]?.score}</td>
                                </tr>}

                                {Object.keys(leaderBoard.profile).length > 0  && <tr className='text-center bg-primary text-white h-[90px] md:h-[120px]'>
                                    <td className='py-2'>
                                                <span className='text-dark font-semibold inline-flex items-center justify-center w-[48px] h-[48px] lg:w-[58px] lg:h-[58px] border border-2 bg-white rounded-full'>
                                                {leaderBoard.profile.rank}
                                                </span>
                                    </td>
                                    <td className='py-2' style={{direction: "ltr"}}>{leaderBoard.profile.phone}</td>
                                    <td className='py-2'>
                                        <Image src='/images/awards/award-4.png' width={53} height={21} layout='fixed' />
                                    </td>
                                    <td className='py-2'>{leaderBoard.profile.score}</td>
                                </tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>}
        </section>
    )

}

export default Dashboard;
