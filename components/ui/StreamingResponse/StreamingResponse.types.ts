export type StreamStatus = "idle" | "thinking" | "streaming" | "done" | "error" | "stopped";

export interface ToolCall {
  id: string;
  name: string;
  arguments: string;
  status: "running" | "success" | "error";
  result?: string;
}

export interface Citation {
  id: number;
  title?: string;
  text?: string;
  url?: string;
}

export type StreamChunk =
  | { type: "thinking"; content: string }
  | { type: "text"; content: string }
  | { type: "tool"; tool: ToolCall }
  | { type: "citation"; citation: Citation }
  | { type: "error"; message: string }
  | { type: "done" };

export type StreamSource = AsyncGenerator<StreamChunk> | (() => AsyncGenerator<StreamChunk>);

export interface DemoStreamOptions {
  thinking?: string;
  tools?: Array<Omit<ToolCall, "status">>;
  citations?: Citation[];
  tokenDelay?: number;
  charMode?: boolean;
  startDelay?: number;
}

export interface StreamingResponseProps {
  stream?: StreamSource;
  content?: string;
  loading?: boolean;
  autoScroll?: boolean;
  maxHeight?: number | string;
  showHeader?: boolean;
  variant?: "card" | "plain";
  title?: string;
  thinkingLabel?: string;
  className?: string;
  onDone?: (text: string) => void;
  onError?: (message: string) => void;
  onRetry?: () => void;
}

export type Block =
  | { type: "h"; level: number; content: string }
  | { type: "p"; content: string }
  | { type: "code"; lang: string; code: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "ul"; items: ListItem[] }
  | { type: "ol"; items: ListItem[] }
  | { type: "quote"; blocks: Block[] }
  | { type: "hr" }
  | { type: "math"; content: string };

export interface ListItem {
  text: string;
  children: Block[];
}
