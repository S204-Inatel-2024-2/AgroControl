import { config } from "../axios/configAxios";

// Função para criar um funcionário
export const createFuncionario = async (funcionario: any) => {
    return config.post("funcionarios", funcionario);
};

// Função para listar todos os funcionários
export const listAllFuncionarios = async () => {
    return config.get("funcionarios");
};

// Função para buscar um funcionário pelo ID
export const getFuncionarioById = async (id: number) => {
    return config.get(`funcionarios/${id}`);
};

// Função para excluir um funcionário
export const deleteFuncionario = async (id: number) => {
    return config.delete(`funcionarios/${id}`);
};

// Função para atualizar um funcionário
export const updateFuncionario = async (id: number, funcionario: any) => {
    return config.put(`funcionarios/${id}`, funcionario);
};
