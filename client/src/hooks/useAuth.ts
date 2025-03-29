import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { registerUser, loginUser, fetchUserProfile, logoutUser } from "../apis/authApis";
import { RegisterData, RegisterResponse, LoginData, LoginResponse, UserProfile, AuthError } from "../interfaces/authInterfaces";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserStore } from "../store/authStore";
import { QueryKeys } from "../utils/queryKeys";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setAccessToken = useUserStore((state) => state.setAccessToken);
  const setUser = useUserStore((state) => state.setUser);

  return useMutation<LoginResponse, AuthError, LoginData>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setUser(data.user);
      toast.success("Login successful!");
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USER_PROFILE] });

      navigate("/dashboard");
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Login failed.";
      toast.error(errorMessage);
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation<RegisterResponse, AuthError, RegisterData>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Registration failed.";
      toast.error(errorMessage);
    },
  });
};

export const useUserProfile = () => {
  const { setUser } = useUserStore();

  const { data } = useQuery<UserProfile, AuthError>({
    queryKey: [QueryKeys.USER_PROFILE],
    queryFn: fetchUserProfile,
  });

  useEffect(() => {
    if (data) {
      setUser(data); 
    }
  }, [data, setUser]);

  return { data };
};

export const useLogout = () => {
  const { clearUser } = useUserStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      clearUser();  
      queryClient.removeQueries({ queryKey: [QueryKeys.USER_PROFILE] }); 
      toast.success("Logged out successfully!");
      navigate("/login");
    },
    onError: () => {
      toast.error("Logout failed. Try again.");
    },
  });
};
