import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { createReply } from "../commentsApi";
import toast from "react-hot-toast";

export function useCreateReply(postId: string, commentId: string) {
  const token = useAppSelector((s) => s.auth.token);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { content?: string; image?: File }) =>
      createReply(postId, commentId, data),
    onSuccess: () => {
      toast.success("Reply posted!");
      qc.invalidateQueries({ queryKey: ["comments", "replies", postId, commentId, token] });
      qc.invalidateQueries({ queryKey: ["comments", "post", postId, token] });
      qc.invalidateQueries({ queryKey: ["posts", "single", token, postId] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
}