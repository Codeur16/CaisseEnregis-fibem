import { AxiosError } from "axios";
import api from "./config";


type JobOfferParam ={
contract_type?:"CDI"|"CDD"|"STAGE"|"FREELANCE"|"INTERIM";
location?:string;
search?:string;
}

// region Job Offers

export const fetchJobOffers = async (params?: Partial<JobOfferParam>) => {
    try {
        const response = await api.get<JobOffer[]>("/api/jobs/offers/", { params });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
};

export const fetchJobOffer = async (id: number) => {
    try {
        const response = await api.get<JobOffer>(`/api/jobs/offers/${id}/`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
};

export const createJobOffer = async ({ data, token }: { data: JobOfferCreate, token: string }) => {
    try {
        const response = await api.post<JobOffer>("/api/jobs/offers/", data, {
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

export const getJobfferDetail = async (id: number) => {
    try {
        const response = await api.get<JobOffer>(`/api/jobs/offers/${id}/`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });
    }
}

export const getJobOfferApplications = async ({ id, token }: { id: number, token: string }) => {
    try {
        const response = await api.get<JobApplication[]>(`/api/jobs/offers/${id}/applications/`, {
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

export const updateJobOffer = async ({ id, data, token }: { id: number, data: Partial<JobOfferCreate>, token: string }) => {
    try {
        const response = await api.patch<JobOffer>(`/api/jobs/offers/${id}/`, data, {
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

export const deleteJobOffer = async ({ id, token }: { id: number, token: string }) => {
    try {
        const response = await api.delete(`/api/jobs/offers/${id}/`, {
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

// endregion

// region Job Applications

export const applyForJob = async ({ data, token }: { data: FormData, token: string }) => {
    try {
        const response = await api.post<JobApplication>("/api/jobs/applications/", data, {
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


export const getJobApplicationDetail = async ({id,token}:{id: number,token:string}) => {
    try {
        const response = await api.get<JobApplication>(`/api/jobs/applications/${id}/`,{
            headers:{
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

export const fetchMyJobApplications = async ({ params, token }: { params?: Partial<{status:number,job_offer:number,candidate:number}>, token: string }) => {
    try {
        const response = await api.get<JobApplication[]>("/api/jobs/applications/", {
            params, headers: {
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

export const fetchRecruiterApplications = async ({ params, token }: { params?: Partial<{status:number,job_offer:number,candidate:number}>, token: string }) => {
    try {
        const response = await api.get<JobApplication[]>("/api/jobs/applications/my-applications/", {
            params, headers: {
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


// Job Application actions

export const acceptJobApplication = async ({token,id}:{token:string,id:number})=>{
    try {
         const response = await api.patch<JobApplication>(`/api/jobs/applications/${id}/accept/`,{}, {
             headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data
    } catch (error) {
     const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });   
    }
}

export const reviewJobApplication = async ({token,id}:{token:string,id:number})=>{
    try {
         const response = await api.patch<JobApplication>(`/api/jobs/applications/${id}/review/`,{}, {
             headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data
    } catch (error) {
     const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });   
    }
}

export const rejectJobApplication = async ({token,id}:{token:string,id:number})=>{
    try {
         const response = await api.patch<JobApplication>(`/api/jobs/applications/${id}/reject/`,{}, {
             headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data
    } catch (error) {
     const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            throw JSON.stringify(axiosError.response.data);
        }
        throw JSON.stringify({ message: "An unexpected error occurred" });   
    }
}