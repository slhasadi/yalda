import axios from 'axios';
import { baseURL } from './index.js';

export function GetFaal(){
    return axios.get(`${baseURL}pom/hafezpoem/`)
}

export function GetEstekhare(){
    return axios.get(`${baseURL}pom/estekhare/`)
}