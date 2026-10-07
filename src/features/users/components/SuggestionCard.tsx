import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, UserCheck, Loader2 } from "lucide-react";
import { Avatar } from "@/shared/components/ui/Avatar";
import { DEFAULT_PROFILE_IMAGE } from "@/shared/lib/constants";
import { useFollowUser } from "@/features/users/hooks";
import type { User } from "@/shared/types";

interface SuggestionCardProps {
  user: User;
}

export default function SuggestionCard({ user }: SuggestionCardProps) {
  const navigate = useNavigate();
  const follow = useFollowUser();
  const [followed, setFollowed] = useState(false);

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (followed || follow.isPending) return;
    setFollowed(true);
    follow.mutate(user._id, {
      onError: () => setFollowed(false),
    });
  };

  const handleCardClick = () => {
    navigate(`/profile/${user._id}`);
  };

  const followers = user.followersCount ?? 0;
  const mutual = user.mutualFollowersCount ?? 0;

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-3 transition hover:-translate-y-0.5 hover:border-[#dbeafe] hover:shadow-md dark:border-[#2d2e2f] dark:bg-[#18191a] dark:hover:border-[#3a3b3c]"
    >
      <div className="flex items-center gap-3">
        <Avatar src={user.photo ?? DEFAULT_PROFILE_IMAGE} alt={user.name} size={44} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-extrabold text-slate-900 transition-colors group-hover:text-[#1877f2] dark:text-[#e4e6eb] dark:group-hover:text-[#5c9dff]">
            {user.name}
          </p>
          <p className="truncate text-xs font-semibold text-slate-500 dark:text-[#b0b3b8]">
            @{user.username ?? "user"}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-[#2d2e2f] dark:text-[#b0b3b8]">
              {followers.toLocaleString()} {followers === 1 ? "follower" : "followers"}
            </span>
            {mutual > 0 ? (
              <span className="inline-flex items-center rounded-full bg-[#edf4ff] px-2 py-0.5 text-[10px] font-bold text-[#1877f2] dark:bg-[#263951] dark:text-[#5c9dff]">
                {mutual} mutual
              </span>
            ) : null}
          </div>
        </div>
        <button
          type="button"
          onClick={handleFollow}
          disabled={followed || follow.isPending}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold transition disabled:opacity-90 ${
            followed
              ? "bg-[#e9f7ef] text-[#1f9d55] dark:bg-[#1a3a2a] dark:text-[#4ade80]"
              : "bg-[#e7f3ff] text-[#1877f2] hover:bg-[#d8ebff] dark:bg-[#263951] dark:text-[#5c9dff] dark:hover:bg-[#2d4a6b]"
          }`}
        >
          {follow.isPending ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              <span>...</span>
            </>
          ) : followed ? (
            <>
              <UserCheck size={13} />
              <span>Following</span>
            </>
          ) : (
            <>
              <UserPlus size={13} />
              <span>Follow</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
