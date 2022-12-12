import Stack from "../../../commons/Stack";
import H2 from "../../../commons/Typography/H2";
import Rhombus from "../../../commons/Shapes/Rhombus";
import Tabs from "../../../commons/Tabs";
import moment from 'jalali-moment';
import Table from "../../../commons/Table";
import TableRow from "../../../commons/Table/Row";
import { useRouter } from "next/router";
import Image from "next/image";
import Clock from "../../../commons/Icons/Clock";
import PredictionForm from "../PredictionForm";
import Button from "../../../commons/Button";
import { PredictionMatches, PredictionScores, Predicts} from "../../../../interfaces/interfaces";
import { useEffect, useState } from "react";
import axios from "axios";
import { predictionURL } from "../../../../globals";
import { match } from "assert";
type props= {
    score : PredictionScores;
    matches:Predicts[];
    date:string;
    predictionButton:boolean;
    setPredictionButton:(predictionButton:boolean)=>void;
}
const Predict = ({score, matches, date, predictionButton, setPredictionButton}:props) => {
    const router = useRouter();
    const locale = router.locale?.toString();
    const [yesterday, setYesterday] = useState("");
    const [tabColor, setTabColor] = useState<string>("today");
    const gamesTableHeader = [
        {
            title: 'تیم ها',
            direction: 'center'
        },
        {
            title: 'تاریخ',
        },
        {
            title: 'نتیجه',
        },
        {
            title: 'پیش بینی',
        },
    ]

    return (
        <section>
            <Stack className='flex-col md:flex-row justify-between mb-12'>
                <H2 className='w-full'>آخرین بازی های پیش بینی شده شما</H2>
            </Stack>
            {matches.length >0 && <Table header={gamesTableHeader}>
                {matches.map((item, index)=>{
                    return(
                        <TableRow key={index}>
                            <td className="block md:table-cell rounded-xl md:rounded-none overflow-hidden py-4 px-2">
                                <Stack className='items-center xs:justify-between md:justify-start lg:gap-x-8 mb-4 md:mb-0'>
                                    <Stack className='items-center gap-y-2 gap-x-4 flex-col md:flex-row w-24 xs:mr-0 md:mr-8'>
                                        <div className="flag-radius">
                                            <Image alt='iran' src={item.match.home_team.picture} width={45} height={45} layout='fixed' />
                                        </div>
                                        <strong>{item.match.home_team.title}</strong>
                                    </Stack>
                                    <Stack className='flex-col self-stretch items-center justify-between md:hidden text-xs'>
                                        <time className='font-semibold my-1'>30 <span className=''>آبان</span> 1401</time>
                                        <Stack className='gap-x-2 items-center'>
                                            <time>12:44</time>
                                            <div className='bg-primary w-[8px] h-[8px] rounded-full'/>
                                        </Stack>
                                    </Stack>
                                    <Stack className='flex-col gap-y-3 hidden md:flex'>
                                        <hr className='rotate-90'/>
                                        <span>VS</span>
                                        <hr className='rotate-90'/>
                                    </Stack>
                                    <Stack className='items-center gap-x-4 gap-y-2 flex-col md:flex-row gap-x-4'>
                                        <div className="flag-radius">
                                            <Image alt='denmark' src={item.match.away_team.picture} width={45} height={45} layout='fixed' />
                                        </div>
                                        <strong>{item.match.away_team.title}</strong>
                                    </Stack>
                                </Stack>
                                {/* <PredictionForm className='md:hidden' match={item} predictionButton={predictionButton} setPredictionButton={setPredictionButton}/> */}
                            </td>
                            <td className="py-4 px-2 hidden md:table-cell">
                                <Stack className='gap-x-2'>
                                    <Clock />
                                    <time>
                                        <Stack className='gap-x-2'>
                                            <span className='whitespace-nowrap'>{moment(item.match.start_time, 'HH:mm').locale('fa').format('HH:mm')}</span>
                                            <span>{moment(item.match.date, 'YYYY/MM/DD').locale(locale as any).format('YYYY/MM/DD')}</span>
                                            <span></span>
                                        </Stack>
                                    </time>
                                </Stack>
                            </td>
                            <td className="py-4 px-2 hidden md:table-cell">
                                {item.match.home_goals? item.match.home_goals: "-"} {item.match.away_goals? item.match.away_goals: "-"}
                            </td>
                            <td className='py-4 px-2 hidden md:table-cell'>
                                پیش بینی شده
                            </td>
                        </TableRow>
                    )
                })}
            </Table>}
        </section>
        )
}

export default Predict;
