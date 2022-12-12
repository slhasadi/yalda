import VideoFeed from "components/pages/Video/VideoFeed";
import Video from "components/pages/Video/Video";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Main.module.scss";
import Link from "next/link";

const Videos = ({ videoFeed }: any) => {
  const [video, setVideo] = useState<any>();
  return (
    <section className={styles["main-videos-container"]} id="video">
      <div className="container relative mx-auto lg:px-6 px-3">
        <div className="w-full mt-14 ">
          <div className={styles["main-group-table-header-parent"]}>
            <h2 className={styles["main-group-table-section-title"]}>ویدیو</h2>
            <Link href="/video">
              <a className={styles["main-movies-link"]}> بیشتر</a>
            </Link>
          </div>
          <VideoFeed
            feed={videoFeed[0].items}
            hasTitle={true}
            type="video"
            setVideo={setVideo}
          />
        </div>
      </div>
      {video ? <Video video={video} setVideo={setVideo} /> : <></>}
    </section>
  );
};

export default Videos;
