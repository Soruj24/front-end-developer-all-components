import { HTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg" | "xl";
type Status = "online" | "offline" | "away" | "busy";

const sizeClasses: Record<Size, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const statusDot: Record<Status, string> = {
  online: "bg-emerald-500",
  offline: "bg-muted-foreground/50",
  away: "bg-amber-500",
  busy: "bg-rose-500",
};

const statusSize: Record<Size, string> = {
  sm: "h-2 w-2 border",
  md: "h-2.5 w-2.5 border-[1.5px]",
  lg: "h-3 w-3 border-2",
  xl: "h-3.5 w-3.5 border-2",
};

const fallbackGradient = [
  "from-blue-500 to-violet-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
  "from-violet-500 to-purple-500",
  "from-cyan-500 to-blue-500",
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: Size;
  src?: string;
  alt: string;
  fallback: string;
  status?: Status;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className = "",
      size = "md",
      src,
      alt,
      fallback,
      status,
      ...props
    },
    ref,
  ) => {
    const [imgFailed, setImgFailed] = useState(false);
    const showImage = src && !imgFailed;
    const gradient = fallbackGradient[hashString(fallback) % fallbackGradient.length];

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
          "ring-2 ring-background transition-shadow duration-150",
          sizeClasses[size],
          className,
        )}
        aria-label={alt}
        role="img"
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full rounded-full object-cover"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span
            className={cn(
              "flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white",
              gradient,
            )}
          >
            {fallback}
          </span>
        )}

        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 rounded-full border-background",
              statusDot[status],
              statusSize[size],
              status === "online" && "animate-pulse",
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  },
);
Avatar.displayName = "Avatar";

export default Avatar;
export { Avatar };
