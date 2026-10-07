import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { fetchFeed, fetchBookmarks } from "../postsApi";

export type FeedFilter = "following" | "me" | "all" | "saved";

export function useFeed(filter: FeedFilter) {
  const token = useAppSelector((s) => s.auth.token);
  return useInfiniteQuery({
    queryKey: ["posts", "feed", token, filter],
    enabled: !!token,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      if (filter === "saved") return fetchBookmarks({ page: pageParam as number });
      return fetchFeed({ only: filter, page: pageParam as number });
    },
    getNextPageParam: (last) => last.pagination?.nextPage ?? undefined,
  });
}