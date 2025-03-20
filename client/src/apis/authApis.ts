import API from "./baseApis";
import { ApiEndpoints } from "../utils/apiEndpoints";
import { RegisterData, RegisterResponse,LoginData, LoginResponse, UserProfile } from "../interfaces/authInterfaces";
import { useUserStore } from "../store/authStore";

export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
    const response = await API.post(ApiEndpoints.REGISTER, data);
    return response.data;
  };
  
  export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
    const response = await API.post(ApiEndpoints.LOGIN, data);
    return response.data;
  };
  
  export const fetchUserProfile = async (): Promise<UserProfile> => {
    const response = await API.get<{ success: boolean; user: UserProfile }>(ApiEndpoints.PROFILE);
    return response.data.user;
  };
  
  export const logoutUser = async (): Promise<{ message: string }> => {
    const response = await API.post<{ message: string }>(ApiEndpoints.LOGOUT);
    return response.data;
  };

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await API.get(ApiEndpoints.REFRESH_TOKEN);
        return API(originalRequest); 
      } catch {
        useUserStore.getState().clearUser(); 
        window.location.href = "/login"; 
      }
    }
    return Promise.reject(error);
  }
);

