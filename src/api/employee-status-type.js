import axiosConfig from "./axios-config";

const baseUri = "/employees/status/types";
export const createEmployeeStatusType = async (payload) => {
     const response = await axiosConfig.post(baseUri, payload);
     return response.data;
}

export const readEmployeeStatusTypeList = async () => {
     const response = await axiosConfig.get(baseUri);
     return response.data;
}