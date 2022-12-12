import {NewsTypes} from "../../../interfaces/interfaces";
import BoxNewsItem from "./NewsItems/BoxNewsItem";
import InlineNewsItem from "./NewsItems/InlineNewsItem";

type Props = {
    excerpt?: boolean
    type?: 'inline' | 'box',
    item: NewsTypes.Item,
    color: string
}
const NewsItem = ({excerpt = false, type = 'box', item, color}: Props) => {
    return type === 'box' ? <BoxNewsItem item={item} excerpt={excerpt} color={color} /> : <InlineNewsItem item={item} />
}

export default NewsItem;
