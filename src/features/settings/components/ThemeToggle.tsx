import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme, type Theme } from "@/shared/hooks";

const OPTIONS: { value: Theme; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-100 p-1.5 dark:bg-[#242526]">
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-pressed={active}
            className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition ${
              active
                ? "bg-white text-[#1877f2] shadow-sm dark:bg-[#3a3b3c] dark:text-white"
                : "text-slate-600 hover:text-slate-900 dark:text-[#b0b3b8] dark:hover:text-white"
            }`}
          >
            <Icon size={15} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
