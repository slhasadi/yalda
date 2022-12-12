import {axios} from "../../networks/axios/videoAxios";
import {
    getVideoList, 
} from "../endpoints";

export const getVideoListData = async (org: number) => {
    return await(
        axios(org).get(getVideoList())
    )
}