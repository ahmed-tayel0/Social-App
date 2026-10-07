import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "@/app/hooks";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setUser, clearCredentials } from "../authSlice";
import { fetchMyProfile } from "@/shared/api/usersApi";
import { useAppSelector } from "@/app/hooks";
import type { User } from "@/shared/types";

export function useCurrentUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);

  const {
    data: user,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<User, Error, User, (string | null)[]>({
    queryKey: ["auth", "me", token],
    queryFn: fetchMyProfile,
    enabled: !!token,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    gcTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (isSuccess && user) {
      dispatch(setUser(user));
    }
  }, [isSuccess, user, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(clearCredentials());
      navigate("/auth", { replace: true });
      toast.error("Session expired. Please log in again.");
    }
  }, [isError, dispatch, navigate]);

  return { user, isLoading, isError };
}
