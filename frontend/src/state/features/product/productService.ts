import { axiosInstance } from "../../../utils/axios";
import { handleError } from "../auth/authService";

export const saveProperty = async (data: any) => {
    try {
        const response = await axiosInstance.post("/api/property/create", data);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export const getActiveProperties = async () => {
    try {
        const response = await axiosInstance.get("/api/property/get-active-properties");
        return response.data
    } catch (error) {
        return handleError(error)
    }
}

export const getSingleProperty = async (id: any) => {
    try {
        const response = await axiosInstance.get(`/api/property/single/${id}`);
        return response.data
    } catch (error) {
        return handleError(error)
    }
}

export const bookProperty = async (data) => {
    try {
        const response = await axiosInstance.post("/api/property/book", data);
        return response.data
    } catch (error) {
        return handleError(error)
    }
}