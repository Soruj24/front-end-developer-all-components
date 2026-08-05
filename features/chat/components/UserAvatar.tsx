"use client";

import type { User } from "../types/chat";

const statusColors: Record<string, string> = {
  online: "bg-green-500",
  away: "bg-yellow-500",
  busy: "bg-red-500",
  offline: "bg-zinc-600",
};

interface UserAvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
  showStatus?: boolean;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

export function UserAvatar({ user, size = "md", showStatus = true }: UserAvatarProps) {
  return (
    <div className="relative inline-flex shrink-0">
      <img
        src={user.avatar}
        alt={user.name}
        className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-zinc-800`}
      />
      {showStatus && (
        <span
          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-zinc-900 ${statusColors[user.status]}`}
        />
      )}
    </div>
  );
}
