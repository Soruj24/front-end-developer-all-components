/**
 * UI primitives — the reusable component library.
 *
 * Import from the barrel: `import { Button, Card } from "@/components/ui"`.
 */
export { default as Accordion } from "./Accordion";
export { Alert } from "./Alert";
export { Avatar } from "./Avatar";
export { Badge } from "./Badge";
export { BentoGrid } from "./BentoGrid";
export type { BentoCard, BentoCardSpan, BentoGridProps } from "./BentoGrid";
export { SpotlightSearch } from "./SpotlightSearch";
export type { SpotlightItem, SpotlightSearchProps } from "./SpotlightSearch";
export { DependencyGraph } from "./DependencyGraph";
export type {
  GraphEdge,
  GraphNode,
  DependencyGraphProps,
} from "./DependencyGraph";
export { VariantMatrix } from "./VariantMatrix";
export type {
  VariantMatrixAxis,
  VariantMatrixCell,
  VariantMatrixLegend,
  VariantMatrixProps,
} from "./VariantMatrix";
export {
  PricingCalculator,
  calculatePrice,
  formatPrice,
  priceForQuantity,
  buildQuote,
  DEFAULT_CURRENCIES,
} from "./PricingCalculator";
export type {
  BillingCycle,
  BreakdownLine,
  Coupon,
  Currency,
  PriceBreakdown,
  PriceItem,
  PricingCalculatorProps,
  PricingPreset,
  PricingTier,
} from "./PricingCalculator";
export { default as Breadcrumb } from "./Breadcrumb";
export { default as Button } from "./Button";
export { default as Calendar } from "./Calendar";
export { Card, CardHeader, CardContent, CardFooter } from "./Card";
export { default as Carousel } from "./Carousel";
export { Chip } from "./Chip";
export { CommandPalette } from "./CommandPalette";
export type { CommandItem, CommandPaletteProps } from "./CommandPalette";
export { default as CommandMenu } from "./CommandMenu";
export { default as ContextMenu } from "./ContextMenu";
export { Countdown } from "./Countdown";
export { JsonTreeViewer } from "./JsonTreeViewer";
export type { JsonNode, JsonTreeViewerProps, JsonType } from "./JsonTreeViewer";
export { ApiExplorer } from "./ApiExplorer";
export type {
  ApiEndpoint,
  ApiExplorerProps,
  ApiResponseState,
  AuthConfig,
  AuthType,
  HttpMethod,
  ApiKeyValue,
} from "./ApiExplorer";
export { TerminalEmulator } from "./TerminalEmulator";
export type {
  TerminalCommand,
  TerminalContext,
  TerminalEmulatorProps,
  TermLineOut,
  TermOut,
  TermSpan,
  TermTheme,
  FsNode,
} from "./TerminalEmulator";
export { TERMINAL_THEMES, DEFAULT_TERMINAL_FS } from "./TerminalEmulator";
export { CodePlayground } from "./CodePlayground";
export type { PlaygroundFile, ConsoleEntry, CodePlaygroundProps } from "./CodePlayground";
export { default as Dialog } from "./Dialog";
export { default as Drawer } from "./Drawer";
export { Dock } from "./Dock";
export type { DockItem, DockProps } from "./Dock";
export { FloatingToolbar } from "./FloatingToolbar";
export type { FloatingToolbarAction, FloatingToolbarProps } from "./FloatingToolbar";
export { default as Dropdown } from "./Dropdown";
export { default as EmptyState } from "./EmptyState";
export { FileUpload } from "./FileUpload";
export { Input } from "./Input";
export { default as Modal } from "./Modal";
export { default as Pagination } from "./Pagination";
export { default as Popover } from "./Popover";
export { default as ProgressBar } from "./ProgressBar";
export { PromptBuilder } from "./PromptBuilder";
export { Rating } from "./Rating";
export { ScrollArea } from "./ScrollArea";
export { default as SearchInput } from "./SearchInput";
export { Select } from "./Select";
export {
  default as Skeleton,
  SkeletonCard,
  SkeletonListItem,
  SkeletonTable,
  SkeletonAvatar,
} from "./Skeleton";
export { Slider } from "./Slider";
export { default as Spinner } from "./Spinner";
export { Stepper } from "./Stepper";
export { StreamingResponse, createDemoStream } from "./StreamingResponse";
export type {
  StreamChunk,
  StreamSource,
  StreamStatus,
  ToolCall,
  Citation,
  DemoStreamOptions,
  StreamingResponseProps,
} from "./StreamingResponse";
export { Switch } from "./Switch";
export { default as Table } from "./Table";
export { default as Tabs } from "./Tabs";
export { Textarea } from "./Textarea";
export { default as Timeline } from "./Timeline";
export { default as Toast } from "./Toast";
export { default as Tooltip } from "./Tooltip";
