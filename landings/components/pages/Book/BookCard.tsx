import Image from 'next/image'
import H2 from "../../commons/Typography/H2";
import H3 from "../../commons/Typography/H3";
import Button from "../../commons/Button";
import { useRouter } from 'next/router';
import { Item, SingerPlayer, SongPlayer } from "../../../interfaces/interfaces";
import {bookFileBaseURL, playerUrl} from "../../../globals";
import { useDispatch, useSelector } from "react-redux";
import { createPlaylist, play, setSinger } from "../../../slices/playerSlice";
import { RootState } from 'store';
import { saveClicks } from 'networks/activity';
import { useCookies } from 'react-cookie';
import Modal from 'components/commons/Modal/Modal';
import { useEffect, useState } from 'react';
type props ={
    books:Item[] | any
}
const BookCard = ({books}:props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [cookies, setCookies] = useCookies([
        "lnd_org",
        "token",
        "book_modal"
    ]);
    const adsPlaying = useSelector((state: RootState) => state.player.adsPlaying);
    const pagesData = useSelector((state: RootState) => state.pages.list);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const playSong = (song: SongPlayer, singerData?: SingerPlayer) => {
        if (singerData) {
            dispatch(setSinger(singerData));
        }
        dispatch(play(song));
    };
  useEffect(() => {
    if (!cookies.book_modal && pagesData.length>0) {
      setIsOpenModal(true);
      setCookies("book_modal", "true");
    }
  }, [pagesData]);
    return (
        <>
            {(books as Item[]).map((b,index)=>{
                return(
                    <div className='p-3 bg-box-main rounded-lg' key={index}>
                        <div className="block flex-col md:flex-row lg:flex-row">
                            <div className='hidden'>
                                <div className="relative mx-auto h-[140px] w-[140px] md:h-[120px]lg:h-[160px] lg:w-[160px] xl:h-[180px] xl:w-[180px] rounded-lg overflow-hidden mb-2 lg:mb-0">
                                    <Image src={bookFileBaseURL + b.cover} alt='' layout='fill' objectFit='cover'/>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-4/12 lg:w-5/12 w-full">
                                    <div className="flex flex-col md:flex-row px-3">
                                        <div className=''>
                                            <div className="relative mx-auto md:mx-0  h-[280px] w-[280px] md:h-[120px] lg:h-[160px] lg:w-[160px] xl:h-[180px] xl:w-[180px] rounded-lg overflow-hidden mb-2 lg:mb-0">
                                                <Image src={bookFileBaseURL + b.cover} alt='' layout='fill' objectFit='cover'/>
                                            </div>
                                        </div>
                                        <div className='block mr-[20px]'>
                                        <H2 className='text-center md:text-right mb-2'>{b.title}</H2>
                                        <div className="text-center md:text-right text-normal lg:text-lg mb-2 lg:mb-0">
                                            <div>
                                                <strong>نویسنده: </strong>
                                                <strong>{b.links[0].title}</strong>
                                            </div>

                                            <div>
                                                <strong>گوینده: </strong>
                                                <strong>{b.links[0].subtitle}</strong>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col md:w-8/12 lg:w-7/12 w-full px-2">
                                    <div className="flex-1">
                                        <H3 className='hidden lg:block mb-2'>درباره کتاب</H3>
                                        <p className='text-sm lg:text-normal text-secondary font-light mb-4'
                                           dangerouslySetInnerHTML={{
                                               __html: b.description,
                                           }}
                                        >
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">

                                        <Button className='xl:col-span-4 lg:col-span-6 border border-secondary text-lg py-1 rounded-3xl font-bold text-dark'>
                                            <p onClick={()=>{
                                                window.open (b.links[0].url, '_ blank');
                                            }}>خرید کتاب صوتی</p>
                                        </Button>

                                        <Button className='xl:col-span-4 lg:col-span-6 border border-secondary text-lg py-1 rounded-3xl font-bold text-dark'>
                                            <p
                                                onClick={()=>{
                                                    let song = {
                                                        audio: playerUrl + b.links[0].file,
                                                        audio_hq: playerUrl + b.links[0].file,
                                                        audio_lq: null,
                                                        lyrics: null,
                                                        type: b.type,
                                                        link: {
                                                          type: b.links[0].type,
                                                          id: b.links[0].id,
                                                          slug_fa: b.slug,
                                                        },
                                                        cover: playerUrl + b.cover,
                                                        title: b.title,
                                                        id: b.id,
                                                        slug_url: b.slug,
                                                      };
                                                      let singer = {
                                                        name: "",
                                                        family: "",
                                                      };
                                                      dispatch(createPlaylist([]));
                                                      if (!adsPlaying) {
                                                          playSong(song as unknown as SongPlayer, singer as unknown as SingerPlayer);
                                                      }
                                                      saveClicks(b.id ,b.type ,cookies.lnd_org ,cookies.token)
                                                }}
                                            >
                                                پخش فایل صوتی نمونه
                                            </p>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <Modal
                open={isOpenModal}
                setOpen={setIsOpenModal}
                title={pagesData[0]?.popup?.title}
            >
                <p
                className="mb-2 text-[14px]"
                dangerouslySetInnerHTML={{
                    __html: pagesData[0]?.popup?.description,
                }}
                ></p>
            </Modal>
        </>

    )
}
export default BookCard;
