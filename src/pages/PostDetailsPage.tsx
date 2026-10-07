import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { usePostDetails } from "@/features/posts/hooks";
import { useToggleLike, useToggleBookmark } from "@/features/posts/hooks";
import PostCard from "@/features/posts/components/PostCard";
import { CommentList, CommentInput } from "@/features/comments/components";

export default function PostDetailsPage() {
  const { postId = "" } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading, isError } = usePostDetails(postId);
  const like = useToggleLike();
  const bookmark = useToggleBookmark();

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-[#2d2e2f] dark:bg-[#18191a] dark:text-[#e4e6eb] dark:hover:bg-[#242526]"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {isLoading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm dark:border-[#2d2e2f] dark:bg-[#18191a] dark:text-[#b0b3b8]">
          Loading post...
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-center text-sm font-semibold text-rose-700">
          Post not found.
        </div>
      )}

      {post && (
        <PostCard
          post={post}
          onLike={(id) => like.mutate(id)}
          onBookmark={(id) => bookmark.mutate(id)}
          onShare={() => {}}
          hideTopComment={true}
          hideViewDetails={true}
        />
      )}

      {post && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-[#2d2e2f] dark:bg-[#18191a]">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-extrabold tracking-wide text-slate-700 dark:text-[#e4e6eb]">Comments</h3>
          </div>
          <CommentList postId={postId} />
          <div className="mt-4 border-t border-slate-200 pt-3 dark:border-[#2d2e2f]">
            <CommentInput postId={postId} />
          </div>
        </div>
      )}
    </div>
  );
}