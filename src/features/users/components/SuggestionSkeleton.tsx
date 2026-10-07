export default function SuggestionSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border:#2d2e2f p-3">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-slate-200 dark:bg:#2d2e2f" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200 dark:bg:#2d2e2f" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200 dark:bg:#2d2e2f" />
          <div className="flex gap-2 pt-1">
            <div className="h-4 w-20 animate-pulse rounded-full bg-slate-200 dark:bg:#2d2e2f" />
            <div className="h-4 w-16 animate-pulse rounded-full bg-slate-200 dark:bg:#2d2e2f" />
          </div>
        </div>
        <div className="h-8 w-16 shrink-0 animate-pulse rounded-full bg-slate-200 dark:bg:#2d2e2f" />
      </div>
    </div>
  );
}

