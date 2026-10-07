import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { toggleLike } from "../postsApi";

export function useToggleLike() {
  const token = useAppSelector((s) => s.auth.token);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => toggleLike(postId),
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["posts", "feed", token] });
    },
  });
}