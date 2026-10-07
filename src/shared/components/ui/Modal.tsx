import { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  closeOnBackdrop?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnBackdrop = true,
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const sizeMap = {
    sm: "max-w-md",
    md: "max-w-[560px]",
    lg: "max-w-2xl",
  };

  return (
    <div
      className="fixed inset-0 z-90 flex items-center justify-center bg-slate-900/60 dark:bg-black/70 p-4"
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        className={cn("relative w-full rounded-2xl border border-slate-200 bg-white dark:border-[#2d2e2f] dark:bg-[#18191a] shadow-2xl", sizeMap[size])}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#2d2e2f] px-4 py-3">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-[#e4e6eb]">{title}</h3>
          <button
            className="text-slate-500 hover:text-slate-700 dark:text-[#b0b3b8] dark:hover:bg-[#2d2e2f] dark:hover:text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-slate-200 dark:border-[#2d2e2f] px-4 py-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
Modal.displayName = "Modal";





