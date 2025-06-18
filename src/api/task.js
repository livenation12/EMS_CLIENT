import axiosConfig from "./axios-config";

const baseUri = "/tasks";

export const createTask = async (payload) => {
     const response = await axiosConfig.post(baseUri, payload);
     return response.data;
};