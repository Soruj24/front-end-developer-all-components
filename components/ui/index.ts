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
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";
export type {
  CardProps,
  CardPadding,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from "./Card";
export { default as Carousel } from "./Carousel";
export { Chip } from "./Chip";
export { CommandPalette } from "./CommandPalette";
export type { CommandItem, CommandPaletteProps } from "./CommandPalette";
export { default as CommandMenu } from "./CommandMenu";
export { default as ContextMenu } from "./ContextMenu";
export { Countdown } from "./Countdown";
export { CurrencyInput } from "./CurrencyInput";
export type { CurrencyInputProps } from "./CurrencyInput";
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
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./Dialog";
export type {
  DialogProps,
  DialogTriggerProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogFooterProps,
} from "./Dialog";
export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "./Drawer";
export type {
  DrawerProps,
  DrawerTriggerProps,
  DrawerContentProps,
  DrawerHeaderProps,
  DrawerTitleProps,
  DrawerDescriptionProps,
  DrawerFooterProps,
} from "./Drawer";
export { Dock } from "./Dock";
export type { DockItem, DockProps } from "./Dock";
export { DragDropZone } from "./DragDropZone";
export type { DragDropZoneProps } from "./DragDropZone";
export { FloatingToolbar } from "./FloatingToolbar";
export type { FloatingToolbarAction, FloatingToolbarProps } from "./FloatingToolbar";
export { default as Dropdown } from "./Dropdown";
export { default as EmptyState } from "./EmptyState";
export { FileUpload } from "./FileUpload";
export { Input } from "./Input";
export { InputMask } from "./InputMask";
export type { InputMaskProps } from "./InputMask";
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
export { Sheet } from "./Sheet";
export type { SheetProps } from "./Sheet";
export { Toggle } from "./Toggle";
export type { ToggleProps } from "./Toggle";
export { ToggleGroup } from "./ToggleGroup";
export type { ToggleGroupProps } from "./ToggleGroup";
export { Tooltip } from "./Tooltip";
export type { TooltipProps } from "./Tooltip";
export { Typography } from "./Typography";
export type { TypographyProps } from "./Typography";

export { AlertDialog } from "./AlertDialog";
export type { AlertDialogProps, AlertDialogVariant } from "./AlertDialog";
export { AspectRatio } from "./AspectRatio";
export type { AspectRatioProps } from "./AspectRatio";
export { Attachment } from "./Attachment";
export type { AttachmentProps } from "./Attachment";
export { Bubble } from "./Bubble";
export type { BubbleProps, BubbleVariant } from "./Bubble";
export { ButtonGroup } from "./ButtonGroup";
export type { ButtonGroupProps, ButtonGroupOrientation } from "./ButtonGroup";
export { Checkbox } from "./Checkbox";
export type { CheckboxProps } from "./Checkbox";
export { Collapsible } from "./Collapsible";
export type { CollapsibleProps } from "./Collapsible";
export { Combobox } from "./Combobox";
export type { ComboboxProps, ComboboxOption } from "./Combobox";
export { Command } from "./Command";
export type { CommandProps, CommandGroup } from "./Command";
export { DataTable } from "./DataTable";
export type { DataTableProps, DataTableColumn } from "./DataTable";
export { DatePicker } from "./DatePicker";
export type { DatePickerProps } from "./DatePicker";
export { DirectionProvider, useDirection } from "./Direction";
export type { Direction, DirectionProviderProps } from "./Direction";
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./DropdownMenu";
export type { DropdownAlign, DropdownMenuProps } from "./DropdownMenu";
export { Field } from "./Field";
export type { FieldProps } from "./Field";
export { HoverCard } from "./HoverCard";
export type { HoverCardProps } from "./HoverCard";
export { InputGroup } from "./InputGroup";
export type { InputGroupProps } from "./InputGroup";
export { InputOTP } from "./InputOTP";
export type { InputOTPProps } from "./InputOTP";
export { Item } from "./Item";
export type { ItemProps } from "./Item";
export { Kbd } from "./Kbd";
export type { KbdProps } from "./Kbd";
export { Label } from "./Label";
export type { LabelProps } from "./Label";

export { Marker } from "./Marker";
export type { MarkerProps } from "./Marker";
export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "./Menubar";
export type {
  MenubarProps,
  MenubarMenuProps,
  MenubarTriggerProps,
  MenubarContentProps,
  MenubarItemProps,
  MenubarSeparatorProps,
} from "./Menubar";
export { Message } from "./Message";
export type { MessageProps, MessageVariant } from "./Message";
export { MessageScroller } from "./MessageScroller";
export type { MessageScrollerProps, MessageItem } from "./MessageScroller";
export { NativeSelect } from "./NativeSelect";
export type { NativeSelectProps, SelectOption } from "./NativeSelect";
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "./NavigationMenu";
export type {
  NavigationMenuProps,
  NavigationMenuListProps,
  NavigationMenuItemProps,
  NavigationMenuTriggerProps,
  NavigationMenuContentProps,
  NavigationMenuLinkProps,
} from "./NavigationMenu";
export { Progress } from "./Progress";
export type { ProgressProps } from "./Progress";
export { RadioGroup } from "./RadioGroup";
export type { RadioGroupProps, RadioOption } from "./RadioGroup";
export { Resizable, ResizablePanel, ResizableHandle } from "./Resizable";
export type { ResizableProps, ResizablePanelProps, ResizableHandleProps } from "./Resizable";
export { Separator } from "./Separator";
export type { SeparatorProps } from "./Separator";

export { Form, FormField, FormLabel, FormMessage } from "./Form";
export type { FormProps, FormFieldProps, FormLabelProps, FormMessageProps } from "./Form";
export { Gallery, GalleryItem, GalleryImage } from "./Gallery";
export type { GalleryProps, GalleryItemProps, GalleryImageProps } from "./Gallery";
export { Grid, GridItem } from "./Grid";
export type { GridProps, GridItemProps } from "./Grid";
export { Icon } from "./Icon";
export type { IconProps, IconSize } from "./Icon";
export { Image, ImagePreview } from "./Image";
export type { ImageProps } from "./Image";
export { List, ListItem } from "./List";
export type { ListProps, ListItemProps } from "./List";
export { Masonry, MasonryItem } from "./Masonry";
export type { MasonryProps, MasonryItemProps } from "./Masonry";

export { Notification, NotificationTitle, NotificationDescription } from "./Notification";
export type { NotificationProps, NotificationVariant } from "./Notification";
export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarItem,
} from "./Sidebar";
export type {
  SidebarProps,
  SidebarHeaderProps,
  SidebarContentProps,
  SidebarFooterProps,
  SidebarItemProps,
} from "./Sidebar";
export { Steps, Step, StepIndicator } from "./Steps";
export type { StepsProps, StepProps, StepIndicatorProps, StepStatus } from "./Steps";

export { Tag, TagList } from "./Tags";
export type { TagProps, TagListProps, TagVariant } from "./Tags";
export { Tree, TreeItem } from "./Tree";
export type { TreeProps, TreeItemProps, TreeNode } from "./Tree";
export { Upload, UploadDropzone } from "./Upload";
export type { UploadProps, UploadDropzoneProps } from "./Upload";
export { Video, VideoCaption } from "./Video";
export type { VideoProps, VideoCaptionProps } from "./Video";
export { Viewport } from "./Viewport";
export type { ViewportProps } from "./Viewport";
