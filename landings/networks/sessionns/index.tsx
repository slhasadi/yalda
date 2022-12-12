import {axios} from "../../networks/axios/sessionsAxios";
import {
    getSessionLeaderBoard,
    getSkuList,
    getSessionWinners,
    getAdsSeen,
    postPay,
    getSessionLdb,
    getBanner,
    getParentSession,
    getWheel,
    getParentSessionLdb,
    getUserInfoApi,
    postStartGame,
    postInfo,
    postWheelAgain,
    getRules,
    getWheelResult,
    postEndGame,
    getAdvertisement,
    getGameSetup,
    getGameHistory,
    postScore,
    postHint,
    postRaise,
    postGameHistory,
    getWeeklyLbd,
} from "../endpoints";

export const getSessionLeaderBoardData = async (token: string, id: number, org: number) => {
    return await(
        axios(token, org).get(getSessionLeaderBoard(id))
    )
}
export const getSessionWinnersData = async (token: string, id: number, org: number) => {
    return await(
        axios(token, org).get(getSessionWinners(id))
    )
}
export const getSkuListData = async (token: string, org: number) => {
    return await(
        axios(token, org).get(getSkuList(org))
    )
}
export const postAdsSeenData = async (token: string, org: number) => {
    return await(
        axios(token, org).post(getAdsSeen())
    )
}
export const postPayData = async (token: string, data:any, org: number) => {
    return await(
        axios(token, org).post(postPay(), data)
    )
}
export const getSessionLdbData = async (token: string, id: number, org:number) => {
    return await(
        axios(token, org).get(getSessionLdb(id, org))
    )
}
export const getUserInfoApiData = async (token: string, org:number) => {
    return await(
        axios(token, org).get(getUserInfoApi())
    )
}
export const getBannerData = async (token: string, org:number) => {
    return await(
        axios(token, org).get(getBanner(org))
    )
}
export const getParentSessionData = async (token: string, org:number) => {
    return await(
        axios(token, org).get(getParentSession(org))
    )
}
export const getWheelData = async (token: string, org:number) => {
    return await(
        axios(token, org).get(getWheel(org))
    )
}
export const getParentSessionLdbData = async (token: string, id:number, org: number) => {
    return await(
        axios(token, org).get(getParentSessionLdb(id))
    )
}
export const postStartGameData = async (token: string, data:any, org: number) => {
    return await(
        axios(token, org).post(postStartGame(), data)
    )
}
export const postInfoData = async (token: string, data:any, org: number) => {
    return await(
        axios(token, org).post(postInfo(), data)
    )
}
export const postWheelAgainData = async (token: string, org: number) => {
    return await(
        axios(token, org).post(postWheelAgain())
    )
}
export const getRulesData = async (token: string, org:number) => {
    return await(
        axios(token, org).get(getRules(org))
    )
}
export const getWheelResultData = async (token: string, org: number) => {
    return await(
        axios(token, org).get(getWheelResult())
    )
}
export const postEndGameData = async (token: string, data:any, org: number) => {
    return await(
        axios(token, org).post(postEndGame(), data)
    )
}
export const getAdvertisementData = async (token: string, org:number) => {
    return await(
        axios(token, org).get(getAdvertisement(org))
    )
}
export const getGameSetupData = async (token: string, id:number, org: number) => {
    return await(
        axios(token, org).get(getGameSetup(id))
    )
}
export const getGameHistoryData = async (token: string, id:number, org: number) => {
    return await(
        axios(token, org).get(getGameHistory(id))
    )
}
export const postScoreData = async (token: string, data:any, org: number) => {
    return await(
        axios(token, org).post(postScore(), data)
    )
}
export const postHintData = async (token: string, data:any, org: number) => {
    return await(
        axios(token, org).post(postHint(), data)
    )
}
export const postRaiseData = async (token: string, data:any, org: number) => {
    return await(
        axios(token, org).post(postRaise(), data)
    )
}
export const postGameHistoryData = async (token: string, id:number, data:any, org: number) => {
    return await(
        axios(token, org).post(postGameHistory(id), data)
    )
}
export const getWeeklyLbdData = async (token: string, id:number, org: number) => {
    return await(
        axios(token, org).get(getWeeklyLbd(id))
    )
}
