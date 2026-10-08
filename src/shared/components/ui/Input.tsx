import { forwardRef } from "react";
import { cn } from "@/shared/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className, ...props }, ref) => {
    return (
      <>
        {label && (
          <label className="mb-1.5 block text-sm font-bold text-slate-100 dark:text-[#e4e6eb]">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#b0b3b8]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-4 text-sm text-slate-800 outline-none transition-colors dark:border-[#2d2e2f] dark:bg-[#242526] dark:text-[#e4e6eb] dark:placeholder:text-[#b0b3b8]",
              icon ? "pl-11" : "pl-4",
              "focus:bg-white focus:border-[#1877f2] dark:focus:bg-[#2d2e2f] dark:focus:border-[#5c9dff]",
              {
                "border-rose-300 focus:border-rose-400": !!error,
                "dark:border-rose-500/50 dark:focus:border-rose-400": !!error,
              },
              className
            )}
            {...props}
          />
        </div>
        {error ? (
          <p className="mt-1 text-xs font-semibold text-rose-600">{error}</p>
        ) : hint ? (
          <p className="mt-1 text-xs font-medium text-slate-500 dark:text-[#b0b3b8]">
            {hint}
          </p>
        ) : null}
      </>
    );
  }
);

Input.displayName = "Input";
