import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { fetchReplies } from "../commentsApi";

export function useReplies(postId: string, commentId: string, enabled: boolean) {
  const token = useAppSelector((s) => s.auth.token);
  return useQuery({
    queryKey: ["comments", "replies", postId, commentId, token],
    enabled: !!token && enabled,
    queryFn: () => fetchReplies(postId, commentId, 1, 10),
  });
}