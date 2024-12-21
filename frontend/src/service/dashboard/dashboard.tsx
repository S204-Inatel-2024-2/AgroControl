import { config } from "../axios/configAxios";

export const listAllSalarios = async () => {
  return config.get("dashboard/salarioFuncionarios");
};

export const analiseFinanceira = async () => {
  return config.get("dashboard/analiseFinanceiraMensal");
};
