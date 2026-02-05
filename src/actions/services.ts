import { AxiosError } from "axios";
import api from "./config";

// region Service Categories

export const fetchServiceCategories = async (params?: any) => {
    try {
        const response = await api.get<ServiceCategory[]>("/api/services/categories/", { params });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
};

export const addServiceCategory = async ({ data, token }: { data: ServiceCategoryCreate, token: string }) => {
    try {
        const response = await api.post<ServiceCategory>("/api/services/categories/", data, {
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
}

export const updateServiceCategoryAdmin = async ({ id, data, token }: { id: number, data: Partial<ServiceCategory>, token: string }) => {
    try {
        const response = await api.patch<ServiceCategory>(`/api/services/categories/${id}/`, data, {
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
}

export const deleteServiceCategoryAdmin = async ({ id, token }: { id: number, token: string }) => {
    try {
        const response = await api.delete(`/api/services/categories/${id}/`, {
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
}


export const createServiceCategory = async (data: Partial<ServiceCategory>) => {
    try {
        const response = await api.post<ServiceCategory>("/api/services/categories/", data);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
}

export const updateServiceCategory = async (id: number, data: Partial<ServiceCategory>) => {
    try {
        const response = await api.patch<ServiceCategory>(`/api/services/categories/${id}/`, data);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
}

export const deleteServiceCategory = async (id: number) => {
    try {
        const response = await api.delete(`/api/services/categories/${id}/`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
}


// region Services

export const fetchServices = async (params?: {category?:number}) => {
    try {
        const response = await api.get<Service[]>("/api/services/", { params });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
};


/**
 * Create a new service accept form data
 */
export const createService = async ({ data, token }: { data: FormData, token: string }) => {
    try {
        const response = await api.post<Service>("/api/services/", data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
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
}

export const updateService = async ({ id, data, token }: { id: number, data: FormData, token: string }) => {
    try {
        const response = await api.patch<Service>(`/api/services/${id}/`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
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
}

export const delteService = async ({ id, token }: { id: number, token: string }) => {
    try {
        const response = await api.delete(`/api/services/${id}/`, {
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
}

// region Service Requests


export const createServiceRequest = async ({ token, data }: { data: ServiceRequestCreate, token: string }) => {
    try {
        const response = await api.post<ServiceRequest>("/api/services/requests/", data, {
            headers: { Authorization: `Bearer ${token}` },
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

export const fetchMyServiceRequests = async (params?: any) => {
    try {
        const response = await api.get<ServiceRequest[]>("/api/services/requests/", { params });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
};


export const updateServiceRequest = async ({ id, data, token }: { id: number, data: ServiceRequestStatusUpdate, token: string }) => {
    try {
        const response = await api.patch<ServiceRequest>(`/api/services/requests/${id}/update-status/`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
}