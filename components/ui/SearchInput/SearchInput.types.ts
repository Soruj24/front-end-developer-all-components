export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  shortcut?: string;
  recentSearches?: string[];
  onRecentClick?: (search: string) => void;
  className?: string;
}
