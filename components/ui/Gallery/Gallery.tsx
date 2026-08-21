import { cn } from "@/lib/cn";
import type {
  GalleryProps,
  GalleryItemProps,
  GalleryImageProps,
} from "./Gallery.types";

const columnClasses: Record<number, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
};

export function Gallery({
  children,
  columns = 3,
  gap = 4,
  className,
}: GalleryProps) {
  return (
    <div className={cn("grid", columnClasses[columns], `gap-${gap}`, className)}>
      {children}
    </div>
  );
}

export function GalleryItem({ children, className }: GalleryItemProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl", className)}>
      {children}
    </div>
  );
}

export function GalleryImage({
  src,
  alt,
  className,
  onClick,
}: GalleryImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      loading="lazy"
      className={cn(
        "h-48 w-full object-cover transition-all duration-300",
        "hover:scale-105 hover:shadow-lg",
        onClick && "cursor-pointer",
        className,
      )}
    />
  );
}
