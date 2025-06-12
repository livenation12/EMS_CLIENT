import instance from "./axios-config";

export const verifyToken = async () => {
     const response = await instance.get("/auth/verify-token");
     return response.data;
}

export const login = async (credentials) => {
     const response = await instance.post("/auth/login", credentials);
     return response.data;
}

export const register = async (userData) => {
     const response = await instance.post("/auth/register", userData);
     return response.data;
}

export const logout = async () => {
     const response = await instance.post("/auth/logout");
     return response.data;
}