import { forwardRef } from "react";
import { Spinner } from "./Spinner";
import { cn } from "@/shared/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = "primary",
    size = "md",
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth,
    className,
    ...props
  }, ref) => {
    const baseClasses = "font-bold rounded-xl disabled:opacity-60 transition-colors";
    const variantClasses = {
      primary: "bg-[#1877f2] hover:bg-[#166fe5] text-white",
      secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-[#2d2e2f] dark:text-[#e4e6eb] dark:hover:bg-[#3a3b3c]",
      outline: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-[#2d2e2f] dark:bg-[#242526] dark:text-[#e4e6eb] dark:hover:bg-[#3a3b3c]",
      ghost: "text-slate-600 hover:bg-slate-100 dark:text-[#b0b3b8] dark:hover:bg-[#2d2e2f]",
      danger: "bg-rose-600 hover:bg-rose-700 text-white",
    }[variant];

    const sizeClasses = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2",
      lg: "px-5 py-3 text-lg",
    }[size];

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses,
          sizeClasses,
          isLoading && "cursor-not-allowed",
          fullWidth && "w-full",
          className
        )}
        {...props}
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner className="mr-2 h-4 w-4" />
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {props.children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
);
Button.displayName = "Button";