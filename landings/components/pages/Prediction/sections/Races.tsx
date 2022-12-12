import Stack from "../../../commons/Stack";
import H2 from "../../../commons/Typography/H2";
import Tabs from "../../../commons/Tabs";
import moment from 'jalali-moment';
import Table from "../../../commons/Table";
import TableRow from "../../../commons/Table/Row";
import {useRouter} from "next/router";
import Image from "next/image";
import Clock from "../../../commons/Icons/Clock";
import PredictionForm from "../PredictionForm";
import Button from "../../../commons/Button";
import {PredictionMatches} from "../../../../interfaces/interfaces";
import {useContext, useEffect, useState} from "react";
import PredictionContext from "../../../../contexts/PredictionContext";
import {getDate} from "../../../../helpers/utilities/functions";
import Loading from "../../../commons/Loading";
import Modal from "components/commons/Modal/Modal";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { userInfo } from "os";

type props = {
    setMatches: (matches: PredictionMatches[]) => void;
    date: any;
    predictionButton: boolean;
    showAds: boolean;
    setDate:(date:any)=>void;
    setShowAds:(value:boolean)=>void;
    setPredictionButton: (predictionButton: boolean) => void;
}
const Races = ({ date, setDate, predictionButton, setPredictionButton, showAds, setShowAds}: props) => {
    const {matches, getMatchesOfDate} = useContext(PredictionContext);
    const user = useSelector((state: RootState) => state.user.user);
    const pagesData = useSelector((state: RootState) => state.pages.list);
    const [isOpenGuideModal, setIsOpenGuideModal] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const router = useRouter();
    const locale = router.locale?.toString();
    const [tabColor, setTabColor] = useState<string>("today");
    const gamesTableHeader = [
        {
            title: 'تیم ها',
            direction: 'right'
        },
        {
            title: 'ساعت',
            direction: 'center'
        },
        {
            title: 'زمان لحظه ای',
            direction: 'center'
        },
        {
            title: 'لحظه ای',
            direction: 'center'
        },
        {
            title: 'پیش بینی',
            direction: 'center'
        },
    ];
    const [cookies, setCookies] = useCookies([
        "prd_modal",
    ]);
    useEffect(()=>{
        if(!cookies.prd_modal){
            setIsOpenModal(true);
            setCookies("prd_modal", "true")
        }
    },[])
    // const onTabChangeHandler = (day: "today" | "yesterday" | "tomorow") => {
    //     setLoading(true)
    //     getMatchesOfDate(getDate(day, "en"));
    //     setDate(getDate(day, "fa")!);
    //     setTabColor(day);
    // }

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(false)
    }, [matches])
    if (matches === null || matches === undefined) return null
    return <section>
        <div className="flex mb-[20px]">
            <H2 className='lg:w-[160px] mb-4 lg:mb-10 flex-[65]'>مسابقات</H2>
            <Button className="bg-primary h-[50px] text-white flex-[35] md:flex-[10]" onClick={() => setIsOpenGuideModal(true)}>قوانین و مقررات</Button>
        </div>
        {
            !user?.subscription?.subscribed
            &&
            <Tabs>
                <Button className={tabColor === "yesterday" ? "active-tab" : ""} onClick={() => {setDate(getDate('yesterday', "en")), setTabColor("yesterday")}}>
                    <Stack className={"gap-2 flex-col"}>
                        <span>دیروز</span>
                        <span className='text-xs md:inline md:text-sm'>{getDate('yesterday')}</span>
                    </Stack>
                </Button>

                <Button className={tabColor === "today" ? "active-tab" : ""} onClick={() => {setDate(getDate('today', "en")), setTabColor("today")}}>
                    <Stack className={"gap-2 flex-col"}>
                        <span>امروز</span>
                        <span className='text-xs md:inline md:text-sm'>{getDate("today")}</span>
                    </Stack>
                </Button>

                <Button className={tabColor === "tomorow" ? "active-tab" : ""} onClick={() => {setDate(getDate('tomorow', "en")), setTabColor("tomorow")}}>
                    <Stack className={"gap-2 flex-col"}>
                        <span>فردا</span>
                        <span className='text-xs md:inline md:text-sm'>{getDate('tomorow')}</span>
                    </Stack>
                </Button>

            </Tabs>
        }
        {matches?.results.length > 0 ?

            loading ? <Loading /> : matches.results.length ? <Table header={gamesTableHeader}>

                {matches?.results?.map((match: any, index: number) => {
                    return (
                        <TableRow key={index}>
                            <td className="block md:table-cell rounded-xl md:rounded-none overflow-hidden md:table-cell py-4 px-4">
                                <Stack className='items-center justify-between md:justify-start lg:gap-x-8 mb-4 md:mb-0 '>
                                    <Stack className='items-center gap-y-2 gap-x-4 flex-col md:flex-row w-28'>
                                        <div className="flag-radius">
                                            <Image alt={match.home_team.title} src={match?.home_team.picture} width={45}
                                                   height={45} layout='fixed'/>
                                        </div>
                                        <strong>{match.home_team.title}</strong>
                                    </Stack>
                                    <Stack className='flex-col self-stretch items-center justify-between md:hidden text-xs'>
                                        {/*<time className='font-semibold text-center my-1'>{moment(match.date, 'YYYY/MM/DD').locale(locale as any).format('YYYY/MM/DD')}</time>*/}
                                        <Stack className='gap-2 items-center flex-col'>
                                            <Stack className='flex-col justify-center'>
                                                <div className='mb-[4px] font-semibold'>ساعت</div>
                                                <div>
                                                    <time className='text-secondary'>{moment(match.start_time, 'HH:mm').locale('fa').format('HH:mm')}</time>
                                                </div>
                                            </Stack>

                                            <Stack className='flex-col justify-center'>
                                                <div className='mb-[4px] font-semibold'>نتیجه</div>
                                                <div className="text-center">
                                                    {match?.home_goals === null ? "-" : match?.home_goals } : {match?.away_goals === null ? "-" : match?.away_goals}
                                                </div>
                                            </Stack>
                                            {/*<div className='bg-primary w-[8px] h-[8px] rounded-full'/>*/}
                                        </Stack>
                                    </Stack>
                                    <Stack className='flex-col gap-y-3 px-2 hidden md:flex'>
                                        <hr className='rotate-90'/>
                                        <span
                                            className='z-10 w-[24px] h-[24px] mx-2 pt-[4px] bg-[#BDBDBD] text-xs rounded-full text-white flex items-center justify-center'>VS</span>
                                        <hr className='rotate-90'/>
                                    </Stack>
                                    <Stack className='items-center md:justify-start gap-x-4 gap-y-2 flex-col md:flex-row gap-x-4 w-28'>
                                        <div className="flag-radius">
                                            <Image alt={match.away_team.title} src={match?.away_team.picture} width={45}
                                                   height={45} layout='fixed'/>
                                        </div>
                                        <strong>{match.away_team.title}</strong>
                                    </Stack>
                                </Stack>
                                <PredictionForm className='md:hidden' match={match} showAds={showAds} setShowAds={setShowAds} predictionButton={predictionButton}
                                                setPredictionButton={setPredictionButton} date={date} setDate={setDate}/>
                            </td>

                            <td className="py-4 px-2 hidden md:table-cell">
                                <Stack className='gap-x-2 justify-center'>
                                    <Clock/>
                                    <time>
                                        <Stack className='gap-x-2'>
                                        <span
                                            className='whitespace-nowrap'>{moment(match.start_time, 'HH:mm').locale('fa').format('HH:mm')}</span>
                                            <span>{moment(match.date, 'YYYY/MM/DD').locale(locale as any).format('YYYY/MM/DD')}</span>
                                            <span></span>
                                        </Stack>
                                    </time>
                                </Stack>
                            </td>
                            <td className="py-4 px-2 hidden md:table-cell text-center">
                                {match.match_status === 'Finished' ? 'تمام شده' : match.match_status === 'Half Time' ? 'نیمه اول' : `\`${match.match_status}`}
                            </td>
                            <td className="py-4 px-2 hidden md:table-cell text-center">
                                {match.home_goals ?? '-'} - {match.away_goals ?? '-'}
                            </td>
                            <td className='py-4 px-2 hidden md:table-cell text-center'>
                                <PredictionForm className='hidden md:flex' match={match} showAds={showAds} setShowAds={setShowAds} predictionButton={predictionButton}
                                                setPredictionButton={setPredictionButton} date={date} setDate={setDate}/>
                            </td>
                        </TableRow>
                    )
                })}
            </Table>:<></>

        :<p className="text-center">امروز مسابقه ای وجود ندارد، برای دیدن مسابقات بعدی و انجام پیش بینی زودتر از بقیه، اشتراک تهیه کنید</p>}
        {isOpenGuideModal && <Modal open={isOpenGuideModal} setOpen={setIsOpenGuideModal} title={"راهنمای پیش بینی"}>
            <p className='mb-2'>+ به ازای پیش‌بینی کاملا درست 10  امتیاز، با تفاضل گل درست 7 امتیاز، تشخیص برنده 5 امتیاز و پیش‌بینی اشتباه 2  امتیاز</p>
            <p className='mb-2'>+ تا پایان نیمه اول هر بازی فرصت داری نتیجه بازی رو پیش‌بینی کنی و در جدول رتبه بندی جایگاه خودت بالاتر ببری</p>
            <p className='mb-2'>+ با پیش‌بینی بازی‌های تیم ملی فوتبال کشورمون امتیاز 2 برابری کسب کن</p>
            <p className='mb-2'>+ با پیش‌بینی درست قهرمان پیش از مسابقات نیمه نهایی، 100 امتیاز دریافت کن</p>
            <p className='mb-2'>+ امتیاز پیش بینی شما بعد از اتمام بازی موردنظر  در داشبورد ثبت می شود</p>
        </Modal>}
        <Modal
                open={isOpenModal}
                setOpen={setIsOpenModal}
                title={pagesData[0]?.popup?.title}
            >
                <p
                className="mb-2 text-[14px]"
                dangerouslySetInnerHTML={{
                    __html: pagesData[0]?.popup?.description,
                }}
                ></p>
        </Modal>
    </section>
}

export default Races;
