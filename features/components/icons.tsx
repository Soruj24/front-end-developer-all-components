import {
  Heart,
  Bookmark,
  Download,
  Eye,
  MessageSquare,
  Tag,
  Share2,
  Play,
  RotateCcw,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  Monitor,
  Tablet,
  Smartphone,
  Copy,
  Check,
  Code,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  X,
  Settings,
  Palette,
  Space,
  Box,
  Circle,
  Type,
  Zap,
  Layers,
  RefreshCw,
  type LucideProps,
} from "lucide-react";

type IconProps = LucideProps & { filled?: boolean };

export function HeartIcon({ filled, className, ...props }: IconProps) {
  return (
    <Heart
      className={className}
      fill={filled ? "currentColor" : "none"}
      {...props}
    />
  );
}

export function BookmarkIcon({ filled, className, ...props }: IconProps) {
  return (
    <Bookmark
      className={className}
      fill={filled ? "currentColor" : "none"}
      {...props}
    />
  );
}

export { Download as DownloadIcon, Eye as EyeIcon, MessageSquare as CommentIcon, Tag as TagIcon };
export { Share2 as ShareIcon, Play as PlayIcon, RotateCcw as RefreshIcon, Maximize2 as ExpandIcon, Minimize2 as MinimizeIcon };
export { Sun as SunIcon, Moon as MoonIcon, Monitor as MonitorIcon, Tablet as TabletIcon, Smartphone as SmartphoneIcon };
export { Copy as CopyIcon, Check as CheckIcon, Code as CodeIcon, ChevronDown as ChevronDownIcon, ChevronUp as ChevronUpIcon };
export { ExternalLink as ExternalLinkIcon, X as XIcon, Settings as SettingsIcon, Palette as PaletteIcon };
export { Space as SpaceIcon, Box as BoxIcon, Circle as CircleIcon, Type as TypeIcon };
export { Zap as ZapIcon, Layers as LayersIcon, RefreshCw as RefreshCwIcon };
