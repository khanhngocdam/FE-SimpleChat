import axios from "axios";

// import { getLoginResponseData } from 'src/utils/mng-token';

const customAxios = axios.create({
  baseURL: import.meta.env.VITE_BE_API_URL,
  timeout: 30000,
});
console.log('BASE URL =', import.meta.env.VITE_BE_API_URL);

customAxios.interceptors.request.use(
  (config) => {
    // Tạm thời bỏ qua xác thực
    // const data = getLoginResponseData();
    // if (data) {
    //   config.headers.Authorization = `Bearer ${data.accessToken}`;
    // }

    return config;
  },
  (error) => Promise.reject(error),
);

export default customAxios;