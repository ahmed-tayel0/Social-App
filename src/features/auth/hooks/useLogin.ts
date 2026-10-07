import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/app/hooks";
import { setCredentials } from "../authSlice";
import { signIn } from "../authApi";
import type { LoginFormValues } from "../authSchemas";

export function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: LoginFormValues) => signIn(values),
    onSuccess: (res) => {
      dispatch(setCredentials({ token: res.data.token, user: res.data.user }));
      toast.success("Welcome back!");
      navigate("/feed", { replace: true });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}