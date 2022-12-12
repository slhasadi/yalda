import {getSingleNewsHref} from "../../../../helpers/links";
import {NewsTypes} from "../../../../interfaces/interfaces";
import {FC} from "react";
import Link from "../../Link";
import Rhombus from "../../Shapes/Rhombus";
import Stack from "../../Stack";
import { useCookies } from "react-cookie";
import { saveClicks } from "networks/activity";
type Props = {
    item: NewsTypes.Item
}
const InlineNewsItem: FC<Props> = ({item}) => {
    const [cookies] = useCookies([
        "lnd_org",
        "token"
    ]);
    return <article>
        <Link href={getSingleNewsHref(item.slug)}>
            <a onClick={()=>{
                saveClicks(item.id ,item.type ,cookies.lnd_org ,cookies.token)
            }}>
                <Stack className='gap-x-2 items-center'>
                    <Rhombus className='bg-primary w-[15px] h-[15px]'/>
                    <p className='line-clamp-1 font-medium'>
                        {item.description}
                    </p>
                </Stack>
            </a>
        </Link>
    </article>
}

export default InlineNewsItem;
