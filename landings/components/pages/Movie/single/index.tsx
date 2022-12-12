import Badge from "../../../../components/commons/Badge";
import Container from "../../../../components/commons/Container";
import Star from "../../../../components/commons/Icons/Star";
import Stack from "../../../../components/commons/Stack";
import Hls from "hls.js";
import {useRouter} from "next/router";
import Plyr from "plyr";
import {useEffect} from "react";
import {RWebShare} from "react-web-share";

const SingleMovie = () => {
    const router = useRouter()
    useEffect(() => {
        window.video_plyr = new Plyr("#video-player", {
            autoplay: false,
        });
    }, []);

    useEffect(() => {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(`https://hw19.asset.aparat.com/aparat-video/0c81690e5b7aa048f8f3b54f5dd6c30d27995375-1080p.mp4?wmsAuthSign=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImUzZDM5YTcwNGJmM2Q5ZjE3MGI5NjA0MGJiYTQ2ZTI0IiwiZXhwIjoxNjY0NjMwNTUxLCJpc3MiOiJTYWJhIElkZWEgR1NJRyJ9.Ay4XXkezEQzQFaaIFVPDkJPaSlAbNn2ZUEeq81TxwyU`);
            hls.attachMedia(
                document.getElementById("video-player") as HTMLMediaElement
            );
        }
        window.video_plyr.play();
    }, []);
    return <Container>

        <div className='mb-7 pt-2'>
            <video id='video-player' />
        </div>
        <Stack className='gap-y-3 flex-col flex-col-reverse md:flex-row justify-between mb-8'>
            <select className='text-secondary border-secondary text-lg rounded-lg cursor-pointer focus:border-primary focus:shadow-primary'>
                <option className='rounded-lg'>فصل 1 -     25 فروردین 1398</option>
            </select>
            <Stack className='gap-x-4 flex-row-reverse items-center'>

                <RWebShare
                    data={{
                        text: 'static text',
                        url: router.asPath,
                        title: 'static',
                    }}
                >
                    <svg className='cursor-pointer' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.0312 19.4531C21.1963 19.4531 20.4258 19.7461 19.8223 20.2354L13.752 15.8438C13.8536 15.2858 13.8536 14.7142 13.752 14.1562L19.8223 9.76465C20.4258 10.2539 21.1963 10.5469 22.0312 10.5469C23.9707 10.5469 25.5469 8.9707 25.5469 7.03125C25.5469 5.0918 23.9707 3.51562 22.0312 3.51562C20.0918 3.51562 18.5156 5.0918 18.5156 7.03125C18.5156 7.37109 18.5625 7.69629 18.6533 8.00684L12.8877 12.1816C12.0322 11.0479 10.6729 10.3125 9.14062 10.3125C6.55078 10.3125 4.45312 12.4102 4.45312 15C4.45312 17.5898 6.55078 19.6875 9.14062 19.6875C10.6729 19.6875 12.0322 18.9521 12.8877 17.8184L18.6533 21.9932C18.5625 22.3037 18.5156 22.6318 18.5156 22.9688C18.5156 24.9082 20.0918 26.4844 22.0312 26.4844C23.9707 26.4844 25.5469 24.9082 25.5469 22.9688C25.5469 21.0293 23.9707 19.4531 22.0312 19.4531ZM22.0312 5.50781C22.8721 5.50781 23.5547 6.19043 23.5547 7.03125C23.5547 7.87207 22.8721 8.55469 22.0312 8.55469C21.1904 8.55469 20.5078 7.87207 20.5078 7.03125C20.5078 6.19043 21.1904 5.50781 22.0312 5.50781ZM9.14062 17.5781C7.71973 17.5781 6.5625 16.4209 6.5625 15C6.5625 13.5791 7.71973 12.4219 9.14062 12.4219C10.5615 12.4219 11.7188 13.5791 11.7188 15C11.7188 16.4209 10.5615 17.5781 9.14062 17.5781ZM22.0312 24.4922C21.1904 24.4922 20.5078 23.8096 20.5078 22.9688C20.5078 22.1279 21.1904 21.4453 22.0312 21.4453C22.8721 21.4453 23.5547 22.1279 23.5547 22.9688C23.5547 23.8096 22.8721 24.4922 22.0312 24.4922Z" fill="black"/>
                    </svg>
                </RWebShare>

                <Stack className='flex-row-reverse gap-x-2 items-center'>
                    <span className='w-[30px] h-[30px] pb-1'>
                        <Star />
                    </span>
                    <span className='font-semibold text-xl'>8.5</span>
                    <span>|</span>
                    <span className='text-lg text-secondary'>350k</span>
                </Stack>
            </Stack>
        </Stack>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:text-lg gap-3 mb-6'>
            <Stack className='gap-x-2 flex-wrap active py-3 px-4 rounded-lg'>
                <span>قسمت 1: </span>
                <span>پایان بهار رفتن همایون</span>
            </Stack>
            <Stack className='bg-box-main flex-wrap gap-x-2 py-3 px-4 rounded-lg cursor-pointer'>
                <span>قسمت 1: </span>
                <span>پایان بهار رفتن همایون</span>
            </Stack>
            <Stack className='bg-box-main flex-wrap gap-x-2 py-3 px-4 rounded-lg cursor-pointer'>
                <span>قسمت 1: </span>
                <span>پایان بهار رفتن همایون</span>
            </Stack>
            <Stack className='bg-box-main flex-wrap gap-x-2 py-3 px-4 rounded-lg cursor-pointer'>
                <span>قسمت 1: </span>
                <span>پایان بهار رفتن همایون</span>
            </Stack>
            <Stack className='bg-box-main flex-wrap gap-x-2 py-3 px-4 rounded-lg cursor-pointer'>
                <span>قسمت 1: </span>
                <span>پایان بهار رفتن همایون</span>
            </Stack>
            <Stack className='bg-box-main flex-wrap gap-x-2 py-3 px-4 rounded-lg cursor-pointer'>
                <span>قسمت 1: </span>
                <span>پایان بهار رفتن همایون</span>
            </Stack>
            <Stack className='bg-box-main flex-wrap gap-x-2 py-3 px-4 rounded-lg cursor-pointer'>
                <span>قسمت 1: </span>
                <span>پایان بهار رفتن همایون</span>
            </Stack>
            <Stack className='bg-box-main flex-wrap gap-x-2 py-3 px-4 rounded-lg cursor-pointer'>
                <span>قسمت 1: </span>
                <span>پایان بهار رفتن همایون</span>
            </Stack>
            <Stack className='bg-box-main flex-wrap gap-x-2 py-3 px-4 rounded-lg cursor-pointer'>
                <span>قسمت 1: </span>
                <span>پایان بهار رفتن همایون</span>
            </Stack>
            <Stack className='bg-box-main flex-wrap gap-x-2 py-3 px-4 rounded-lg cursor-pointer'>
                <span>قسمت 1: </span>
                <span>پایان بهار رفتن همایون</span>
            </Stack>
            <Stack className='bg-box-main flex-wrap gap-x-2 py-3 px-4 rounded-lg cursor-pointer'>
                <span>قسمت 1: </span>
                <span>پایان بهار رفتن همایون</span>
            </Stack>
            <Stack className='bg-box-main flex-wrap gap-x-2 py-3 px-4 rounded-lg cursor-pointer'>
                <span>قسمت 1: </span>
                <span>پایان بهار رفتن همایون</span>
            </Stack>
        </div>
        <Stack className='justify-between flex-col lg:flex-row lg:items-center mb-3'>
            <Stack className='gap-x-2 text-normal md:text-lg lg:text-xl xl:text-2xl font-medium child:whitespace-nowrap'>
                <span>تاپ گان:</span>
                <span>ماوریک .</span>
                <span>2022 . </span>
                <span>PG-13 .</span>
                <span>1 ساعت و 13 دقیقه</span>
            </Stack>

            <Stack className='items-center self-end gap-2'>
                <Badge>Drama</Badge>
                <Badge>Action</Badge>
            </Stack>
        </Stack>

        <p className='text-justify lg:text-lg mb-5'>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری لیگود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای لیگود طراحی اساسا مورد استفاده قرار گیرد.
        </p>
        <Stack className='flex-col child:border-b last:child:border-b-0 border-t border-b lg:text-lg'>
            <Stack className='gap-4 px-2 py-4'>
                <span>کارگردان:</span>
                <span className='text-primary'>جیم جارموش</span>
            </Stack>
            <Stack className='gap-4 px-2 py-4'>
                <span>نویسنده:</span>
                <span className='text-primary'>جیم جارموش</span>
            </Stack>
            <Stack className='gap-4 px-2 py-4'>
                <span>بازیگران:</span>
                <span className='text-primary'>محمد طاها ، عبدمالک ، حنیف سیدی</span>
            </Stack>
        </Stack>
    </Container>
}

export default SingleMovie;
