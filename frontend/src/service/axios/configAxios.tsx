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

// Crie uma função para atualizar o token dinamicamente
export const updateAuthConfig = (token: string) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };
};

// Interceptor global para lidar com respostas
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.data?.message === "Invalid token") {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
