import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { fetchUnreadCount } from "../notificationsApi";

export function useUnreadCount() {
  const token = useAppSelector((s) => s.auth.token);
  return useQuery({
    queryKey: ["notifications", "unread-count", token],
    enabled: !!token,
    queryFn: fetchUnreadCount,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 5_000,
  });
}