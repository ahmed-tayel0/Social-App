import { axiosInstance } from "@/shared/api/axios";
import type { User } from "@/shared/types";
import type { LoginFormValues, RegisterFormValues } from "./authSchemas";
import type { ChangePasswordFormValues } from "./authSchemas";

export interface AuthResponse {
  message: string;
  data: { token: string; user: User };
}

export async function signIn(values: LoginFormValues): Promise<AuthResponse> {
  const { data } = await axiosInstance.post("/users/signin", values);
  return data;
}

export async function signUp(values: RegisterFormValues): Promise<AuthResponse> {
  const { data } = await axiosInstance.post("/users/signup", values);
  return data;
}

export async function changePassword(values: ChangePasswordFormValues) {
  const res = await axiosInstance.patch("/users/change-password", {
    password: values.currentPassword,
    newPassword: values.newPassword,
  });
  return res.data;
}
