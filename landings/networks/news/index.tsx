import {axios} from "../../networks/axios/newsAxios";
import {getHottestNewsEndpoint, getNewsEndpoint, getOtherNewsEndpoint, getSingleNewsEndpoint} from "../../networks/endpoints";

export const fetchNewsData = async (org:number) => {
    const endpoints: string[] = [getNewsEndpoint(), getHottestNewsEndpoint(), getOtherNewsEndpoint()]
    let result = null
    await Promise.all(
        endpoints.map((endpoint: string) => {
            return axios(org).get(endpoint)
        })
    ).then(async res => {
        result = {
            news: res[0].data,
            hottestNews: res[1].data,
            otherNews: res[2].data
        }
    }).catch(error => {
        console.error('error in fetchNewsData() => ', error)
    })
    return result
}

export const fetchSingleNewsData = async (slug: string, org:number) => {
    let result = null
    await axios(org).get(getSingleNewsEndpoint(slug)).then(res => {
        result = res.data
    }).catch(error => {
        console.error('error in fetchSingleNewsData() => ', error)
    })
    return result
}
