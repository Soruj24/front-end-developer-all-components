import type { PermissionKey, UserRole } from "../types/role";

const ROLE_RANK: Record<UserRole, number> = {
  guest: 0,
  member: 1,
  creator: 2,
  moderator: 3,
  admin: 4,
  super_admin: 5,
};

/** Grant map — a role inherits every permission listed for roles at or below it. */
const PERMISSION_GRANTS: Record<UserRole, PermissionKey[]> = {
  guest: [],
  member: ["comment"],
  creator: ["comment", "publish", "edit_own", "delete_own", "use_ai_tools"],
  moderator: ["comment", "publish", "edit_own", "delete_own", "use_ai_tools", "moderate"],
  admin: [
    "comment",
    "publish",
    "edit_own",
    "delete_own",
    "use_ai_tools",
    "moderate",
    "manage_users",
    "manage_api_keys",
    "manage_registry",
  ],
  super_admin: [
    "comment",
    "publish",
    "edit_own",
    "delete_own",
    "use_ai_tools",
    "moderate",
    "manage_users",
    "manage_api_keys",
    "manage_registry",
    "manage_platform",
  ],
};

export function roleRank(role: UserRole): number {
  return ROLE_RANK[role];
}

export function hasRole(role: UserRole | undefined, minimum: UserRole): boolean {
  if (!role) return false;
  return ROLE_RANK[role] >= ROLE_RANK[minimum];
}

export function hasPermission(
  role: UserRole | undefined,
  permission: PermissionKey
): boolean {
  if (!role) return false;
  return PERMISSION_GRANTS[role].includes(permission);
}

export function roleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    guest: "Guest",
    member: "Member",
    creator: "Creator",
    moderator: "Moderator",
    admin: "Admin",
    super_admin: "Super Admin",
  };
  return labels[role];
}