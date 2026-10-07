import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { fetchUserProfile, fetchUserPosts } from "../profileApi";

export function useUserProfile(userId: string) {
  const token = useAppSelector((s) => s.auth.token);
  return useQuery({
    queryKey: ["profile", "user", userId, token],
    enabled: !!token && !!userId,
    queryFn: () => fetchUserProfile(userId),
  });
}

export function useUserPosts(userId: string) {
  const token = useAppSelector((s) => s.auth.token);
  return useInfiniteQuery({
    queryKey: ["profile", "user-posts", userId, token],
    enabled: !!token && !!userId,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchUserPosts(userId, pageParam as number),
    getNextPageParam: (last) => last.nextPage ?? undefined,
  });
}