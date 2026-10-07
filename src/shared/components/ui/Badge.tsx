import { cn } from "@/shared/lib/utils";

interface BadgeProps {
  count: number;
  max?: number;
  className?: string;
}

export const Badge = ({ count, max = 99, className }: BadgeProps) => {
  if (count === 0) return null;

  const displayCount = count > max ? "99+" : String(count);

  return (
    <span className={cn(
      "inline-flex min-w-[16px] items-center justify-center rounded-full bg-[#ef4444] px-1 text-[10px] font-black leading-4 text-white",
      className
    )}>
      {displayCount}
    </span>
  );
};
Badge.displayName = "Badge";