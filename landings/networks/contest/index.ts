import axios from "axios";

const baseURL = `https://api.ayneh.tika-team.ir/v1/`;

export function GetContestDetail(id: number) {
  return axios.get(`${baseURL}cns/contest/${id}/`);
}

export function GetContestResult(body: any) {
  return axios.post(`${baseURL}cns/contest_result/`, body);
}
export function GetContestList() {
  return axios.get(`${baseURL}cns/contest/`);
}
