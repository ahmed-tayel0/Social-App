import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { fetchSuggestions } from "../usersApi";

export function useInfiniteSuggestions(limit = 20) {
  const token = useAppSelector((s) => s.auth.token);
  return useInfiniteQuery({
    queryKey: ["users", "suggestions", "infinite", token, limit],
    enabled: !!token,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchSuggestions({ page: pageParam as number, limit }),
    getNextPageParam: (last) => last.nextPage ?? undefined,
  });
}
