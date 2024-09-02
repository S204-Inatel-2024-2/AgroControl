import axios, { AxiosRequestConfig } from "axios";

export const config: AxiosRequestConfig = {
  baseURL: "http://localhost:3000",
  responseType: "json",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
  timeout: 100000,
  withCredentials: false,
  maxRedirects: 5,
  validateStatus: (status: number) => status >= 200 && status < 300,
  transformResponse: (response) => {
    if (response !== null && response.error) {
      console.log(response.error);
    }
    let resp;
    try {
      resp = JSON.parse(response);
    } catch {
      resp = response;
    }
    return resp;
  },
};

export const login = async (user: any) => {
  config.url = "login";
  config.method = "post";
  config.data = user;
  return axios.request<any>(config);
};

export const authConfig: AxiosRequestConfig = {
  ...config,
  headers: {
    ...config.headers,
    Authorization:
      //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImVtYWlsIjoidGVzdGVAZW1haWwuY29tIiwiaWF0IjoxNzI0Njk0ODEyLCJleHAiOjE3MjQ2OTg0MTJ9.DfIT51iT71mgonNQXX9g-nGAV4fOEloCERGBDI9QGIo",
      `Bearer ${localStorage.getItem("token")}`,
  },
};

export const createFuncionario = async (funcionario: any) => {
  const localConfig = {
    ...authConfig,
    url: "funcionarios",
    method: "post",
    data: funcionario,
  };

  return axios.request<any>(localConfig);
};

export const listAllFuncionarios = async () => {
  const localConfig = {
    ...authConfig,
    url: "funcionarios",
    method: "get",
  };

  return axios.request<any>(localConfig);
};

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
