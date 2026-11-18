
import axios from "axios";

export const API = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    timeout: 15000,
});

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
    accessToken = token;
};

API.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});
