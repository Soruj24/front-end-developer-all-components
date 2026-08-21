export interface PinInputProps {
  length?: number;
  value?: string[];
  onChange?: (value: string[]) => void;
  onComplete?: (value: string) => void;
  mask?: boolean;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
}
