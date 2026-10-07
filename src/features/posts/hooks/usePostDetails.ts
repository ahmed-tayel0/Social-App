import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { fetchPostById } from "../postsApi";

export function usePostDetails(postId: string) {
  const token = useAppSelector((s) => s.auth.token);
  return useQuery({
    queryKey: ["posts", "single", token, postId],
    queryFn: () => fetchPostById(postId),
    enabled: !!token && !!postId,
  });
}