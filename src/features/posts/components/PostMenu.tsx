import { useEffect, useRef } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface PostMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export const PostMenu = ({ onEdit, onDelete, onClose }: PostMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-[#2d2e2f] dark:bg-[#242526] focus:outline-none z-30"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => {
          onEdit();
          onClose();
        }}
        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:text-[#e4e6eb] dark:hover:bg-[#3a3b3c]"
      >
        <Pencil size={14} />
        <span>Edit post</span>
      </button>
      <button
        type="button"
        onClick={() => {
          onDelete();
          onClose();
        }}
        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-[#3a3b3c]"
      >
        <Trash2 size={14} />
        <span>Delete post</span>
      </button>
    </div>
  );
};


