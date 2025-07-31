
import axiosConfig from './axios-config';

const baseUri = '/permissions';

export const createPermission = async (payload) => {
     const response = await axiosConfig.post(baseUri, payload);
     return response.data;
}

export const readAllPermissions = async () => {
     const response = await axiosConfig.get(baseUri);
     return response.data;
}