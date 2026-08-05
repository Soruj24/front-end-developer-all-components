import Image from "next/image";
import type { User } from "../types";

interface AvatarProps {
  user: User;
  size?: "sm" | "md" | "lg" | "xl";
  showOnline?: boolean;
}

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-16 w-16",
  xl: "h-20 w-20",
};

export function Avatar({ user, size = "md", showOnline }: AvatarProps) {
  return (
    <div className="relative shrink-0">
      <div className={`${sizeMap[size]} relative overflow-hidden rounded-full`}>
        <Image src={user.image} alt={user.name} fill className="object-cover" sizes="80px" />
      </div>
      {showOnline && user.online && (
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-zinc-900" />
      )}
    </div>
  );
}
