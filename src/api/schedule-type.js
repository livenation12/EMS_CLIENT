import axiosConfig from "./axios-config";

const baseUri = '/schedules/types';

export const createScheduleType = async (payload) => {
     const response = await axiosConfig.post(baseUri, payload);
     return response.data;
};


export const readAllScheduleTypes = async () => {
     const response = await axiosConfig.get(baseUri);
     return response.data;
};