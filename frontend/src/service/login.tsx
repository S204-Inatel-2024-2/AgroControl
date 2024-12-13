import { config, updateAuthConfig } from './axios/configAxios';
import axios from "axios";

export const login = async (user: any) => {
  config.url = "login";
  config.method = "post";
  config.data = user;
  const response = await axios.request<any>(config);

  // Após o login, atualize o token no config
  const token = response.data?.token;
  if (token) {
    updateAuthConfig(token);
  }

  return response;
};
