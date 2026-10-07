import { axiosInstance } from "@/shared/api/axios";
import type { Comment } from "@/shared/types";

export interface CommentsResponse {
  comments: Comment[];
  nextPage?: number;
  hasMore: boolean;
}

export async function fetchComments(
  postId: string,
  page: number = 1,
  limit: number = 5
): Promise<CommentsResponse> {
  const res = await axiosInstance.get(`/posts/${postId}/comments`, {
    params: { page, limit },
  });
  const pagination = res.data.meta?.pagination;
  return {
    comments: res.data.data.comments ?? [],
    nextPage: pagination?.nextPage,
    hasMore: !!pagination?.nextPage,
  };
}

export async function createComment(
  postId: string,
  data: { content?: string; image?: File }
): Promise<Comment> {
  const fd = new FormData();
  if (data.content) fd.set("content", data.content);
  if (data.image) fd.set("image", data.image);
  const res = await axiosInstance.post(`/posts/${postId}/comments`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data.comment;
}

export async function updateComment(
  postId: string,
  commentId: string,
  content: string
): Promise<Comment> {
  const res = await axiosInstance.put(
    `/posts/${postId}/comments/${commentId}`,
    { content }
  );
  return res.data.data.comment;
}

export async function deleteComment(postId: string, commentId: string) {
  await axiosInstance.delete(`/posts/${postId}/comments/${commentId}`);
}

export async function toggleCommentLike(postId: string, commentId: string) {
  const res = await axiosInstance.put(
    `/posts/${postId}/comments/${commentId}/like`
  );
  return res.data;
}

export async function fetchReplies(
  postId: string,
  commentId: string,
  page: number = 1,
  limit: number = 10
) {
  const res = await axiosInstance.get(
    `/posts/${postId}/comments/${commentId}/replies`,
    { params: { page, limit } }
  );
  return {
    replies: res.data.data.replies ?? [],
    nextPage: res.data.meta?.pagination?.nextPage,
  };
}

export async function createReply(
  postId: string,
  commentId: string,
  data: { content?: string; image?: File }
): Promise<Comment> {
  const fd = new FormData();
  if (data.content) fd.set("content", data.content);
  if (data.image) fd.set("image", data.image);
  const res = await axiosInstance.post(
    `/posts/${postId}/comments/${commentId}/replies`,
    fd,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data.data.reply ?? res.data.data.comment;
}