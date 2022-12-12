import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Movie from "../../components/pages/Movie/single";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Loading from "../../components/commons/Loading";
import Footer from "components/commons/Footer/Footer";
import { getFooterPageData } from "networks/musics";
import { useCookies } from "react-cookie";
import { NextSeo } from "next-seo";
import handleOrganization from "../../helpers/handleOrganization";

const MoviePage = () => {
    const [loading, setLoading] = useState(false);
    const [footerPage, setFooterPage] = useState<any>([]);
    const router = useRouter();
    const [cookies] = useCookies([
      "lnd_org",
    ]);
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
    getFooterPageData(cookies.lnd_org,  router.route).then(async (res: any) => {
        setFooterPage(res.data)
    })
  },[])
    return <>
        <NextSeo
            title={footerPage.meta_title}
            description={footerPage.meta_description}
            openGraph={{
            url: footerPage.meta_url,
            title: footerPage.meta_title,
            description: footerPage.meta_description,
            site_name: 'World Cup',
            }}
          />
        {
            loading ? <Loading /> : <Movie />
        }
        {!loading && <Footer/>}
    </>
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const stateCookie = await handleOrganization(context, false)
    const locale = context.locale;
    return {
      props: {
        ...(await serverSideTranslations(locale as any, ['home'])),
      }
    }
  };
export default MoviePage;
