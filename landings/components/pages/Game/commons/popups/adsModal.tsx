import Image from "next/image";
type props ={
    styles:any;
    setShowVideo:(value:boolean)=>void;
    showCloseAd:boolean;
}
const Dashboard = ({styles, setShowVideo, showCloseAd}:props) => {
    return (
        <div className={styles["main-page-video-outer-container-xs"]}>
            <div className={styles["main-page-video-inner-container-xs"]}>
            <div
                className={styles["main-page-video-close-xs"]}
                style={{ visibility: showCloseAd ? "visible" : "hidden" }}
                onClick={() => {
                setShowVideo(false);
                }}
            >
                <Image
                alt="close"
                src="/images/sessions/close-solid.png"
                height={20}
                width={20}
                priority={true}
                />
            </div>

            <video
                id="player-xs"
                className={styles["main-page-video-xs"]}
            ></video>
            </div>
        </div>
    );
};

export default Dashboard;
