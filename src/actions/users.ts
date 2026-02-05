import { AxiosError } from "axios";
import api from "./config";

export const fetchUsers = async () => {
    try {
        const response = await api.get<User[]>("/api/auth/users/");
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
};

export const fetchUser = async (id: number | string) => {
    try {
        const response = await api.get<User>(`/api/auth/users/${id}/`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
};

export const updateUser = async (id: number | string, data: Partial<User>, token: string) => {
    try {
        const response = await api.patch<User>(`/api/auth/users/${id}/`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
};

export const updateProfile = async (profileId: number, data: Partial<Profile>, token: string) => {
    try {
        const response = await api.patch<Profile>(`/api/auth/profiles/${profileId}/`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
};

export const updateCandidateProfile = async (profileId: number, data: Partial<CandidateProfile>, token: string) => {
    try {
        const response = await api.patch<CandidateProfile>(`/api/auth/candidate-profiles/${profileId}/`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
};

export const updateCompanyProfile = async (profileId: number, data: Partial<CompanyProfile>, token: string) => {
    try {
        const response = await api.patch<CompanyProfile>(`/api/auth/company-profiles/${profileId}/`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
};
