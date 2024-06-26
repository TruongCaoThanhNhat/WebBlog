import axiosInstance from '@/config/axios';
import axios from 'axios';

// const apiLogin = (payload) => axios.post("/api/v1/auth/login", payload);

export const apiLogin = async(userName, password) => {
    try {
        const response = await axiosInstance.post("auth/login", {
            userName,
            password
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }
};

export const register = (payload) => axios.post("/api/v1/auth/register", payload);