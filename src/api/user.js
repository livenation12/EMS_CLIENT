import axiosConfig from "./axios-config"
const baseUri = "/users";

export const readAllUsers = async () => {
     const response = await axiosConfig.get(baseUri);
     return response.data;
};

export const readUserById = async (userId) => {
    const response = await axiosConfig.get(`${baseUri}/${userId}`);
    return response.data;
}


export const assignRolesToUser = async (userId, payload) => {
    const response = await axiosConfig.post(`${baseUri}/${userId}/roles`, payload);
    return response.data;
}


