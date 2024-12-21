import { config } from "../axios/configAxios";

export const listAllServices = async () => {
    return config.get("servicos");
};

export const listAllTiposServico = async () => {
    return config.get("tiposervico");
};

export const createServico = async (servico: any) => {
    return config.post("servicos", servico);
};

export const getServicoById = async (id: number) => {
    return config.get(`servicos/${id}`);
};

export const deleteServico = async (id: number) => {
    return config.delete(`servicos/${id}`);
};

export const getTipoServicoById = async (id: number) => {
    return config.get(`tiposervico/${id}`);
};

export const updateServico = async (idServico: number, data: any) => {
    return config.put(`/servicos/${idServico}`, data);
};

export const getServicosByFuncionario = async (funcionarioId: number) => {
    return config.get(`/funcionarios/${funcionarioId}/servicos`);
};
