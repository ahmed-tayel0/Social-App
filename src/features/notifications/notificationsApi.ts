import { axiosInstance } from "@/shared/api/axios";
import type { Notification } from "@/shared/types";

export interface NotificationsResponse {
  notifications: Notification[];
  nextPage?: number;
  hasMore: boolean;
}

export async function fetchNotifications(
  page = 1,
  limit = 30
): Promise<NotificationsResponse> {
  const res = await axiosInstance.get("/notifications", {
    params: { page, limit },
  });
  const pagination = res.data.meta?.pagination;
  return {
    notifications: res.data.data.notifications ?? [],
    nextPage: pagination?.nextPage,
    hasMore: !!pagination?.nextPage,
  };
}

export async function fetchUnreadCount(): Promise<number> {
  const res = await axiosInstance.get("/notifications/unread-count");
  return res.data.data.unreadCount ?? 0;
}

export async function markNotificationAsRead(notificationId: string) {
  const res = await axiosInstance.patch(
    `/notifications/${notificationId}/read`
  );
  return res.data;
}

export async function markAllNotificationsAsRead() {
  const res = await axiosInstance.patch("/notifications/read-all");
  return res.data;
}