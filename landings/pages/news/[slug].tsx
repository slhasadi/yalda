import SingleNews from "../../components/pages/News/single";
import { fetchSingleNewsData } from "../../networks/news/serverSide";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../../components/commons/Loading";
import Footer from "components/commons/Footer/Footer";
import { NextSeo } from "next-seo";
import handleOrganization from "../../helpers/handleOrganization";

const SingleNewsPage = ({ data }: any) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string, { shallow }: any) => {
      setLoading(true);
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
  return (
    <>
      <NextSeo
        title={data?.title}
        description={data?.description}
        openGraph={{
          url: "https://sports.vidaneh.com",
          title: data?.title,
          description: data?.description,
          site_name: "Vidaneh Sport",
          images: [
            {
              url: "/images/meta/mstile-150x150.png",
              width: 150,
              height: 150,
              alt: data?.title,
              type: "image/png",
            },
          ],
        }}
      />
      {loading ? <Loading /> : <SingleNews data={data} />}
      {!loading && <Footer />}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const locale = context.locale;
  const stateCookie = await handleOrganization(context, false);
  const lnd_org = stateCookie?.lnd_org;
  const slug = encodeURI(context.params?.slug as string);
  const data = (await fetchSingleNewsData(slug, lnd_org as any)) ?? null;
  return {
    props: {
      ...(await serverSideTranslations(locale as any, ["home"])),
      data,
    },
  };
};

export default SingleNewsPage;
