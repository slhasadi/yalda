import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Main.module.scss";

const GroupTable = ({groups}:any) => {
    return (
        <section className={styles["main-group-table-container"]}>
           <div className="container relative mx-auto lg:px-6 px-3">
            <h2 className={styles["main-group-table-section-title"]}>مرحله گروهی</h2>
            <div className={styles["main-group-table-items-container"]}>
                <div className={styles["main-group-table-match-state-parent"]}>
                        <div className={styles["main-group-table-match-title"]}>
                            <div className={styles["main-group-table-match-title-more"]}>
                                <span>گروه A</span>
                                <Link href={`/groups#${groups["Group A"][0].league_rounds}`}>
                                    <a>جزئیات</a>
                                </Link>
                            </div>
                        </div>
                        {groups["Group A"].map((team:any, index:number)=>{
                          return(
                            <div className={styles["main-group-table-match-image-parent"]} key={index}>
                                <div className={styles["main-group-table-match-image-box"]}>
                                <div className={styles["main-group-table-match-image"]}>
                                    <img 
                                        src={team.team_badge}
                                        alt="flag"
                                    />
                                </div>
                                <span>{team.team_name}</span>
                                </div>
                                <div className={styles["main-group-table-match-point"]}>
                                    {team.overall_league_PTS}
                                </div>
                            </div>
                          )  
                        })}
                </div>
                <div className={styles["main-group-table-match-state-parent"]}>
                    <div className={styles["main-group-table-match-title"]}>
                            <div className={styles["main-group-table-match-title-more"]}>
                                <span>گروه B</span>
                                <Link href={`/groups#${groups["Group B"][0].league_rounds}`}>
                                    <a>جزئیات</a>
                                </Link>
                            </div>
                    </div>
                    {groups["Group B"].map((team:any, index:number)=>{
                          return(
                            <div className={styles["main-group-table-match-image-parent"]} key={index}>
                                <div className={styles["main-group-table-match-image-box"]}>
                                <div className={styles["main-group-table-match-image"]}>
                                    <img 
                                        src={team.team_badge}
                                        alt="flag"
                                    />
                                </div>
                                <span>{team.team_name}</span>
                                </div>
                                <div className={styles["main-group-table-match-point"]}>
                                    {team.overall_league_PTS}
                                </div>
                            </div>
                          )  
                    })}
                </div>
                <div className={styles["main-group-table-match-state-parent"]}>
                    <div className={styles["main-group-table-match-title"]}>
                        <div className={styles["main-group-table-match-title-more"]}>
                            <span>گروه C</span>
                            <Link href={`/groups#${groups["Group C"][0].league_rounds}`}>
                                <a>جزئیات</a>
                            </Link>
                        </div>
                    </div>
                    {groups["Group C"].map((team:any, index:number)=>{
                          return(
                            <div className={styles["main-group-table-match-image-parent"]} key={index}>
                                <div className={styles["main-group-table-match-image-box"]}>
                                <div className={styles["main-group-table-match-image"]}>
                                    <img 
                                        src={team.team_badge}
                                        alt="flag"
                                    />
                                </div>
                                <span>{team.team_name}</span>
                                </div>
                                <div className={styles["main-group-table-match-point"]}>
                                    {team.overall_league_PTS}
                                </div>
                            </div>
                          )  
                    })}
                </div>
                <div className={styles["main-group-table-match-state-parent"]}>
                    <div className={styles["main-group-table-match-title"]}>
                        <div className={styles["main-group-table-match-title-more"]}>
                            <span>گروه D</span>
                            <Link href={`/groups#${groups["Group D"][0].league_rounds}`}>
                                <a>جزئیات</a>
                            </Link>
                        </div>
                    </div>
                    {groups["Group D"].map((team:any, index:number)=>{
                          return(
                            <div className={styles["main-group-table-match-image-parent"]} key={index}>
                                <div className={styles["main-group-table-match-image-box"]}>
                                <div className={styles["main-group-table-match-image"]}>
                                    <img 
                                        src={team.team_badge}
                                        alt="flag"
                                    />
                                </div>
                                <span>{team.team_name}</span>
                                </div>
                                <div className={styles["main-group-table-match-point"]}>
                                    {team.overall_league_PTS}
                                </div>
                            </div>
                          )  
                    })}
                </div>
                <div className={styles["main-group-table-match-state-parent"]}>
                    <div className={styles["main-group-table-match-title"]}>
                        <div className={styles["main-group-table-match-title-more"]}>
                            <span>گروه E</span>
                            <Link href={`/groups#${groups["Group E"][0].league_rounds}`}>
                                <a>جزئیات</a>
                            </Link>
                        </div>
                    </div>
                    {groups["Group E"].map((team:any, index:number)=>{
                          return(
                            <div className={styles["main-group-table-match-image-parent"]} key={index}>
                                <div className={styles["main-group-table-match-image-box"]}>
                                <div className={styles["main-group-table-match-image"]}>
                                    <img 
                                        src={team.team_badge}
                                        alt="flag"
                                    />
                                </div>
                                <span>{team.team_name}</span>
                                </div>
                                <div className={styles["main-group-table-match-point"]}>
                                    {team.overall_league_PTS}
                                </div>
                            </div>
                          )  
                    })}
                </div>
                <div className={styles["main-group-table-match-state-parent"]}>
                    <div className={styles["main-group-table-match-title"]}>
                        <div className={styles["main-group-table-match-title-more"]}>
                            <span>گروه F</span>
                            <Link href={`/groups#${groups["Group F"][0].league_rounds}`}>
                                <a>جزئیات</a>
                            </Link>
                        </div>
                    </div>
                    {groups["Group F"].map((team:any, index:number)=>{
                          return(
                            <div className={styles["main-group-table-match-image-parent"]} key={index}>
                                <div className={styles["main-group-table-match-image-box"]}>
                                <div className={styles["main-group-table-match-image"]}>
                                    <img 
                                        src={team.team_badge}
                                        alt="flag"
                                    />
                                </div>
                                <span>{team.team_name}</span>
                                </div>
                                <div className={styles["main-group-table-match-point"]}>
                                    {team.overall_league_PTS}
                                </div>
                            </div>
                          )  
                    })}
                </div>
                <div className={styles["main-group-table-match-state-parent"]}>
                     <div className={styles["main-group-table-match-title"]}>
                        <div className={styles["main-group-table-match-title-more"]}>
                            <span>گروه G</span>
                            <Link href={`/groups#${groups["Group G"][0].league_rounds}`}>
                                <a>جزئیات</a>
                            </Link>
                        </div>
                    </div>
                    {groups["Group G"].map((team:any, index:number)=>{
                          return(
                            <div className={styles["main-group-table-match-image-parent"]} key={index}>
                                <div className={styles["main-group-table-match-image-box"]}>
                                <div className={styles["main-group-table-match-image"]}>
                                    <img 
                                        src={team.team_badge}
                                        alt="flag"
                                    />
                                </div>
                                <span>{team.team_name}</span>
                                </div>
                                <div className={styles["main-group-table-match-point"]}>
                                    {team.overall_league_PTS}
                                </div>
                            </div>
                          )  
                    })}
                </div>
                <div className={styles["main-group-table-match-state-parent"]}>
                    <div className={styles["main-group-table-match-title"]}>
                        <div className={styles["main-group-table-match-title-more"]}>
                            <span>گروه H</span>
                            <Link href={`/groups#${groups["Group H"][0].league_rounds}`}>
                                <a>جزئیات</a>
                            </Link>
                        </div>
                    </div>
                    {groups["Group H"].map((team:any, index:number)=>{
                          return(
                            <div className={styles["main-group-table-match-image-parent"]} key={index}>
                                <div className={styles["main-group-table-match-image-box"]}>
                                <div className={styles["main-group-table-match-image"]}>
                                    <img 
                                        src={team.team_badge}
                                        alt="flag"
                                    />
                                </div>
                                <span>{team.team_name}</span>
                                </div>
                                <div className={styles["main-group-table-match-point"]}>
                                    {team.overall_league_PTS}
                                </div>
                            </div>
                          )  
                    })}
                </div>
            </div>
           </div>
        </section>
    )
}

export default GroupTable;