import axios from "axios";
import { baseUrl } from "../baseUrl/baseUrl";

export const httpClient = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

httpClient.interceptors.request.use(
    config => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            config.headers['Authorization'] = `Bearer ${jwt}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);