export type JsonType = "object" | "array" | "string" | "number" | "boolean" | "null" | "undefined";

export interface JsonNode {
  key: string;
  path: string;
  type: JsonType;
  raw: unknown;
  children: JsonNode[];
  size: number;
  depth: number;
  isRoot: boolean;
  selfMatch: boolean;
  hasMatch: boolean;
}

export interface JsonTreeViewerProps {
  data: unknown;
  title?: string;
  className?: string;
  height?: number | string;
  defaultExpandedDepth?: number;
  maxItems?: number;
  defaultTheme?: "light" | "dark";
  searchable?: boolean;
}

export interface TypeStats {
  object: number;
  array: number;
  string: number;
  number: number;
  boolean: number;
  null: number;
}
