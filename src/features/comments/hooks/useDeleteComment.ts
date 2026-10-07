import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { deleteComment } from "../commentsApi";
import toast from "react-hot-toast";

export function useDeleteComment(postId: string, commentId: string) {
  const token = useAppSelector((s) => s.auth.token);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => deleteComment(postId, commentId),
    onSuccess: () => {
      toast.success("Comment deleted!");
      qc.invalidateQueries({ queryKey: ["comments", "post", postId, token] });
      qc.invalidateQueries({ queryKey: ["comments", "replies"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
}