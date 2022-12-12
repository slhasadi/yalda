import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {GetServerSideProps} from "next";
import handleOrganization from "../../helpers/handleOrganization";
const Iframe = dynamic(
  () => import("../../components/pages/Game/commons/iframe/IframeGame"),
  {}
);
const Play = () => {
  const [showIframe, setShowIframe] = useState(true);
  const [loading, setLoading] = useState(false);
    const router = useRouter();
  const reload = () => {
    setShowIframe(false);
    setShowIframe(true);
  };
  useEffect(() => {
    const handleRouteChange = (url:string, { shallow }:any) => {
      setLoading(true)
    }
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])
    if(loading){
        return(
          <div className="main-loader">
            <Image
              src="/images/loading.gif"
              alt="loading"
              width={120}
              height={120}
            />
          </div>
        )
      }else{
        return <div>{showIframe && <Iframe setReaload={reload} />}</div>;
      }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const stateCookie = await handleOrganization(context, false)
    return {
        props: {},
    };
};

export default Play;
