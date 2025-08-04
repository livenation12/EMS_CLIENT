import axiosConfig, { rawAxios } from './axios-config';

export const uploadGallery = async (payload) => {
     const response = await rawAxios.post('/galleries', payload);
     return response.data;
}

export const readAllGalleries = async (params) => {
     const response = await axiosConfig.get('/galleries', { params });
     return response.data;
}

