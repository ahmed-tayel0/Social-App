import { Avatar } from "@/shared/components/ui/Avatar";
import { DEFAULT_PROFILE_IMAGE } from "@/shared/lib/constants";
import { timeAgo } from "@/shared/lib/utils";
import type { Comment } from "@/shared/types";
import { useState } from "react";
import ImageLightbox from "@/shared/components/ui/ImageLightbox";

interface ReplyItemProps {
  postId: string; // kept for future use / consistency
  commentId: string; // kept for future use / consistency
  reply: Comment;
}

export function ReplyItem({ reply }: ReplyItemProps) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  return (
    <div className="flex items-start gap-2 shrink-0">
      <Avatar
        src={reply.commentCreator.photo ?? DEFAULT_PROFILE_IMAGE}
        alt={reply.commentCreator.name}
        size={28}
      />
      <div className="min-w-0 flex-1">
        <div className="inline-block max-w-full rounded-2xl bg-[#f0f2f5] dark:bg-[#2d2e2f] px-2.5 py-2">
          <p className="text-[11px] font-bold text-slate-900 dark:text-[#e4e6eb]">
            {reply.commentCreator.name}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-[#b0b3b8]">
            {timeAgo(reply.createdAt)}
          </p>
          {reply.content && (
            <p className="mt-0.5 whitespace-pre-wrap text-xs text-slate-700 dark:text-[#e4e6eb]">
              {reply.content}
            </p>
          )}
          {reply.image && (
            <div className="border-y border-slate-200">
              <button
                type="button"
                onClick={() => setLightboxSrc(reply.image ?? null)}
                className="group relative block w-full cursor-pointer"
              >
                <img
                  src={reply.image}
                  alt="reply"
                  className="mt-1.5 max-h-44 rounded-md object-cover"
                />
                <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
              </button>
            </div>
          )}
        </div>
        <ImageLightbox
          isOpen={!!lightboxSrc}
          src={lightboxSrc ?? ""}
          alt="Reply image"
          onClose={() => setLightboxSrc(null)}
        />
      </div>
    </div>
  );
}