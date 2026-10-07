import { useState, useRef, useCallback } from "react";
import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { useAppSelector } from "@/app/hooks";
import { useCreateComment } from "@/features/comments/hooks";
import { Avatar } from "@/shared/components/ui/Avatar";
import { DEFAULT_PROFILE_IMAGE } from "@/shared/lib/constants";
import { ImageIcon, Smile, SendHorizontal, X } from "lucide-react";

interface CommentInputProps {
  postId: string;
  placeholder?: string;
}

export function CommentInput({ postId, placeholder }: CommentInputProps) {
  const { user } = useAppSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { mutateAsync: createComment, isPending } = useCreateComment(postId);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImage(undefined);
      setImagePreview(null);
      return;
    }
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(undefined);
    setImagePreview(null);
    const fileInput = document.getElementById(
      "comment-image-input"
    ) as HTMLInputElement | null;
    if (fileInput) fileInput.value = "";
  };

  const handleSubmitPress = async () => {
    if (!content.trim() && !image) return;
    try {
      await createComment({ content: content.trim(), image });
      setContent("");
      setImage(undefined);
      setImagePreview(null);
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    } catch {
      // handled by mutation onError
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await handleSubmitPress();
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await handleSubmitPress();
    }
  };

  const handleTextAreaChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  }, []);

  const handleEmojiClick = (emoji: string) => {
    setContent((prev) => prev + emoji);
    setShowEmojiPicker(false);
    if (textareaRef.current) textareaRef.current.focus();
  };

  const toggleEmojiPicker = () => setShowEmojiPicker((v) => !v);

  const commonEmojis = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🤩",
    "🥳",
    "😏",
    "😒",
    "😞",
    "😔",
    "😟",
    "😕",
    "🙁",
    "☹️",
    "😣",
    "😖",
    "😫",
    "😩",
    "🥺",
    "😢",
    "😭",
    "😤",
    "😠",
    "😡",
    "🤬",
    "🤯",
    "😳",
    "🥵",
    "🥶",
    "😱",
    "😨",
    "😰",
    "😥",
    "😓",
    "🤗",
    "🤔",
    "🤭",
    "🤫",
    "🤥",
    "😶",
    "😐",
    "😑",
    "😬",
    "🙄",
    "😯",
    "😦",
    "😧",
    "😮",
    "😲",
    "🥱",
    "😴",
    "🤤",
    "😪",
    "😵",
    "🤐",
    "🥴",
    "🤢",
    "🤮",
    "🤧",
    "😷",
    "🤒",
    "🤕",
    "🤑",
    "🤠",
    "😈",
    "👿",
    "👍",
    "👎",
    "👊",
    "👏",
    "🙌",
    "🤝",
    "👐",
    "🤲",
    "🤌",
    "🤏",
    "✊",
    "✋",
    "✌️",
    "🤞",
    "🤟",
    "🤘",
    "🤙",
    "👈",
    "👉",
    "👆",
    "👇",
    "☝️",
    "👌",
    "✍️",
    "🤳",
    "💪",
  ];

  return (
    <div className="flex items-start gap-2">
      <div className="shrink-0">
        <Avatar
          src={user?.photo ?? DEFAULT_PROFILE_IMAGE}
          alt={user?.name ?? "User"}
          size={36}
        />
      </div>

      <div className="relative min-w-0 flex-1">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-[#f0f2f5] px-3 py-2 focus-within:border-[#c7dafc] focus-within:bg-white dark:border-[#2d2e2f] dark:bg-[#242526] dark:focus-within:border-[#3a3b3c] dark:focus-within:bg-[#2d2e2f]"
        >
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleTextAreaChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder ?? `Comment as ${user?.name ?? "..."}...`}
            rows={1}
            className="min-h-6 max-h-30 w-full resize-none bg-transparent text-sm leading-5 outline-none placeholder:text-slate-500 dark:text-[#e4e6eb] dark:placeholder:text-[#b0b3b8]"
            style={{ height: "auto" }}
          />

          {imagePreview ? (
            <div className="relative mt-2">
              <img
                src={imagePreview}
                alt="preview"
                className="max-h-48 rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                aria-label="Remove image"
              >
                <X size={14} />
              </button>
            </div>
          ) : null}

          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label
                htmlFor="comment-image-input"
                className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-slate-500 transition hover:text-slate-700 dark:text-[#b0b3b8] dark:hover:text-[#e4e6eb]"
              >
                <ImageIcon className="h-4 w-4" />
                <span>Image</span>
              </label>
              <input
                id="comment-image-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <button
                type="button"
                onClick={toggleEmojiPicker}
                className="flex items-center gap-1 text-xs font-semibold text-slate-500 transition hover:text-slate-700 dark:text-[#b0b3b8] dark:hover:text-[#e4e6eb]"
                aria-label="Emoji"
              >
                <Smile className="h-4 w-4" />
                <span>Emoji</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleSubmitPress}
              disabled={isPending || (!content.trim() && !image)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1877f2] text-white transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:bg-[#9ec5ff]"
            >
              <SendHorizontal size={14} />
            </button>
          </div>

          {showEmojiPicker ? (
            <div className="absolute left-14 top-full z-30 mt-2 w-64 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-[#2d2e2f] dark:bg-[#242526]">
              {" "}
              <div className="flex flex-wrap gap-1">
                {commonEmojis.map((emoji, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleEmojiClick(emoji)}
                    className="rounded p-1 text-[18px] transition hover:bg-slate-100 dark:hover:bg-[#3a3b3c]"
                    aria-label={`emoji ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
