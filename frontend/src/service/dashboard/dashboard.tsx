import { authConfig } from "../axios/configAxios";
import axios from "axios";

export const listAllSalarios = async () => {
  const localConfig = {
    ...authConfig,
    url: "dashboard/salarioFuncionarios",
    method: "get",
  };
  return axios.request<any>(localConfig);
};

export const analiseFinanceira = async () => {
  const localConfig = {
    ...authConfig,
    url: "dashboard/analiseFinanceiraMensal",
    method: "get",
  };
  return axios.request<any>(localConfig);
};
