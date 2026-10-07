import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { fetchNotifications } from "../notificationsApi";

export function useNotifications() {
  const token = useAppSelector((s) => s.auth.token);
  return useInfiniteQuery({
    queryKey: ["notifications", "list", token],
    enabled: !!token,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchNotifications(pageParam as number, 30),
    getNextPageParam: (last) => last.nextPage ?? undefined,
  });
}