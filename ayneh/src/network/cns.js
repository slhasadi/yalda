import axios from 'axios';
import { baseURL } from './index.js';

export function GetContestList(){
    return axios.get(`${baseURL}cns/contest/`)
}

export function GetContestDetail(id){
    return axios.get(`${baseURL}cns/contest/${id}/`)
}

export function GetContestResult(body){
    return axios.post(`${baseURL}cns/contest_result/`,body)
}