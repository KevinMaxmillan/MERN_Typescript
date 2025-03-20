import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { registerUser, loginUser, fetchUserProfile, logoutUser } from "../apis/authApis";
import { RegisterData, RegisterResponse, LoginData, LoginResponse, UserProfile, AuthError } from "../interfaces/authInterfaces";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserStore } from "../store/authStore";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, AuthError, LoginData>({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success("Login successful!");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
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
    queryKey: ["userProfile"],
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
      queryClient.removeQueries({ queryKey: ["userProfile"] }); 
      toast.success("Logged out successfully!");
      navigate("/login");
    },
    onError: () => {
      toast.error("Logout failed. Try again.");
    },
  });
};
