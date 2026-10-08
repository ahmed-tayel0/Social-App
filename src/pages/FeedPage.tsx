import { useState, useRef, useEffect } from "react";
import { useFeed, type FeedFilter } from "@/features/posts/hooks";
import { useToggleLike } from "@/features/posts/hooks";
import { useToggleBookmark } from "@/features/posts/hooks";
import PostCard from "@/features/posts/components/PostCard";
import PostSkeleton from "@/features/posts/components/PostSkeleton";
import CreatePost from "@/features/posts/components/CreatePost";
import FeedSidebar from "@/features/posts/components/FeedSidebar";
import SuggestedFriends from "@/features/posts/components/SuggestedFriends";
import { Newspaper, Sparkles, Earth, Bookmark } from "lucide-react";

export default function FeedPage() {
  const [filter, setFilter] = useState<FeedFilter>("following");
  const feed = useFeed(filter);
  const like = useToggleLike();
  const bookmark = useToggleBookmark();
  const sentinelRef = useRef<HTMLDivElement>(null);

  const posts = feed.data?.pages.flatMap((p) => p.posts ?? []) ?? [];

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    let observer: IntersectionObserver | null = null;
    if (feed.hasNextPage && !feed.isFetchingNextPage) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            feed.fetchNextPage();
          }
        },
        {
          rootMargin: "100px",
          threshold: 0.1,
        }
      );

      observer.observe(sentinel);
    }

    return () => {
      observer?.disconnect();
    };
  }, [feed]);

  return (
    <div className="grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)_300px]">
      {/* Left sidebar (xl only) */}
      <aside className="hidden h-fit space-y-3 xl:sticky xl:top-[84px] xl:block">
        <FeedSidebar active={filter} onChange={setFilter} />
      </aside>

      <section className="space-y-4">
        {/* Mobile filter grid (below xl) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm xl:hidden dark:border-[#2d2e2f] dark:bg-[#18191a]">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setFilter("following")}
              className={`w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold ${
                filter === "following"
                  ? "bg-[#e7f3ff] text-[#1877f2] dark:bg-[#263951] dark:text-[#5c9dff]"
                  : "text-slate-700 hover:bg-slate-100 dark:bg-[#242526] dark:text-[#b0b3b8] dark:hover:bg-[#2d2e2f]"
              }`}
            >
              <Newspaper className="h-4 w-4" />
              <span>Feed</span>
            </button>

            <button
              onClick={() => setFilter("me")}
              className={`w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold ${
                filter === "me"
                  ? "bg-[#e7f3ff] text-[#1877f2] dark:bg-[#263951] dark:text-[#5c9dff]"
                  : "text-slate-700 hover:bg-slate-100 dark:bg-[#242526] dark:text-[#b0b3b8] dark:hover:bg-[#2d2e2f]"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>My Posts</span>
            </button>

            <button
              onClick={() => setFilter("all")}
              className={`w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold ${
                filter === "all"
                  ? "bg-[#e7f3ff] text-[#1877f2] dark:bg-[#263951] dark:text-[#5c9dff]"
                  : "text-slate-700 hover:bg-slate-100 dark:bg-[#242526] dark:text-[#b0b3b8] dark:hover:bg-[#2d2e2f]"
              }`}
            >
              <Earth className="h-4 w-4" />
              <span>Community</span>
            </button>

            <button
              onClick={() => setFilter("saved")}
              className={`w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold ${
                filter === "saved"
                  ? "bg-[#e7f3ff] text-[#1877f2] dark:bg-[#263951] dark:text-[#5c9dff]"
                  : "text-slate-700 hover:bg-slate-100 dark:bg-[#242526] dark:text-[#b0b3b8] dark:hover:bg-[#2d2e2f]"
              }`}
            >
              <Bookmark className="h-4 w-4" />
              <span>Saved</span>
            </button>
          </div>
        </div>
        <SuggestedFriends variant="compact" />
        {/* Create Post */}
        <CreatePost />

        {/* Loading skeletons */}
        {feed.isLoading && (
          <>
            <PostSkeleton />
            <PostSkeleton />
          </>
        )}

        {/* Empty state */}
        {!feed.isLoading && posts.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm dark:border-[#2d2e2f] dark:bg-[#18191a] dark:text-[#b0b3b8]">
            No posts yet. Be the first one to publish.
          </div>
        )}

        {/* Posts */}
        {posts.map((p) => (
          <PostCard
            key={p._id}
            post={p}
            onLike={(id: string) => like.mutate(id)}
            onBookmark={(id: string) => bookmark.mutate(id)}
            onShare={() => {}}
          />
        ))}

        {/* Infinite scroll sentinel */}
        <div ref={sentinelRef} className="flex min-h-10 items-center justify-center">
          {feed.isFetchingNextPage && (
            <span className="text-xs font-semibold text-slate-400">Loading more...</span>
          )}
          {!feed.hasNextPage && posts.length > 0 && (
            <span className="text-xs font-semibold text-slate-400">
              You reached the end
            </span>
          )}
        </div>
      </section>

      {/* Right sidebar (xl only) */}
      <aside className="hidden h-fit xl:sticky xl:top-[84px] xl:block">
        <SuggestedFriends />
      </aside>
    </div>
  );
}
