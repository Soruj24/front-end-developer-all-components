export interface VideoProps {
  src: string;
  poster?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
}

export interface VideoCaptionProps {
  src: string;
  label: string;
  className?: string;
}
