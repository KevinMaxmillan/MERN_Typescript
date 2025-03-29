import { create } from "zustand";
import { UserProfile } from "../interfaces/authInterfaces";

interface UserState {
  user: UserProfile | null;
  accessToken: string | null;
  setUser: (user: UserProfile) => void;
  setAccessToken: (token: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  accessToken: null,
  setUser: (user) => set({ user }),
  setAccessToken: (token) => set({ accessToken: token }),
  clearUser: () => set({ user: null, accessToken: null }),
}));

