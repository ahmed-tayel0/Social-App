import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { toggleCommentLike } from "../commentsApi";

export function useToggleCommentLike(postId: string) {
  const token = useAppSelector((s) => s.auth.token);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) => toggleCommentLike(postId, commentId),
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["comments", "post", postId, token] });
      qc.invalidateQueries({ queryKey: ["comments", "replies"] });
    },
  });
}