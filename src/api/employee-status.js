import axiosConfig from "./axios-config";

const baseUri = "/employees/status";

export const updateEmployeeStatus = async (payload) => {
     const response = await axiosConfig.patch(baseUri, payload);
     return response.data;
}

export const readLatestStatus = async () => {
     const response = await axiosConfig.get(`${baseUri}/latest-status`);
     return response.data;
}