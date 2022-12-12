import { GetServerSideProps } from "next";
import handleOrganization from "helpers/handleOrganization";
import {useEffect} from "react";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";
import Loading from "../../components/commons/Loading";
import Footer from "../../components/commons/Footer/Footer";
import {SSO_PATH} from "../../globals";

const OrgPage = () => {
    const [cookies] = useCookies(['token'])
    const router = useRouter()
    useEffect(()=>{
        if (cookies.token == null || cookies.token == '') {
            window.location.href = SSO_PATH(window.location.hostname);
        }
        router.replace("/")
    }, [cookies])

  return <>
      <Loading /><Footer/>
  </>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
      await handleOrganization(context, true)
      return {
          props: {},
      };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
export default OrgPage;
