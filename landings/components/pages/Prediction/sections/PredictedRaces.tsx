import Stack from "../../../commons/Stack";
import H2 from "../../../commons/Typography/H2";
import moment from 'jalali-moment';
import Table from "../../../commons/Table";
import TableRow from "../../../commons/Table/Row";
import Clock from "../../../commons/Icons/Clock";
import {useContext, useEffect, useState} from "react";
import TeamsColumn from "../components/TeamsColumn";
import PredictionContext from "../../../../contexts/PredictionContext";
import Button from "../../../commons/Button";
import YourPredictionColumn from "../components/YourPredictionColumn";
import ResultColumn from "../components/ResultColumn";
import DayAndHourColumn from "../components/DayAndHourColumn";
import Divider from "components/commons/Divider";

const PredictedRaces = () => {
    const {predictedMatches} = useContext(PredictionContext)
    let first3Matches = predictedMatches?.results ?? []
    let moreMatches = []
    if (predictedMatches?.results && predictedMatches.results.length > 0) {
        first3Matches = predictedMatches.results.slice(0, 3)
        moreMatches = predictedMatches.results.slice(3)
    }

    const [seeMore, setSeeMore] = useState(false)
    const gamesTableHeader = [
        {
            title: 'تیم ها',
            direction: 'right'
        },
        {
            title: 'روز و ساعت',
            direction: 'center'
        },
        {
            title: 'پیش بینی شما',
            direction: 'center'
        },
        {
            title: 'نتیجه',
            direction: 'center'
        },
    ]

    useEffect(() => {
        if (seeMore) {

        }
    }, [seeMore])

    if (!predictedMatches) return null

    return (
        <>
       {first3Matches.length>0 && <section>
            <Stack className='flex-col md:flex-row justify-between mb-4 lg:mb-8'>
                <H2 className='w-full'>پیش بینی های شما</H2>
            </Stack>
            {first3Matches.length > 0 && <Table header={gamesTableHeader}>
                {first3Matches.map((match: any, index: number) => {
                    let type = 'correct'
                    if (match.match.home_goals == undefined) {
                        type = 'undefined'
                    }
                    if (match.score === 10) {
                        type = 'accurate'
                    } else if (match.score === 7) {
                        type = 'goal'
                    } else if (match.score === 5) {
                        type = 'correct'
                    } else if (match.score === 2) {
                        type = 'wrong'
                    }
                    return (
                        <TableRow key={index} type={type}>
                            <TeamsColumn match={match}/>
                            <DayAndHourColumn match={match} />
                            <YourPredictionColumn match={match} />
                            <ResultColumn match={match} />
                        </TableRow>
                    )
                })}
                {seeMore && moreMatches.map((match: any, index: number) => {
                    let type = 'correct'
                    if (match.match.home_goals == undefined) {
                        type = 'undefined'
                    }
                    if (match.score === 10) {
                        type = 'accurate'
                    } else if (match.score === 7) {
                        type = 'goal'
                    } else if (match.score === 5) {
                        type = 'correct'
                    } else if (match.score === 2) {
                        type = 'wrong'
                    }
                    return (
                        <TableRow key={index} type={type}>
                            <TeamsColumn match={match}/>
                            <DayAndHourColumn match={match} />
                            <YourPredictionColumn match={match} />
                            <ResultColumn match={match} />
                        </TableRow>
                    )
                })}
            </Table>}
            <div className="text-center">
                {predictedMatches.results.length > 3 && <Button onClick={() => setSeeMore(!seeMore)} className='text-primary py-2'>{seeMore ? 'دیدن کمتر' : 'دیدن بیشتر'}</Button>}
            </div>
        </section>}
        {first3Matches.length > 0 && <Divider />}
        </>
    )
}

export default PredictedRaces;
