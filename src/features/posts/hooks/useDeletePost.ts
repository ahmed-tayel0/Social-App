import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { deletePost } from "../postsApi";
import toast from "react-hot-toast";

export function useDeletePost() {
  const token = useAppSelector((s) => s.auth.token);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      toast.success("Post deleted!");
      qc.invalidateQueries({ queryKey: ["posts", "feed", token] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
}