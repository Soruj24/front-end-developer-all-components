# Architecture

## Overview

Next.js 16.2.12 monorepo with React 19, TypeScript 5.x, Turbopack.

## Folder Structure

```
client/
├── app/                    # Next.js App Router routes
├── components/             # All UI components
│   ├── _<name>/            # New modularized components (44)
│   ├── ui/                 # Original UI components (legacy, being refactored)
│   ├── Tooltip/            # Standalone refactored component
│   ├── registry/           # Component registry (417 files)
│   ├── layout/             # Layout components
│   ├── navigation/         # Navigation components
│   ├── home/               # Homepage components
│   ├── docs/               # Documentation components
│   ├── documentation/      # Documentation components (alt)
│   ├── preview/            # Preview components
│   └── search/             # Search components
├── features/               # Domain modules (AI, playground, etc.)
├── lib/                    # Utilities, env, config
├── hooks/                  # Shared hooks
├── types/                  # Shared TypeScript types
├── utils/                  # Pure helper functions
├── constants/              # Static data
├── actions/                # Server actions
├── docs/                   # Project documentation
└── public/                 # Static assets
```

## Component Architecture

### Modularized Components (`components/_<name>/`)

Each component follows this structure:

```
components/_<name>/
├── <Name>.tsx              # Main component (≤150 lines)
├── <Name>.types.ts         # TypeScript types/interfaces
├── <Name>.constants.ts     # Static data, presets, defaults
└── index.ts                # Public barrel export
```

**44 components** follow this pattern:
`_alert`, `_alert-dialog`, `_aspect-ratio`, `_attachment`, `_breadcrumb`, `_bubble`, `_button-group`, `_checkbox`, `_collapsible`, `_combobox`, `_command`, `_context-menu`, `_data-table`, `_date-picker`, `_dialog`, `_direction`, `_drawer`, `_dropdown-menu`, `_field`, `_hover-card`, `_input-group`, `_input-otp`, `_item`, `_kbd`, `_label`, `_marker`, `_menubar`, `_message`, `_message-scroller`, `_native-select`, `_navigation-menu`, `_popover`, `_progress`, `_radio-group`, `_resizable`, `_scroll-area`, `_select`, `_separator`, `_sheet`, `_slider`, `_spinner`, `_textarea`, `_toggle`, `_toggle-group`, `_typography`

### UI Components (`components/ui/`)

Higher-level composed components. Some are already refactored into folders:

| Component | Files | Status |
|-----------|-------|--------|
| `BentoGrid/` | 11 | Refactored, all ≤150 lines |
| `VariantMatrix/` | 9 | Refactored, all ≤150 lines |
| `ApiExplorer/` | 16 | Partially refactored |
| `StreamingResponse/` | 4 | Partially extracted |

### Standalone Components

`components/Tooltip/` — fully refactored (10 files, all ≤150 lines).

### Oversized Components (being refactored)

| Component | Path | Lines |
|-----------|------|-------|
| PromptBuilder | `components/ui/PromptBuilder.tsx` | 1261 |
| StreamingResponse | `components/ui/StreamingResponse.tsx` | 1282 |
| TerminalEmulator | `components/ui/TerminalEmulator.tsx` | 1223 |
| DependencyGraph | `components/ui/DependencyGraph.tsx` | 966 |
| PricingCalculator | `components/ui/PricingCalculator.tsx` | 930 |
| CodePlayground | `components/ui/CodePlayground.tsx` | 877 |
| CommandPalette | `components/ui/CommandPalette.tsx` | 801 |
| JsonTreeViewer | `components/ui/JsonTreeViewer.tsx` | 658 |
| SpotlightSearch | `components/ui/SpotlightSearch.tsx` | 560 |
| FloatingToolbar | `components/ui/FloatingToolbar.tsx` | 346 |
| Dock | `components/ui/Dock.tsx` | 313 |

### Additional oversized files

| Component | Path | Lines |
|-----------|------|-------|
| ApiExplorer | `components/ui/ApiExplorer/ApiExplorer.tsx` | 229 |
| useApiExplorer | `components/ui/ApiExplorer/useApiExplorer.tsx` | 204 |
| CommandMenu | `components/ui/CommandMenu.tsx` | 198 |
| Table | `components/ui/Table.tsx` | 175 |
| ResponsePanel | `components/ui/ApiExplorer/ResponsePanel.tsx` | 168 |
| KeyValue | `components/ui/ApiExplorer/KeyValue.tsx` | 160 |
| ContextMenu | `components/ui/ContextMenu.tsx` | 153 |
| Pagination | `components/ui/Pagination.tsx` | 151 |

## File Size Limits

| Type | Preferred | Hard Ceiling |
|------|-----------|-------------|
| Component | 100 lines | 150 lines |
| Page | 150 lines | 200 lines |
| Hook | 100 lines | 120 lines |
| Service | 100 lines | 120 lines |
| Utility | 80 lines | 100 lines |
| AI Agent | 150 lines | 180 lines |

## Conventions

- Path alias: `@/* → ./*`
- Component naming: `ComponentName/ComponentName.tsx`
- Barrel exports via `index.ts`
- Types in `*.types.ts` files
- Constants in `*.constants.ts` files
- React 19 patterns: `RefObject<T | null>`, no forwardRef
- ESLint: `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`
- Destructure hook returns to avoid `react-hooks/refs` lint errors
