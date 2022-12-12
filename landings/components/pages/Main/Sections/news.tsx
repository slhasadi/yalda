import NewsItem from "components/commons/Card/NewsItem";
import H2 from "components/commons/Typography/H2";
import { NewsTypes } from "interfaces/interfaces";
import Link from "next/link";
import styles from "../styles/Main.module.scss";

const News = ({news}:any) => {
    const firstOfNews = news.items[0];
    
    return (
        <section className={styles["main-news-container"]} id="news">
           <div className='container relative mx-auto lg:px-6 px-3'>
            <H2 className='mb-4 text-white'>آخرین اخبار جام جهانی</H2>
            <Link href="/news">
                <a className={styles["main-music-link"]}> بیشتر</a>
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <NewsItem excerpt={true} item={firstOfNews} color="white" />
                <div className="grid grid-cols-2 gap-3 ">
                    {
                        [...news.items].slice(1).map((item: NewsTypes.Item) => {
                            return <NewsItem key={item.id} item={item} color="white" />
                        })
                    }
                </div>
            </div>
           </div>
        </section>
    )
}

export default News;