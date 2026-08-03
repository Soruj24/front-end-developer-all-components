import type { ReactNode } from "react";

export interface GalleryProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  gap?: number;
  className?: string;
}

export interface GalleryItemProps {
  children: ReactNode;
  className?: string;
}

export interface GalleryImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}
