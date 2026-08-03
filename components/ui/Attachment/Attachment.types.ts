export interface AttachmentProps {
  name: string;
  size?: number;
  type?: string;
  url?: string;
  onRemove?: () => void;
  className?: string;
}
