import axios from 'axios';
import { baseURL } from './index.js';

export function GetMenuItems(){
    return axios.get(`${baseURL}cnt/menu/`)
}

export function GetCatItems(id){
    return axios.get(`${baseURL}cnt/category/${id}/`)
}

export function GetSubCatDetails(id){
    return axios.get(`${baseURL}cnt/subcategory/${id}/`)
}

export function GetPostDetails(id){
    return axios.get(`${baseURL}cnt/post/${id}/`)
}

export function GetDreamList(search,page){
    if (page !== undefined)  
        return axios.get(`${baseURL}cnt/dream/?search=${search}&page=${page}&size=25`) 
    else 
        return axios.get(`${baseURL}cnt/dream/?search=${search}&size=25`)
}

export function GetDreamDetails(id){
    return axios.get(`${baseURL}cnt/dream/${id}/`)
}