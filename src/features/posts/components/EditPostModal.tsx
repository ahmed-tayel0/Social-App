import { useState, useRef, useEffect } from "react";
import { useUpdatePost } from "@/features/posts/hooks";
import { Modal } from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";
import { Image, Earth, Users, Lock } from "lucide-react";

interface EditPostModalProps {
  isOpen: boolean;
  post: {
    body?: string;
    privacy?: string;
    _id: string;
  };
  onClose: () => void;
}

export const EditPostModal = ({ isOpen, post, onClose }: EditPostModalProps) => {
  const [body, setBody] = useState(post.body ?? "");
  const [privacy, setPrivacy] = useState(post.privacy ?? "public");
  const [privacyAnchorEl, setPrivacyAnchorEl] = useState<null | HTMLElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const openPrivacy = Boolean(privacyAnchorEl);
  const { mutateAsync: updatePost, status } = useUpdatePost();
  const isLoading = status === "pending";

  const handlePrivacyClick = (event: React.MouseEvent<HTMLElement>) => {
    setPrivacyAnchorEl(event.currentTarget);
  };
  const handlePrivacyClose = () => {
    setPrivacyAnchorEl(null);
  };
  const handlePrivacySelect = (value: string) => {
    setPrivacy(value);
    setPrivacyAnchorEl(null);
  };

  useEffect(() => {
    if (isOpen) {
      textareaRef.current?.focus();
    }
  }, [isOpen]);

  const handleSave = async () => {
    try {
      await updatePost({
        postId: post._id,
        body: body || undefined,
        privacy: privacy || undefined,
      });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const isUnchanged =
    body === (post.body ?? "") && privacy === (post.privacy ?? "public");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit post"
      closeOnBackdrop={false}
    >
      <div className="space-y-4">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={body}
            onChange={(e) => {
              const val = e.target.value;
              if (val.length <= 500) {
                setBody(val);
              }
            }}
            autoFocus
            rows={4}
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1877f2] focus:border-transparent resize-none"
            placeholder="What's on your mind?"
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <label
            htmlFor="image-upload-edit"
            className="flex items-center gap-2 text-slate-500 cursor-pointer"
          >
            <Image className="h-4 w-4" />
            Photo/video
          </label>
          <input
            id="image-upload-edit"
            type="file"
            accept="image/*"
            className="hidden"
          />

          <div
            className="relative mt-1 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700 dark:bg-[#2d2e2f] dark:text-[#e4e6eb]"
          >
            <button
              type="button"
              onClick={handlePrivacyClick}
              className="inline-flex items-center gap-1 hover:text-slate-900 dark:text-[#e4e6eb] dark:hover:text-white"
            >
              {privacy === "public" && (
                <>
                  <Earth className="h-4 w-4" />
                  Public
                </>
              )}
              {privacy === "following" && (
                <>
                  <Users className="h-4 w-4" />
                  Followers
                </>
              )}
              {privacy === "only_me" && (
                <>
                  <Lock className="h-4 w-4" />
                  Only me
                </>
              )}
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>

          {openPrivacy && (
            <div
              className="absolute left-0 top-full z-30 mt-1 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-[#2d2e2f] dark:bg-[#242526]"
              onClick={handlePrivacyClose}
            >
              <button
                type="button"
                onClick={() => {
                  handlePrivacySelect("public");
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:text-[#e4e6eb] dark:hover:bg-[#3a3b3c]"
              >
                <Earth size={14} />
                <span>Public</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handlePrivacySelect("following");
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:text-[#e4e6eb] dark:hover:bg-[#3a3b3c]"
              >
                <Users size={14} />
                <span>Followers</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handlePrivacySelect("only_me");
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:text-[#e4e6eb] dark:hover:bg-[#3a3b3c]"
              >
                <Lock size={14} />
                <span>Only me</span>
              </button>
            </div>
          )}

          <Button
            variant="outline"
            onClick={onClose}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            isLoading={isLoading}
            disabled={isLoading || isUnchanged}
            className="bg-[#1877f2] hover:bg-[#166fe5] text-white font-extrabold rounded-lg px-5 py-2"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};