import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { createComment } from "../commentsApi";
import toast from "react-hot-toast";

export function useCreateComment(postId: string) {
  const token = useAppSelector((s) => s.auth.token);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { content?: string; image?: File }) =>
      createComment(postId, data),
    onSuccess: () => {
      toast.success("Comment posted!");
      qc.invalidateQueries({ queryKey: ["comments", "post", postId, token] });
      qc.invalidateQueries({ queryKey: ["posts", "single", token, postId] });
      qc.invalidateQueries({ queryKey: ["posts", "feed", token] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
}