import { authConfig } from '../axios/configAxios'
import axios from "axios";

export const createFuncionario = async (funcionario: any) => {
    const localConfig = {
        ...authConfig,
        url: "funcionarios",
        method: "post",
        data: funcionario,
    };

    return axios.request<any>(localConfig);
};

export const listAllFuncionarios = async () => {
    const localConfig = {
        ...authConfig,
        url: "funcionarios",
        method: "get",
    };

    return axios.request<any>(localConfig);
};

export const getFuncionarioById = async (id: number) => {
    const localConfig = {
        ...authConfig,
        url: `funcionarios/${id}`,
        method: "get",
    };

    return axios.request<any>(localConfig);
};

export const deleteFuncionario = async (id: number) => {
    const localConfig = {
        ...authConfig,
        url: `funcionarios/${id}`,
        method: "delete",
    };

    return axios.request<any>(localConfig);
};