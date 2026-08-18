import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Link,
  Download,
  Sun,
  Moon,
  Maximize2,
  Minimize2,
  Monitor,
  Tablet,
  Smartphone,
  Terminal,
  ChevronDown,
  Trash2,
  AlertTriangle,
  File,
  FileCode,
  type LucideIcon,
} from "lucide-react";

const icon = (lucideIcon: LucideIcon) =>
  function Icon({ className = "h-4 w-4" }: { className?: string }) {
    return <lucideIcon className={className} aria-hidden="true" />;
  };

export const PlayIcon = icon(Play);
export const RotateIcon = icon(RotateCcw);
export const CopyIcon = icon(Copy);
export const CheckIcon = icon(Check);
export const LinkIcon = icon(Link);
export const DownloadIcon = icon(Download);
export const SunIcon = icon(Sun);
export const MoonIcon = icon(Moon);
export const MaximizeIcon = icon(Maximize2);
export const MinimizeIcon = icon(Minimize2);
export const MonitorIcon = icon(Monitor);
export const TabletIcon = icon(Tablet);
export const MobileIcon = icon(Smartphone);
export const TerminalIcon = icon(Terminal);
export const ChevronDownIcon = icon(ChevronDown);
export const TrashIcon = icon(Trash2);
export const AlertTriangleIcon = icon(AlertTriangle);
export const FileIcon = icon(File);
export const CodeFileIcon = icon(FileCode);
