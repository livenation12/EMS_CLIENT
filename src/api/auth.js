import axiosConfig from "./axios-config";

export const verifyToken = async () => {
     const response = await axiosConfig.get("/auth/verify-token");
     return response.data;
}

export const login = async (credentials) => {
     const response = await axiosConfig.post("/auth/login", credentials);
     return response.data;
}

export const register = async (userData) => {
     const response = await axiosConfig.post("/auth/register", userData);
     return response.data;
}

export const logout = async () => {
     const response = await axiosConfig.post("/auth/logout");
     return response.data;
}