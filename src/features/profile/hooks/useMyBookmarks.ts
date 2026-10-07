import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { fetchMyBookmarks } from "../profileApi";

export function useMyBookmarks() {
  const token = useAppSelector((s) => s.auth.token);
  return useInfiniteQuery({
    queryKey: ["profile", "my-bookmarks", token],
    enabled: !!token,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchMyBookmarks(pageParam as number),
    getNextPageParam: (last) => last.nextPage ?? undefined,
  });
}