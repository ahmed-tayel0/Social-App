import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#eef3ff] text-[#1877f2]">
          <Compass size={28} />
        </div>
        <h1 className="text-3xl font-black text-slate-900">404</h1>
        <p className="mt-2 text-lg font-bold text-slate-700">
          Page not found
        </p>
        <p className="mt-1 text-sm text-slate-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/feed")}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#1877f2] px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#166fe5]"
        >
          Go to Feed
        </button>
      </div>
    </div>
  );
}