import { forwardRef, useEffect, useRef } from "react";
import { cn } from "@/shared/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  maxHeight?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    label,
    error,
    maxHeight = 140,
    className,
    ...props
  }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(textareaRef.current);
        } else if (typeof ref === "object") {
          ref.current = textareaRef.current;
        }
      }
    }, [ref]);

    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        const adjustHeight = () => {
          textarea.style.height = "auto";
          textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
        };

        adjustHeight();

        const observer = new ResizeObserver(adjustHeight);
        observer.observe(textarea);

        return () => observer.disconnect();
      }
    }, [maxHeight]);

    return (
      <>
        {label && (
          <label className="text-sm font-bold text-slate-700 dark:text-[#e4e6eb] mb-1.5 block">
            {label}
          </label>
        )}
        <textarea
          ref={textareaRef}
          className={cn(
            "w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-4 pr-4 text-sm text-slate-800 outline-none transition-colors focus:bg-white focus:border-[#1877f2] dark:border-[#2d2e2f] dark:bg-[#242526] dark:text-[#e4e6eb] dark:placeholder:text-[#b0b3b8] dark:focus:bg-[#2d2e2f]",
            {
              "border-rose-300 focus:border-rose-400": !!error,
            },
            className
          )}
          style={{ minHeight: "40px" }}
          {...props}
        />
        {error ? (
          <p className="mt-1 text-xs font-semibold text-rose-600">{error}</p>
        ) : null}
      </>
    )
  }
);
Textarea.displayName = "Textarea";