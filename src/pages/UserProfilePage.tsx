import { useParams } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { useUserProfile } from "@/features/profile/hooks/useUserProfile";
import { useUserPosts } from "@/features/profile/hooks/useUserProfile";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import PostCard from "@/features/posts/components/PostCard";
import { useToggleLike, useToggleBookmark } from "@/features/posts/hooks"; // ← ضيف ده
import { followUser } from "@/features/profile/profileApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { UserPlus, UserCheck } from "lucide-react";

export default function UserProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const { user } = useAppSelector((s) => s.auth);
  const isOwn = user?._id === userId;
  const navigate = useNavigate();

  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
  } = useUserProfile(userId || "");
  const {
    data: postsData,
    isLoading: postsLoading,
    isFetching: postsFetching,
  } = useUserPosts(userId || "");

  // ← ضيف دول
  const like = useToggleLike();
  const bookmark = useToggleBookmark();

  const queryClient = useQueryClient();
  const followMutation = useMutation({
    mutationFn: (userId: string) => followUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", "user", userId] });
      queryClient.invalidateQueries({ queryKey: ["profile", "my-bookmarks"] });
    },
  });

  const handleFollow = () => {
    if (userId) {
      followMutation.mutate(userId);
    }
  };

  const isNotFound =
    profileError ||
    (!profileLoading && !profileData) ||
    (profileData && profileData.user._id !== userId);

  const isFollowing = profileData?.isFollowing ?? false;
  const isLoading = profileLoading || postsLoading;
  const isFetching = postsFetching;

  const posts = postsData?.pages.flatMap((page) => page.posts) ?? [];
  const postsCount =
    postsData?.pages.reduce((total, page) => total + page.posts.length, 0) ?? 0;

  const userData = profileData?.user ?? {
    _id: "",
    name: "",
    username: "",
    email: "",
    photo: "",
    cover: "",
    followersCount: 0,
    followingCount: 0,
    bookmarksCount: 0,
  };

  if (isLoading && !isNotFound) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center border-slate-200 bg-white dark:border-[#2d2e2f] dark:bg-[#18191a]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (isNotFound) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 border-slate-200 bg-white dark:border-[#2d2e2f] dark:bg-[#18191a]">
        <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#eef3ff] text-[#1877f2]">
          <span className="material-symbols-outlined">person_off</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">User not found</h1>
        <p className="text-sm text-slate-500 mb-6 dark:text-[#b0b3b8]">
          This profile doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/feed")}
          className="inline-flex items-center gap-2 rounded-lg bg-[#1877f2] px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#166fe5]"
        >
          Go to Feed
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProfileHeader
        user={userData}
        isOwn={isOwn}
        myPostsCount={postsCount}
        followSlot={
          !isOwn ? (
            <button
              onClick={handleFollow}
              disabled={followMutation.isPending}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-extrabold transition ${
                isFollowing
                  ? "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-[#2d2e2f] dark:bg-[#18191a] dark:text-[#e4e6eb] dark:hover:bg-[#242526]"
              } disabled:opacity-60`}
            >
              {isFollowing ? (
                <>
                  <UserCheck size={16} />
                  Following
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  Follow
                </>
              )}
            </button>
          ) : undefined
        }
      />

      {isFetching && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {posts.length === 0 ? (
        <div className="py-12 text-center text-slate-500">
          <p className="text-lg">{userData.name} hasn't posted anything yet</p>
          <p className="mt-2 text-sm">
            {isOwn
              ? "Share your thoughts and creations to get started!"
              : "Follow to see their posts when they share something new."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onLike={(id: string) => like.mutate(id)}
              onBookmark={(id: string) => bookmark.mutate(id)}
              onShare={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}
