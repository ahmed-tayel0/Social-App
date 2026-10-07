import { axiosInstance } from "@/shared/api/axios";
import type { User } from "@/shared/types";

export interface SuggestionsResponse {
  users: User[];
  nextPage?: number;
  hasMore: boolean;
}

export async function fetchSuggestions(params: {
  page?: number;
  limit?: number;
  q?: string;
}): Promise<SuggestionsResponse> {
  const { page = 1, limit = 5, q } = params;
  const res = await axiosInstance.get("/users/suggestions", {
    params: { page, limit, ...(q ? { q } : {}) },
  });
  const pagination = res.data.meta?.pagination;
  return {
    users: res.data.data.suggestions ?? res.data.data.users ?? [],
    nextPage: pagination?.nextPage,
    hasMore: !!pagination?.nextPage,
  };
}

export async function searchUsers(params: {
  q: string;
  page?: number;
  limit?: number;
}) {
  const { q, page = 1, limit = 10 } = params;
  const res = await axiosInstance.get("/users/search", {
    params: { q, page, limit },
  });
  return {
    users: res.data.data.users ?? [],
    nextPage: res.data.meta?.pagination?.nextPage,
    hasMore: !!res.data.meta?.pagination?.nextPage,
  };
}

export async function followUser(userId: string) {
  const res = await axiosInstance.put(`/users/${userId}/follow`);
  return res.data;
}