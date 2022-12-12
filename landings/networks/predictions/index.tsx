import correctPaginationNextPageLink from "helpers/utilities/correctPaginationNextPageLink";
import { GetMatchesResponseData } from "interfaces/interfaces";
import { axios } from "../../networks/axios/predictionAxios";
import {
  getMatchByDateEndpoint,
  getPredictedMatchesEndpoint,
  postPredict,
  getMatchRound,
  getMatchStages,
  getStandings,
  postAdsSeen,
} from "../endpoints";

export const fetchPredictionData = async (
  date: string,
  token = null,
  org: number,
  sub: number | undefined
) => {
  const endpoints: string[] = [getMatchByDateEndpoint(date, sub)];
  if (token) {
    endpoints.push(getPredictedMatchesEndpoint());
  }
  return await Promise.all(
    endpoints.map((endpoint: string) => {
      return axios(token, org).get(endpoint);
    })
  );
};
export const postAdsSeenData = async (token: string, org: any, data: any) => {
  return await axios(token, org).post(postAdsSeen(), data, org);
};
export const postPredictData = async (token: string, org: any, data: any) => {
  return await axios(token, org).post(postPredict(), data, org);
};
export const getMatchRoundData = async (token: string, org: number) => {
  return await axios(token, org).get(getMatchRound());
};
export const getStandingsData = async (token: string, org: number) => {
  return await axios(token, org).get(getStandings());
};
export const getStagesData = async (token: string, org: number) => {
  return await axios(token, org).get(getMatchStages());
};
export const getMatchesByDate = async (
  token: string,
  org: number,
  date?: string
) => {
  return await axios(token, org).get<GetMatchesResponseData>("cnt/match/", {
    params: { league: 70, ...(date ? { date } : {}) },
  });
};

export const networkGetMatchesNextPage = async (
  token: string,
  org: number,
  url: string
) => {
  return await axios(token, org).get<GetMatchesResponseData>(
    correctPaginationNextPageLink(url)
  );
};

export const networkGetPredictedMatches = async (
  token: string,
  org: number
) => {
  return await axios(token, org).get("cnt/prediction/");
};

export const getPlayoffRoundMatches = async (token: string, org: number) => {
  return await axios(token, org).get<GetMatchesResponseData>(
    "cnt/match_stages/",
    {
      params: { league: 70 },
    }
  );
};
