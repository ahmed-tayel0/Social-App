import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { toggleBookmark } from "../postsApi";

export function useToggleBookmark() {
  const token = useAppSelector((s) => s.auth.token);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => toggleBookmark(postId),
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["posts", "feed", token] });
    },
  });
}