import { config } from '../axios/configAxios'
import axios from "axios";

export const createFuncionario = async (funcionario: any) => {
    const localConfig = {
        ...config,
        url: "funcionarios",
        method: "post",
        data: funcionario,
    };

    return axios.request<any>(localConfig);
};

export const listAllFuncionarios = async () => {
    const localConfig = {
        ...config,
        url: "funcionarios",
        method: "get",
    };

    return axios.request<any>(localConfig);
};

export const getFuncionarioById = async (id: number) => {
    const localConfig = {
        ...config,
        url: `funcionarios/${id}`,
        method: "get",
    };

    return axios.request<any>(localConfig);
};

export const deleteFuncionario = async (id: number) => {
    const localConfig = {
        ...config,
        url: `funcionarios/${id}`,
        method: "delete",
    };

    return axios.request<any>(localConfig);
};