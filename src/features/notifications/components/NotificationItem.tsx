import { Avatar } from "@/shared/components/ui/Avatar";
import { Bell, Heart, MessageCircle, Repeat2, UserPlus } from "lucide-react";
import { timeAgo } from "@/shared/lib/utils";
import type { Notification } from "@/shared/types";

interface Props {
  notification: Notification;
  onRead: (id: string) => void;
  onNavigate: () => void;
  onNavigateProfile: () => void;
  isMarkingRead?: boolean;
}

interface TypeConfig {
  Icon: typeof Heart;
  bgClass: string;
  textClass: string;
  text: string;
}

export default function NotificationItem({
  notification,
  onRead,
  onNavigate,
  onNavigateProfile,
  isMarkingRead = false,
}: Props) {
  const getTypeConfig = (): TypeConfig => {
    switch (notification.type) {
      case "like_post":
      case "like_comment":
        return {
          Icon: Heart,
          bgClass: "bg-rose-100 dark:bg-[#3a1f26]",
          textClass: "text-rose-600",
          text:
            notification.type === "like_post" ? "liked your post" : "liked your comment",
        };
      case "comment_post":
      case "reply_comment":
        return {
          Icon: MessageCircle,
          bgClass: "bg-[#dbeafe] dark:bg-[#263951]",
          textClass: "text-[#1877f2]",
          text:
            notification.type === "comment_post"
              ? "commented on your post"
              : "replied to your comment",
        };
      case "share_post":
        return {
          Icon: Repeat2,
          bgClass: "bg-emerald-100 dark:bg-[#1a3a2a]",
          textClass: "text-emerald-600",
          text: "shared your post",
        };
      case "follow_user":
        return {
          Icon: UserPlus,
          bgClass: "bg-violet-100 dark:bg-[#2d1f4a]",
          textClass: "text-violet-600",
          text: "started following you",
        };
      default:
        return {
          Icon: Bell,
          bgClass: "bg-slate-100 dark:bg-[#2d2e2f]",
          textClass: "text-slate-500",
          text: notification.type.replace(/_/g, " "),
        };
    }
  };

  const { Icon, bgClass, textClass, text } = getTypeConfig();

  let snippet = "";
  if (notification.entityType === "post") {
    const post = notification.entity as { body?: string };
    if (post?.body) snippet = post.body;
  } else if (notification.entityType === "comment") {
    const comment = notification.entity as { content?: string };
    if (comment?.content) snippet = comment.content;
  }
  if (snippet.length > 100) snippet = snippet.slice(0, 100) + "...";

  return (
    <article
      onClick={onNavigate}
      className={`flex gap-3 rounded-xl border p-3 transition sm:rounded-2xl sm:p-4 ${
        notification.isRead
          ? "cursor-pointer border-slate-200 bg-white hover:bg-slate-50 dark:border-[#2d2e2f] dark:bg-[#18191a] dark:hover:bg-[#242526]"
          : "cursor-pointer border-[#dbeafe] bg-[#edf4ff] dark:border-[#263951] dark:bg-[#1a2a3a]"
      }`}
    >
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNavigateProfile();
          }}
        >
          <Avatar
            src={notification.actor.photo}
            alt={notification.actor.name}
            size={40}
          />
        </button>
        <span
          className={`absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-white ${bgClass} ${textClass}`}
        >
          <Icon size={12} />
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm leading-6 text-slate-800 dark:text-[#e4e6eb]">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigateProfile();
            }}
            className="font-extrabold hover:text-[#1877f2] hover:underline"
          >
            {notification.actor.name}
          </button>{" "}
          {text}
        </p>
        {snippet ? (
          <p className="mt-0.5 line-clamp-1 text-sm text-slate-600 dark:text-[#b0b3b8]">{snippet}</p>
        ) : null}
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <span className="text-xs font-semibold text-slate-500 dark:text-[#b0b3b8]">
          {timeAgo(notification.createdAt)}
        </span>
        {!notification.isRead ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRead(notification._id);
            }}
            disabled={isMarkingRead}
            className="rounded-md bg-white px-2.5 py-1 text-[11px] font-bold text-[#1877f2] ring-1 ring-[#dbeafe] transition hover:bg-[#e7f3ff] disabled:opacity-50 dark:text-[#5c9dff] dark:ring-[#2d2e2f] dark:bg-[#242526] dark:hover:bg-[#2d2e2f]"
          >
            Mark as read
          </button>
        ) : null}
      </div>
    </article>
  );
}
