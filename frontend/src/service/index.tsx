import axios, { AxiosRequestConfig } from 'axios'

export const config: AxiosRequestConfig = {
    baseURL: 'http://localhost:3000',
    responseType: 'json',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
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
    config.url = 'login'
    config.method = 'post'
    config.data = user
    return axios.request<any>(config);
};
