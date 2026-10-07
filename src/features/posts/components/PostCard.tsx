import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Bookmark,
  Earth,
  Users,
  Lock,
  ExternalLink,
} from "lucide-react";
import { useAppSelector } from "@/app/hooks";
import { Avatar } from "@/shared/components/ui/Avatar";
import { ConfirmDialog } from "@/shared/components/ui/ConfirmDialog";
import { useDeletePost } from "@/features/posts/hooks";
import { timeAgo } from "@/shared/lib/utils";
import { DEFAULT_PROFILE_IMAGE } from "@/shared/lib/constants";
import { PostMenu } from "./PostMenu";
import { EditPostModal } from "./EditPostModal";
import type { Post } from "@/shared/types";
import SharePostModal from "./SharePostModal";
import ImageLightbox from "@/shared/components/ui/ImageLightbox";

interface PostCardProps {
  post: Post;
  onLike: (id: string) => void;
  onBookmark: (id: string) => void;
  onShare: (id: string) => void;
  hideTopComment?: boolean;
  hideViewDetails?: boolean;
}

interface PostCardState {
  isLiked: boolean;
  likeCount: number;
  isBookmarked: boolean;
}

type PostCardAction =
  | { type: "UPDATE"; payload: PostCardState }
  | { type: "LIKE_TOGGLE" }
  | { type: "BOOKMARK_TOGGLE" };

export default function PostCard({
  post,
  onLike,
  onBookmark,
  onShare,
  hideTopComment = false,
  hideViewDetails = false,
}: PostCardProps) {
  const navigate = useNavigate();
  const currentUserId = useAppSelector((s) => s.auth.user?._id);
  const isAuthor = currentUserId === post.user._id;

  // Compute initial state values
  const initIsLiked = currentUserId ? (post.likes ?? []).includes(currentUserId) : false;
  const initLikeCount = post.likesCount ?? post.likes?.length ?? 0;
  const initIsBookmarked = !!post.bookmarked;

  // Reducer for post interaction state
  const reducer = (state: PostCardState, action: PostCardAction): PostCardState => {
    switch (action.type) {
      case "UPDATE":
        return action.payload;
      case "LIKE_TOGGLE":
        return {
          ...state,
          isLiked: !state.isLiked,
          likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        };
      case "BOOKMARK_TOGGLE":
        return {
          ...state,
          isBookmarked: !state.isBookmarked,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    isLiked: initIsLiked,
    likeCount: initLikeCount,
    isBookmarked: initIsBookmarked,
  });

  const { isLiked, likeCount, isBookmarked } = state;

  const [showMenu, setShowMenu] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { mutateAsync: deletePost } = useDeletePost();
  const [showShareModal, setShowShareModal] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUserId) return;
    const newIsLiked = (post.likes ?? []).includes(currentUserId);
    const newLikeCount = post.likesCount ?? post.likes?.length ?? 0;
    const newIsBookmarked = !!post.bookmarked;
    dispatch({
      type: "UPDATE",
      payload: {
        isLiked: newIsLiked,
        likeCount: newLikeCount,
        isBookmarked: newIsBookmarked,
      },
    });
  }, [post._id, post.likes, post.likesCount, post.bookmarked, currentUserId]);

  const handleLike = () => {
    dispatch({ type: "LIKE_TOGGLE" });
    onLike(post._id);
  };

  const handleBookmark = () => {
    dispatch({ type: "BOOKMARK_TOGGLE" });
    onBookmark(post._id);
  };

  const handleDelete = async () => {
    try {
      await deletePost(post._id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-[#2d2e2f] dark:bg-[#18191a] shadow-sm">
        <div className="p-4 flex items-center gap-3">
          <Link to={`/profile/${post.user._id}`}>
            <Avatar
              src={post.user.photo ?? DEFAULT_PROFILE_IMAGE}
              alt={post.user.name}
              size={40}
            />
          </Link>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <Link to={`/profile/${post.user._id}`} className="hover:underline">
                <span className="font-semibold text-slate-900 dark:text-[#e4e6eb]">
                  {post.user.name}
                </span>
              </Link>
              <Link to={`/profile/${post.user._id}`} className="hover:underline">
                <span className="text-xs text-slate-500 dark:text-[#b0b3b8]">
                  @{post.user.username}
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-[#b0b3b8]">
              <span>{timeAgo(post.createdAt)}</span>
              <span>·</span>
              {post.privacy === "public" && (
                <>
                  <Earth className="h-3 w-3" /> Public
                </>
              )}
              {post.privacy === "following" && (
                <>
                  <Users className="h-3 w-3" /> Followers
                </>
              )}
              {post.privacy === "only_me" && (
                <>
                  <Lock className="h-3 w-3" /> Only me
                </>
              )}
            </div>
          </div>
          {isAuthor && (
            <div className="relative">
              <button
                type="button"
                aria-label="Post options"
                onClick={() => setShowMenu(true)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 dark:text-[#b0b3b8] transition hover:bg-slate-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>

              {showMenu && (
                <PostMenu
                  onEdit={() => {
                    setShowMenu(false);
                    setShowEdit(true);
                  }}
                  onDelete={() => {
                    setShowMenu(false);
                    setShowDeleteConfirm(true);
                  }}
                  onClose={() => setShowMenu(false)}
                />
              )}
            </div>
          )}
        </div>

        <div className="px-4 pb-3 whitespace-pre-wrap text-[15px] leading-relaxed text-slate-800 dark:text-[#e4e6eb]">
          {post.body}
        </div>

        {post.image && (
          <div className="border-y border-slate-200 dark:border-[#2d2e2f]">
            <button
              type="button"
              onClick={() => setLightboxSrc(post.image ?? null)}
              className="group relative block w-full cursor-pointer"
            >
              <img
                src={post.image}
                alt="post"
                className="w-full max-h-155 object-cover"
              />
              <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
            </button>
          </div>
        )}
        {post.sharedPost ? (
          <div className="mx-4 my-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-[#2d2e2f] dark:bg-[#242526]">
            <div className="p-3">
              <div className="mb-2 flex items-center gap-2">
                <Avatar
                  src={post.sharedPost.user?.photo ?? DEFAULT_PROFILE_IMAGE}
                  alt={post.sharedPost.user?.name ?? "User"}
                  size={36}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-900 dark:text-[#e4e6eb]">
                    {post.sharedPost.user?.name ?? "Unknown"}
                  </p>
                  <p className="truncate text-xs text-slate-500 dark:text-[#b0b3b8]">
                    {post.sharedPost.user?.username
                      ? `@${post.sharedPost.user.username}`
                      : "Original post"}
                  </p>
                </div>
                <Link
                  to={`/posts/${post.sharedPost._id}`}
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-[#1877f2] transition hover:bg-[#e7f3ff] dark:text-[#5c9dff] dark:hover:bg-[#2d2e2f]"
                >
                  Original Post
                  <ExternalLink size={13} />
                </Link>
              </div>
              {post.sharedPost.body ? (
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800 dark:text-[#e4e6eb]">
                  {post.sharedPost.body}
                </p>
              ) : null}
            </div>
            {post.sharedPost.image ? (
              <div className="border-t border-slate-200 dark:border-[#2d2e2f]">
                <img
                  src={post.sharedPost.image}
                  alt="Shared post"
                  className="max-h-140 w-full object-cover"
                />
              </div>
            ) : null}
          </div>
        ) : post.sharedPostUnavailable ? (
          <div className="mx-4 my-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm font-semibold text-slate-700">
              This post is unavailable.
            </p>
          </div>
        ) : null}

        {/* Top Comment Preview */}
        {!hideTopComment && post.topComment && (
          <div className="mt-3 pl-4 pr-4 pt-2 pb-3 border-t border-slate-200 dark:border-[#2d2e2f]">
            <div className="flex items-start gap-2">
              <Avatar
                src={post.topComment.commentCreator.photo ?? DEFAULT_PROFILE_IMAGE}
                alt={post.topComment.commentCreator.name}
                size={32}
              />
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-1 text-xs font-semibold text-slate-900 dark:text-[#e4e6eb]">
                  <span>TOP COMMENT</span>
                  <span className="ml-2">{post.topComment.commentCreator.name}</span>
                </div>
                <div className="text-[12px] text-slate-500 dark:text-[#b0b3b8]">
                  @{post.topComment.commentCreator.username} ·{" "}
                  {timeAgo(post.topComment.createdAt)}
                </div>
                {post.topComment.content && (
                  <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800 dark:text-[#e4e6eb] line-clamp-2">
                    {post.topComment.content}
                  </p>
                )}
                {post.topComment.image && (
                  <img
                    src={post.topComment.image}
                    alt="top comment"
                    className="mt-2 max-h-32 rounded-lg object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center px-4 pt-3 pb-2 border-t border-slate-200 dark:border-[#2d2e2f]">
          <div className="flex items-center gap-2 text-blue-600">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
              <ThumbsUp className="h-3 w-3" />
            </div>
            <span className="text-[13px] font-medium">{likeCount}</span>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2 text-[13px] text-slate-500 dark:text-[#b0b3b8]">
            <span>{post.sharesCount ?? 0} shares</span>
            <span>·</span>
            <span>{post.commentsCount ?? 0} comments</span>
            {!hideViewDetails ? (
              <>
                <span>·</span>
                <span
                  className="cursor-pointer text-[#1877f2] dark:text:#5c9dff hover:underline"
                  onClick={() => navigate(`/posts/${post._id}`)}
                >
                  View details
                </span>
              </>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1 p-1">
          <button
            className="flex items-center justify-center gap-1 text-sm text-slate-500 dark:text-[#b0b3b8] hover:bg-slate-50 dark:hover:bg-[#2d2e2f]"
            onClick={handleLike}
          >
            <ThumbsUp
              className={isLiked ? "h-3 w-3 text-blue-500" : "h-3 w-3 text-slate-400"}
            />
            <span>Like</span>
          </button>
          <button
            className="flex items-center justify-center gap-1 text-sm text-slate-500 dark:text-[#b0b3b8] hover:bg-slate-50 dark:hover:bg-[#2d2e2f]"
            onClick={() => navigate(`/posts/${post._id}`)}
          >
            <MessageCircle className="h-3 w-3" />
            <span>Comment</span>
          </button>
          <button
            className="flex items-center justify-center gap-1 text-sm text-slate-500 dark:text-[#b0b3b8] hover:bg-slate-50 dark:hover:bg-[#2d2e2f]"
            onClick={() => {
              onShare(post._id);
              setShowShareModal(true);
            }}
          >
            <Share2 className="h-3 w-3" />
            <span>Share</span>
          </button>
          <button
            className="flex items-center justify-center gap-1 text-sm text-slate-500 dark:text-[#b0b3b8] hover:bg-slate-50 dark:hover:bg-[#2d2e2f]"
            onClick={handleBookmark}
          >
            <Bookmark
              className={
                isBookmarked ? "h-3 w-3 text-blue-500" : "h-3 w-3 text-slate-400"
              }
            />
            <span>Bookmark</span>
          </button>
        </div>
      </div>

      {showEdit && (
        <EditPostModal isOpen={showEdit} post={post} onClose={() => setShowEdit(false)} />
      )}

      {showDeleteConfirm && (
        <ConfirmDialog
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          title="Delete post"
          description="Are you sure you want to delete this post? This action cannot be undone."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          confirmPendingLabel="Deleting..."
          onConfirm={handleDelete}
        />
      )}
      <SharePostModal
        isOpen={showShareModal}
        post={post}
        onClose={() => setShowShareModal(false)}
      />
      <ImageLightbox
        isOpen={!!lightboxSrc}
        src={lightboxSrc ?? ""}
        alt="Post image"
        onClose={() => setLightboxSrc(null)}
      />
    </>
  );
}
