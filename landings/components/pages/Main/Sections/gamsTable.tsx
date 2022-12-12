import Container from "components/commons/Container";
import Image from "next/image";
import { Swiper as Slider, SwiperSlide } from "swiper/react";
import Swiper, { Navigation } from "swiper";
import styles from "../styles/Main.module.scss";
import { MatchRound } from "interfaces/interfaces";
import moment from "jalali-moment";
Swiper.use([Navigation]);
type props ={
    matchRound:MatchRound[]
}
const GamesTable = ({matchRound}:props) => {
    function splitTime(time:string){
        const sp = time.split(":")
        return sp[0] + ":" + sp[1]
    }
    function splitTitle(title:string){
        const ti = title.split(" ");
        return "گروه " + ti[1]
    }
    return (
        <section className={styles["main-game-table-container"]} id="table">
            <div className='container relative mx-auto lg:px-6 px-3 h-[450px] md:h-[300px]'>
                <div className={styles["main-game-table-header"]}>
                    <h2>قطر</h2>
                    <div className={styles["main-game-table-header-border"]}>
                        <span>جام جهانی</span>
                        <p>2022</p>
                    </div>
                    <h2>جدول زمان بندی بازی ها</h2>
                </div>
                <Slider
                    slidesPerView={1}
                    direction={"vertical"}
                    navigation={{
                        nextEl: "#prev-element",
                        prevEl: "#next-element",
                        disabledClass: "disabled-element",
                    }}
                    freeMode={true}
                    initialSlide={0}
                    className="mySwiper hidden md:block"
                >
                    <div
                    className={styles["main-game-table-slider-next"]}
                    id="next-element"
                    >
                    <Image
                        height={50}
                        width={50}
                        src={"/images/music/right.svg"}
                        alt="right"
                    />
                    </div>
                    {matchRound.map((item,index)=>{
                        return(
                            <SwiperSlide key={index}>
                                <div className={styles["main-game-table-match-container"]}>
                                    <div className={styles["main-game-table-match-title"]}>
                                        <span>{splitTitle(item.league_round)}</span>
                                    </div>
                                    <div className={styles["main-game-table-match-parent"]}>
                                        {item.matches.map((match,i)=>{
                                            return(
                                                <div className={styles["main-game-table-match"]} key={i}>
                                                    <div className={styles["main-game-table-match-image-parent"]}>
                                                        <div className={styles["main-game-table-match-image"]}>
                                                            <img 
                                                                src={match.home_team.picture}
                                                                alt={match.home_team.title}
                                                            />
                                                        </div>
                                                        <span>{match.home_team.title}</span>
                                                    </div>
                                                    <div className={styles["main-game-table-match-vs"]}>vs</div>
                                                    <div className={styles["main-game-table-match-image-parent"]}>
                                                        <div className={styles["main-game-table-match-image"]}>
                                                            <img 
                                                                src={match.away_team.picture}
                                                                alt={match.away_team.title}
                                                            />
                                                        </div>
                                                        <span>{match.away_team.title}</span>
                                                    </div>
                                                    <div className={styles["main-game-table-match-time-parent"]}>
                                                        <div className={styles["main-game-table-match-time-item"]}>
                                                            <span>
                                                                {moment(match.date).locale("fa").format("D MMM")}
                                                            </span>
                                                            <span>
                                                                {splitTime(match.start_time)}
                                                            </span>
                                                        </div>
                                                        <div className={styles["main-game-table-match-time-item"]}>
                                                            <span>
                                                            {match.match_stadium_fa}
                                                            </span>
                                                        </div>
        
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                    <div
                    className={styles["main-game-table-slider-prev"]}
                    id="prev-element"
                    >
                    <Image
                        height={50}
                        width={50}
                        src={"/images/music/left.svg"}
                        alt="left"
                    />
                    </div>
                </Slider>
                <Slider
                    slidesPerView={1}
                    navigation={{
                        nextEl: "#prev-element2",
                        prevEl: "#next-element2",
                        disabledClass: "disabled-element2",
                    }}
                    freeMode={true}
                    initialSlide={0}
                    className="mySwiper block md:hidden"
                >
                    <div
                    className={styles["main-game-table-slider-prev2"]}
                    id="prev-element2"
                    >
                    <Image
                        height={50}
                        width={50}
                        src={"/images/music/left.svg"}
                        alt="left"
                    />
                    </div>
                    {matchRound.map((item,index)=>{
                        return(
                            <SwiperSlide key={index}>
                                <div className={styles["main-game-table-match-container"]}>
                                    <div className={styles["main-game-table-match-title"]}>
                                        <span>{splitTitle(item.league_round)}</span>
                                    </div>
                                    <div className={styles["main-game-table-match-parent"]}>
                                        {item.matches.map((match,i)=>{
                                            return(
                                                <div className={styles["main-game-table-match"]} key={i}>
                                                    <div className={styles["main-game-table-match-image-parent"]}>
                                                        <div className={styles["main-game-table-match-image"]}>
                                                            <img 
                                                                src={match.home_team.picture}
                                                                alt={match.home_team.title}
                                                            />
                                                        </div>
                                                        <span>{match.home_team.title}</span>
                                                    </div>
                                                    <div className={styles["main-game-table-match-vs"]}>vs</div>
                                                    <div className={styles["main-game-table-match-image-parent"]}>
                                                        <div className={styles["main-game-table-match-image"]}>
                                                            <img 
                                                                src={match.away_team.picture}
                                                                alt={match.away_team.title}
                                                            />
                                                        </div>
                                                        <span>{match.away_team.title}</span>
                                                    </div>
                                                    <div className={styles["main-game-table-match-time-parent"]}>
                                                        <div className={styles["main-game-table-match-time-item"]}>
                                                            <span>
                                                                {moment(match.date).locale("fa").format("D MMM")}
                                                            </span>
                                                            <span>
                                                                {splitTime(match.start_time)}
                                                            </span>
                                                        </div>
                                                        <div className={styles["main-game-table-match-time-item"]}>
                                                            <span>
                                                            {match.match_stadium_fa}
                                                            </span>
                                                        </div>
        
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                    
                    <div
                    className={styles["main-game-table-slider-next2"]}
                    id="next-element2"
                    >
                    <Image
                        height={50}
                        width={50}
                        src={"/images/music/right.svg"}
                        alt="right"
                    />
                    </div>
                </Slider>
            </div>
        </section>
    )
}

export default GamesTable;