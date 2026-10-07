import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { searchUsers } from "../usersApi";

export function useUserSearch(q: string, limit = 10) {
  const token = useAppSelector((s) => s.auth.token);
  const trimmed = q.trim();
  return useQuery({
    queryKey: ["users", "search", token, trimmed, limit],
    queryFn: () => searchUsers({ q: trimmed, limit }),
    enabled: !!token && trimmed.length >= 2,
    staleTime: 30_000,
  });
}