import axios from 'axios';
import Cookies from 'js-cookie';
const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
const TIMEOUT_DURATION = 110000;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_DURATION,
});
// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle success: false in response data
    if (response.data && response.data.success === false) {
      // Return the response as is, don't reject it
      return response;
    }
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 401:
          console.error('Unauthorized! Please log in again.');
          Cookies.remove('userToken');
          Cookies.remove('UserId');
          window.location.href = '/';
          break;
        // case 404:
        //   // Don't redirect, just return the error response
        //   return Promise.resolve({
        //     data: {
        //       success: false,
        //       message: "No studios found matching the given criteria."
        //     }
        //   });
        // case 500:
        //   console.error('Internal Server Error!');
        //   window.location.href = '/500';
        //   break;
        default:
          console.log(`Error: ${response.status} - ${response.statusText}`);
      }
    } else {
      console.error('An error occurred:', error.message);
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;









