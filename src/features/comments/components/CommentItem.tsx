import { useAppSelector } from "@/app/hooks";
import { useEffect, useState, useRef } from "react";
import { Avatar } from "@/shared/components/ui/Avatar";
import { DEFAULT_PROFILE_IMAGE } from "@/shared/lib/constants";
import { timeAgo } from "@/shared/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { ConfirmDialog } from "@/shared/components/ui/ConfirmDialog";
import { useToggleCommentLike } from "@/features/comments/hooks/useToggleCommentLike";
import { useReplies } from "@/features/comments/hooks/useReplies";
import { useUpdateComment } from "@/features/comments/hooks/useUpdateComment";
import { useDeleteComment } from "@/features/comments/hooks/useDeleteComment";
import { useCreateReply } from "@/features/comments/hooks/useCreateReply";
import type { Comment } from "@/shared/types";
import { ReplyItem } from "./ReplyItem";
import { ReplyInput } from "./ReplyInput";
import ImageLightbox from "@/shared/components/ui/ImageLightbox";

interface CommentItemProps {
  postId: string;
  comment: Comment;
}

export function CommentItem({ postId, comment }: CommentItemProps) {
  const currentUserId = useAppSelector((s) => s.auth.user?._id);
  const isAuthor = currentUserId === comment.commentCreator._id;
  const isLiked = !!currentUserId && (comment.likes ?? []).includes(currentUserId);
  const likeCount = comment.likesCount ?? comment.likes?.length ?? 0;
  const repliesCount = comment.repliesCount ?? 0;

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content ?? "");
  const [showReplies, setShowReplies] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { mutate: toggleLike } = useToggleCommentLike(postId);
  const {
    data: repliesData,
    isLoading: isLoadingReplies,
    refetch: refetchReplies,
  } = useReplies(postId, comment._id, showReplies);
  const { mutate: updateComment } = useUpdateComment(postId, comment._id);
  const { mutate: deleteComment } = useDeleteComment(postId, comment._id);
  const { mutateAsync: createReply } = useCreateReply(postId, comment._id);

  const handleLike = () => {
    toggleLike(comment._id);
  };

  const handleUpdate = async () => {
    if (editContent.trim()) {
      updateComment(editContent);
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteComment();
    setShowDeleteConfirm(false);
  };

  const handleReplySubmit = async (content: string) => {
    if (!content.trim()) return;
    await createReply({ content });
    refetchReplies();
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="flex items-start gap-2">
      <div className="shrink-0">
        <Avatar
          src={comment.commentCreator.photo ?? DEFAULT_PROFILE_IMAGE}
          alt={comment.commentCreator.name}
          size={32}
        />
      </div>
      <div className="flex-1 min-w-0">
        {/* Bubble or edit mode */}
        {isEditing ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-[#2d2e2f] dark:bg-[#242526]">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full min-h-15 resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-500 focus:border-[#1877f2] focus:bg-white focus:ring-2 focus:ring-[#1877f2]/20 dark:border-[#2d2e2f] dark:bg-[#18191a] dark:text-[#e4e6eb] dark:placeholder:text-[#b0b3b8] dark:focus:border-[#5c9dff] dark:focus:bg-[#2d2e2f]"
              placeholder="Edit your comment..."
            />
            <div className="mt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditContent(comment.content ?? "");
                }}
                className="rounded-md px-3 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 dark:text-[#b0b3b8] dark:hover:bg-[#3a3b3c]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                className="rounded-md bg-[#1877f2] px-3 py-1 text-xs font-bold text-white transition hover:bg-[#166fe5]"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="inline-block max-w-full rounded-2xl bg-[#f0f2f5] dark:bg-[#2d2e2f] px-3 py-2">
            <p className="text-xs font-bold text-slate-900 dark:text-[#e4e6eb]">
              {comment.commentCreator.name}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-[#b0b3b8]">
              @{comment.commentCreator.username} · {timeAgo(comment.createdAt)}
            </p>
            {comment.content && (
              <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800 dark:text-[#e4e6eb]">
                {comment.content}
              </p>
            )}
            {comment.image && (
              <div className="border-y border-slate-200">
                <button
                  type="button"
                  onClick={() => setLightboxSrc(comment.image ?? null)}
                  className="group relative block w-full cursor-pointer"
                >
                  <img
                    src={comment.image}
                    alt="comment"
                    className="mt-2 max-h-52 rounded-lg object-cover"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Actions row */}
        <div className="mt-1.5 flex items-center gap-3 px-1 text-xs font-semibold text-slate-500 dark:text-[#b0b3b8]">
          <span>{timeAgo(comment.createdAt)}</span>
          <button
            type="button"
            onClick={handleLike}
            className={isLiked ? "text-[#1877f2] hover:underline dark:text-[#5c9dff]" : "hover:underline"}
          >
            Like ({likeCount})
          </button>
          <button
            type="button"
            onClick={() => setShowReplies((prev) => !prev)}
            className="hover:underline"
          >
            {showReplies ? "Hide replies" : `Reply${repliesCount > 0 ? ` (${repliesCount})` : ""}`}
          </button>

          {isAuthor && (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setShowMenu((v) => !v)}
                className="inline-flex h-6 w-6 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-[#b0b3b8] dark:hover:bg-[#2d2e2f] dark:hover:text-white"
                aria-label="Comment options"
              >
                <MoreHorizontal size={14} />
              </button>

              {showMenu && (
                <div className="absolute left-0 top-full z-30 mt-1 w-32 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-[#2d2e2f] dark:bg-[#242526]">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(true);
                      setShowMenu(false);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:text-[#e4e6eb] dark:hover:bg-[#3a3b3c]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowDeleteConfirm(true);
                      setShowMenu(false);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-[#3a3b3c]"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Replies section */}
        {showReplies && (
          <div className="relative mt-2 ml-5 pl-4">
            <span className="absolute bottom-10 left-0 top-1 w-px rounded-full bg-slate-300 dark:bg-[#3a3b3c]" />
            {isLoadingReplies ? (
              <p className="text-xs text-slate-500">Loading replies...</p>
            ) : (
              <>
                {repliesData && repliesData.replies?.length > 0 ? (
                  repliesData.replies.map((reply: Comment) => (
                    <ReplyItem
                      key={reply._id}
                      postId={postId}
                      commentId={comment._id}
                      reply={reply}
                    />
                  ))
                ) : (
                  <p className="text-xs text-slate-500">No replies yet.</p>
                )}

                {/* Reply Input */}
                <div className="mt-2">
                  <ReplyInput onCreateReply={handleReplySubmit} />
                </div>
              </>
            )}
          </div>
        )}

        {/* Delete confirmation */}
        {showDeleteConfirm && (
          <ConfirmDialog
            isOpen={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            title="Delete comment"
            description="Are you sure you want to delete this comment? This action cannot be undone."
            confirmLabel="Delete"
            cancelLabel="Cancel"
            confirmPendingLabel="Deleting..."
            onConfirm={handleDelete}
          />
        )}
      </div>
      <ImageLightbox
        isOpen={!!lightboxSrc}
        src={lightboxSrc ?? ""}
        alt="Comment image"
        onClose={() => setLightboxSrc(null)}
      />
    </div>
  );
}
