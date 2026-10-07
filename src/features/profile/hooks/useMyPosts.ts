import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { fetchMyPosts } from "../profileApi";

export function useMyPosts() {
  const token = useAppSelector((s) => s.auth.token);
  return useInfiniteQuery({
    queryKey: ["profile", "my-posts", token],
    enabled: !!token,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchMyPosts(pageParam as number),
    getNextPageParam: (last) => last.nextPage ?? undefined,
  });
}