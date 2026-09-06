/**
 * Shared design tokens for the layout system.
 * All Header, Sidebar, and Footer components reference these constants
 * to guarantee a unified visual language.
 */

/* ── Layout ─────────────────────────────────────────────── */

export const LAYOUT = {
  /** Max content width */
  maxWidth: "max-w-7xl",
  /** Horizontal padding */
  px: "px-4 sm:px-6 lg:px-8",
  /** Header height (h-14 = 56px) */
  headerHeight: "h-14",
  /** Header height value for calc */
  headerHeightPx: 56,
  /** Sidebar default width in px */
  sidebarWidth: 260,
  /** Sidebar collapsed width in px */
  sidebarCollapsedWidth: 56,
} as const;

/* ── Borders ────────────────────────────────────────────── */

export const BORDER = {
  /** Standard subtle border */
  default: "border-border/60",
  /** Transparent border (for layout stability) */
  transparent: "border-transparent",
  /** Focus ring border */
  ring: "border-ring/60",
} as const;

/* ── Radius ─────────────────────────────────────────────── */

export const RADIUS = {
  /** Buttons, checkboxes, icon buttons, toggles */
  sm: "rounded-md",
  /** Selects, dropdowns, popovers */
  md: "rounded-md",
  /** Cards, tables, inputs, textareas, dialogs */
  lg: "rounded-lg",
  /** Badges, pills, avatar, switch track */
  full: "rounded-full",
} as const;

/* ── Backgrounds ────────────────────────────────────────── */

export const BG = {
  /** Default surface */
  base: "bg-background",
  /** Muted surface (hover states, subtle fills) */
  muted: "bg-muted",
  /** Muted with opacity (hover on nav items) */
  mutedSoft: "bg-muted/50",
  /** Accent background (active nav items) */
  accent: "bg-accent-soft",
  /** Primary action background */
  primary: "bg-foreground",
  /** Overlay backdrop */
  overlay: "bg-background/80",
  /** Header unscrolled */
  headerIdle: "bg-background/50",
  /** Header scrolled */
  headerScrolled: "bg-background/80",
} as const;

/* ── Typography ─────────────────────────────────────────── */

export const TEXT = {
  /** Body text */
  body: "text-[13px]",
  /** Small text (labels, meta) */
  small: "text-[11px]",
  /** Fine print (copyright, timestamps) */
  fine: "text-[12px]",
  /** Tiny text (badges, kbd) */
  tiny: "text-[10px]",
  /** Brand / heading */
  brand: "text-sm font-semibold",
  /** Section heading (uppercase) */
  section: "text-[11px] font-semibold uppercase tracking-widest",
} as const;

/* ── Colors ─────────────────────────────────────────────── */

export const COLOR = {
  /** Primary text */
  foreground: "text-foreground",
  /** Secondary text */
  muted: "text-muted-foreground",
  /** Success dot / badge */
  success: "text-success",
  /** Error state */
  error: "text-destructive",
  /** Border divider color */
  divider: "text-border",
  /** Active nav accent */
  accent: "text-accent",
} as const;

/* ── Interactive (buttons, links, icon buttons) ─────────── */

export const INTERACTIVE = {
  /** Standard icon button (32×32) */
  iconButton:
    "flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
  /** Small icon button (28×28) */
  iconButtonSm:
    "flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
  /** Nav link (sidebar item) */
  navLink:
    "text-[13px] text-muted-foreground transition-colors hover:text-foreground",
  /** Inline text link */
  textLink:
    "text-[13px] text-muted-foreground transition-colors hover:text-foreground",
} as const;

/* ── Focus ──────────────────────────────────────────────── */

export const FOCUS = {
  /** Standard focus ring for buttons and interactive elements */
  ring:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  /** Focus ring for inputs (no offset) */
  ringInput:
    "focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring/60",
} as const;

/* ── Transitions ────────────────────────────────────────── */

export const TRANSITION = {
  /** Standard color transition */
  colors: "transition-colors",
  /** Color transition with duration */
  colorsSlow: "transition-colors duration-300",
  /** Transform transition (scale, rotate) */
  transform: "transition-transform",
  /** Width transition (sidebar collapse) */
  width: "transition-[width] duration-300 ease-out",
  /** Translate transition (slide-in panels) */
  slide: "transition-transform duration-300 ease-out",
  /** Opacity transition (overlays) */
  opacity: "transition-opacity",
} as const;

/* ── Backdrop ───────────────────────────────────────────── */

export const BACKDROP = {
  /** Heavy blur (scrolled header) */
  heavy: "backdrop-blur-xl",
  /** Medium blur (header idle, modals) */
  medium: "backdrop-blur-md",
  /** Light blur (overlays) */
  light: "backdrop-blur-sm",
} as const;

/* ── Z-index ────────────────────────────────────────────── */

export const Z = {
  /** Base content */
  base: "z-0",
  /** Sidebar overlay (mobile) */
  sidebarOverlay: "z-40",
  /** Header, sidebar, mobile panels */
  chrome: "z-50",
  /** Search modal, overlays above chrome */
  modal: "z-[60]",
  /** Toast / notification (future) */
  toast: "z-[70]",
} as const;

/* ── Unified interactive states ─────────────────────────── */

export const STATE = {
  /** Keyboard focus for buttons / links / menus */
  focus:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  /** Keyboard focus for text inputs (no offset) */
  focusInput:
    "focus:outline-none focus:border-ring/60 focus:ring-2 focus:ring-ring/20",
  /** Hover for text inputs */
  hoverInput: "hover:border-muted-foreground/30",
  /** Disabled / aria-disabled */
  disabled:
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
  /** Loading (buttons, rows, cards) */
  loading: "pointer-events-none opacity-70",
  /** Standard press feedback */
  press: "active:scale-[0.98]",
} as const;

/* ── Status dot (ping animation) ────────────────────────── */

export const STATUS_DOT = {
  wrapper: "relative flex h-1.5 w-1.5",
  ping: "absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75",
  dot: "relative inline-flex h-1.5 w-1.5 rounded-full bg-success",
} as const;
