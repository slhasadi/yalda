import {axios} from "../../networks/axios/pagesAxios";
import {
    GetPages,
    getVideoList, 
} from "../endpoints";

export const getPagesData = async (org: number, token:string) => {
    return await(
        axios(org).get(GetPages())
    )
}