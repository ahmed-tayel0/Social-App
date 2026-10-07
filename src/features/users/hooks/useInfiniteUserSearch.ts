import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { searchUsers } from "../usersApi";

export function useInfiniteUserSearch(q: string, limit = 20) {
  const token = useAppSelector((s) => s.auth.token);
  const trimmed = q.trim();
  return useInfiniteQuery({
    queryKey: ["users", "search", "infinite", token, trimmed, limit],
    enabled: !!token && trimmed.length >= 2,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      searchUsers({ q: trimmed, page: pageParam as number, limit }),
    getNextPageParam: (last) => last.nextPage ?? undefined,
  });
}
