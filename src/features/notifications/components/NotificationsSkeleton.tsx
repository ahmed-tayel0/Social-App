export default function NotificationsSkeleton() {
  return (
    <div className="space-y-2 p-3 sm:p-4">
      {/* Skeleton row 1 */}
      <div className="flex gap-3 rounded-xl border p-3 sm:rounded-2xl sm:p-4">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-200 dark:bg-[#2d2e2f]" />
        <div className="flex-1 min-w-0 space-y-1">
          <div className="h-4 bg-slate-200 dark:bg-[#2d2e2f] rounded w-2/3" />
          <div className="h-2 bg-slate-200 dark:bg-[#2d2e2f] rounded w-1/2" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="h-2 bg-slate-200 dark:bg-[#2d2e2f] rounded w-1/3" />
          <div className="h-2 bg-slate-200 dark:bg-[#2d2e2f] rounded w-1/3" />
        </div>
      </div>

      {/* Skeleton row 2 */}
      <div className="flex gap-3 rounded-xl border p-3 sm:rounded-2xl sm:p-4">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-200 dark:bg-[#2d2e2f]" />
        <div className="flex-1 min-w-0 space-y-1">
          <div className="h-4 bg-slate-200 dark:bg-[#2d2e2f] rounded w-2/3" />
          <div className="h-2 bg-slate-200 dark:bg-[#2d2e2f] rounded w-1/2" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="h-2 bg-slate-200 dark:bg-[#2d2e2f] rounded w-1/3" />
          <div className="h-2 bg-slate-200 dark:bg-[#2d2e2f] rounded w-1/3" />
        </div>
      </div>

      {/* Skeleton row 3 */}
      <div className="flex gap-3 rounded-xl border p-3 sm:rounded-2xl sm:p-4">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-200 dark:bg-[#2d2e2f]" />
        <div className="flex-1 min-w-0 space-y-1">
          <div className="h-4 bg-slate-200 dark:bg-[#2d2e2f] rounded w-2/3" />
          <div className="h-2 bg-slate-200 dark:bg-[#2d2e2f] rounded w-1/2" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="h-2 bg-slate-200 dark:bg-[#2d2e2f] rounded w-1/3" />
          <div className="h-2 bg-slate-200 dark:bg-[#2d2e2f] rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}