import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { DEFAULT_PROFILE_IMAGE } from "@/shared/lib/constants";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

export const Avatar = ({ src, alt = "", size = 40, className }: AvatarProps) => {
  const [avatarSrc, setAvatarSrc] = useState<string>(src ?? DEFAULT_PROFILE_IMAGE);

  const handleError = () => {
    setAvatarSrc(DEFAULT_PROFILE_IMAGE);
  };

  return (
    <img
      src={avatarSrc}
      alt={alt}
      width={size}
      height={size}
      className={cn(
        "rounded-full object-cover",
        className
      )}
      onError={handleError}
    />
  );
};
Avatar.displayName = "Avatar";