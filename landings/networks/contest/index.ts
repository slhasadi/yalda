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
export function GetDreamList(search: any, page: number) {
  if (page !== undefined)
    return axios.get(
      `${baseURL}cnt/dream/?search=${search}&page=${page}&size=25`
    );
  else return axios.get(`${baseURL}cnt/dream/?search=${search}&size=25`);
}
export function GetDreamDetails(id: number) {
  return axios.get(`${baseURL}cnt/dream/${id}/`);
}
