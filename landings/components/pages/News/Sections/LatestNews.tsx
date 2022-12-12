import NewsContext from "../../../../contexts/NewsContext";
import {NewsTypes} from "../../../../interfaces/interfaces";
import {useContext} from "react";
import H2 from "../../../commons/Typography/H2";
import NewsItem from "../../../commons/Card/NewsItem";

const LatestNews = () => {
    const {news} = useContext(NewsContext)
    if (!news) {
        return null
    }

    const firstOfNews = news.items[0]
    return <section>
        <H2 className='mb-4'>آخرین اخبار جام جهانی</H2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NewsItem excerpt={true} item={firstOfNews} color="black"/>
            <div className="grid grid-cols-2 gap-3">
                {
                    [...news.items].slice(1).map((item: NewsTypes.Item) => {
                        return <NewsItem key={item.id} item={item} color="black"/>
                    })
                }
            </div>
        </div>
    </section>
}

export default LatestNews;
