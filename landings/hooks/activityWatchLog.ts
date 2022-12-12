import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { saveWatchTime } from "networks/activity";

const useActivityLog = () => {
    const [cookies] = useCookies(["token", "lnd_org"]);
    useEffect(() => {
        setSubmittedLog(0);
        setLastWatch(0);
    }, []);
    const getSubmittedLog = () => {
        if (localStorage)
            return JSON.parse(localStorage.getItem("AL/submittedLog") || "0");
        return 0;
    };
    const getLastWatch = () => {
        if (localStorage)
            return JSON.parse(localStorage.getItem("AL/last_watch") || "0");
        return 0;
    };
    const setSubmittedLog = (time: number) => {
        if (localStorage)
            localStorage.setItem("AL/submittedLog", JSON.stringify(time));
    };
    const setLastWatch = (time: number) => {
        if (localStorage)
            localStorage.setItem("AL/last_watch", JSON.stringify(time));
    };
    const submitNewLog = (time: number, media_id: number, media_type: string) => {
        if (time > 3) {
            time = Math.round(time);
            const duration = time - getLastWatch();
            if (duration >= 10 && duration <= 20) {
                saveWatchTime(media_id, media_type, cookies.lnd_org, duration, time, cookies.token);
                setSubmittedLog(getSubmittedLog() + 1);
                setLastWatch(time);
            }
        }
    };
    return { submitNewLog };
};
export default useActivityLog;
