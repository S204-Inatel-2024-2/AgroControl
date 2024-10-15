import {authConfig}  from '../axios/configAxios'
import axios from "axios";

export const listAllServices= async ()=>{
    const localConfig = {
        ...authConfig,
        url:"servicos",
        method:"get"
    }
    return axios.request<any>(localConfig);
}