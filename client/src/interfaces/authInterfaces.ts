export type User = {
  id: string;
  username: string;
  email: string;
};

export type UserProfile = {
  username: string;
  numericID: number;
};

export type RegisterData = {
  username: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  message: string;
  user: User;
};

export type AuthError = {
  message: string;
  response?: {
    data?: {
      message?: string;
    };
  };
};

export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  accessToken: string;
  user: {
    numericID: number;
    username: string;
  };
};

export enum AuthStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}
