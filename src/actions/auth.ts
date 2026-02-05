

import { AxiosError } from "axios";
import api from "./config"


export const loginUser = async (credentials: LoginCredentials) => {
    try {
        const body = {
            ...credentials,
            grant_type: "password",
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
        }
        const response = await api.post<LoginResponse>("/auth/token/", body);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
}


export const getUserProfile = async (token: string) => {
    try {
        const response = await api.get<User>("/api/auth/users/me/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
}

export const createAccount = async (data: Register) => {
    try {
        const response = await api.post<User>("/api/auth/users/", data);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
}