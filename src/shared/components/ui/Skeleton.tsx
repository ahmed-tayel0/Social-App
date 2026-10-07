import { cn } from "@/shared/lib/utils";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div className={cn("animate-pulse rounded-md bg-slate-200 dark:bg-[#2d2e2f]", className)} />
  );
};
Skeleton.displayName = "Skeleton";