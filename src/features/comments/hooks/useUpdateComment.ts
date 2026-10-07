import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { updateComment } from "../commentsApi";
import toast from "react-hot-toast";

export function useUpdateComment(postId: string, commentId: string) {
  const token = useAppSelector((s) => s.auth.token);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => updateComment(postId, commentId, content),
    onSuccess: () => {
      toast.success("Comment updated!");
      qc.invalidateQueries({ queryKey: ["comments", "post", postId, token] });
      qc.invalidateQueries({ queryKey: ["comments", "replies"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
}