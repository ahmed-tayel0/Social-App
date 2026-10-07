import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Search, RefreshCw } from "lucide-react";
import { useSuggestions, useUserSearch } from "@/features/users/hooks";
import SuggestionCard from "@/features/users/components/SuggestionCard";
import SuggestionSkeleton from "@/features/users/components/SuggestionSkeleton";
import type { User } from "@/shared/types";

export default function SuggestedFriends() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  const isSearching = debounced.length >= 2;
  const searchQuery = useUserSearch(debounced);
  const suggestionsQuery = useSuggestions(5);

  const activeQuery = isSearching ? searchQuery : suggestionsQuery;
  const users = activeQuery.data?.users ?? [];
  const isLoading = activeQuery.isLoading;
  const isError = activeQuery.isError;

  const handleRefresh = () => {
    suggestionsQuery.refetch();
  };

  const showRefresh = !isSearching && !isLoading;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white dark:border-[#2d2e2f] dark:bg-[#18191a] p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-[#1877f2]" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-[#e4e6eb]">
            Suggested Friends
          </h3>
          {!isSearching && users.length > 0 ? (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-100 px-1.5 text-[10px] font-bold text-slate-600">
              {users.length}
            </span>
          ) : null}
        </div>
        {showRefresh ? (
          <button
            type="button"
            onClick={handleRefresh}
            disabled={suggestionsQuery.isFetching}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] dark:text:#5c9dff transition hover:bg-[#e7f3ff] dark:hover:bg-[#2d2e2f] disabled:opacity-50"
            title="Refresh suggestions"
          >
            <RefreshCw
              size={13}
              className={suggestionsQuery.isFetching ? "animate-spin" : ""}
            />
            <span>Refresh</span>
          </button>
        ) : null}
      </div>

      {/* Search input */}
      <div className="mb-3">
        <div className="relative">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search friends..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-500 focus:border-[#1877f2] focus:bg-white dark:border-[#2d2e2f] dark:bg-[#242526] dark:text-[#e4e6eb] dark:placeholder:text-[#b0b3b8] dark:focus:bg-[#2d2e2f] dark:focus:border-[#5c9dff]"
          />
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="space-y-2">
          <SuggestionSkeleton />
          <SuggestionSkeleton />
          <SuggestionSkeleton />
        </div>
      ) : isError ? (
        <p className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-center text-xs font-semibold text-rose-600">
          Failed to load suggestions.
        </p>
      ) : users.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 dark:border-[#2d2e2f] dark:bg-[#242526] p-6 text-center">
          <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#eef3ff] text-[#1877f2]">
            <Users size={18} />
          </div>
          <p className="text-sm font-bold text-slate-800 dark:text-[#e4e6eb]">
            {isSearching ? "No users matched" : "No suggestions right now"}
          </p>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-[#b0b3b8]">
            {isSearching ? "Try a different search." : "Check back later for new people."}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {users.slice(0, 5).map((u: User) => (
            <SuggestionCard key={u._id} user={u} />
          ))}
        </div>
      )}

      {/* View more */}
      {!isSearching && users.length > 0 ? (
        <button
          type="button"
          onClick={() => navigate("/suggestions")}
          className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 dark:border-[#3a3b3c] dark:bg-[#2d2e2f] dark:text-[#5c9dff] dark:hover:bg-[#3a3b3c] dark:hover:text-[#7eaeff]"
        >
          View more
        </button>
      ) : null}
    </div>
  );
}
