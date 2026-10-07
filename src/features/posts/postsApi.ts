import { axiosInstance } from "@/shared/api/axios";
import type { Post } from "@/shared/types";

export interface FeedResponse {
  posts: Post[];
  pagination?: { nextPage?: number; currentPage?: number };
}

export async function fetchFeed(params: {
  only: "following" | "me" | "all";
  page: number;
  limit?: number;
}): Promise<FeedResponse> {
  const res = await axiosInstance.get("/posts/feed", {
    params: { only: params.only, page: params.page, limit: params.limit ?? 20 },
  });
  return {
    posts: res.data.data.posts ?? [],
    pagination: res.data.meta?.pagination,
  };
}

export async function fetchBookmarks(params: { page: number; limit?: number }) {
  const res = await axiosInstance.get("/users/bookmarks", {
    params: { page: params.page, limit: params.limit ?? 20 },
  });
  return {
    posts: res.data.data.bookmarks ?? [],
    pagination: res.data.meta?.pagination,
  };
}

export async function toggleLike(postId: string) {
  const res = await axiosInstance.put(`/posts/${postId}/like`);
  return res.data;
}

export async function toggleBookmark(postId: string) {
  const res = await axiosInstance.put(`/posts/${postId}/bookmark`);
  return res.data;
}

export async function sharePost(postId: string, body?: string) {
  const res = await axiosInstance.post(`/posts/${postId}/share`, body ? { body } : undefined);
  return res.data;
}

export async function createPost(formData: FormData) {
  const res = await axiosInstance.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updatePost(postId: string, body: { body?: string; privacy?: string }) {
  const res = await axiosInstance.put(`/posts/${postId}`, body);
  return res.data;
}

export async function deletePost(postId: string) {
  const res = await axiosInstance.delete(`/posts/${postId}`);
  return res.data;
}

export async function fetchPostById(postId: string): Promise<Post> {
  const res = await axiosInstance.get(`/posts/${postId}`);
  return res.data.data.post;
}