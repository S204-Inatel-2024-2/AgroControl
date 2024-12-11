import { authConfig } from '../axios/configAxios'
import axios from "axios";

export const listAllServices = async () => {
    const localConfig = {
        ...authConfig,
        url: "servicos",
        method: "get"
    }
    return axios.request<any>(localConfig);
}

export const listAllTiposServico = async () => {
    const localConfig = {
        ...authConfig,
        url: "tiposervico",
        method: "get",
    };

    return axios.request<any>(localConfig);
};

export const createServico = async (servico: any) => {
    const localConfig = {
        ...authConfig,
        url: "servicos",
        method: "post",
        data: servico,
    };

    return axios.request<any>(localConfig);
};

export const getServicoById = async (id: number) => {
    const localConfig = {
        ...authConfig,
        url: `servicos/${id}`,
        method: "get",
    };

    return axios.request<any>(localConfig);
};

export const deleteServico = async (id: number) => {
    const localConfig = {
        ...authConfig,
        url: `servicos/${id}`,
        method: "delete",
    };

    return axios.request<any>(localConfig);
};

export const getTipoServicoById = async (id: number) => {
    const localConfig = {
        ...authConfig,
        url: `tiposervico/${id}`,
        method: "get",
    };

    return axios.request<any>(localConfig);
};


export const updateServico = async (idServico: number, data: any) => {
    const localConfig = {
        ...authConfig,
        url: `/servicos/${idServico}`,
        method: "put",
        data,
    };
    return axios.request<any>(localConfig);
};


export const getServicosByFuncionario = async (funcionarioId: number) => {
    const localConfig = {
        ...authConfig,
        url: `/funcionarios/${funcionarioId}/servicos`,
    };
    return axios.request<any>(localConfig);
};