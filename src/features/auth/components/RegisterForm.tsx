import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormValues } from "@/features/auth/authSchemas";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { Users, AtSign, ChevronDown, Calendar, KeyRound } from "lucide-react";

export default function RegisterForm() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });
  const { mutate, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-[#5c9dff]">Full name</label>
        <Input
          {...register("name")}
          icon={<Users className="h-4 w-4" />}
          placeholder="Full name"
          error={errors.name?.message}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-[#5c9dff]">Username</label>
        <Input
          {...register("username")}
          icon={<AtSign className="h-4 w-4" />}
          placeholder="Username"
          error={errors.username?.message}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-[#5c9dff]">Email address</label>
        <Input
          {...register("email")}
          icon={<AtSign className="h-4 w-4" />}
          type="email"
          placeholder="Email address"
          error={errors.email?.message}
        />
      </div>

      <div>
        <label
          htmlFor="gender"
          className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-[#5c9dff]"
        >
          Gender
        </label>
        <div className="relative">
          <Users
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#b0b3b8]"
          />
          <select
            id="gender"
            {...register("gender")}
            className={`w-full appearance-none rounded-xl border bg-slate-50 py-3 pl-11 pr-10 text-sm text-slate-800 outline-none transition-colors dark:bg-[#242526] dark:text-[#e4e6eb] ${
              errors.gender
                ? "border-rose-300 focus:border-rose-400 dark:border-rose-500/50"
                : "border-slate-200 focus:border-[#00298d] focus:bg-white dark:border-[#2d2e2f] dark:focus:border-[#5c9dff] dark:focus:bg-[#2d2e2f]"
            }`}
            style={{ colorScheme: "light dark" }}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#b0b3b8]"
          />
        </div>
        {errors.gender ? (
          <p className="mt-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
            {errors.gender.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-[#5c9dff]">Date of birth</label>
        <Input
          {...register("dateOfBirth")}
          icon={<Calendar className="h-4 w-4" />}
          type="date"
          placeholder="Date of birth"
          error={errors.dateOfBirth?.message}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-[#5c9dff]">Password</label>
        <Input
          {...register("password")}
          icon={<KeyRound className="h-4 w-4" />}
          type="password"
          placeholder="Password"
          error={errors.password?.message}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-[#5c9dff]">Confirm password</label>
        <Input
          {...register("rePassword")}
          icon={<KeyRound className="h-4 w-4" />}
          type="password"
          placeholder="Confirm password"
          error={errors.rePassword?.message}
        />
      </div>

      <Button
        type="submit"
        className="w-full rounded-xl py-3 text-base font-extrabold text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b]"
        disabled={isPending}
      >
        {isPending ? "Please wait..." : "Create New Account"}
      </Button>
    </form>
  );
}
