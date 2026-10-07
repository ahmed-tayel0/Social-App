import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/features/auth/authSchemas";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { User, KeyRound } from "lucide-react";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useLogin();

  const onSubmit = (data: LoginFormValues) => {
    mutate(data);
  };

  return (
    <form className="space-y-3.5" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Email or username
        </label>
        <Input
          {...register("login")}
          icon={<User className="h-4 w-4" />}
          placeholder="Enter email or username"
          error={errors.login?.message}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Password
        </label>
        <Input
          {...register("password")}
          icon={<KeyRound className="h-4 w-4" />}
          placeholder="Enter password"
          type="password"
          error={errors.password?.message}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-[#00298d] hover:bg-[#001f6b] text-white font-extrabold rounded-xl py-3"
        disabled={isPending}
      >
        {isPending ? "Please wait..." : "Log In"}
      </Button>

      <button type="button" className="mt-2 text-sm font-semibold text-[#00298d] dark:text-[#5c9dff] hover:underline w-full">
        Forgot password?
      </button>
    </form>
  );
}