export interface TermSpan {
  text: string;
  color?: "accent" | "success" | "warn" | "error" | "dim" | "bright" | string;
  dim?: boolean;
  bold?: boolean;
}

export type TermLineOut = string | { spans: TermSpan[]; type?: "line" | "chars"; delay?: number };
export type TermOut = TermLineOut | TermLineOut[];

export interface TerminalContext {
  cwd: () => string;
  cd: (abs: string) => boolean;
  read: (abs: string) => string | null;
  list: (abs: string) => { name: string; isDir: boolean }[] | null;
  isDir: (abs: string) => boolean;
  resolve: (rel: string) => string;
  theme: () => string;
  setTheme: (id: string) => void;
  clear: () => void;
  history: () => string[];
  isCancelled: () => boolean;
}

export interface TerminalCommand {
  name: string;
  description: string;
  usage?: string;
  hidden?: boolean;
  run: (args: string[], ctx: TerminalContext) => TermOut | Promise<TermOut>;
}

export interface TerminalEmulatorProps {
  className?: string;
  height?: number;
  theme?: string;
  username?: string;
  hostname?: string;
  commands?: TerminalCommand[];
  boot?: boolean;
  bootScript?: string[];
  welcome?: string[];
  fs?: FsNode;
  autoFocus?: boolean;
}

export interface TermTheme {
  id: string;
  label: string;
  bg: string;
  fg: string;
  dim: string;
  accent: string;
  success: string;
  warn: string;
  error: string;
  border: string;
  header: string;
}

export interface FsNode {
  type: "dir" | "file";
  children?: Record<string, FsNode>;
  content?: string;
}

export interface TranscriptLine {
  id: number;
  kind: "output" | "prompt";
  spans: TermSpan[];
  raw?: string;
}
