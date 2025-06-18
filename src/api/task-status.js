import axiosConfig from "./axios-config";


const baseUri = "/tasks/status";

export const createTaskStatus = async (payload) => {
     const response = await axiosConfig.post(baseUri, payload);
     return response.data;
};