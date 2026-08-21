export interface MarkdownEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  preview?: boolean;
  height?: number | string;
  className?: string;
}
