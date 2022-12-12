import {useEffect, useState} from "react";
import Stack from "../Stack";

const CountDown = () => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const target = new Date("11/20/2022 19:29:55");

        const interval = setInterval(() => {
            const now = new Date();
            const difference = target.getTime() - now.getTime();

            const d = Math.floor(difference / (1000 * 60 * 60 * 24));
            setDays(d);

            const h = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            setHours(h);

            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            setMinutes(m);

            const s = Math.floor((difference % (1000 * 60)) / 1000);
            setSeconds(s);
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    return <Stack className="w-full justify-center md:w-auto md:justify-start gap-x-4 flex-row-reverse text-white">
        <Stack className="flex-col items-center w-[65px]">
            <span className="font-black text-4xl md:text-2xl" dir="ltr">{days} <b className="inline-block md:hidden">:</b></span>
            <span>روز</span>
        </Stack>
        <Stack className="flex-col items-center w-[65px]">
            <span className="font-black text-4xl md:text-2xl" dir="ltr">{hours} <b className="inline-block md:hidden">:</b></span>
            <span>ساعت</span>
        </Stack>
        <Stack className="flex-col items-center w-[65px]">
            <span className="font-black text-4xl md:text-2xl" dir="ltr">{minutes} <b className="inline-block md:hidden">:</b></span>
            <span>دقیقه</span>
        </Stack>
        <Stack className="flex-col items-center w-[65px]">
            <span className="font-black text-4xl md:text-2xl">{seconds}</span>
            <span>ثانیه</span>
        </Stack>
    </Stack>
}

export default CountDown;
