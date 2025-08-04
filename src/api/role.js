import axiosConfig from './axios-config';

const baseUri = '/roles';

export const createRole = async (payload) => {
     const response = await axiosConfig.post(baseUri, payload);
     return response.data;
}

export const readAllRoles = async () => {
     const response = await axiosConfig.get(baseUri);
     return response.data;
}

export const readRoleById = async (id) => {
     const response = await axiosConfig.get(`${baseUri}/${id}`);
     return response.data;
}