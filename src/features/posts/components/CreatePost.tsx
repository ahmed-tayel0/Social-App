import { useState, useRef, useEffect } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useAppSelector } from "@/app/hooks";
import { useCreatePost } from "@/features/posts/hooks";
import { DEFAULT_PROFILE_IMAGE } from "@/shared/lib/constants";
import { Avatar } from "@/shared/components/ui/Avatar";
import { useTheme } from "@/shared/hooks";
import {
  Image as ImageIcon,
  Smile,
  Earth,
  Users,
  Lock,
  SendHorizontal,
} from "lucide-react";

const PRIVACY_OPTIONS = [
  { value: "public", label: "Public", icon: Earth },
  { value: "following", label: "Followers", icon: Users },
  { value: "only_me", label: "Only me", icon: Lock },
] as const;

export default function CreatePost() {
  const { user } = useAppSelector((s) => s.auth);
  const { resolvedTheme } = useTheme();
  const firstName = user?.name?.split(" ")[0] ?? "";

  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [privacy, setPrivacy] = useState<"public" | "following" | "only_me">("public");
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const privacyRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);

  const { mutateAsync: createPost, status } = useCreatePost();
  const isLoading = status === "pending";

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 240) + "px";
  }, [body]);

  // Close privacy on outside click
  useEffect(() => {
    if (!showPrivacy) return;
    const handler = (e: MouseEvent) => {
      if (privacyRef.current && !privacyRef.current.contains(e.target as Node)) {
        setShowPrivacy(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showPrivacy]);

  // Close emoji picker on outside click
  useEffect(() => {
    if (!showEmojiPicker) return;
    const handler = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showEmojiPicker]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImage(f);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(f);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const reset = () => {
    setBody("");
    removeImage();
    setPrivacy("public");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const submit = () => {
    if (!body.trim() && !image) return;
    createPost({ body: body.trim(), image: image ?? undefined, privacy })
      .then(reset)
      .catch((err) => console.error(err));
  };

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    setBody((prev) => prev + emojiData.emoji);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const PrivacyIcon = PRIVACY_OPTIONS.find((p) => p.value === privacy)!.icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-[#2d2e2f] dark:bg-[#18191a]">
      {/* Top row: avatar + name + privacy pill */}
      <div className="flex items-center gap-3">
        <Avatar
          src={user?.photo ?? DEFAULT_PROFILE_IMAGE}
          alt={user?.name ?? "You"}
          size={44}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-extrabold text-slate-900 dark:text-[#e4e6eb]">
            {user?.name}
          </p>
          <div
            ref={privacyRef}
            className="relative mt-1 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700 dark:bg-[#2d2e2f] dark:text-[#e4e6eb]"
          >
            <button
              type="button"
              onClick={() => setShowPrivacy((v) => !v)}
              className="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-white"
            >
              <PrivacyIcon size={11} />
              <span>
                {privacy === "public"
                  ? "Public"
                  : privacy === "following"
                    ? "Followers"
                    : "Only me"}
              </span>
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
            {showPrivacy && (
              <div className="absolute left-0 top-full z-30 mt-1 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-[#2d2e2f] dark:bg-[#242526]">
                {PRIVACY_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setPrivacy(opt.value);
                        setShowPrivacy(false);
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:text-[#e4e6eb] dark:hover:bg-[#3a3b3c]"
                    >
                      <Icon size={12} />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Textarea */}
      <div className="mt-3">
        <textarea
          ref={textareaRef}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && (body.trim() || image)) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder={`What's on your mind, ${firstName}?`}
          rows={2}
          maxLength={5000}
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] leading-relaxed text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-[#1877f2] focus:bg-white dark:border-[#2d2e2f] dark:bg-[#242526] dark:text-[#e4e6eb] dark:placeholder:text-[#b0b3b8] dark:focus:bg-[#2d2e2f] dark:focus:border-[#5c9dff]"
          style={{ maxHeight: 240 }}
        />
      </div>

      {/* Image preview */}
      {imagePreview && (
        <div className="relative mt-2">
          <img
            src={imagePreview}
            alt="preview"
            className="max-h-60 w-full rounded-xl object-cover"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
            aria-label="Remove image"
          >
            ✕
          </button>
        </div>
      )}

      {/* Bottom row */}
      <div className="relative mt-3 flex items-center gap-2 border-t border-slate-200 pt-3 dark:border-[#2d2e2f]">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-slate-600 transition-colors hover:bg-[#e7f3ff] hover:text-[#1877f2] dark:text-[#b0b3b8] dark:hover:bg-[#2d2e2f] dark:hover:text-[#5c9dff]"
        >
          <ImageIcon size={18} className="text-[#1877f2] dark:text-[#5c9dff]" />
          <span>Photo/video</span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowEmojiPicker((v) => !v)}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
              showEmojiPicker
                ? "bg-[#e7f3ff] text-[#1877f2] dark:bg-[#2d2e2f] dark:text-[#5c9dff]"
                : "text-slate-600 hover:bg-[#e7f3ff] hover:text-[#1877f2] dark:text-[#b0b3b8] dark:hover:bg-[#2d2e2f] dark:hover:text-[#5c9dff]"
            }`}
          >
            <Smile size={18} className="text-[#1877f2] dark:text-[#5c9dff]" />
            <span>Feeling/activity</span>
          </button>

          {showEmojiPicker && (
            <div
              ref={emojiRef}
              className="absolute left-0 top-full z-40 mt-2"
              style={{ width: 320 }}
            >
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                theme={resolvedTheme === "dark" ? Theme.DARK : Theme.LIGHT}
                width={320}
                height={340}
                searchPlaceholder="Search"
                previewConfig={{ showPreview: false }}
                skinTonesDisabled={false}
                lazyLoadEmojis
              />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={submit}
          disabled={isLoading || (!body.trim() && !image)}
          className="ml-auto inline-flex items-center gap-2 rounded-lg bg-[#1877f2] px-4 py-2 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Posting..." : "Post"}
          <SendHorizontal size={14} />
        </button>
      </div>
    </div>
  );
}
