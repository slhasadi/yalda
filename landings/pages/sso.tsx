import axios from "axios";
import type { GetServerSideProps } from "next";
import { serverSideURL} from "../globals";
import handleOrganization from "../helpers/handleOrganization";

const Sso = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // @ts-ignore
  let token = context.query["token"];
  const stateCookie = await handleOrganization(context, false)
  let org = stateCookie?.lnd_org;
  try {
    await axios({
        method: "post",
        url: serverSideURL +"users/sso/",
        data: {
          token:token,
        },
        headers: {
          organization: org,
        },
      }).then((response) => {
        context.res.setHeader("set-cookie", [
          `token=${response.data.token};Max-Age=2147483647`,
        ]);
        if (response.status !== 200) {
          return {
            redirect: {
              permanent: false,
              destination: `/?org=${org}`,
            },
          };
        }
      });
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: `/?query=unauthorized&org=${org}`,
      },
    };
  }
  return {
    redirect: {
      permanent: false,
        destination: `/?org=${org}`,
    },
  };
};

export default Sso;
