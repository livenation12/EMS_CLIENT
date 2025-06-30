



import axiosConfig from './axios-config';
const baseUri = '/tasks/logs';
/**
 *
 * @param params Object {
 *   pageNumber: number, // Page number for pagination
 * }
 * @return ApiResponse<Page<TaskLog> list of task logs
 *   Page {
 *   content: TaskLog[], // List of task logs
 *   totalElements: number, // Total number of task logs
 *  totalPages: number, // Total number of pages
 *  size: number, // Size of each page
 *  number: number, // Current page number
 *  numberOfElements: number, // Number of elements in the current page
 *  last: boolean // Whether the current page is the last page
 * etc.
 * }
 */
export const readLatestTaskLogList = async (params) => {
     const response = await axiosConfig.get(`${baseUri}/latest?${new URLSearchParams(params)}`);
     return response.data;
}