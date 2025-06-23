import axiosConfig from "./axios-config";

const baseUri = "/tasks";

export const createTask = async (payload) => {
     const response = await axiosConfig.post(baseUri, payload);
     return response.data;
};

export const readTaskKanban = async () => {
     const response = await axiosConfig.get(`${baseUri}/kanban`);
     return response.data;
}

export const updateTask = async (id, payload) => {
     const response = await axiosConfig.patch(`${baseUri}/${id}`, payload);
     return response.data;
}