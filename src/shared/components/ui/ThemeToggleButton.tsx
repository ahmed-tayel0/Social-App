import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/shared/hooks";

export default function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
      aria-label={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:scale-105 hover:bg-slate-100 dark:border-[#2d2e2f] dark:bg-[#18191a] dark:text-[#e4e6eb] dark:hover:bg-[#242526]"
    >
      {isDark ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
}