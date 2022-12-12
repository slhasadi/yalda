import Image from "next/image";
import { Video } from "../../interfaces/interfaces";
import { SessionGame } from "../../interfaces/interfaces";
import { useCookies } from "react-cookie";
import { postStartGameData } from "networks/sessionns";
import { useRouter } from "next/router";
type props ={
    styles:any;
    sessionList:any;
    gameSetup:SessionGame | undefined;
    setShowGameStartModal:(value:any)=>void;
    setShowAdsImage:(value:boolean)=>void
    video: Video;
    setVideoType:(value:string)=>void
}
const Dashboard = ({styles, sessionList, gameSetup, setShowGameStartModal, video, setShowAdsImage, setVideoType}:props) => {
    const router = useRouter();
    const [cookies, setCookies] = useCookies([
        "game-type",
        "selected-game-id",
        "session-game-id",
        "session-id",
        "token",
        "organization",
        "sessionId",
        "parrent_session-id",
      ]);
    return (
        <div className={styles["main-page-ads-outer-container-xs"]}>
            <div className={styles["main-page-ads-inner-container-xs"]}>
            <div
                className={styles["main-page-ads-close-xs"]}
                onClick={() => {
                let activeSession = sessionList.sessions?.filter(
                    (item: any) => item.is_for_today === true && item.is_active
                )[0];
                let data = {
                    session_id: activeSession.id,
                    game_setup_id: gameSetup?.game_setup_id,
                };
                postStartGameData(cookies.token, data, cookies.organization).then(async (response: any) => {
                    if (response.status === 200) {
                        setShowGameStartModal(null);
                        setVideoType("");
                        setCookies("session-game-id", response.data.game_session_id);
                        setCookies("session-id", activeSession.id);
                        setCookies("game-type", "session");
                        setCookies("selected-game-id", gameSetup?.game_setup_id);
                        setCookies("parrent_session-id", sessionList.id);
                        localStorage.setItem("egk", response.data.egk);
                        router.push(`/play/${gameSetup?.title}`);
                    }
                })
                setShowAdsImage(false);
                document.getElementsByTagName("body")[0].style.overflow ="visible";
                }}
            >
                <Image
                alt="close"
                src="/images/sessions/close-solid.png"
                height={45}
                width={45}
                />
            </div>
            <a href={video.link}>
                {" "}
                <div className={styles["main-page-ads-xs"]}>
                {" "}
                <Image src={video.banner} layout="fill" />
                </div>
            </a>
            </div>
        </div>
    );
};

export default Dashboard;
