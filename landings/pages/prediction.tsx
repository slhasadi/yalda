import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import dynamic from 'next/dynamic';
import Prediction from "../components/pages/Prediction";
import {useCookies} from "react-cookie";
import Loading from "../components/commons/Loading";
import {PredictionMatches, PredictionScores, Predicts} from "../interfaces/interfaces";
import {fetchPredictionData} from "../networks/predictions";
import {PredictionProvider} from "../contexts/PredictionContext";
import {getDate} from "../helpers/utilities/functions";
import { updateUserAsync } from "../slices/userSlice";
import Footer from "components/commons/Footer/Footer";
import { NextSeo } from "next-seo";
import AboutOfSubject from "components/commons/AboutOfSubject";
import Container from "../components/commons/Container";
import {GetServerSideProps} from "next";
import handleOrganization from "../helpers/handleOrganization";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
const PredictionPage = () => {
    const [loading, setLoading] = useState(false);
    const [score] = useState({} as PredictionScores);
    const [date, setDate] = useState(getDate('today', "en")!);
    const [footerPage, setFooterPage] = useState<any>([]);
    const [predictionButton, setPredictionButton] = useState(false);
    const [matches, setMatches] = useState<PredictionMatches[]>([]);
    const user = useSelector((state: RootState) => state.user.user);
    const pageData = useSelector((state: RootState) => state.pages.list);
    const [predicts, setPredicts] = useState<Predicts[]>([]);
    const router = useRouter();
    const dispatch = useDispatch();
    const [cookies] = useCookies([
        "prd_org",
        "token",
        "lnd_org"
    ]);
    let subscription: number= 0;
    useEffect(()=>{
        dispatch(updateUserAsync());
    },[])
    if(user?.subscription?.subscribed){
        subscription = 1;
    }
    let getMatchesOfDate:any  = (date: string) => {
        // useEffect(()=>{
            fetchPredictionData(date, cookies.token,  cookies.prd_org, subscription).then(async (res: any) => {
                setData({
                    ...data,
                    matches: res[0].data,
                    predictedMatches: cookies.token ? res[1].data : []
                })
            })
        // },[subscription])
    }
    const [data, setData] = useState<any>({matches: null, predictedMatches: null , getMatchesOfDate:getMatchesOfDate})
    useEffect(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        if (dd < 10) dd = 0 + dd;
        if (mm < 10) mm = 0 + mm;
        setDate(yyyy + '-' + mm + '-' + dd);
    }, []);
    useEffect(() => {
        const handleRouteChange = () => {
            setLoading(true)
        }
        router.events.on('routeChangeStart', handleRouteChange)
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [])

    useEffect(() => {
        fetchPredictionData(date, cookies.token, cookies.prd_org, subscription).then(async (res: any) => {
            setData({
                ...data,
                matches: res[0].data,
                predictedMatches: cookies.token ? res[1].data : []
            })
        })
    }, [subscription,date])
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
            loading ? <Loading/> : <PredictionProvider value={data}>
                <Prediction score={score}
                    matches={matches}
                    setMatches={setMatches}
                    predicts={predicts}
                    setPredicts={setPredicts}
                    predictionButton={predictionButton}
                    setPredictionButton={setPredictionButton}
                    date={date}
                    setDate={setDate}
                />
            </PredictionProvider>

        }

        <Container>
            {!loading && <AboutOfSubject />}
        </Container>
        {!loading && <Footer/>}
    </>
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const stateCookie = await handleOrganization(context, false)
    return {
        props: {}
    }
};
// export async function getStaticProps(context: { locale: any; }) {
//     const locale = context.locale;
//     return {
//         props: {
//             ...(await serverSideTranslations(locale as any, ['home'])),
//         }
//     }
// };
export default dynamic(() => Promise.resolve(PredictionPage), {
    ssr: false
});

