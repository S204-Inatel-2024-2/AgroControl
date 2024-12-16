import axios, { AxiosInstance } from "axios";

// Cria uma instância Axios configurada
export const config: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  responseType: "json",
  timeout: 100000,
  withCredentials: false,
  maxRedirects: 5,
  validateStatus: (status: number) => status >= 200 && status < 300,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
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
});

// Atualiza o token dinamicamente antes de cada requisição
export const updateAuthConfig = (token: string) => {
  config.defaults.headers.Authorization = `Bearer ${token}`;
};

// Interceptor global para respostas
config.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Ou onde você estiver armazenando o token

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Inclui o token no cabeçalho
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default config;
