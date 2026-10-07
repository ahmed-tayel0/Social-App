import { KeyRound, Palette } from "lucide-react";
import { ChangePasswordForm, ThemeToggle } from "@/features/settings/components";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {/* Appearance */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-[#2d2e2f] dark:bg-[#18191a]">
        <div className="mb-5 flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e7f3ff] text-[#1877f2] dark:bg-[#2d2e2f]">
            <Palette size={18} />
          </span>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-[#e4e6eb]">
              Appearance
            </h1>
            <p className="text-sm text-slate-500 dark:text-[#b0b3b8]">
              Choose how Route Social looks to you.
            </p>
          </div>
        </div>
        <ThemeToggle />
      </section>

      {/* Change Password */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-[#2d2e2f] dark:bg-[#18191a]">
        <div className="mb-5 flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e7f3ff] text-[#1877f2] dark:bg-[#2d2e2f]">
            <KeyRound size={18} />
          </span>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-[#e4e6eb]">
              Change Password
            </h1>
            <p className="text-sm text-slate-500 dark:text-[#b0b3b8]">
              Keep your account secure by using a strong password.
            </p>
          </div>
        </div>
        <ChangePasswordForm />
      </section>
    </div>
  );
}
