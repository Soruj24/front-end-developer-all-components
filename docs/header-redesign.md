# Header Redesign — Premium Developer Experience

## 1. UX Audit

### Current State Analysis

| Aspect | Current | Issue |
|--------|---------|-------|
| **Visual Hierarchy** | Flat, no clear focal point | Logo, nav, and actions compete equally |
| **Navigation** | 4 basic links | Missing: AI, Registry, Playground, Docs, Pricing, Resources |
| **Search** | Basic trigger + command palette | No recent searches, no AI suggestions |
| **Actions** | GitHub, Theme, Sign in, Get Started | Missing: Discord, Notifications, Language Switcher |
| **Mobile** | Basic hamburger menu | No search, no theme toggle, limited functionality |
| **Micro-interactions** | Minimal hover effects | No animated indicators, no smooth transitions |
| **Accessibility** | Basic ARIA labels | Missing: keyboard nav patterns, focus management |
| **Glass effect** | Basic backdrop-blur | Can be refined with better opacity control |

### Competitive Analysis

| Feature | Linear | Vercel | shadcn/ui | Raycast | Our Target |
|---------|--------|--------|-----------|---------|------------|
| Animated nav indicator | ✓ | ✓ | ✗ | ✓ | ✓ |
| Command palette search | ✓ | ✓ | ✓ | ✓ | ✓ |
| GitHub stars display | ✗ | ✓ | ✓ | ✗ | ✓ |
| Notification bell | ✓ | ✗ | ✗ | ✓ | ✓ |
| Language switcher | ✓ | ✓ | ✓ | ✗ | ✓ |
| Mobile search | ✓ | ✓ | ✓ | ✓ | ✓ |
| Glass morphism | ✓ | ✓ | ✗ | ✓ | ✓ |
| Keyboard shortcuts | ✓ | ✓ | ✓ | ✓ | ✓ |

---

## 2. Information Architecture

### Navigation Structure

```
PRIMARY NAV (Desktop)
├── Components      → /components
├── Blocks          → /blocks
├── Templates       → /templates
├── AI              → /ai (with "New" badge)
├── Registry        → /registry
├── Playground      → /playground
├── More (dropdown)
│   ├── Docs        → /docs
│   ├── Pricing     → /pricing
│   ├── Enterprise  → /enterprise
│   └── Community   → /community

RIGHT ACTIONS (Desktop)
├── Search Trigger (Ctrl+K)
├── GitHub Icon    → external
├── Discord Icon   → external
├── Notifications  → bell with count
├── Language       → dropdown
├── Theme Toggle   → sun/moon
└── CTA Button     → "Get Started"
```

### Mobile Navigation Structure

```
MOBILE HEADER
├── Hamburger Menu
│   ├── Logo + Product Name
│   ├── Search Trigger
│   ├── Navigation Links (vertical)
│   ├── Divider
│   ├── Theme Toggle
│   ├── Language Switcher
│   ├── GitHub Link
│   └── Get Started CTA
├── Search Icon (opens search)
└── Profile Menu (if logged in)
```

---

## 3. Wireframes

### Desktop (>1024px)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Logo] [Product]   Components  Blocks  Templates  AI*  Registry  Play  ··· │ Search  ⚡  💬  🔔  🌙  [Get Started] │
└─────────────────────────────────────────────────────────────────────────────┘
     ↑             ↑              ↑         ↑          ↑       ↑         ↑
     Brand         Primary Nav (with animated underline on hover/active)     Actions
```

### Desktop with Dropdown (>1024px, hover on "More")

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Logo] [Product]   Components  Blocks  Templates  AI*  Registry  Play  ▼   │
└─────────────────────────────────────────────────────────────────────────────┘
                                                          ┌──────────────┐
                                                          │ 📚 Docs      │
                                                          │ 💰 Pricing   │
                                                          │ 🏢 Enterprise│
                                                          │ 💬 Community │
                                                          └──────────────┘
```

### Tablet (768px-1024px)

```
┌──────────────────────────────────────────────────────────────────┐
│ [Logo] [Product]   Components  Blocks  Templates  AI*  ···     │ Search  🌙  [Get] │
└──────────────────────────────────────────────────────────────────┘
```

### Mobile (<768px)

```
┌────────────────────────────────┐
│ [☰]              [🔍] [🌙] [👤] │
└────────────────────────────────┘

Hamburger Menu Open:
┌────────────────────────────────┐
│ [☰]              [🔍] [🌙] [👤] │
├────────────────────────────────┤
│ [Logo] Component Library       │
│                                │
│ 🔍 Search...           ⌘K     │
│                                │
│ 📦 Components                 │
│ 🧱 Blocks                     │
│ 📄 Templates                  │
│ 🤖 AI                    NEW  │
│ 📋 Registry                   │
│ 🎮 Playground                 │
│                                │
│ ──────────────────────────── │
│                                │
│ 📚 Docs                       │
│ 💰 Pricing                    │
│ 🏢 Enterprise                 │
│ 💬 Community                  │
│                                │
│ ──────────────────────────── │
│                                │
│ 🌙 Dark Mode           [─○]  │
│ 🌐 Language              EN ▾ │
│ ⚡ GitHub                    │
│                                │
│ [     Get Started     ]       │
└────────────────────────────────┘
```

---

## 4. Component Tree

```
SiteHeader/
├── SiteHeaderRoot.tsx              # Main container, scroll detection, glass effect
├── SiteHeaderBrand.tsx            # Logo + Product Name
├── SiteHeaderNav/
│   ├── SiteHeaderNavLinks.tsx     # Desktop nav with animated indicator
│   ├── SiteHeaderNavDropdown.tsx  # "More" dropdown menu
│   └── SiteHeaderNavIndicator.tsx # Animated underline indicator
├── SiteHeaderActions/
│   ├── SiteHeaderSearch.tsx       # Search trigger (desktop)
│   ├── SiteHeaderSearchMobile.tsx # Search icon (mobile)
│   ├── SiteHeaderGithub.tsx       # GitHub icon with stars
│   ├── SiteHeaderDiscord.tsx      # Discord icon
│   ├── SiteHeaderNotifications.tsx # Bell with count badge
│   ├── SiteHeaderLanguage.tsx     # Language switcher dropdown
│   ├── SiteHeaderTheme.tsx        # Theme toggle (sun/moon)
│   ├── SiteHeaderUser.tsx         # User avatar / Sign in
│   └── SiteHeaderCTA.tsx          # "Get Started" button
├── SiteHeaderMobile/
│   ├── SiteHeaderMobileMenu.tsx   # Mobile menu container
│   ├── SiteHeaderMobileNav.tsx    # Mobile navigation links
│   └── SiteHeaderMobileActions.tsx # Mobile actions (theme, language)
├── SiteHeaderSearch/
│   ├── SiteHeaderSearchOverlay.tsx # Command palette overlay
│   ├── SiteHeaderSearchInput.tsx  # Search input
│   ├── SiteHeaderSearchResults.tsx # Search results
│   └── SiteHeaderSearchRecent.tsx # Recent searches
├── hooks/
│   ├── useScrollDetection.ts      # Scroll position tracking
│   ├── useKeyboardShortcuts.ts    # Ctrl+K, arrow keys
│   ├── useNavIndicator.ts         # Animated indicator position
│   └── useMobileMenu.ts           # Mobile menu state
└── types/
    └── header.types.ts            # All TypeScript interfaces
```

---

## 5. Implementation Plan

### Phase 1: Foundation (Days 1-2)

| File | Lines | Purpose |
|------|-------|---------|
| `header.types.ts` | ~80 | All TypeScript interfaces |
| `useScrollDetection.ts` | ~30 | Scroll position hook |
| `useKeyboardShortcuts.ts` | ~40 | Global keyboard shortcuts |
| `useNavIndicator.ts` | ~50 | Animated nav indicator |
| `useMobileMenu.ts` | ~30 | Mobile menu state |
| **Subtotal** | **~230** | |

### Phase 2: Core Components (Days 3-5)

| File | Lines | Purpose |
|------|-------|---------|
| `SiteHeaderRoot.tsx` | ~120 | Main header container |
| `SiteHeaderBrand.tsx` | ~60 | Logo + product name |
| `SiteHeaderNavLinks.tsx` | ~100 | Desktop navigation |
| `SiteHeaderNavIndicator.tsx` | ~60 | Animated underline |
| `SiteHeaderNavDropdown.tsx` | ~80 | "More" dropdown |
| **Subtotal** | **~420** | |

### Phase 3: Action Components (Days 6-8)

| File | Lines | Purpose |
|------|-------|---------|
| `SiteHeaderSearch.tsx` | ~60 | Search trigger |
| `SiteHeaderGithub.tsx` | ~50 | GitHub icon |
| `SiteHeaderDiscord.tsx` | ~40 | Discord icon |
| `SiteHeaderNotifications.tsx` | ~70 | Bell with badge |
| `SiteHeaderLanguage.tsx` | ~80 | Language dropdown |
| `SiteHeaderTheme.tsx` | ~50 | Theme toggle |
| `SiteHeaderUser.tsx` | ~70 | User avatar / Sign in |
| `SiteHeaderCTA.tsx` | ~40 | Get Started button |
| **Subtotal** | **~460** | |

### Phase 4: Search Overlay (Days 9-10)

| File | Lines | Purpose |
|------|-------|---------|
| `SiteHeaderSearchOverlay.tsx` | ~100 | Command palette |
| `SiteHeaderSearchInput.tsx` | ~50 | Search input |
| `SiteHeaderSearchResults.tsx` | ~80 | Results display |
| `SiteHeaderSearchRecent.tsx` | ~60 | Recent searches |
| **Subtotal** | **~290** | |

### Phase 5: Mobile Components (Days 11-12)

| File | Lines | Purpose |
|------|-------|---------|
| `SiteHeaderMobileMenu.tsx` | ~120 | Mobile menu |
| `SiteHeaderMobileNav.tsx` | ~80 | Mobile nav links |
| `SiteHeaderMobileActions.tsx` | ~70 | Mobile actions |
| **Subtotal** | **~270** | |

### Phase 6: Integration & Polish (Days 13-14)

| Task | Purpose |
|------|---------|
| Update `SiteHeader/index.ts` | Barrel exports |
| Update `config/site.ts` | New nav structure |
| Update `globals.css` | New animations |
| Accessibility audit | ARIA, keyboard nav |
| Performance optimization | Memoization, lazy load |
| Cross-browser testing | Chrome, Firefox, Safari, Edge |

### Total Estimate

- **Total files:** ~25
- **Total LOC:** ~1,670
- **Timeline:** 14 working days

---

## 6. Visual Design Tokens

### Header-Specific Tokens

```css
/* Header heights */
--header-height: 64px;
--header-height-scrolled: 56px;

/* Glass effect */
--glass-bg: oklch(1 0 0 / 0.72);
--glass-blur: 16px;
--glass-border: oklch(0 0 0 / 0.06);

.dark {
  --glass-bg: oklch(0.1 0 0 / 0.72);
  --glass-border: oklch(1 0 0 / 0.06);
}

/* Nav indicator */
--nav-indicator-height: 2px;
--nav-indicator-color: var(--primary);
--nav-indicator-radius: 1px;

/* Search trigger */
--search-trigger-bg: oklch(0 0 0 / 0.04);
--search-trigger-border: oklch(0 0 0 / 0.08);
--search-trigger-hover: oklch(0 0 0 / 0.06);
```

### Animations

```css
/* Nav indicator slide */
@keyframes nav-indicator-slide {
  from { transform: scaleX(0); opacity: 0; }
  to { transform: scaleX(1); opacity: 1; }
}

/* Mobile menu slide */
@keyframes mobile-menu-slide {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Notification pulse */
@keyframes notification-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
```

---

## 7. Accessibility Checklist

| Requirement | Implementation |
|-------------|----------------|
| ARIA labels | All interactive elements labeled |
| Keyboard navigation | Tab order, arrow keys in dropdowns |
| Focus management | Focus trap in mobile menu |
| Screen reader | Live regions for dynamic content |
| Reduced motion | `prefers-reduced-motion` media query |
| Color contrast | WCAG AA minimum |
| Skip link | "Skip to content" link |
| Role attributes | `role="navigation"`, `role="menu"` |

---

## 8. Performance Checklist

| Optimization | Technique |
|--------------|-----------|
| Memoization | `React.memo` on pure components |
| Lazy load | Icons loaded on demand |
| Bundle size | Tree-shake icon imports |
| Re-renders | Minimal state in root component |
| Animation | GPU-accelerated transforms only |
| Scroll handler | Passive event listener |
| Keyboard handler | Debounced shortcuts |

---

## 9. File Structure (Final)

```
components/layout/SiteHeader/
├── index.ts                          # Barrel exports
├── SiteHeader.tsx                    # Main orchestrator
├── SiteHeaderBrand.tsx               # Logo + name
├── SiteHeaderNav/
│   ├── index.ts
│   ├── SiteHeaderNavLinks.tsx        # Desktop nav
│   ├── SiteHeaderNavDropdown.tsx     # More dropdown
│   └── SiteHeaderNavIndicator.tsx    # Animated underline
├── SiteHeaderActions/
│   ├── index.ts
│   ├── SiteHeaderSearch.tsx          # Search trigger
│   ├── SiteHeaderGithub.tsx         # GitHub icon
│   ├── SiteHeaderDiscord.tsx        # Discord icon
│   ├── SiteHeaderNotifications.tsx  # Bell badge
│   ├── SiteHeaderLanguage.tsx       # Language switcher
│   ├── SiteHeaderTheme.tsx          # Theme toggle
│   ├── SiteHeaderUser.tsx           # User menu
│   └── SiteHeaderCTA.tsx           # Get Started
├── SiteHeaderMobile/
│   ├── index.ts
│   ├── SiteHeaderMobileMenu.tsx     # Mobile menu
│   ├── SiteHeaderMobileNav.tsx      # Mobile nav
│   └── SiteHeaderMobileActions.tsx  # Mobile actions
├── SiteHeaderSearch/
│   ├── index.ts
│   ├── SiteHeaderSearchOverlay.tsx  # Command palette
│   ├── SiteHeaderSearchInput.tsx    # Search input
│   ├── SiteHeaderSearchResults.tsx  # Results
│   └── SiteHeaderSearchRecent.tsx   # Recent
├── hooks/
│   ├── index.ts
│   ├── useScrollDetection.ts
│   ├── useKeyboardShortcuts.ts
│   ├── useNavIndicator.ts
│   └── useMobileMenu.ts
└── types/
    └── header.types.ts
```

---

## 10. Migration Strategy

1. **Create new components** in `SiteHeader/` directory
2. **Keep old components** in `layout/` until migration complete
3. **Update imports** in `app/(site)/layout.tsx`
4. **Test all breakpoints** and interactions
5. **Remove old components** after validation

---

## 11. Success Metrics

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 100ms |
| Time to Interactive | < 200ms |
| Lighthouse Performance | > 95 |
| Lighthouse Accessibility | 100 |
| Bundle Size | < 15KB gzipped |
| Keyboard Navigation | 100% coverage |
| Screen Reader | Full support |
