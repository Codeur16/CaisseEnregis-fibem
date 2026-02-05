import { AxiosError } from "axios";
import api from "./config";

// region Products

export const fetchProducts = async (params?: any) => {
    try {
        const response = await api.get<Product[]>("/api/store/products/", { params });
        return response.data;
    } catch (error) {
       const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
};

export const fetchSubscriptionPlans = async (params?: any) => {
    try {
        const response = await api.get<SubscriptionPlan[]>("/api/store/plans/", { params });
        return response.data;
    } catch (error) {
       const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
};

export const fetchMySubscriptions = async (params?: any) => {
    try {
        const response = await api.get<UserSubscription[]>("/api/store/user-subscriptions/", { params });
        return response.data;
    } catch (error) {
       const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
};

export const fetchCart = async () => {
    try {
        const response = await api.get<Cart>("/api/store/carts/my_cart/");
        return response.data;
    } catch (error) {
       const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
};

export const addToCart = async (productId?: number, planId?: number, quantity: number = 1) => {
    try {
        const response = await api.post("/api/store/cart-items/", {
            product: productId,
            subscription_plan: planId,
            quantity: quantity
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

export const checkout = async () => {
    try {
        const response = await api.post<Order>("/api/store/orders/");
        return response.data;
    } catch (error) {
       const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
};

export const fetchMyOrders = async (params?: any) => {
    try {
        const response = await api.get<Order[]>("/api/store/orders/", { params });
        return response.data;
    } catch (error) {
       const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
};
