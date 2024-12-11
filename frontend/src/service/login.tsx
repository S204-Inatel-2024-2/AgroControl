import { config, authConfig } from './axios/configAxios';
import axios from "axios";

export const login = async (user: any) => {
  config.url = "login";
  config.method = "post";
  config.data = user;
  return axios.request<any>(config);
};

