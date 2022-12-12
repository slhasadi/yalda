import axios from "axios";
import { NextImageProxy } from "components/commons/Image";
import {
  GroupTeamDataIFace,
} from "interfaces/interfaces";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import GroupTableComponent from "./GroupTableComponent";
import TeamTextPic from "./TeamTextPic";

const TableHeads = [
  "رتبه",
  "تیم",
  "بازی",
  "برد",
  "مساوی",
  "باخت",
  "گل زده/خورده",
  "تفاضل",
  "امتیاز",
];

const TableBodyNames = [
  { title: "جدول گروه A", item_key: "Group A" },
  { title: "جدول گروه B", item_key: "Group B" },
  { title: "جدول گروه C", item_key: "Group C" },
  { title: "جدول گروه D", item_key: "Group D" },
  { title: "جدول گروه E", item_key: "Group E" },
  { title: "جدول گروه F", item_key: "Group F" },
  { title: "جدول گروه G", item_key: "Group G" },
  { title: "جدول گروه H", item_key: "Group H" },
];

const GroupsStages: React.FC<{ groups: any }> = ({ groups }) => {
  const [cookies] = useCookies(["data"]);
  const [banner, setBanner] = useState("/images/tabs/banner.svg");
  const [link, setLink] = useState("");
  const router = useRouter();
  useEffect(()=>{
    axios.get(cookies.data?.ads_banner_data).then((response)=>{
      setBanner(response.data.image);
      setLink(response.data.landing_url);
    })
  },[])
  let getTableBodies = (teams: GroupTeamDataIFace[]) => {
    return teams.map((item, index) => [
      item.overall_league_position,
      <TeamTextPic
        data={{ pic: item.team_badge, name: item.team_name }}
        key={index}
      />,
      item.overall_league_payed,
      item.overall_league_W,
      item.overall_league_D,
      item.overall_league_L,
      item.overall_league_GF + " - " + item.overall_league_GA,
      <div dir="ltr" key="wc_gf">{Number(item.overall_league_GF) - Number(item.overall_league_GA)}</div>,
      item.overall_league_PTS,
    ]);
  };
  return (
    <div className="px-2 py-4 sm:px-10 sm:py-8">
      <h3 className="text-xl font-bold">برنامه بازی های جام جهانی</h3>
      <div className="lg:flex flex-wrap mt-6">
        <div className="flex-[75] lg:pl-3">
          {groups &&
            TableBodyNames.map((item, index) => (
              <div className="mt-4" key={index} id={groups[item.item_key][0].league_rounds}>
                <GroupTableComponent
                  title={item.title}
                  heads={TableHeads}
                  bodies={getTableBodies(groups[item.item_key])}
                />
              </div>
            ))}
        </div>
        <div className="flex-[25] lg:pr-3">

          {cookies.data?.ads_banner_type === "soroush_api" ?
         <div className="cursor-pointer" onClick={()=>{
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
          <div className="aspect-[1/1] max-w-[300px] mx-auto mt-3 lg:mt-0">
            <div id="mediaad-2vnMv" className="h-full"></div>
          </div>
          }
          {cookies.data?.ads_banner_type === "soroush_api" ?
          <div className="cursor-pointer" onClick={()=>{
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
          <div className="aspect-[1/1] max-w-[300px] mt-2 lg:mt-3 mx-auto">
            <div id="mediaad-83k8N" className="h-full"></div>
          </div>
          }

          {/* <div className="aspect-[1/1] max-w-[300px] mt-2 lg:mt-3 mx-auto">
            <div id="mediaad-DA6V4" className="h-full"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default GroupsStages;
