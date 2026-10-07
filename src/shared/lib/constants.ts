export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://route-posts.routemisr.com";

export const STORAGE_KEYS = {
  TOKEN: "route_posts_token",
  BASE_URL: "route_posts_base_url",
  USER: "route_posts_user",
} as const;

export const DEFAULT_PROFILE_IMAGE =
  "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png";

export const POSTS_PER_PAGE = 20;
export const COMMENTS_PER_PAGE = 5;
export const REPLIES_PER_PAGE = 10;
export const NOTIFICATIONS_PER_PAGE = 30;
export const NOTIFICATIONS_POLL_INTERVAL = 30_000; // 30s