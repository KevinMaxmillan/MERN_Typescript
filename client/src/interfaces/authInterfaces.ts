export interface User {
    id: string;
    username: string;
    email: string;
  }

  export interface UserProfile {
    username: string;
    numericID: number;
  }
  
  export interface RegisterData {
    username: string;
    email: string;
    password: string;
  }
  
  export interface RegisterResponse {
    message: string;
    user: User;
  }
  
  export interface AuthError {
    message: string;
    response?: {
      data?: {
        message?: string;
      };
    };
  }

  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    message: string;
    token: string;
  }
  
  export enum AuthStatus {
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
  }
  