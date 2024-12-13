import { config } from '../axios/configAxios'
import axios from "axios";

export const listAllCategoriasReceita = async () => {
    const localConfig = {
        ...config,
        url: "categorias",
        method: "get"
    }
    return axios.request<any>(localConfig);
}

export const createReceita = async (receita: any) => {
    const localConfig = {
        ...config,
        url: "receitas",
        method: "post",
        data: receita,
    };
    try {
        const response = await axios(localConfig); // Fazendo a requisição com axios
        return response; // Retorna a resposta para ser usada na função que chamou
    } catch (error) {
        console.error("Erro ao criar receita:", error);
        return { status: 500 }; // Retorna status 500 em caso de erro
    }
}

export const listAllReceitas = async () => {
    const localConfig = {
        ...config,
        url: "receitas",
        method: "get"
    }
    return axios.request<any>(localConfig);
}
