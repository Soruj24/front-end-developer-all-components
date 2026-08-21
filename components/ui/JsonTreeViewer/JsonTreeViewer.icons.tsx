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

const icon = (LucideIcon: LucideIcon) =>
  function Icon({ className = "h-4 w-4" }: { className?: string }) {
    return <LucideIcon className={className} aria-hidden="true" />;
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
  string: "text-emerald-600 dark:text-emerald-400",
  number: "text-sky-600 dark:text-sky-400",
  boolean: "text-amber-600 dark:text-amber-400",
  null: "text-muted-foreground italic",
  undefined: "text-muted-foreground italic",
};
