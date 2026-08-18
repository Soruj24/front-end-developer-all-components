import { Heart, Bookmark, Download, Eye, MessageSquare, Tag, type LucideProps } from "lucide-react";

type IconProps = LucideProps & { filled?: boolean };

export function HeartIcon({ filled, className, ...props }: IconProps) {
  return (
    <Heart
      className={className}
      fill={filled ? "currentColor" : "none"}
      {...props}
    />
  );
}

export function BookmarkIcon({ filled, className, ...props }: IconProps) {
  return (
    <Bookmark
      className={className}
      fill={filled ? "currentColor" : "none"}
      {...props}
    />
  );
}

export { Download as DownloadIcon, Eye as EyeIcon, MessageSquare as CommentIcon, Tag as TagIcon };
