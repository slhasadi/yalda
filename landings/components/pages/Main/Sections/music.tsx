import MusicFeed from "components/pages/Music/Feed";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Main.module.scss";

const Music = ({musicFeed}:any) => {
    const [video, setVideo]= useState<any>();
    return (
        <section className={styles["main-music-container"]} id="musics">
            <div className='container relative mx-auto lg:px-6 px-3'>
                <Link href="/music">
                    <a className={styles["main-music-link"]}> بیشتر</a>
                </Link>
                <div className="w-full">
                    <MusicFeed
                        feed={musicFeed[0]}
                        hasTitle={true}
                        type="audio"
                        setVideo={setVideo}
                        textColor="white"
                    />
                </div>
            </div>
        </section>
    )
}

export default Music;