import axiosConfig from "./axios-config";

export const updateEmployeeStatus = async (payload) => {
     const response = await axiosConfig.patch("/employees/status", payload);
     return response.data;
}