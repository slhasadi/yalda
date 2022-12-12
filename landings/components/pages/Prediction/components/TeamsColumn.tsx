import React from 'react';
import Stack from "../../../commons/Stack";
import Image from "next/image";
import moment from "jalali-moment";
import {useRouter} from "next/router";

const TeamsColumn = ({match}: any) => {
    const router = useRouter();
    const locale = router.locale?.toString();
    return (
        <td className="block font-medium lg:table-cell rounded-xl lg:rounded-none overflow-hidden py-4 px-4">

            <div
                className='hidden lg:flex items-center xs:justify-between lg:justify-start lg:gap-x-8 mb-4 lg:mb-0'>
                <Stack className='items-center gap-y-2 gap-x-4 flex-col lg:flex-row w-28'>
                    <div className="flag-radius">
                        <Image alt={match.match.home_team.title} src={match.match.home_team.picture} width={45}
                               height={45} layout='fixed'/>
                    </div>
                    <strong>{match.match.home_team.title}</strong>
                </Stack>
                <Stack className='flex-col w-[28px] gap-y-3 hidden lg:flex'>
                    <hr className='rotate-90'/>
                    <span
                        className='w-[24px] h-[24px] pt-[4px] bg-[#BDBDBD] text-xs rounded-full text-white flex items-center justify-center'>VS</span>
                    <hr className='rotate-90'/>
                </Stack>
                <Stack className='items-center gap-x-4 gap-y-2 flex-col lg:flex-row w-28'>
                    <div className="flag-radius">
                        <Image alt={match.match.away_team.title} src={match.match.away_team.picture} width={45}
                               height={45} layout='fixed'/>
                    </div>
                    <strong>{match.match.away_team.title}</strong>
                </Stack>
            </div>

            <div
                className='flex lg:hidden items-center justify-between lg:justify-start lg:gap-x-8 mb-4 lg:mb-0'>
                <Stack className='items-center gap-y-2 gap-x-4 flex-col lg:flex-row w-24 xs:mr-0 lg:mr-8'>
                    <div className="flag-radius">
                        <Image alt='iran' src={match.match.home_team.picture} width={45} height={45}
                               layout='fixed'/>
                    </div>
                    <strong>{match.match.home_team.title}</strong>
                </Stack>
                <Stack className='flex-col self-stretch items-center justify-between lg:hidden text-xs'>
                    <Stack className='gap-2 items-center flex-col'>
                        <Stack className='flex-col justify-center items-center'>
                            <div className='mb-[4px] font-semibold'>تاریخ</div>
                            <div className="text-center">
                                <time
                                    className='mb[4px]'>{moment(match.match.date, 'YYYY/MM/DD').locale(locale as any).format('YYYY/MM/DD')}</time>
                            </div>
                        </Stack>

                        <Stack className='flex-col justify-center items-center'>
                            <div className='mb-[4px] font-semibold'>نتیجه</div>
                            <div className="text-center">
                                {match.match.home_goals} - {match.match.away_goals}
                            </div>
                        </Stack>

                        <Stack className='flex-col justify-center items-center'>
                            <div className='mb-[4px] font-semibold'>پیش بینی شما</div>
                            <div className="text-center">
                                {match.home_goals} - {match.away_goals}
                            </div>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack className='items-center gap-x-4 gap-y-2 flex-col lg:flex-row w-24 gap-x-4'>
                    <div className="flag-radius">
                        <Image alt='denmark' src={match.match.away_team.picture} width={45} height={45}
                               layout='fixed'/>
                    </div>
                    <strong>{match.match.away_team.title}</strong>
                </Stack>
            </div>
        </td>
    );
};

export default TeamsColumn;