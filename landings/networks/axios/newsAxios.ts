import Axios from 'axios'
import { baseURL } from '../../globals'

export const axios = (org:number) => {
const _axios = Axios.create({
    baseURL: baseURL,
    headers: {
        Accept: 'application/json',
        organization: org
    }
})
_axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response && error.response.status) {
            if (error.response.status === 403 || error.response.status === 401) return Promise.reject('لطفا ابتدا وارد حساب کاربری خود شوید.')
            else if (error.response.status === 500) {
                console.error(error)
                return Promise.reject('مشکل در ارتباط با سرور!')
            }
        }
        return Promise.reject(error)
    }
)
    return _axios
}
