import axiosConfig from "./axios-config";

const baseUri = "/schedules";

/**
 * Create a new schedule.
 *
 * @param {Object} payload Schedule data to create, with shape:
 *   {
 *     title: string,
 *     description: string,
 *     startDate: Date,
 *     endDate: Date,
 *   }
 * @return {Promise<ApiResponse<Schedule>>}
 */

export const createSchedule = async (payload) => {
     const response = await axiosConfig.post(baseUri, payload);
     return response.data;
};


/**
 * Read a list of schedules that fall within the given range.
 *
 * @param {{ startDate: Date, endDate: Date }} payload
 * @return {Promise<ApiResponse<Schedule[]>>}
 */
export const readSchuduleList = async (payload) => {
     const urlParams = new URLSearchParams(payload);
     const response = await axiosConfig.post(`${baseUri}/by-range?${urlParams}`,);
     return response.data;
};