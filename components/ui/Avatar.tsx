import { HTMLAttributes, forwardRef } from "react";

type Size = "sm" | "md" | "lg" | "xl";
type Status = "online" | "offline" | "away" | "busy";

const sizeClasses: Record<Size, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const statusClasses: Record<Status, string> = {
  online: "bg-success",
  offline: "bg-muted-foreground",
  away: "bg-warning",
  busy: "bg-danger",
};

const statusSizeClasses: Record<Size, string> = {
  sm: "h-2 w-2 right-0 bottom-0",
  md: "h-2.5 w-2.5 right-0 bottom-0",
  lg: "h-3 w-3 right-0 bottom-0",
  xl: "h-3.5 w-3.5 right-0.5 bottom-0.5",
};

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: Size;
  src?: string;
  alt: string;
  fallback: string;
  status?: Status;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = "", size = "md", src, alt, fallback, status, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative inline-flex items-center justify-center rounded-full bg-muted ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {src ? (
          <img src={src} alt={alt} className="h-full w-full rounded-full object-cover" />
        ) : (
          <span className="font-medium text-muted-foreground">{fallback}</span>
        )}
        {status && (
          <span
            className={`absolute rounded-full border-2 border-background ${statusClasses[status]} ${statusSizeClasses[size]}`}
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export default Avatar;
export { Avatar };
