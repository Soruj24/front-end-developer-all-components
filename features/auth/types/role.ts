export const USER_ROLES = [
  "guest",
  "member",
  "creator",
  "moderator",
  "admin",
  "super_admin",
] as const;
export type UserRole = (typeof USER_ROLES)[number];

export type PermissionKey =
  | "comment"
  | "publish"
  | "edit_own"
  | "delete_own"
  | "moderate"
  | "manage_users"
  | "manage_platform"
  | "manage_registry"
  | "use_ai_tools"
  | "manage_api_keys";

export type AuthMethod =
  | "credentials"
  | "google"
  | "github"
  | "microsoft"
  | "gitlab"
  | "magic"
  | "passkey";

export type LoginEventStatus = "success" | "failed";

export interface PublicUser {
  id: string;
  name: string;
  username?: string;
  email: string;
  role: UserRole;
  emailVerified: boolean;
  avatarUrl?: string | null;
}