import Axios from 'axios'
import { baseURL } from '../../globals'

export const axios = (org:number, token: string | undefined = '') => {
    let headers = {
        Accept: 'application/json',
    }
    if (token) {
        // @ts-ignore
        headers.Authorization = `jwt ${token}`
    }
    if (org) {
        // @ts-ignore
        headers.organization = org
    }
    const _axios = Axios.create({
        baseURL: baseURL,
        headers: {
            ...headers
        },
    })
    _axios.interceptors.response.use(
        response => {
            return response
        },
        error => {
            if (error.response && error.response.status) {
                if (error.response.status === 401) {
                    return Promise.reject("login")
                }
                else if (error.response.status === 403){
                    return Promise.reject("forbidden")
                } 
                else if (error.response.status === 500) {
                    console.error(error)
                    return Promise.reject('sever')
                }
            }
            return Promise.reject(error)
        }
    )
    return _axios
}