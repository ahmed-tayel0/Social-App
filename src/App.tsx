import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";
import AppLayout from "@/shared/components/layout/AppLayout";
import ScrollToTop from "@/shared/components/layout/ScrollToTop";

const AuthPage = lazy(() => import("@/pages/AuthPage"));
const FeedPage = lazy(() => import("@/pages/FeedPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const UserProfilePage = lazy(() => import("@/pages/UserProfilePage"));
const NotificationsPage = lazy(() => import("@/pages/NotificationsPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const PostDetailsPage = lazy(() => import("@/pages/PostDetailsPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const SuggestionsPage = lazy(() => import("@/pages/SuggestionsPage"));

// Loading fallback
function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#f0f2f5] dark:bg-[#0a0a0a]">
      {/* Background glow effects (dark mode only) */}
      <div
        className="pointer-events-none absolute inset-0 hidden dark:block"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 h-125 w-125 rounded-full bg-[#1877f2] opacity-[0.09] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-125 w-125 rounded-full bg-[#1877f2] opacity-[0.09] blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5c9dff] opacity-[0.05] blur-3xl" />
      </div>

      {/* Logo + Spinner */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#00298d] dark:text-[#5c9dff] sm:text-4xl">
          Social App
        </h1>

        {/* Animated dots */}
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#1877f2] dark:bg-[#5c9dff]"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#1877f2] dark:bg-[#5c9dff]"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#1877f2] dark:bg-[#5c9dff]"
            style={{ animationDelay: "300ms" }}
          />
        </div>

        <p className="text-sm font-medium text-slate-500 dark:text-[#b0b3b8]">
          Loading your experience...
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/:userId" element={<UserProfilePage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/posts/:postId" element={<PostDetailsPage />} />
              <Route path="/suggestions" element={<SuggestionsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>
          <Route path="/" element={<Navigate to="/feed" replace />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
