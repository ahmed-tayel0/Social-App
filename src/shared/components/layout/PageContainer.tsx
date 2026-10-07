import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PageContainer({ children, className }: PageContainerProps) {
  return <div className={cn("mx-auto max-w-7xl px-3 py-4", className)}>{children}</div>;
}
