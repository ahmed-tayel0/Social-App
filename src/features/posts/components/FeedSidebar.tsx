import { Newspaper, Sparkles, Earth, Bookmark } from "lucide-react";

interface FeedSidebarProps {
  active: "following" | "me" | "all" | "saved";
  onChange: (filter: "following" | "me" | "all" | "saved") => void;
}

export default function FeedSidebar({ active, onChange }: FeedSidebarProps) {
  const handleChange = (filter: "following" | "me" | "all" | "saved") => {
    onChange(filter);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-[#2d2e2f] dark:bg-[#18191a]">
      <div className="space-y-2">
        <button
          onClick={() => handleChange("following")}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ${
            active === "following"
              ? "bg-[#e7f3ff] text-[#1877f2] dark:bg-[#263951] dark:text-[#5c9dff]"
              : "text-slate-700 hover:bg-slate-100 dark:text-[#b0b3b8] dark:hover:bg-[#2d2e2f] dark:hover:text-[#e4e6eb]"
          }`}
        >
          <Newspaper className="h-4 w-4" />
          <span>Feed</span>
        </button>

        <button
          onClick={() => handleChange("me")}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ${
            active === "me"
              ? "bg-[#e7f3ff] text-[#1877f2] dark:bg-[#263951] dark:text-[#5c9dff]"
              : "text-slate-700 hover:bg-slate-100 dark:text-[#b0b3b8] dark:hover:bg-[#2d2e2f] dark:hover:text-[#e4e6eb]"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>My Posts</span>
        </button>

        <button
          onClick={() => handleChange("all")}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ${
            active === "all"
              ? "bg-[#e7f3ff] text-[#1877f2] dark:bg-[#263951] dark:text-[#5c9dff]"
              : "text-slate-700 hover:bg-slate-100 dark:text-[#b0b3b8] dark:hover:bg-[#2d2e2f] dark:hover:text-[#e4e6eb]"
          }`}
        >
          <Earth className="h-4 w-4" />
          <span>Community</span>
        </button>

        <button
          onClick={() => handleChange("saved")}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ${
            active === "saved"
              ? "bg-[#e7f3ff] text-[#1877f2] dark:bg-[#263951] dark:text-[#5c9dff]"
              : "text-slate-700 hover:bg-slate-100 dark:text-[#b0b3b8] dark:hover:bg-[#2d2e2f] dark:hover:text-[#e4e6eb]"
          }`}
        >
          <Bookmark className="h-4 w-4" />
          <span>Saved</span>
        </button>
      </div>
    </div>
  );
}


