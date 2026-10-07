import { useComments } from "@/features/comments/hooks";
import { CommentItem } from "./CommentItem";

interface CommentListProps {
  postId: string;
}

export function CommentList({ postId }: CommentListProps) {
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = useComments(postId);
  const comments = data?.pages.flatMap((page) => page.comments) ?? [];

  if (isLoading) {
    return <div className="p-4 text-sm text-slate-500">Loading comments...</div>;
  }
  if (isError) {
    return <div className="p-4 text-sm text-rose-600">Failed to load comments.</div>;
  }
  if (comments.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-[#2d2e2f] dark:bg-[#242526]">
        <p className="text-base font-extrabold text-slate-800 dark:text-[#e4e6eb]">No comments yet</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-[#b0b3b8]">Be the first to comment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <div key={comment._id}>
          <CommentItem postId={postId} comment={comment} />
        </div>
      ))}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mx-auto block rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60 dark:border-[#2d2e2f] dark:bg-[#242526] dark:text-[#e4e6eb] dark:hover:bg-[#3a3b3c]"
        >
          {isFetchingNextPage ? "Loading..." : "View more comments"}
        </button>
      )}
    </div>
  );
}