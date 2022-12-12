import Stack from "components/commons/Stack";

const PredictionScoreCard = ({type, title, className, score}: any) => {
    return <Stack className={`relative prediction-card-${type} px-8 sm:px-12 md:px-16 lg:px-16 py-2 mb-6 flex-col items-center bg-white rounded-lg ${className}`}>
        <span className='absolute px-2 sm:px-3 py-[1px] rounded-t-lg label top-[-20px] sm:top-[-22px] lg:top-[-26px] text-xs sm:text-sm lg:text-base line-clamp-1'>{title}</span>
        <Stack className='flex-col items-center justify-center'>
            <span className='py-3 score font-bold text-3xl lg:text-5xl'>{score}</span>
            <span className='font-bold text-base lg:text-xl'>امتیاز</span>
        </Stack>

    </Stack>
}

export default PredictionScoreCard;
