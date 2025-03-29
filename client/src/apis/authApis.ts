import axiosInstance from "./axiosInstance";
import { ApiEndpoints } from "../utils/apiEndpoints";
import { RegisterData, RegisterResponse, LoginData, LoginResponse, UserProfile } from "../interfaces/authInterfaces";


export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await axiosInstance.post(ApiEndpoints.REGISTER, data);
  return response.data;
};

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  const response = await axiosInstance.post(ApiEndpoints.LOGIN, data);
  return response.data;
};

export const fetchUserProfile = async (): Promise<UserProfile> => {
  const response = await axiosInstance.get<{ success: boolean; user: UserProfile }>(ApiEndpoints.PROFILE);
  return response.data.user;
};

export const logoutUser = async (): Promise<{ message: string }> => {
  const response = await axiosInstance.post<{ message: string }>(ApiEndpoints.LOGOUT);
  return response.data;
};

