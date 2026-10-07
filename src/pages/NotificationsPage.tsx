import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCheck, Bell } from "lucide-react";
import {
  useNotifications,
  useMarkAsRead,
  useUnreadCount,
} from "@/features/notifications/hooks";
import {
  NotificationItem,
  NotificationsSkeleton,
} from "@/features/notifications/components";
import { EmptyState } from "@/shared/components/ui/EmptyState";
import type { Notification } from "@/shared/types";

export default function NotificationsPage() {
  const { data, isFetching, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useNotifications();
  const { markOne, markAll } = useMarkAsRead();
  const { data: unreadCountData } = useUnreadCount();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const notifications = data?.pages.flatMap((page) => page.notifications) ?? [];
  const unreadFromList = notifications.filter((n) => !n.isRead).length;
  const unreadCount = unreadCountData ?? unreadFromList;

  const filteredNotifications =
    filter === "all" ? notifications : notifications.filter((n) => !n.isRead);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  const handleMarkAllAsRead = () => markAll.mutate();
  const handleMarkAsRead = (id: string) => markOne.mutate(id);

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.entity) return;

    if (notification.entityType === "post") {
      const post = notification.entity as { _id: string };
      navigate(`/posts/${post._id}`);
    } else if (notification.entityType === "comment") {
      const comment = notification.entity as { post?: string | { _id: string } };
      const postRef = comment.post;
      if (postRef && typeof postRef === "object" && "_id" in postRef) {
        navigate(`/posts/${postRef._id}`);
      } else if (typeof postRef === "string") {
        navigate(`/posts/${postRef}`);
      }
    }
  };

  const handleProfileClick = (actorId: string) => {
    navigate(`/profile/${actorId}`);
  };

  if (isError) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
        Error loading notifications.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl dark:border-[#2d2e2f] dark:bg-[#18191a]">
      {/* Header */}
      <div className="border-b border-slate-200 p-4 sm:p-5 dark:border-[#2d2e2f]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-[#e4e6eb] sm:text-2xl">
              Notifications
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-[#b0b3b8]">
              Realtime updates for likes, comments, shares, and follows.
            </p>
          </div>
          <button
            onClick={handleMarkAllAsRead}
            disabled={markAll.isPending || unreadCount === 0}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 dark:border-[#2d2e2f] dark:text-[#b0b3b8] dark:hover:bg-[#2d2e2f]"
            title="Mark all as read"
          >
            <CheckCheck className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5 dark:border-[#2d2e2f] dark:bg-[#242526]">
          <button
            onClick={() => setFilter("all")}
            className={`flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-sm font-bold transition ${
              filter === "all"
                ? "bg-[#1877f2] text-white dark:bg-[#3a3b3c] dark:text-[#5c9dff]"
                : "text-slate-700 hover:bg-slate-200 dark:text-[#b0b3b8] dark:hover:bg-[#3a3b3c]"
            }`}
          >
            All
            {notifications.length > 0 && (
              <span
                className={`ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-black ${
                  filter === "all" ? "bg-white text-[#1877f2]" : "bg-white text-slate-900"
                }`}
              >
                {notifications.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-sm font-bold transition ${
              filter === "unread"
                ? "bg-[#1877f2] text-white dark:bg-[#3a3b3c] dark:text-[#5c9dff]"
                : "text-slate-700 hover:bg-slate-200 dark:text-[#b0b3b8] dark:hover:bg-[#3a3b3c]"
            }`}
          >
            Unread
            {unreadCount > 0 && (
              <span
                className={`ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-black ${
                  filter === "unread"
                    ? "bg-white text-[#1877f2]"
                    : "bg-white text-slate-900"
                }`}
              >
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-2 p-3 sm:p-4">
        {isFetching && notifications.length === 0 && <NotificationsSkeleton />}

        {!isFetching && notifications.length === 0 && (
          <EmptyState
            icon={<Bell className="h-6 w-6" />}
            title="No notifications yet."
            description="You'll see notifications here when you get likes, comments, shares, or follows."
          />
        )}

        {!isFetching &&
          filter === "unread" &&
          unreadCount === 0 &&
          notifications.length > 0 && (
            <EmptyState
              icon={<Bell className="h-6 w-6" />}
              title="No unread notifications yet."
              description="All caught up!"
            />
          )}

        {filteredNotifications.length > 0 &&
          filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onRead={(id) => handleMarkAsRead(id)}
              onNavigate={() => handleNotificationClick(notification)}
              onNavigateProfile={() => handleProfileClick(notification.actor._id)}
              isMarkingRead={markOne.isPending}
            />
          ))}

        {hasNextPage && (
          <button
            onClick={loadMore}
            disabled={isFetchingNextPage}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 dark:border-[#2d2e2f] dark:bg-[#242526] dark:text-[#b0b3b8] dark:hover:bg-[#3a3b3c]"
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
}