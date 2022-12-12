import {getSingleNewsHref} from "../../../../helpers/links";
import {NewsTypes} from "../../../../interfaces/interfaces";
import Image from "next/image";
import H3 from "../../Typography/H3";
import Link from "../../Link";
import { saveClicks } from "networks/activity";
import { useCookies } from "react-cookie";
import { NextImageProxy } from "components/commons/Image";
type Props = {
    excerpt?: boolean,
    item: NewsTypes.Item,
    color:string
}
const BoxNewsItem = ({excerpt, item, color}: Props) => {
    const [cookies] = useCookies([
        "lnd_org",
        "token"
    ]);
    return <article>
        <Link href={getSingleNewsHref(item.slug)}>
            <a onClick={()=>{
                saveClicks(item.id ,item.type ,cookies.lnd_org ,cookies.token)
            }}>
                <div className='overflow-hidden rounded-lg mb-4'>
                    {NextImageProxy(item.links[0].url, 575, 320, item.title)}
                    {/* <Image src={item.links[0].url} objectFit='cover' layout='responsive' width={575} height={320} title={item.title} alt={item.title} /> */}
                </div>
                <div className='px-1'>
                    <H3 className={`line-clamp-2 text-${color}`}>
                        {item?.title}
                    </H3>
                    {excerpt && <p className={`line-clamp-3 text-${color}`}>
                        {item.description}
                    </p>}
                </div>
            </a>
        </Link>
    </article>
}

export default BoxNewsItem;
