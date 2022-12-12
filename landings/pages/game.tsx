import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
import { GetServerSideProps } from "next";
import Loading from "../components/commons/Loading";
import Footer from "components/commons/Footer/Footer";
import { useCookies } from "react-cookie";
import { NextSeo } from "next-seo";
import AboutOfSubject from "components/commons/AboutOfSubject";
import Container from "components/commons/Container";
import handleOrganization from "../helpers/handleOrganization";
import { useSelector } from "react-redux";
import { RootState } from "store";
const Sessions = dynamic(() => import('../components/pages/Game'), {
  ssr: false
})

const Iframe = (props:any) => {
  const [loading, setLoading] = useState(false);
  const [footerPage, setFooterPage] = useState<any>([]);
    const router = useRouter();
    const pageData = useSelector((state: RootState) => state.pages.list);
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
  return (
      <>
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
          loading ? <Loading /> : <Sessions/>
        }
        <Container>
          {!loading && <AboutOfSubject />}
        </Container>
        {!loading && <Footer/> }
      </>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const stateCookie = await handleOrganization(context, false)
  return {
      props: {}
  }
};
export default Iframe;

