import { axiosInstance } from "@/shared/api/axios";
import type { User } from "@/shared/types";

export interface OtherUserProfile {
  user: User;
  isFollowing: boolean;
}

export async function fetchMyPosts(page = 1, limit = 20) {
  const res = await axiosInstance.get("/posts/feed", {
    params: { only: "me", page, limit },
  });
  return {
    posts: res.data.data.posts ?? [],
    nextPage: res.data.meta?.pagination?.nextPage,
  };
}

export async function fetchMyBookmarks(page = 1, limit = 20) {
  const res = await axiosInstance.get("/users/bookmarks", {
    params: { page, limit },
  });
  return {
    posts: res.data.data.bookmarks ?? [],
    nextPage: res.data.meta?.pagination?.nextPage,
  };
}

export async function fetchUserProfile(userId: string): Promise<OtherUserProfile> {
  const res = await axiosInstance.get(`/users/${userId}/profile`);
  return {
    user: res.data.data.user,
    isFollowing: res.data.data.isFollowing ?? false,
  };
}

export async function fetchUserPosts(userId: string, page = 1, limit = 20) {
  const res = await axiosInstance.get(`/users/${userId}/posts`, {
    params: { page, limit },
  });
  return {
    posts: res.data.data.posts ?? [],
    nextPage: res.data.meta?.pagination?.nextPage,
  };
}

export async function followUser(userId: string) {
  const res = await axiosInstance.put(`/users/${userId}/follow`);
  return res.data;
}

export async function uploadProfilePhoto(file: File, privacy: string) {
  const fd = new FormData();
  fd.set("photo", file);
  fd.set("privacy", privacy);
  const res = await axiosInstance.put("/users/upload-photo", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function uploadCoverPhoto(file: File, privacy: string) {
  const fd = new FormData();
  fd.set("cover", file);
  fd.set("privacy", privacy);
  const res = await axiosInstance.put("/users/upload-cover", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function removeCoverPhoto() {
  const res = await axiosInstance.delete("/users/cover");
  return res.data;
}