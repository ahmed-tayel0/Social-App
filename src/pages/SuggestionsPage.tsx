import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Search } from "lucide-react";
import { useInfiniteSuggestions, useInfiniteUserSearch } from "@/features/users/hooks";
import SuggestionCard from "@/features/users/components/SuggestionCard";
import SuggestionSkeleton from "@/features/users/components/SuggestionSkeleton";

export default function SuggestionsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  const isSearching = debounced.length >= 2;

  const searchQuery = useInfiniteUserSearch(debounced);
  const suggestionsQuery = useInfiniteSuggestions(20);

  const activeQuery = isSearching ? searchQuery : suggestionsQuery;

  const allUsers = activeQuery.data?.pages.flatMap((p) => p.users) ?? [];
  const isLoading = activeQuery.isLoading;
  const isError = activeQuery.isError;
  const hasNextPage = activeQuery.hasNextPage;
  const isFetchingNextPage = activeQuery.isFetchingNextPage;
  const fetchNextPage = activeQuery.fetchNextPage;

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-[#2d2e2f] dark:bg-[#18191a] dark:text-[#e4e6eb] dark:hover:bg-[#242526]"
      >
        <ArrowLeft size={16} />
        Back to feed
      </button>

      {/* Header + search */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-[#2d2e2f] dark:bg-[#18191a]">
        <div className="mb-3 flex items-center gap-2">
          <Users size={18} className="text-[#1877f2] dark:text-[#5c9dff]" />
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-[#e4e6eb]">
            Suggested Friends
          </h1>
          {!isSearching && allUsers.length > 0 ? (
            <span className="inline-flex h-5 min-w-6 items-center justify-center rounded-full bg-slate-100 px-2 text-xs font-bold text-slate-600 dark:bg-[#2d2e2f] dark:text-[#b0b3b8]">
              {allUsers.length}
            </span>
          ) : null}
        </div>

        <div className="relative">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#b0b3b8]"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or username..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-[#1877f2] focus:bg-white dark:border-[#2d2e2f] dark:bg-[#242526] dark:text-[#e4e6eb] dark:placeholder:text-[#b0b3b8] dark:focus:border-[#5c9dff] dark:focus:bg-[#2d2e2f]"
          />
        </div>
      </section>

      {/* Content */}
      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <SuggestionSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-sm font-semibold text-rose-700">
          Failed to load suggestions. Please try again.
        </div>
      ) : allUsers.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-[#2d2e2f] dark:bg-[#18191a]">
          <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3ff] text-[#1877f2] dark:bg-[#263951] dark:text-[#5c9dff]">
            <Users size={22} />
          </div>
          <p className="text-lg font-extrabold text-slate-800 dark:text-[#e4e6eb]">
            {isSearching ? "No users matched" : "No suggestions right now"}
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-[#b0b3b8]">
            {isSearching ? "Try a different search." : "Check back later for new people."}
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            {allUsers.map((u) => (
              <SuggestionCard key={u._id} user={u} />
            ))}
          </div>

          {hasNextPage ? (
            <button
              type="button"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="mx-auto block rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-[#3a3b3c] dark:bg-[#2d2e2f] dark:text-[#5c9dff] dark:hover:bg-[#3a3b3c] dark:hover:text-[#7eaeff] disabled:opacity-60"
            >
              {isFetchingNextPage ? "Loading..." : "Load more"}
            </button>
          ) : (
            <p className="text-center text-xs font-semibold text-slate-400">
              You reached the end
            </p>
          )}
        </>
      )}
    </div>
  );
}
