import {
  Search,
  X as CloseIcon,
  Copy,
  Check,
  ChevronRight as ChevronIcon,
  ChevronsDown,
  ChevronsUp,
  Sun,
  Moon,
  Braces,
  Code as BracketIcon,
  type LucideIcon,
} from "lucide-react";
import type { JsonType } from "./JsonTreeViewer.types";

const icon = (lucideIcon: LucideIcon) =>
  function Icon({ className = "h-4 w-4" }: { className?: string }) {
    return <lucideIcon className={className} aria-hidden="true" />;
  };

export const SearchIcon = icon(Search);
export { CloseIcon };
export const CopyIcon = icon(Copy);
export const CheckIcon = icon(Check);
export { ChevronIcon };
export const ChevronsDownIcon = icon(ChevronsDown);
export const ChevronsUpIcon = icon(ChevronsUp);
export const SunIcon = icon(Sun);
export const MoonIcon = icon(Moon);
export const BracesIcon = icon(Braces);
export { BracketIcon };

export const LEAF_CLASS: Partial<Record<JsonType, string>> = {
  string: "text-success", number: "text-info", boolean: "text-warning", null: "text-subtle italic", undefined: "text-subtle italic",
};
