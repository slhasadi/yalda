import { useTranslation } from "next-i18next";
import Card from "./Card";
import H1 from "./Typography/H1";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../globals";
import { FooterText } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "store";

const  AboutOfSubject= ({title, description, textColor, bgColor}:any) => {
    let { t } = useTranslation();
    const [text, setText] = useState<FooterText>({} as FooterText);
    const [more, setMore] = useState(false);
    const router = useRouter();
    let shortDescription = '';
    const pagesData = useSelector((state: RootState) => state.pages.list);
    const [cookies] = useCookies([
        "lnd_org",
    ]);
        if(pagesData.length > 0 && pagesData[0].description.length > 300){
            if (more) {
                shortDescription = pagesData[0].description
            }else{
                shortDescription = pagesData[0].description.split('</p>')[1] + "..."
            }
        }
 
    // useEffect(()=>{
    //     axios({
    //         method: "get",
    //         url: `${baseURL}pages${router.route}/`,
    //         headers:{
    //             organization: cookies.lnd_org
    //         }
    //     }).then((response) => {
    //         if (response.status === 200) {
    //             setText(response.data)
    //         }
    //     });
    // },[])
    return (
        <section className='mb-12'>
            <Card className='bg-box-main px-4 py-6' dropShadow={true}  bgColor={bgColor} textColor={textColor} >
                <H1 className='mb-2'>{pagesData[0]?.meta_title}</H1>
                <div className='text-justify' 
                dangerouslySetInnerHTML={{
                    __html: shortDescription,
                }}
                >
                </div>
                <p className="text-primary cursor-pointer" 
                onClick={()=>{
                    setMore(!more)
                }}>{more? "کمتر" : "بیشتر"}</p>
            </Card>
        </section>
    )
}
export default AboutOfSubject;
