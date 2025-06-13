import axiosConfig from "./axios-config";
export const readEmployees = async () => {
     const response = await axiosConfig.get("/employees");
     return response.data;
}

export const createEmployee = async (employeeData) => {
     const response = await axiosConfig.post("/employees", employeeData);
     return response.data;
}