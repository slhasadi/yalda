import Stack from "../../../commons/Stack";
import H2 from "../../../commons/Typography/H2";
import Link from "next/link";
import Image from "next/image";

const LastWinners = () => {
    return <section className='mb-12'>
        <Stack className="flex-col lg:flex-row justify-between items-center">
            <p className='mb-6 lg:mb-0 font-bold text-2xl md:text-4xl lg:text-5xl xl:text-6xl'>برندگان هفته قبل</p>
            <Stack className='relative flex-col'>
                <Image src='/images/awards/last-prediction-awards.png' width={642} height={529} />
                <Stack className='justify-center'>
                    <Stack className='w-1/3 last-winner-box first bottom-[60px] lg:bottom-[72px] flex-col items-center gap-y-3 lg:gap-y-6 font-bold text-sm md:text-lg lg:text-3xl'>
                        <span className='number'>0912****9871</span>
                        <Stack className='gap-1 lg:gap-1 font-black'>
                            <span className='number'>امتیاز</span>
                            <span>5800</span>
                        </Stack>
                    </Stack>

                    <Stack className='w-1/3 last-winner-box second left-0 bottom-[22px] lg:bottom-[34px] flex-col items-center gap-y-3 lg:gap-y-6 font-bold text-xs sm:text-sm md:text-lg lg:text-3xl'>
                        <span className='number'>0912****9872</span>
                        <Stack className='gap-1 lg:gap-1 font-black'>
                            <span className='number'>امتیاز</span>
                            <span>5800</span>
                        </Stack>
                    </Stack>

                    <Stack className='w-1/3 last-winner-box third right-0 bottom-[4px] flex-col items-center  gap-y-3 lg:gap-y-6 font-bold text-xs sm:text-sm md:text-lg lg:text-3xl'>
                        <span className='number'>0912****9873</span>
                        <Stack className='gap-1 lg:gap-1 font-black'>
                            <span>امتیاز</span>
                            <span>5800</span>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    </section>

}

export default LastWinners;
