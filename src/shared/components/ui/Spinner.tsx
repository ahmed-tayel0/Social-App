import { LoaderCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface SpinnerProps {
  size?: number;
  className?: string;
}

export const Spinner = ({ size = 16, className }: SpinnerProps) => {
  return (
    <LoaderCircle
      className={cn(
        `h-${size} w-${size} animate-spin`,
        className
      )}
    />
  );
};
Spinner.displayName = "Spinner";