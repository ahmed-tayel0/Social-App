import { useState } from "react";
import { Smile } from "lucide-react";

interface ReplyInputProps {
  onCreateReply: (content: string) => Promise<void>;
}

export function ReplyInput({ onCreateReply }: ReplyInputProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await onCreateReply(content);
      setContent("");
    } catch (error) {
      console.error("Failed to create reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setContent((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((v) => !v);
  };

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
    <div className="relative mt-2">
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-[#f0f2f5] px-2.5 py-1.5 focus-within:border-[#c7dafc] focus-within:bg-white dark:border-[#2d2e2f] dark:bg-[#242526] dark:focus-within:border-[#3a3b3c] dark:focus-within:bg-[#2d2e2f]"
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a reply..."
          rows={1}
          className="w-full resize-none bg-transparent px-2 py-1 text-xs leading-5 outline-none placeholder:text-slate-500 dark:text-[#e4e6eb] dark:placeholder:text-[#b0b3b8]"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] transition hover:bg-[#e7f3ff] disabled:cursor-not-allowed disabled:opacity-50 dark:text-[#5c9dff] dark:hover:bg-[#2d2e2f]"
        >
          Reply
        </button>
        <button
          type="button"
          onClick={() => setContent("")}
          className="rounded-md px-2 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 dark:text-[#b0b3b8] dark:hover:bg-[#2d2e2f] dark:hover:text-white"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={toggleEmojiPicker}
          className="ml-1 flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 dark:text-[#b0b3b8] dark:hover:bg-[#2d2e2f] dark:hover:text-white"
          aria-label="Emoji"
        >
          <Smile className="h-3.5 w-3.5" />
          <span>Emoji</span>
        </button>
      </form>

      {/* Emoji Picker — Inside the relative wrapper, below the input */}
      {showEmojiPicker ? (
        <div className="absolute right-0 top-full z-30 mt-2 w-64 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-[#2d2e2f] dark:bg-[#242526]">
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
    </div>
  );
}
