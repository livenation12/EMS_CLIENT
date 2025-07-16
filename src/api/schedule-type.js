const baseUri = '/schedules/types';

export const createScheduleType = async (payload) => {
     const response = await axiosConfig.post(baseUri, payload);
     return response.data;
};