import MovieFeed from "components/pages/Movie/MovieFeed";
import Video from "components/pages/Video/Video";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Main.module.scss";

const Movies = ({movieFeed}:any) => {
    const [video, setVideo]= useState<any>();
    return (
        <section className={styles["main-movies-container"]} id="movies">
           <div className='container relative mx-auto lg:px-6 px-3'>
            <Link href="/movie">
                <a className={styles["main-movies-link"]}> بیشتر</a>
            </Link>
            <div className="w-full">
                <MovieFeed
                    feed={movieFeed[0]}
                    hasTitle={true}
                    type="video"
                    setVideo={setVideo}
                    textColor="white"
                />
            </div>
            </div>
            {video ? <Video video={video} setVideo={setVideo}/> : <></>}
        </section>
    )
}

export default Movies;