import NewsContext from "../../../../contexts/NewsContext";
import {Key, useContext} from "react";
import H2 from "../../../commons/Typography/H2";
import Stack from "../../../commons/Stack";
import NewsItem from "../../../commons/Card/NewsItem";

const OtherNews = () => {
    const {otherNews} = useContext(NewsContext)
    if (!otherNews) return null
    return <section className='mb-12'>
        <H2 className='mb-4'>سایر خبر ها</H2>

        <Stack className='flex-col gap-y-6'>
            {
                otherNews.items.map((item: any) => {
                    return <NewsItem key={item.id} item={item} type='inline' color="black"  />
                })
            }
        </Stack>
    </section>
}

export default OtherNews;
