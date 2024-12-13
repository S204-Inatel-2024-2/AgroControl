import { config } from "../axios/configAxios";
import axios from "axios";

export const listAllSalarios = async () => {
  const localConfig = {
    ...config,
    url: "dashboard/salarioFuncionarios",
    method: "get",
  };
  return axios.request<any>(localConfig);
};

export const analiseFinanceira = async () => {
  const localConfig = {
    ...config,
    url: "dashboard/analiseFinanceiraMensal",
    method: "get",
  };
  return axios.request<any>(localConfig);
};
