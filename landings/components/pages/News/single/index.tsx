import Badge from "../../../../components/commons/Badge";
import Container from "../../../../components/commons/Container";
import Image from "next/image";
import Divider from "../../../../components/commons/Divider";
import Stack from "../../../../components/commons/Stack";
import H1 from "../../../../components/commons/Typography/H1";
import { NewsTypes } from "../../../../interfaces/interfaces";
import { FC, useState } from "react";
import BannerAds from "components/commons/BannerAds";
import { NextImageProxy } from "components/commons/Image";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
type Props = {
  data: NewsTypes.SingleNews;
};
const SingleNews: FC<Props> = ({ data }) => {
  const [cookies] = useCookies(["data"]);
  const [banner, setBanner] = useState("/images/tabs/banner.svg");
  const [link, setLink] = useState("");
  const router = useRouter()
  useEffect(()=>{
    axios.get(cookies.data?.ads_banner_data).then((response)=>{
      setBanner(response.data.image);
      setLink(response.data.landing_url);
    })
  },[])
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="order-2 lg:order-1 col-span-1 lg:col-span-3 cursor-pointer">
          {cookies.data?.ads_banner_type === "soroush_api" ? 
          <div onClick={()=>{
            router.replace(link);
          }}>
           {
            NextImageProxy(
              banner,
              575,
              320,
              "soroush banner"
            )
           } 
          </div>
          :
          <BannerAds parentClass="mx-auto aspect-[1/1] max-w-[300px]">
            <div id="mediaad-DA6Gg" className="h-full"></div>
          </BannerAds>
          }
        </div>
        <div className="order-1 lg:order-2 col-span-1 lg:col-span-6">
          <article>
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-3">
              <div className="col-span-1 lg:col-span-4">
                <H1 className="mb-2">{data.title}</H1>
                <p className="mb-2">{data.description}</p>
              </div>
              <div className="col-span-1 lg:col-span-2">
                <div className="relative h-full w-full min-h-[200px]">
                  {NextImageProxy(
                    data.links[0].url,
                    575,
                    320,
                    data.links[0].alt
                  )}
                  {/* <Image src={data.links[0].url} alt={data.links[0].alt} objectFit='contain' layout='fill' /> */}
                </div>
              </div>
            </div>

            <Divider className="h-[5px]" />

            <div
              className="news-rich-text mb-4"
              dangerouslySetInnerHTML={{ __html: data.full_description }}
            />
            <Stack className="gap-x-2 mb-4">
              {data.tags.map((item) => {
                return <Badge key={item.id}>{item.title}</Badge>;
              })}
            </Stack>
            <Stack className="gap-x-2">
              <span>منبع خبر: </span>
              <span>{data.reference}</span>
            </Stack>
          </article>
        </div>
        <div className="order-3 col-span-1 lg:col-span-3 cursor-pointer">
          {cookies.data?.ads_banner_type === "soroush_api" ? 
          <div onClick={()=>{
            router.replace(link)
          }}>
           {
            NextImageProxy(
              banner,
              575,
              320,
              "soroush banner"
            )
           } 
          </div>
          :
          <BannerAds parentClass="mx-auto aspect-[1/1] max-w-[300px]">
            <div id="mediaad-On2za" className="h-full"></div>
          </BannerAds>
          }
        </div>
      </div>

      <br />
    </Container>
  );
};

export default SingleNews;
