import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "@/shared/components/ui/Modal";
import { Avatar } from "@/shared/components/ui/Avatar";
import { Button } from "@/shared/components/ui/Button";
import { DEFAULT_PROFILE_IMAGE } from "@/shared/lib/constants";
import { useAppSelector } from "@/app/hooks";
import { sharePost } from "@/features/posts/postsApi";
import type { Post } from "@/shared/types";
import ImageLightbox from "@/shared/components/ui/ImageLightbox";

interface SharePostModalProps {
  isOpen: boolean;
  post: Post;
  onClose: () => void;
}

export default function SharePostModal({ isOpen, post, onClose }: SharePostModalProps) {
  const [body, setBody] = useState("");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const currentUser = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);
  const qc = useQueryClient();

  const share = useMutation({
    mutationFn: () => sharePost(post._id, body.trim() || undefined),
    onSuccess: () => {
      toast.success("Post shared!");
      qc.invalidateQueries({ queryKey: ["posts", "feed", token] });
      qc.invalidateQueries({ queryKey: ["posts", "single", token, post._id] });
      setBody("");
      onClose();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const handleShare = () => {
    if (share.isPending) return;
    share.mutate();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share post">
      <div className="space-y-3">
        {/* Current user + textarea */}
        <div className="flex items-start gap-3">
          <Avatar
            src={currentUser?.photo ?? DEFAULT_PROFILE_IMAGE}
            alt={currentUser?.name ?? "You"}
            size={40}
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900 dark:text-[#e4e6eb]">{currentUser?.name}</p>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value.slice(0, 500))}
              placeholder="Say something about this..."
              rows={3}
              className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-[#1877f2] focus:bg-white dark:border-[#2d2e2f] dark:bg-[#242526] dark:text-[#e4e6eb] dark:placeholder:text-[#b0b3b8] dark:focus:border-[#5c9dff] dark:focus:bg-[#2d2e2f]"
            />
            <p className="mt-1 text-right text-xs text-slate-400 dark:text-[#b0b3b8]">{body.length}/500</p>
          </div>
        </div>

        {/* Original post preview */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-[#2d2e2f] dark:bg-[#242526]">
          <div className="p-3">
            <div className="mb-2 flex items-center gap-2">
              <Avatar
                src={post.user?.photo ?? DEFAULT_PROFILE_IMAGE}
                alt={post.user?.name ?? "User"}
                size={32}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900 dark:text-[#e4e6eb]">
                  {post.user?.name ?? "Unknown"}
                </p>
                <p className="truncate text-xs text-slate-500 dark:text-[#b0b3b8]">
                  {post.user?.username ? `@${post.user.username}` : "Original post"}
                </p>
              </div>
            </div>
            {post.body ? (
              <p className="line-clamp-3 whitespace-pre-wrap text-sm text-slate-800 dark:text-[#e4e6eb]">
                {post.body}
              </p>
            ) : null}
          </div>
          {post.image ? (
            <div className="border-t border-slate-200 dark:border-[#2d2e2f]">
              <button
                type="button"
                onClick={() => setLightboxSrc(post.image ?? null)}
                className="cursor-pointer"
              >
                <img
                  src={post.image}
                  alt="Original post"
                  className="max-h-48 w-full object-cover"
                />
              </button>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-1">
          <Button variant="outline" onClick={onClose} disabled={share.isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleShare}
            isLoading={share.isPending}
            className="bg-[#1877f2] hover:bg-[#166fe5] text-white font-extrabold rounded-lg px-4 py-2"
          >
            {share.isPending ? "Sharing..." : "Share now"}
          </Button>
        </div>
      </div>
      <ImageLightbox
        isOpen={!!lightboxSrc}
        src={lightboxSrc ?? ""}
        alt="Shared post image"
        onClose={() => setLightboxSrc(null)}
      />
    </Modal>
  );
}










