import axiosConfig from "./axios-config";
export const readEmployees = async () => {
     const response = await axiosConfig.get("/employees");
     return response.data;
}