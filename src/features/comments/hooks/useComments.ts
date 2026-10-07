import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { fetchComments } from "../commentsApi";

export function useComments(postId: string) {
  const token = useAppSelector((s) => s.auth.token);
  return useInfiniteQuery({
    queryKey: ["comments", "post", postId, token],
    enabled: !!token && !!postId,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchComments(postId, pageParam as number, 5),
    getNextPageParam: (last) => last.nextPage ?? undefined,
  });
}