import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { uploadProfilePhoto, uploadCoverPhoto, removeCoverPhoto } from "../profileApi";
import toast from "react-hot-toast";

export function useUploadPhoto() {
  const token = useAppSelector((s) => s.auth.token);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ file, privacy }: { file: File; privacy: string }) =>
      uploadProfilePhoto(file, privacy),
    onSuccess: () => {
      toast.success("Profile photo updated");
      qc.invalidateQueries({ queryKey: ["auth", "me", token] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useUploadCover() {
  const token = useAppSelector((s) => s.auth.token);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ file, privacy }: { file: File; privacy: string }) =>
      uploadCoverPhoto(file, privacy),
    onSuccess: () => {
      toast.success("Cover updated");
      qc.invalidateQueries({ queryKey: ["auth", "me", token] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useRemoveCover() {
  const token = useAppSelector((s) => s.auth.token);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: removeCoverPhoto,
    onSuccess: () => {
      toast.success("Cover removed");
      qc.invalidateQueries({ queryKey: ["auth", "me", token] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
}