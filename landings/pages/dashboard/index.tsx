import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import DashboradPage from "components/pages/Dashboard";
import handleOrganization from "helpers/handleOrganization";
import { getProfileUserVideos } from "networks/dashboard";
import { GetProfileResponseData } from "interfaces/interfaces";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Loader_page } from "slices/pageLoader";

const Home: NextPage<{ profile: GetProfileResponseData }> = ({ profile }) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(Loader_page(""))
  },[]);
  return <DashboradPage profile={profile} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stateCookie = await handleOrganization(context, false)
  let lnd_org = stateCookie?.lnd_org;
  const token = stateCookie?.token;
  const profile = await getProfileUserVideos(Number(lnd_org), token as string);
  const data = await profile.data;
  return {
    props: {
      profile: data,
    },
  };
};

export default Home;
