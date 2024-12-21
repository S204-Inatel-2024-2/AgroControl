import { config } from "../axios/configAxios";

export const listAllCategoriasReceita = async () => {
    return config.get("categorias");
};

export const createReceita = async (receita: any) => {
    try {
        const response = await config.post("receitas", receita);
        return response;
    } catch (error) {
        console.error("Erro ao criar receita:", error);
        return { status: 500 }; // Retorna status 500 em caso de erro
    }
};

export const listAllReceitas = async () => {
    return config.get("receitas");
};
