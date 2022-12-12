import Axios from 'axios'
import { ActivityLog } from '../../globals'

export const axios = () => {
    let headers = {
        Accept: 'application/json',
        Authorization: 'v42ueROt6Rs4lEuIhoxYORVib5lEkSsgl2pF2MYWhpoARwejTVpStCQ2d0l1',
    }
    const _axios = Axios.create({
        baseURL: ActivityLog,
        headers: {
            ...headers
        },
    })
    return _axios
}
