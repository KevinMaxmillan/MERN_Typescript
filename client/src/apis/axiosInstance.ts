import axios from "axios";
import { useUserStore } from "../store/authStore";
import { ApiEndpoints } from "../utils/apiEndpoints";

const BASE_URL = import.meta.env.VITE_API_URL || "https://mern-typescript-py2d.onrender.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().accessToken; 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axiosInstance.get<{ accessToken: string }>(ApiEndpoints.REFRESH_TOKEN);
        const newAccessToken = refreshResponse.data.accessToken;
        
        useUserStore.getState().setAccessToken(newAccessToken);
        
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch {
        useUserStore.getState().clearUser();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;