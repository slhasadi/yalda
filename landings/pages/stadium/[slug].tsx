import Stadium from "../../components/pages/Stadium/single";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../../components/commons/Loading";
import Footer from "components/commons/Footer/Footer";
import { NextSeo } from "next-seo";
import dataJson from "./data.json";
import axios from "axios";
import { baseURL } from "../../globals";
import { Item } from "interfaces/interfaces";

const SingleStadium = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Item>({} as Item);
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
  useEffect(() => {
    const stadium = router.query.slug;
    axios.get(`${baseURL}items/${stadium}/`).then((response) => {
      setData(response.data);
    });
  }, []);
  return (
    <>
      {/* <NextSeo
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
      /> */}
      {loading ? <Loading /> : <Stadium data={data} />}
      {loading && <Footer />}
    </>
  );
};

export default SingleStadium;
