import { axiosInstance } from "./axios";
import type { ApiResponse, User } from "@/shared/types";

export async function fetchMyProfile(): Promise<User> {
  const res = await axiosInstance.get<ApiResponse<{ user: User }>>("/users/profile-data", {
    params: { _t: Date.now() },
  });
  return res.data.data.user;
}

export async function fetchSuggestions(page = 1, limit = 20) {
  const res = await axiosInstance.get("/users/suggestions", { params: { page, limit } });
  return res.data;
}

export async function searchUsers(q: string, page = 1, limit = 10) {
  const res = await axiosInstance.get("/users/search", { params: { q, page, limit } });
  return res.data;
}

export async function followUser(userId: string) {
  const res = await axiosInstance.put(`/users/${userId}/follow`);
  return res.data;
}