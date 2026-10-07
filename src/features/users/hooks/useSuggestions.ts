import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { fetchSuggestions } from "../usersApi";

export function useSuggestions(limit = 5) {
  const token = useAppSelector((s) => s.auth.token);
  return useQuery({
    queryKey: ["users", "suggestions", token, limit],
    queryFn: () => fetchSuggestions({ page: 1, limit }),
    enabled: !!token,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}