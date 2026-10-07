import { useMemo, useState } from "react";
import { FileText, Bookmark } from "lucide-react";
import { useAppSelector } from "@/app/hooks";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { useMyPosts, useMyBookmarks } from "@/features/profile/hooks";
import PostCard from "@/features/posts/components/PostCard";
import PostSkeleton from "@/features/posts/components/PostSkeleton";
import { useToggleLike, useToggleBookmark } from "@/features/posts/hooks";

type Tab = "posts" | "saved";

export default function ProfilePage() {
  const user = useAppSelector((s) => s.auth.user);
  const [tab, setTab] = useState<Tab>("posts");

  const myPostsQuery = useMyPosts();
  const myBookmarksQuery = useMyBookmarks();
  const like = useToggleLike();
  const bookmark = useToggleBookmark();

  const myPosts = useMemo(
    () => myPostsQuery.data?.pages.flatMap((p) => p.posts) ?? [],
    [myPostsQuery.data]
  );
  const myBookmarks = useMemo(
    () => myBookmarksQuery.data?.pages.flatMap((p) => p.posts) ?? [],
    [myBookmarksQuery.data]
  );

  const posts = tab === "posts" ? myPosts : myBookmarks;
  const isLoading =
    tab === "posts" ? myPostsQuery.isLoading : myBookmarksQuery.isLoading;
  const myPostsCount = myPosts.length;
  const savedCount = myBookmarks.length;

  return (
    <div className="space-y-4">
      {user && (
        <ProfileHeader
          user={user}
          isOwn={true}
          myPostsCount={myPostsCount}
          savedCount={savedCount}
        />
      )}

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-[#2d2e2f] dark:bg-[#18191a]">
          <div className="grid w-full grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1.5 sm:inline-flex sm:w-auto sm:gap-0 dark:bg-[#242526]">
            <button
              type="button"
              onClick={() => setTab("posts")}
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${
                tab === "posts"
                  ? "bg-white text-[#1877f2] shadow-sm dark:bg-[#3a3b3c] dark:text-[#5c9dff]"
                  : "text-slate-600 hover:text-slate-900 dark:text-[#b0b3b8] dark:hover:text-white"
              }`}
            >
              <FileText size={15} />
              My Posts
            </button>
            <button
              type="button"
              onClick={() => setTab("saved")}
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${
                tab === "saved"
                  ? "bg-white text-[#1877f2] shadow-sm dark:bg-[#3a3b3c] dark:text-[#5c9dff]"
                  : "text-slate-600 hover:text-slate-900 dark:text-[#b0b3b8] dark:hover:text-white"
              }`}
            >
              <Bookmark size={15} />
              Saved
            </button>
          </div>
          <span className="rounded-full bg-[#e7f3ff] px-3 py-1 text-xs font-bold text-[#1877f2] dark:bg-[#263951] dark:text-[#5c9dff]">
            {tab === "posts" ? myPostsCount : savedCount}
          </span>
        </div>

        <div className="space-y-3">
          {isLoading && (
            <>
              <PostSkeleton />
              <PostSkeleton />
            </>
          )}

          {!isLoading && posts.length === 0 && (
            <p className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500 dark:border-[#2d2e2f] dark:bg-[#242526] dark:text-[#b0b3b8]">
              {tab === "posts"
                ? "You have not posted yet."
                : "No saved posts yet."}
            </p>
          )}

          {!isLoading &&
            posts.map((p) => (
              <PostCard
                key={p._id}
                post={p}
                onLike={(id: string) => like.mutate(id)}
                onBookmark={(id: string) => bookmark.mutate(id)}
                onShare={() => {}}
              />
            ))}
        </div>
      </section>
    </div>
  );
}