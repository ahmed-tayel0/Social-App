import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "@/app/hooks";
import toast from "react-hot-toast";
import { changePassword } from "../authApi";
import { setCredentials } from "../authSlice";
import type { ChangePasswordFormValues } from "../authSchemas";

export function useChangePassword() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (values: ChangePasswordFormValues) => changePassword(values),
    onSuccess: (res) => {
      const newToken = res?.data?.token ?? res?.token;
      if (newToken) {
        dispatch(setCredentials({ token: newToken }));
      }
      toast.success("Password changed successfully");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
