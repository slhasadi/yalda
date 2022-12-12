import News from "../../components/pages/News";
import {fetchNewsData} from "../../networks/news/serverSide";
import React, {useEffect, useState} from "react";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useRouter} from "next/router";
import {NewsProvider} from "../../contexts/NewsContext";
import Loading from "../../components/commons/Loading";
import Footer from "components/commons/Footer/Footer";
import { useCookies } from "react-cookie";
import { NextSeo } from "next-seo";
import AboutOfSubject from "components/commons/AboutOfSubject";
import Container from "components/commons/Container";
import handleOrganization from "../../helpers/handleOrganization";
import { useSelector } from "react-redux";
import { RootState } from "store";

const NewsPage = () => {
    const [loading, setLoading] = useState(false);
    const [newsData, setNewsData] = useState<any>([]);
    const pageData = useSelector((state: RootState) => state.pages.list);
    const router = useRouter();
    const [cookies] = useCookies([
        "lnd_org",
    ]);
    useEffect(() => {
        const handleRouteChange = (url: string, {shallow}: any) => {
            setLoading(true)
        }
        router.events.on('routeChangeStart', handleRouteChange)
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, []);
    useEffect(()=>{
        fetchNewsData(cookies.lnd_org as any).then(async (res: any) => {
            setNewsData(res);
        })
    },[])
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

        {
            loading ? <Loading /> : <NewsProvider value={newsData}>
                <News />
            </NewsProvider>
        }
        <Container>
        {!loading && <AboutOfSubject />}
        </Container>
        {!loading && <Footer/>}

    </>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const locale = context.locale;
    const stateCookie = await handleOrganization(context, false)
    // const lnd_org = stateCookie?.lnd_org;
    // const data = await fetchNewsData(lnd_org as any)
    return {
        props: {
            ...(await serverSideTranslations(locale as any, ['home'])),
            // data,
        }
    }
};
export default NewsPage;
