import React, { useEffect, useState } from "react";
import Book from "../components/pages/Book";
import { GetServerSideProps } from "next";
import axios from "axios";
import {baseURL} from "../globals";
import { useRouter } from "next/router";
import Loading from "../components/commons/Loading";
import {BookProvider} from "../contexts/BookContext";
import {Feed, NewsTypes} from "../interfaces/interfaces";
import Item = NewsTypes.Item;
import Footer from "components/commons/Footer/Footer";
import { useCookies } from "react-cookie";
import { NextSeo } from "next-seo";
import AboutOfSubject from "components/commons/AboutOfSubject";
import Container from "components/commons/Container";
import handleOrganization from "../helpers/handleOrganization";
import { useSelector } from "react-redux";
import { RootState } from "store";
const BookPage = () => {
    const [loading, setLoading] = useState(false);
    const [feeds, setFeeds] = useState<Item[]>([]);
    const [footerPage, setFooterPage] = useState<any>([]);
    const pageData = useSelector((state: RootState) => state.pages.list);
    const router = useRouter();
    const [cookies] = useCookies([
        "lnd_org",
    ]);
    const feedList = ["book"]
    useEffect(() => {
        const handleRouteChange = (url:string, { shallow }:any) => {
            setLoading(true)
        }
        router.events.on('routeChangeStart', handleRouteChange)
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [])
    useEffect(()=>{
        if (cookies.lnd_org) {
            axios.get(`${baseURL}feeds/audio/`, {
                headers: {
                  organization: cookies.lnd_org,
                },
              })
            .then((response) => {
                let feed = (response.data as Feed[]).filter(item => feedList.includes(item.slug));
                setFeeds(feed[0].items);
                setLoading(false);
            });
        }
    },[cookies.lnd_org])


    return <>
        <NextSeo
            title={pageData[0]?.meta_title}
            description={pageData[0]?.meta_description}
            openGraph={{
            url: pageData[0]?.meta_url,
            title: pageData[0]?.meta_title,
            description: pageData[0]?.meta_description,
            site_name: 'Vidaneh Sport',
            images: [
              {
                url: '/images/meta/mstile-150x150.png',
                width: 150,
                height: 150,
                alt: pageData[0]?.meta_title,
                type: 'image/png',
              },
            ],
            }}
          />
          <Container>
        {
            loading ? <Loading /> : <BookProvider value={feeds} >
                <Book />
            </BookProvider>
        }

        {!loading && <AboutOfSubject />}
        {!loading && <Footer/>}
        </Container>
    </>
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const stateCookie = await handleOrganization(context, false)
    return {
      props: {}
    }
};
export default BookPage;
