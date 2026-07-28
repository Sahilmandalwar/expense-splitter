import { apiClient } from "../../api/client";
import type {
  LoginInput,
  SignupInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from "./validation";

export const signup = async (data: SignupInput) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmPassword, ...signupData } = data;
  const response = await apiClient.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (data: LoginInput) => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

export const getMe = async () => {
  const response = await apiClient.get("/auth/me");
  return response.data;
};

export const forgotPassword = async (data: ForgotPasswordInput) => {
  const response = await apiClient.post("/auth/forgot-password", data);
  return response.data;
};

export const resetPassword = async (
  token: string,
  data: ResetPasswordInput
) => {
  const response = await apiClient.post(
    `/auth/reset-password/${token}`,
    data
  );

  return response.data;
};