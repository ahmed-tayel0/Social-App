import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser } from "../usersApi";
import toast from "react-hot-toast";

export function useFollowUser() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => followUser(userId),
    onMutate: async (userId) => {
      // Optional optimistic UI — handled at component level for simplicity
      return { userId };
    },
    onSuccess: () => {
      toast.success("Followed successfully");
      qc.invalidateQueries({ queryKey: ["users", "suggestions"] });
      qc.invalidateQueries({ queryKey: ["users", "search"] });
      qc.invalidateQueries({ queryKey: ["profile", "data"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
}