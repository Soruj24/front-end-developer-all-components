import { cn } from "@/lib/cn";
import type { GalleryProps, GalleryItemProps, GalleryImageProps } from "./Gallery.types";

const columnClasses: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

export function Gallery({ children, columns = 3, gap = 4, className }: GalleryProps) {
  return (
    <div className={cn("grid", columnClasses[columns], `gap-${gap}`, className)}>
      {children}
    </div>
  );
}

export function GalleryItem({ children, className }: GalleryItemProps) {
  return (
    <div className={cn("overflow-hidden rounded-lg", className)}>
      {children}
    </div>
  );
}

export function GalleryImage({ src, alt, className, onClick }: GalleryImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      className={cn("h-48 w-full object-cover transition-transform hover:scale-105", onClick && "cursor-pointer", className)}
    />
  );
}
