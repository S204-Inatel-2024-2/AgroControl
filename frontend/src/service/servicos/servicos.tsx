import { config } from '../axios/configAxios'
import axios from "axios";

export const listAllServices = async () => {
    const localConfig = {
        ...config,
        url: "servicos",
        method: "get"
    }
    return axios.request<any>(localConfig);
}

export const listAllTiposServico = async () => {
    const localConfig = {
        ...config,
        url: "tiposervico",
        method: "get",
    };

    return axios.request<any>(localConfig);
};

export const createServico = async (servico: any) => {
    const localConfig = {
        ...config,
        url: "servicos",
        method: "post",
        data: servico,
    };

    return axios.request<any>(localConfig);
};

export const getServicoById = async (id: number) => {
    const localConfig = {
        ...config,
        url: `servicos/${id}`,
        method: "get",
    };

    return axios.request<any>(localConfig);
};

export const deleteServico = async (id: number) => {
    const localConfig = {
        ...config,
        url: `servicos/${id}`,
        method: "delete",
    };

    return axios.request<any>(localConfig);
};

export const getTipoServicoById = async (id: number) => {
    const localConfig = {
        ...config,
        url: `tiposervico/${id}`,
        method: "get",
    };

    return axios.request<any>(localConfig);
};


export const updateServico = async (idServico: number, data: any) => {
    const localConfig = {
        ...config,
        url: `/servicos/${idServico}`,
        method: "put",
        data,
    };
    return axios.request<any>(localConfig);
};


export const getServicosByFuncionario = async (funcionarioId: number) => {
    const localConfig = {
        ...config,
        url: `/funcionarios/${funcionarioId}/servicos`,
    };
    return axios.request<any>(localConfig);
};