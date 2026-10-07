import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound } from "lucide-react";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { useChangePassword } from "@/features/auth/hooks/useChangePassword";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "@/features/auth/authSchemas";

export default function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const mutation = useChangePassword();

  const onSubmit = (values: ChangePasswordFormValues) => {
    mutation.mutate(values, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input
        type="password"
        label="Current password"
        placeholder="Enter current password"
        icon={<KeyRound size={16} />}
        error={errors.currentPassword?.message}
        {...register("currentPassword")}
      />
      <Input
        type="password"
        label="New password"
        placeholder="Enter new password"
        icon={<KeyRound size={16} />}
        error={errors.newPassword?.message}
        hint="At least 8 characters with uppercase, lowercase, number, and special character."
        {...register("newPassword")}
      />
      <Input
        type="password"
        label="Confirm new password"
        placeholder="Re-enter new password"
        icon={<KeyRound size={16} />}
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <Button
        type="submit"
        fullWidth
        isLoading={mutation.isPending}
        disabled={!isValid || mutation.isPending}
      >
        {mutation.isPending ? "Updating password..." : "Update password"}
      </Button>
    </form>
  );
}
