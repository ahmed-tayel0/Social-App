import { useState } from "react";
import { Mail, Users, Camera, Expand, Trash2 } from "lucide-react";
import { DEFAULT_PROFILE_IMAGE } from "@/shared/lib/constants";
import { useUploadPhoto, useUploadCover, useRemoveCover } from "@/features/profile/hooks";
import { ImageCropModal } from "./ImageCropModal";
import { ConfirmDialog } from "@/shared/components/ui/ConfirmDialog";
import ImageLightbox from "@/shared/components/ui/ImageLightbox";
import { cn } from "@/shared/lib/utils";
import type { User } from "@/shared/types";

interface ProfileHeaderProps {
  user: User;
  isOwn: boolean;
  myPostsCount?: number;
  savedCount?: number;
  followSlot?: React.ReactNode;
}

export function ProfileHeader({
  user,
  isOwn,
  myPostsCount,
  savedCount,
  followSlot,
}: ProfileHeaderProps) {
  // Avatar crop state
  const [avatarImageSrc, setAvatarImageSrc] = useState<string | null>(null);
  const [avatarFileName, setAvatarFileName] = useState<string>("");
  const [avatarMimeType, setAvatarMimeType] = useState<string>("");
  const [avatarWidth, setAvatarWidth] = useState<number>(0);
  const [avatarHeight, setAvatarHeight] = useState<number>(0);
  const [isAvatarCropOpen, setIsAvatarCropOpen] = useState(false);

  // Cover crop state
  const [isCoverCropOpen, setIsCoverCropOpen] = useState(false);
  const [coverImageSrc, setCoverImageSrc] = useState<string | null>(null);
  const [coverFileName, setCoverFileName] = useState<string>("");
  const [coverMimeType, setCoverMimeType] = useState<string>("");
  const [coverWidth, setCoverWidth] = useState<number>(0);
  const [coverHeight, setCoverHeight] = useState<number>(0);

  // UI state
  const [showRemoveCoverConfirm, setShowRemoveCoverConfirm] = useState(false);
  const [avatarLightboxOpen, setAvatarLightboxOpen] = useState(false);
  const [coverLightboxOpen, setCoverLightboxOpen] = useState(false);

  const uploadPhotoMutation = useUploadPhoto();
  const uploadCoverMutation = useUploadCover();
  const removeCoverMutation = useRemoveCover();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFileName(file.name);
    setAvatarMimeType(file.type);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setAvatarImageSrc(event.target?.result as string);
        setAvatarWidth(img.width);
        setAvatarHeight(img.height);
        setIsAvatarCropOpen(true);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverFileName(file.name);
    setCoverMimeType(file.type);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setCoverImageSrc(event.target?.result as string);
        setCoverWidth(img.width);
        setCoverHeight(img.height);
        setIsCoverCropOpen(true);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleAvatarCropConfirm = async (croppedFile: File) => {
    await uploadPhotoMutation.mutateAsync({
      file: croppedFile,
      privacy: "public",
    });
    setIsAvatarCropOpen(false);
  };

  const handleCoverCropConfirm = async (croppedFile: File) => {
    await uploadCoverMutation.mutateAsync({
      file: croppedFile,
      privacy: "public",
    });
    setIsCoverCropOpen(false);
  };

  return (
    <>
      {/* ============ COVER + AVATAR (overlapping section) ============ */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-[28px] dark:border-[#2d2e2f] dark:bg-[#18191a]">
        {/* Cover */}
        <div
          className="group/cover relative h-44 sm:h-52 lg:h-60"
          style={{
            backgroundImage: user.cover
              ? `linear-gradient(180deg, rgba(15,23,42,.15), rgba(15,23,42,.35)), url(${user.cover})`
              : "linear-gradient(112deg, #0f172a 0%, #1e3a5f 36%, #2b5178 72%, #5f8fb8 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {isOwn && (
            <div className="absolute right-2 top-2 z-10 flex flex-wrap items-center justify-end gap-1.5 sm:right-3 sm:top-3 sm:gap-2">
              {user.cover ? (
                <button
                  type="button"
                  onClick={() => setCoverLightboxOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-black/45 px-2 py-1 text-[11px] font-bold text-white backdrop-blur transition hover:bg-black/60 sm:px-3 sm:py-1.5 sm:text-xs"
                >
                  <Expand size={13} />
                  View cover
                </button>
              ) : null}

              {!user.cover ? (
                <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-black/45 px-2 py-1 text-[11px] font-bold text-white backdrop-blur transition hover:bg-black/60 sm:px-3 sm:py-1.5 sm:text-xs">
                  <Camera size={13} />
                  {uploadCoverMutation.isPending ? "Uploading..." : "Add cover"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverChange}
                    disabled={uploadCoverMutation.isPending}
                  />
                </label>
              ) : (
                <>
                  <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-black/45 px-2 py-1 text-[11px] font-bold text-white backdrop-blur transition hover:bg-black/60 sm:px-3 sm:py-1.5 sm:text-xs">
                    <Camera size={13} />
                    {uploadCoverMutation.isPending ? "Uploading..." : "Change cover"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleCoverChange}
                      disabled={uploadCoverMutation.isPending}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowRemoveCoverConfirm(true)}
                    disabled={removeCoverMutation.isPending}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-black/45 px-2 py-1 text-[11px] font-bold text-white backdrop-blur transition hover:bg-black/60 disabled:opacity-60 sm:px-3 sm:py-1.5 sm:text-xs"
                  >
                    <Trash2 size={13} />
                    {removeCoverMutation.isPending ? "Removing..." : "Remove"}
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Body — avatar + info card */}
        <div className="relative px-3 pb-5 sm:px-6 sm:pb-6">
          {/* Avatar floating over the cover */}
          <div className="-mt-12 sm:-mt-16">
            <div className="rounded-3xl border border-white/60 bg-white/95 p-4 backdrop-blur-xl sm:p-6 dark:border-[#2d2e2f]/60 dark:bg-[#242526]/95">
              {/* Top row: avatar + name + stats */}
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                {/* Left: avatar + name */}
                <div className="flex items-end gap-4">
                  {/* Avatar */}
                  <div className="group/avatar relative shrink-0">
                    <button
                      type="button"
                      onClick={() => setAvatarLightboxOpen(true)}
                      className="block cursor-pointer rounded-full"
                      aria-label="View profile photo"
                    >
                      <img
                        src={user.photo ?? DEFAULT_PROFILE_IMAGE}
                        alt={user.name}
                        className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md ring-2 ring-[#dbeafe] sm:h-32 sm:w-32"
                      />
                    </button>

                    {isOwn && (
                      <>
                        {/* Expand button (bottom-left) */}
                        <button
                          type="button"
                          aria-label="View profile photo"
                          title="View profile photo"
                          onClick={() => setAvatarLightboxOpen(true)}
                          className="absolute -bottom-1 -left-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-md ring-1 ring-slate-200 transition hover:bg-slate-100 sm:opacity-0 sm:group-hover/avatar:opacity-100 sm:group-focus-within/avatar:opacity-100"
                        >
                          <Expand size={15} />
                        </button>

                        {/* Camera button (bottom-right) */}
                        <label
                          htmlFor="avatar-upload"
                          className="absolute -bottom-1 -right-1 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#1877f2] text-white shadow-md transition hover:bg-[#166fe5] sm:opacity-0 sm:group-hover/avatar:opacity-100 sm:group-focus-within/avatar:opacity-100"
                        >
                          <Camera size={15} />
                        </label>
                        <input
                          type="file"
                          id="avatar-upload"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarChange}
                        />
                      </>
                    )}
                  </div>

                  {/* Name + username + badge */}
                  <div className="min-w-0 pb-1">
                    <h2 className="truncate text-2xl font-black tracking-tight text-slate-900 dark:text-[#e4e6eb] sm:text-4xl">
                      {user.name}
                    </h2>
                    <p className="mt-1 truncate text-base font-semibold text-slate-500 dark:text-[#b0b3b8] sm:text-xl">
                      @{user.username ?? "user"}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d7e7ff] bg-[#eef6ff] px-3 py-1 text-xs font-bold text-[#0b57d0] dark:border-[#263951] dark:bg-[#1a2a3a] dark:text-[#5c9dff]">
                      <Users size={12} />
                      Route Posts member
                    </div>
                  </div>
                </div>

                {/* Right: followSlot (for other users) OR stat cards (for own profile) */}
                <div className="flex flex-col items-end gap-3">
                  {followSlot}
                  {!isOwn && !followSlot ? null : (
                    <div
                      className={`grid w-full gap-2 lg:w-130 ${
                        isOwn ? "grid-cols-3" : "grid-cols-2"
                      }`}
                    >
                      <StatCard label="Followers" value={user.followersCount ?? 0} />
                      <StatCard label="Following" value={user.followingCount ?? 0} />
                      {isOwn && (
                        <StatCard label="Bookmarks" value={user.bookmarksCount ?? 0} />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom row: About + Mini cards */}
              <div className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
                {/* About */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-[#2d2e2f] dark:bg-[#242526]">
                  <h3 className="text-sm font-extrabold text-slate-800 dark:text-[#e4e6eb]">
                    About
                  </h3>
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-600 dark:text-[#b0b3b8]">
                    <Mail size={15} className="text-slate-500 dark:text-[#b0b3b8]" />
                    <span className="truncate dark:text-[#b0b3b8]">
                      {user.email ?? "No email"}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-600 dark:text-[#b0b3b8]">
                    <Users size={15} className="text-slate-500 dark:text-[#b0b3b8]" />
                    <span className="dark:text-[#b0b3b8]">Active on Route Social</span>
                  </div>
                </div>

                {/* Mini cards */}
                {/* Mini cards */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <MiniCard
                    label={isOwn ? "My Posts" : "Posts"}
                    value={myPostsCount ?? 0}
                  />
                  {isOwn && <MiniCard label="Saved Posts" value={savedCount ?? 0} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals + dialogs */}
      {isAvatarCropOpen && (
        <ImageCropModal
          isOpen={isAvatarCropOpen}
          imageSrc={avatarImageSrc ?? ""}
          fileName={avatarFileName}
          mimeType={avatarMimeType}
          imageWidth={avatarWidth}
          imageHeight={avatarHeight}
          onClose={() => setIsAvatarCropOpen(false)}
          onConfirm={handleAvatarCropConfirm}
          aspectRatio="square"
        />
      )}

      {isCoverCropOpen && (
        <ImageCropModal
          isOpen={isCoverCropOpen}
          imageSrc={coverImageSrc ?? ""}
          fileName={coverFileName}
          mimeType={coverMimeType}
          imageWidth={coverWidth}
          imageHeight={coverHeight}
          onClose={() => setIsCoverCropOpen(false)}
          onConfirm={handleCoverCropConfirm}
          aspectRatio="cover"
        />
      )}

      <ConfirmDialog
        isOpen={showRemoveCoverConfirm}
        onClose={() => setShowRemoveCoverConfirm(false)}
        title="Remove cover photo?"
        description="Your cover will be removed and the default gradient will be shown instead."
        confirmLabel="Remove"
        confirmPendingLabel="Removing..."
        isConfirming={removeCoverMutation.isPending}
        onConfirm={async () => {
          await removeCoverMutation.mutateAsync();
          setShowRemoveCoverConfirm(false);
        }}
      />

      <ImageLightbox
        isOpen={avatarLightboxOpen}
        src={user.photo ?? DEFAULT_PROFILE_IMAGE}
        alt={`${user.name}'s profile photo`}
        onClose={() => setAvatarLightboxOpen(false)}
      />
      {user.cover ? (
        <ImageLightbox
          isOpen={coverLightboxOpen}
          src={user.cover}
          alt={`${user.name}'s cover photo`}
          onClose={() => setCoverLightboxOpen(false)}
        />
      ) : null}
    </>
  );
}

/* ==================== Helper Components ==================== */

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4 dark:border-[#2d2e2f] dark:bg-[#242526]">
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs dark:text-[#b0b3b8]">
        {label}
      </p>
      <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl dark:text-[#e4e6eb]">
        {value}
      </p>
    </div>
  );
}

function MiniCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3 dark:border-[#263951] dark:bg-[#1a2a3a]"
      )}
    >
      <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96] dark:text-[#5c9dff]">
        {label}
      </p>
      <p className="mt-1 text-2xl font-black text-slate-900 dark:text-[#e4e6eb]">
        {value}
      </p>
    </div>
  );
}
