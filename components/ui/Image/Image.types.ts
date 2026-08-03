export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface ImagePreviewProps {
  src: string;
  alt: string;
  className?: string;
}
