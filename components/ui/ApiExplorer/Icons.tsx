import {
  Search,
  Send,
  Plus,
  Trash2,
  Copy,
  Check,
  Sun,
  Moon,
  Lock,
  SlidersHorizontal,
  Braces,
  Columns,
  Key,
  Link,
  type LucideIcon,
} from "lucide-react";

const icon = (lucideIcon: LucideIcon) =>
  function Icon({ className = "h-4 w-4" }: { className?: string }) {
    return <lucideIcon className={className} aria-hidden="true" />;
  };

export const SearchIcon = icon(Search);
export const SendIcon = icon(Send);
export const PlusIcon = icon(Plus);
export const TrashIcon = icon(Trash2);
export const CopyIcon = icon(Copy);
export const CheckIcon = icon(Check);
export const SunIcon = icon(Sun);
export const MoonIcon = icon(Moon);
export const LockIcon = icon(Lock);
export const SlidersIcon = icon(SlidersHorizontal);
export const BracesIcon = icon(Braces);
export const ColumnsIcon = icon(Columns);
export const KeyIcon = icon(Key);
export const LinkIcon = icon(Link);
