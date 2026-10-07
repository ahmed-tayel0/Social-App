import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { createPost } from "../postsApi";
import toast from "react-hot-toast";

export function useCreatePost() {
  const token = useAppSelector((s) => s.auth.token);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { body: string; image?: File; privacy: string }) => {
      const fd = new FormData();
      if (data.body) fd.set("body", data.body);
      if (data.image) fd.set("image", data.image);
      fd.set("privacy", data.privacy);
      return createPost(fd);
    },
    onSuccess: () => {
      toast.success("Post published!");
      qc.invalidateQueries({ queryKey: ["posts", "feed", token] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
}