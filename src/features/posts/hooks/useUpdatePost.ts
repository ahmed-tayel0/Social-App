import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { updatePost } from "../postsApi";
import toast from "react-hot-toast";

export function useUpdatePost() {
  const token = useAppSelector((s) => s.auth.token);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { postId: string; body?: string; privacy?: string }) => {
      return updatePost(data.postId, { body: data.body, privacy: data.privacy });
    },
    onSuccess: () => {
      toast.success("Post updated!");
      qc.invalidateQueries({ queryKey: ["posts", "feed", token] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
}