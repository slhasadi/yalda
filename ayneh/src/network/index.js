import axios from 'axios';
import LocalStorageService from "./localstorageService";
export const baseURL = `https://api.ayneh.tika-team.ir/v1/`;

export async function Headers() {
    let header = await LocalStorageService.getToken() ? 
    {"Content-Type": "application/json", "Authorization": `Token ${LocalStorageService.getToken()}`} 
    : 
    {"Content-Type": "application/json"};
    return (header);
}


axios.interceptors.request.use(
config => {
    const token = LocalStorageService.getToken();
    if (token) {
        config.headers['Authorization'] = 'Token ' + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
},
error => {
    Promise.reject(error)
});

axios.interceptors.response.use((response) => {
    return response
}, function (error) {
    // console.log("sdfsd",error);
    if ( error.response.status === 403 ){
        // alert(error)
    }
    // const originalRequest = error.config;
 
    if (error.response.status === 401 ) {
        LocalStorageService.clearToken();
        window.location.href="/login"
        return Promise.reject(error);
    }



    return Promise.reject(error);
});
