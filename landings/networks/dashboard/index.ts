import { axios } from "networks/axios/musicAxios";

export const getProfileUserVideos = async (org: number, token: string) => {
  return await axios(org, token).get("users/profile/");
};
