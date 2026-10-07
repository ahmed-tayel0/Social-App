import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/app/hooks";
import { setCredentials } from "../authSlice";
import { signUp } from "../authApi";
import type { RegisterFormValues } from "../authSchemas";

export function useRegister() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: RegisterFormValues) => signUp(values),
    onSuccess: (res) => {
      dispatch(setCredentials({ token: res.data.token, user: res.data.user }));
      toast.success("Account created successfully!");
      navigate("/feed", { replace: true });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}