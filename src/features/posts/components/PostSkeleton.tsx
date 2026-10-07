
export default function PostSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white dark:border-[#2d2e2f] dark:bg-[#18191a] shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-[#2d2e2f] animate-pulse" />
          <div className="space-y-1">
            <div className="h-3 w-24 rounded bg-slate-200 dark:bg-[#2d2e2f] animate-pulse" />
            <div className="h-2 w-20 rounded bg-slate-200 dark:bg-[#2d2e2f] animate-pulse" />
          </div>
        </div>
      </div>
      <div className="px-4 pb-3">
        <div className="h-3 w-36 rounded bg-slate-200 dark:bg-[#2d2e2f] animate-pulse mb-1" />
        <div className="h-3 w-48 rounded bg-slate-200 dark:bg-[#2d2e2f] animate-pulse mb-1" />
        <div className="h-3 w-32 rounded bg-slate-200 dark:bg-[#2d2e2f] animate-pulse mb-1" />
        <div className="h-3 w-24 rounded bg-slate-200 dark:bg-[#2d2e2f] animate-pulse" />
      </div>
      <div className="h-[620px] w-full bg-slate-200 dark:bg-[#2d2e2f] animate-pulse" />
      <div className="px-4 pb-2 pt-3 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center bg-slate-200 dark:bg-[#2d2e2f] animate-pulse rounded-full" />
          <span className="w-20 animate-pulse h-3 rounded bg-slate-200 dark:bg-[#2d2e2f]" />
        </div>
        <div className="flex justify-end">
          <span className="w-16 animate-pulse h-3 rounded bg-slate-200 dark:bg-[#2d2e2f]" />
          <span className="w-12 animate-pulse h-3 rounded bg-slate-200 dark:bg-[#2d2e2f]" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1 p-1">
        <div className="flex items-center justify-center gap-2 rounded-md p-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
          <div className="flex h-4 w-4 items-center justify-center bg-slate-200 dark:bg-[#2d2e2f] animate-pulse rounded-full" />
          <span className="w-16 animate-pulse h-3 rounded bg-slate-200 dark:bg-[#2d2e2f]" />
        </div>
        <div className="flex items-center justify-center gap-2 rounded-md p-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
          <span className="w-16 animate-pulse h-3 rounded bg-slate-200 dark:bg-[#2d2e2f]" />
        </div>
        <div className="flex items-center justify-center gap-2 rounded-md p-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
          <span className="w-20 animate-pulse h-3 rounded bg-slate-200 dark:bg-[#2d2e2f]" />
        </div>
      </div>
    </div>
  );
}

