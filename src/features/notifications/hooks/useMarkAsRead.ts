import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { markNotificationAsRead, markAllNotificationsAsRead } from "../notificationsApi";
import toast from "react-hot-toast";

export function useMarkAsRead() {
  const token = useAppSelector((s) => s.auth.token);
  const qc = useQueryClient();

  const markOne = useMutation({
    mutationFn: markNotificationAsRead,
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["notifications", "list", token] });
      qc.invalidateQueries({ queryKey: ["notifications", "unread-count", token] });
    },
  });

  const markAll = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      toast.success("All notifications marked as read");
      qc.invalidateQueries({ queryKey: ["notifications", "list", token] });
      qc.invalidateQueries({ queryKey: ["notifications", "unread-count", token] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return { markOne, markAll };
}