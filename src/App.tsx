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
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#1877f2] border-t-transparent" />
        <span className="text-sm font-semibold text-slate-600">Loading...</span>
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
