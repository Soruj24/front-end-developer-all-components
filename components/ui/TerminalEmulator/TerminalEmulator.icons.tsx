import {
  Terminal,
  Copy,
  Check,
  Trash2,
  Palette,
  ChevronUp,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

const icon = (LucideIcon: LucideIcon) =>
  function Icon({ className = "h-4 w-4", style }: { className?: string; style?: React.CSSProperties }) {
    return <LucideIcon className={className} style={style} aria-hidden="true" />;
  };

export const TerminalIcon = icon(Terminal);
export const CopyIcon = icon(Copy);
export const CheckIcon = icon(Check);
export const TrashIcon = icon(Trash2);
export const PaletteIcon = icon(Palette);
export const ChevronUpIcon = icon(ChevronUp);
export const ChevronDownIcon = icon(ChevronDown);
