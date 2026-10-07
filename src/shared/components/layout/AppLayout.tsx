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

      <div className="relative">
        <Navbar />
        <PageContainer>
          <Outlet />
        </PageContainer>
      </div>
    </div>
  );
}
