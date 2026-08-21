export type RichTextEditorView = "edit" | "preview" | "split";

export interface RichTextEditorToolbarButton {
  label: string;
  title: string;
  tag: string;
}

export interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  view?: RichTextEditorView;
  onViewChange?: (view: RichTextEditorView) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}
