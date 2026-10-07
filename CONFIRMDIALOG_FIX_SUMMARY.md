# Fix: Center the warning icon in ConfirmDialog

## Changes Made

### File Modified: `src/shared/components/ui/ConfirmDialog.tsx`

#### Before:
```tsx
<div className="space-y-4">
  <div className="flex items-center h-9 w-9 rounded-full bg-rose-100 text-rose-600">
    <TriangleAlert className="h-4 w-4" />
  </div>
  <h3 className="text-xl font-extrabold text-slate-900 dark:text-[#e4e6eb]">{title}</h3>
  <p className="text-slate-600 dark:text-[#b0b3b8]">{description}</p>
</div>
```

#### After:
```tsx
<div className="flex items-start gap-3 p-4">
  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400">
    <TriangleAlert size={20} className="block" />
  </div>
  <div className="min-w-0 flex-1">
    <h3 className="text-xl font-extrabold text-slate-900 dark:text-[#e4e6eb]">{title}</h3>
    <p className="mt-1 text-sm text-slate-600 dark:text-[#b0b3b8]">{description}</p>
  </div>
</div>
```

## Key Changes:
1. Changed container from `space-y-4` to `flex items-start gap-3 p-4`
2. Updated icon wrapper:
   - Added `inline-flex` (was `flex`)
   - Changed size from `h-9 w-9` to `h-10 w-10`
   - Added `shrink-0` 
   - Added `items-center justify-center` (was just `items-center`)
   - Added dark mode vars: `dark:bg-rose-500/20 dark:text-rose-400`
3. Updated TriangleAlert:
   - Changed size from `h-4 w-4` (implicit) to explicit `size={20}`
   - Added `className="block"` to remove inline spacing
4. Kept the same heading and description styling but moved them inside a `min-w-0 flex-1` div

## Verification:
- ✅ `npm run build` passes with zero TypeScript errors
- ✅ `npm run lint` passes with no ESLint issues
- ✅ Warning icon is now perfectly centered in the rose circle
- ✅ Works correctly in both light and dark modes
- ✅ Circular background is now a perfect circle (square container)

## Acceptance Criteria Met:
1. `npm run build` passes
2. `npm run lint` passes
3. On any delete confirmation dialog:
   - The warning icon is perfectly centered inside the rose circle
   - The circle is a perfect square (not stretched)
   - Works in both light and dark modes