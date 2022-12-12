import axios from 'axios';
import { baseURL } from './index.js';

export function LoginUser(body){
    return axios.post(`${baseURL}usr/sub/`, body)
}
export function VerificationUser(body){
    return axios.post(`${baseURL}usr/confirm/`, body)
}