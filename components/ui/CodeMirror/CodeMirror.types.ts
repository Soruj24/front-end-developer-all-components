export type CodeMirrorLanguage = "javascript" | "typescript" | "tsx" | "jsx" | "css" | "json" | "markdown" | "html";

export interface CodeMirrorTheme {
  name: "light" | "dark";
}

export interface CodeMirrorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: CodeMirrorLanguage;
  theme?: "light" | "dark";
  readOnly?: boolean;
  fontSize?: number;
  tabSize?: number;
  lineNumbers?: boolean;
  highlightActiveLine?: boolean;
  highlightActiveLineGutter?: boolean;
  foldGutter?: boolean;
  bracketMatching?: boolean;
  closeBrackets?: boolean;
  autocompletion?: boolean;
  indentOnInput?: boolean;
  readOnlyProp?: boolean;
  placeholder?: string;
  minHeight?: string;
  className?: string;
  onKeyDown?: (event: KeyboardEvent) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onCreateEditor?: (view: unknown) => void;
}
