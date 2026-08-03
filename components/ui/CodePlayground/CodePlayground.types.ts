export interface PlaygroundFile {
  name: string;
  source: string;
}

export interface ConsoleEntry {
  id: number;
  type: "log" | "info" | "debug" | "warn" | "error";
  args: unknown[];
  ts: number;
}

export interface CodePlaygroundProps {
  files: PlaygroundFile[];
  entry?: string;
  title?: string;
  className?: string;
  height?: number | string;
  defaultTheme?: "light" | "dark";
  captureConsole?: boolean;
  showConsole?: boolean;
  shareKey?: string;
}

export type DeviceKey = "fluid" | "mobile" | "tablet" | "desktop";

export const DEVICE_WIDTHS: Record<Exclude<DeviceKey, "fluid">, number> = {
  mobile: 375, tablet: 768, desktop: 1280,
};
