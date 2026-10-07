import { useState } from "react";
import { useAppSelector } from "@/app/hooks";
import { Navigate } from "react-router-dom";
import { LoginForm, RegisterForm } from "@/features/auth/components";
import PageContainer from "@/shared/components/layout/PageContainer";
import ThemeToggleButton from "@/shared/components/ui/ThemeToggleButton";
export default function AuthPage() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/feed" replace />;
  }

  return (
    <PageContainer className="min-h-screen bg-[#f0f2f5] px-4 py-8 sm:py-12 lg:flex lg:items-center dark:bg-[#0a0a0a]">
      <div
        className="pointer-events-none fixed inset-0 hidden overflow-hidden dark:block"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#1877f2] opacity-[0.09] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#1877f2] opacity-[0.09] blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5c9dff] opacity-[0.05] blur-3xl" />
      </div>
      <div className="fixed right-4 top-4 z-50">
        <ThemeToggleButton />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left section: About Route Academy (hidden on mobile, visible on lg) */}
        <div className="hidden lg:flex lg:flex-col lg:items-start lg:gap-6">
          <h1 className="text-5xl font-extrabold tracking-tight text-[#00298d] dark:text-[#5c9dff] sm:text-6xl">
            Route Posts
          </h1>
          <p className="mt-4 text-2xl font-medium leading-snug text-slate-800 dark:text-[#e4e6eb]">
            Connect with friends and the world around you on Route Posts.
          </p>
          <div className="mt-6 rounded-2xl border border-[#c9d5ff] bg-white/80 dark:border-[#2d2e2f] dark:bg-[#18191a]/90 p-4 shadow-sm backdrop-blur sm:p-5">
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#00298d] dark:text-[#5c9dff]">
              ABOUT ROUTE ACADEMY
            </p>
            <p className="mt-1 text-lg font-bold text-slate-900 dark:text-[#e4e6eb]">
              Egypt's Leading IT Training Center Since 2012
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-[#b0b3b8]">
              Route Academy provides comprehensive IT training programs designed to equip
              students with the skills needed for today's tech industry. With experienced
              instructors and hands-on projects, we bridge the gap between theory and
              practice.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2 dark:border-[#2d2e2f] dark:bg-[#242526]">
                <p className="text-base font-extrabold text-[#00298d] dark:text-[#5c9dff]">2012</p>
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600 dark:text-[#b0b3b8]">
                  FOUNDED
                </p>
              </div>
              <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2 dark:border-[#2d2e2f] dark:bg-[#242526]">
                <p className="text-base font-extrabold text-[#00298d] dark:text-[#5c9dff]">40K+</p>
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600 dark:text-[#b0b3b8]">
                  GRADUATES
                </p>
              </div>
              <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2 dark:border-[#2d2e2f] dark:bg-[#242526]">
                <p className="text-base font-extrabold text-[#00298d] dark:text-[#5c9dff]">50+</p>
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600 dark:text-[#b0b3b8]">
                  PARTNER COMPANIES
                </p>
              </div>
              <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2 dark:border-[#2d2e2f] dark:bg-[#242526]">
                <p className="text-base font-extrabold text-[#00298d] dark:text-[#5c9dff]">5</p>
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600 dark:text-[#b0b3b8]">
                  BRANCHES
                </p>
              </div>
              <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2 dark:border-[#2d2e2f] dark:bg-[#242526]">
                <p className="text-base font-extrabold text-[#00298d] dark:text-[#5c9dff]">20</p>
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600 dark:text-[#b0b3b8]">
                  DIPLOMAS AVAILABLE
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right section: Auth card */}
        <div className="w-full max-w-107.5">
          {/* On mobile only: small heading and subheading */}
          <div className="lg:hidden">
            <h1 className="text-3xl font-extrabold text-[#00298d] dark:text-[#5c9dff]">Route Posts</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-[#b0b3b8]">
              Connect with friends and the world around you on Route Posts.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 sm:p-6 dark:bg-[#18191a]">
            {/* Tabs pill */}
            <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-100 dark:bg-[#242526] p-1">
              <button
                onClick={() => setTab("signin")}
                className={`
                  rounded-lg py-2 text-sm font-extrabold transition-colors
                  ${tab === "signin" ? "bg-white text-[#00298d] shadow-sm dark:bg-[#3a3b3c] dark:text-[#5c9dff]" : "text-slate-600 hover:text-slate-800 dark:text-[#b0b3b8] dark:hover:text-white"}
                `}
              >
                Login
              </button>
              <button
                onClick={() => setTab("signup")}
                className={`
                  rounded-lg py-2 text-sm font-extrabold transition-colors
                  ${tab === "signup" ? "bg-white text-[#00298d] shadow-sm dark:bg-[#3a3b3c] dark:text-[#5c9dff]" : "text-slate-600 hover:text-slate-800 dark:text-[#b0b3b8] dark:hover:text-white"}
                `}
              >
                Register
              </button>
            </div>

            {/* Heading and subheading */}
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-[#e4e6eb]">
              {tab === "signin" ? "Log in to Route Posts" : "Create New Account"}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-[#b0b3b8]">
              {tab === "signin"
                ? "Log in and continue your social journey."
                : "Join the Route Posts community today."}
            </p>

            {/* Form */}
            {tab === "signin" ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
