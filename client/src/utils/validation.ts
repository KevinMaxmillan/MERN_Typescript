import { LoginData, RegisterData } from "../interfaces/authInterfaces";

export function validateLogin(data: LoginData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Invalid email format";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } 

  return errors;
}

export function validateRegister(data: RegisterData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.username) {
    errors.username = "Username is required";
  }

  if (!data.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Invalid email format";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
}
