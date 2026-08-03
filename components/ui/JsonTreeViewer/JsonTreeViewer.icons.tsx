import type { JsonType } from "./JsonTreeViewer.types";

type IconProps = { className?: string };

const icon = (path: string) =>
  function Icon({ className = "h-4 w-4" }: IconProps) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d={path} /></svg>;
  };

export const SearchIcon = icon("m21 21-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z");
export const CloseIcon = icon("M6 18L18 6M6 6l12 12");
export const CopyIcon = icon("M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75");
export const CheckIcon = icon("m4.5 12.75 6 6 9-13.5");
export const ChevronIcon = icon("m8.25 4.5 7.5 7.5-7.5 7.5");
export const ChevronsDownIcon = icon("m19.5 5.25-7.5 7.5-7.5-7.5m15 6-7.5 7.5-7.5-7.5");
export const ChevronsUpIcon = icon("m4.5 18.75 7.5-7.5 7.5 7.5m-15-6 7.5-7.5 7.5 7.5");
export const SunIcon = icon("M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z");
export const MoonIcon = icon("M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998z");
export const BracesIcon = icon("M8 9l-3 3 3 3m8-6 3 3-3 3M13.5 5l-3 14");
export const BracketIcon = icon("M15 6l6 6-6 6M9 6l-6 6 6 6");

export const LEAF_CLASS: Partial<Record<JsonType, string>> = {
  string: "text-success", number: "text-info", boolean: "text-warning", null: "text-subtle italic", undefined: "text-subtle italic",
};
