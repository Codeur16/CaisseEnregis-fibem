import { AxiosError } from "axios";
import api from "./config";

export const fetchMyQuotes = async (params?: any) => {
    try {
        const response = await api.get<Quote[]>("/api/billing/quotes/", { params });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
};

export const fetchMyInvoices = async (params?: any) => {
    try {
        const response = await api.get<Invoice[]>("/api/billing/invoices/", { params });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
};

export const fetchMyCreditNotes = async (params?: any) => {
    try {
        const response = await api.get<CreditNote[]>("/api/billing/credit-notes/", { params });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
};
