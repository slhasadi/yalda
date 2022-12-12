import {axios} from "../../networks/axios/musicAxios";
import {
    getFooterPage,
    getMusicList, 
} from "../endpoints";

export const getMusicListData = async (org: number) => {
    return await(
        axios(org).get(getMusicList())
    )
}
export const getFooterPageData = async (org: number, route:string) => {
    return await(
        axios(org).get(getFooterPage(route))
    )
}