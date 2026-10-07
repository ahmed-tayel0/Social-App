export interface User {
  _id: string;
  name: string;
  username?: string;
  email: string;
  photo?: string;
  cover?: string;
  gender?: "male" | "female";
  dateOfBirth?: string;
  followersCount?: number;
  followingCount?: number;
  mutualFollowersCount?: number;
  bookmarksCount?: number;
  following?: string[];
  followers?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export type PostPrivacy = "public" | "following" | "only_me";

export interface Post {
  _id: string;
  body?: string;
  image?: string;
  privacy?: PostPrivacy;
  user: User;
  likes: string[];
  likesCount?: number;
  sharesCount?: number;
  commentsCount?: number;
  bookmarked?: boolean;
  sharedPost?: Post | null;
  sharedPostUnavailable?: boolean;
  topComment?: Comment | null;
  createdAt: string;
  updatedAt?: string;
}

export interface Comment {
  _id: string;
  content?: string;
  image?: string;
  commentCreator: User;
  post?: string;
  parentComment?: string | null;
  likes: string[];
  likesCount?: number;
  repliesCount?: number;
  createdAt: string;
  updatedAt?: string;
}

export type NotificationType =
  | "like_post"
  | "like_comment"
  | "comment_post"
  | "reply_comment"
  | "share_post"
  | "follow_user"
  | string;

export interface Notification {
  _id: string;
  type: NotificationType;
  actor: User;
  entityType: "post" | "comment" | "user";
  entity?: Post | Comment | User | null;
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}

export interface Pagination {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
  total?: number;
}

export interface ApiResponse<T = unknown> {
  message: string;
  data: T;
  meta?: { pagination?: Pagination };
  status?: string;
}
