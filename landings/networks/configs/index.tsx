import axios from "axios";
import {baseURL} from "../../globals";

export const getConfigData = async (path: string) => {
    return await(
        axios.get(`${baseURL}users/org/?path=${path}`)
    )
}
