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
 * @param { startDate: Date, endDate: Date }}
 * @return {Promise<ApiResponse<Schedule[]>>}
 */
export const readSchuduleList = async ({ startDate, endDate }) => {
     const params = { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
     const urlParams = new URLSearchParams(params);
     const response = await axiosConfig.get(`${baseUri}/by-range?${urlParams}`,);
     return response.data;
};