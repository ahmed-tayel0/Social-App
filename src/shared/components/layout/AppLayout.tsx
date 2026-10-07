import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import PageContainer from "./PageContainer";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

export default function AppLayout() {
  useCurrentUser();
  return (
    <div className="relative min-h-screen bg-[#f0f2f5] dark:bg-[#0a0a0a]">
      {/* Decorative blue blobs (dark mode only) */}
      <div
        className="pointer-events-none fixed inset-0 hidden overflow-hidden dark:block"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 h-125 w-125 rounded-full bg-[#1877f2] opacity-[0.07] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-125 w-125 rounded-full bg-[#1877f2] opacity-[0.07] blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5c9dff] opacity-[0.03] blur-3xl" />
      </div>
      {/* Light Mode — soft mesh gradient blobs */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden dark:hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 h-125 w-125 rounded-full bg-[#1877f2] opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-125 w-125 rounded-full bg-[#8b5cf6] opacity-20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06b6d4] opacity-15 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 h-100 w-100 rounded-full bg-[#ec4899] opacity-10 blur-3xl" />
      </div>

      <div className="relative">
        <Navbar />
        <PageContainer>
          <Outlet />
        </PageContainer>
      </div>
    </div>
  );
}
