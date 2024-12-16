import { config } from "../service/axios/configAxios"; // Importa a instância configurada do Axios
import { AxiosRequestConfig } from "axios";

// Tipo esperado da resposta do login
interface LoginResponse {
  user: any; // Substitua 'any' pelo tipo correto do usuário, se tiver.
  token: string;
}

export const login = async (user: any): Promise<{ data: LoginResponse }> => {
  const axiosConfig: AxiosRequestConfig = {
    url: "/login", // Caminho relativo, pois a baseURL já está configurada
    method: "post",
    data: user,
  };

  // Usa a instância configurada em vez do axios padrão
  const response = await config.request<LoginResponse>(axiosConfig);
  return response;
};
