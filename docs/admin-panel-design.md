# Premium Admin Panel — Design System & Architecture

**Platform:** Documentation & Component Registry
**Design language:** minimal, premium, developer-first — original (inspired by the *principles* of shadcn/ui, Vercel, GitHub, Linear, Notion, Stripe; no UI copied)
**Stack:** Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript

---

## 1. Information Architecture

The admin is a single shell (`app/(admin)`) with one layout: a persistent **rail + topbar** chrome and a routable content stage. Everything hangs off one primary navigation taxonomy. Content is organized by **management domain**, not by file type, so related tasks live together.

```
ADMIN WORKSPACE
├── 01 · Overview          → Dashboard
├── 02 · Content           → Components · Blocks · Templates · Documentation
├── 03 · Distribution      → Registry · Media
├── 04 · People            → Users · Roles · Permissions
├── 05 · Insights          → Analytics · Reviews · Reports
├── 06 · Build             → Website Builder
├── 07 · Platform          → SEO · Settings · System
└── 08 · Session           → Profile · Command Palette · Notifications
```

### Guiding principles
1. **Three clicks to any management action.** Every object (component, doc, media file) has the same action surface: **view → edit → publish → more**.
2. **Density by role.** List views are dense tables; detail views are spacious. Summary/detail navigation is the default: master list left, inspector right.
3. **One object, one route.** A component, doc, registry item, and media file each have a canonical `/[id]` detail route — no duplicated management surfaces.
4. **Progressive disclosure.** Destructive + rare actions live behind "…" menus; primary actions are always one visible click.
5. **Keyboard-first.** Every top-level section, command, and common action has a shortcut and is reachable from the command palette (`⌘K`).

---

## 2. Wireframes

### 2.1 Shell — sidebar collapsed to rail (64px) on `lg`, topbar full-width

```
┌──┬────────────────────────────────────────────────────────────────────┐
│⌘ │  Brand logo (icon)      Global search    ⌘K   … | 🔔 | 🌗 | + | ⬤ │  topbar 56px
├──┼────────────────────────────────────────────────────────────────────┤
│▓ │                                                                    │
│▓ │  · active rail item                                                   │
│▓ │                                                                    │
│▓ │  icons: Dashboard, Components▾, Docs▾, Registry, Media,           │
│▓ │         Users, Analytics, Builder, SEO, Settings, System           │
│▓ │  bottom: favorites ▸, recents ▸, profile ▸                          │
├──┼────────────────────────────────────────────────────────────────────┤
│  │                                                                    │
│  │                        CONTENT STAGE                               │
│  │              max-width 1400px, 24px gutters, 8px grid               │
│  │                                                                    │
└──┴────────────────────────────────────────────────────────────────────┘
```

### 2.2 Dashboard

```
┌──────────────────────────────────────────────────────────────────────┐
│ Dashboard            Last 30 days [∨]            + New [Export]      │
│ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐                             │
│ │ Views │ │Downloads│ │Users  │ │Storage│  ← 4 KPI cards             │
│ │ 1.4M↑ │ │ 8.2M↑ │ │24.5k↑ │ │ 62%   │     (sparkline in corner)    │
│ └───────┘ └───────┘ └───────┘ └───────┘                             │
│ ┌───────────────────────────┐ ┌───────────────────────┐              │
│ │ Traffic chart (area)      │ │ Quick actions          │              │
│ │  7d · 30d · 90d · 12m     │ │ + Component · + Doc    │              │
│ │                           │ │ + Upload · + Block     │              │
│ └───────────────────────────┘ └───────────────────────┘              │
│ ┌───────────────────────────┐ ┌───────────────────────┐              │
│ │ Recent activity (feed)    │ │ Pending reviews 3 →    │              │
│ │ Latest components 4 →     │ │ System status (5 rows) │              │
│ └───────────────────────────┘ └───────────────────────┘              │
└──────────────────────────────────────────────────────────────────────┘
```

### 2.3 List page (Components — the canonical "table" template)

```
┌──────────────────────────────────────────────────────────────────────┐
│ Components [256]        [Search…]  [All|Pub|Draft|Arch]  [+ Add]     │
│  Group: ▾ All · Category: ▾ · Tags: ▾                    [Columns]   │
│ ┌──────────────────────────────────────────────────────────────────┐ │
│ │ ☐ │ Name          │ Category  │ Status  │ Ver │ Author │ …      │ │
│ │ ☐ │ ┌▢┐ Button 2.1 │ Buttons    │ Published│2.1 │ Team    │ ⋮     │ │
│ │ …  (rows)                                                        │ │
│ ├──────────────────────────────────────────────────────────────────┤ │
│ │ ☐ select-all   (batch bar: Publish · Draft · Archive · Delete)    │ │
│ └──────────────────────────────────────────────────────────────────┘ │
│            ‹  1 of 26  ›           25 per page [∨]                    │
└──────────────────────────────────────────────────────────────────────┘
```

### 2.4 Detail / inspector (Component)

```
┌───────────────────────────────────────────────┬──────────────────────┐
│ ‹ Back to components    Breadcrumb            │  Inspector (sticky)  │
│                                              │ ┌──────────────────┐ │
│ ┌──────────────────────────────────────────┐ │ │ Status: Published│ │
│ │  Preview area (live component)           │ │ │ [Edit] [Preview] │ │
│ │                                          │ │ │ Version 2.1.0 ∨  │ │
│ └──────────────────────────────────────────┘ │ │ ─────────────────│ │
│  Tabs: Overview · Docs · Versions · Depend.   │ │ Dependencies     │ │
│  ───────────────────────────────────────────  │ │  +clx  +radix    │ │
│  Overview content                             │ │ Storage 4.2 KB   │ │
│                                               │ │ Created / Updated│ │
│                                               │ │ [Publish] [⋯]    │ │
│                                               │ └──────────────────┘ │
└───────────────────────────────────────────────┴──────────────────────┘
```

### 2.5 Documentation editor

```
┌──────────────────────────────────────────────────────────────────────┐
│ Docs / Create            [Draft]  [Save] [Preview] [Publish]        │
│ ┌───────────────────────────────┐ ┌───────────────────────────────┐ │
│ │  Markdown editor              │ │  Live preview (rendered)      │ │
│ │  # Title                     │ │  # Title                      │ │
│ │  ## Installation             │ │  ## Installation               │ │
│ │  ```tsx …```                 │ │  code block styled             │ │
│ └───────────────────────────────┘ └───────────────────────────────┘ │
│  Outline: right mini-nav · version select in header                   │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 3. Page Hierarchy

```
/admin
├── /dashboard                     overview KPIs, activity, status
├── /components                    list (filters, search, batch)
│   ├── /components/new            create wizard (info → files → meta)
│   └── /components/[slug]         detail + inspector
│       └── …/versions             version history / rollback
├── /blocks /templates             same pattern as /components (typed sets)
├── /docs
│   ├── /docs/new
│   └── /docs/[slug]               editor + preview + versions
├── /registry                      registry manifest + validation
│   ├── /registry/namespaces
│   └── /registry/[item]           JSON manifest, deps, publish
├── /media                         library (grid/table toggle)
│   └── /media/[id]                preview, metadata, replace
├── /users                         list + filters
│   ├── /users/[id]                profile, sessions, activity, roles
│   ├── /roles                     role matrix
│   └── /permissions               permission groups
├── /analytics                     visitors/downloads/views/search/copy/clicks
│   ├── /analytics/countries /devices /browsers /trending
│   └── /analytics/search          search analytics
├── /builder                       website builder
│   ├── /builder/homepage          sections: hero, nav, footer, announcements
│   ├── /builder/collections       curated collections
│   └── /builder/menus             nav menus
├── /seo                           global meta, sitemap, OG, structured data
├── /settings                      platform config (tabbed: General … Backup)
└── /system                        health, logs, queues, storage, jobs
```

**Hierarchy rules:** top-level sections are flat peers in the rail; nested children collapse into the parent group; no more than two levels of nesting; every nested page has a breadcrumb + back affordance.

---

## 4. Sidebar Structure

A two-state rail (expanded `260px` / collapsed icon rail `64px`) with resizable width (drag handle, persisted in localStorage, min 220 / max 320).

### Grouped navigation (expanded state)

```
⌘ WORKSPACE
  Dashboard                [⌘1]

CONTENT ▾ (collapsible group)
  Components               [⌘2]   → nested: All · New
  Blocks                   [⌘3]       Categories · Tags · Reviews
  Templates                [⌘4]
  Documentation            [⌘5]   → nested: All · New · Examples
DISTRIBUTION ▾
  Registry                 [⌘6]   → nested: Items · Namespaces · Validation
  Media                    [⌘7]   → nested: Images · SVG · Videos
PEOPLE ▾
  Users                    [⌘8]   → nested: All · Creators · Moderators · Admins
  Roles · Permissions      [⌘9]
INSIGHTS ▾
  Analytics                [⌘0]   → nested: Overview · Search · Trending
  Reviews · Reports
BUILD ▾
  Website Builder          [⌘-]   → nested: Homepage · Collections · Menus
PLATFORM ▾
  SEO · Settings · System
────────────
⭐ FAVORITES          (pinned items — star from any page)
🕑 RECENT PAGES       (last 5, computed + persisted)
```

### Sidebar features & behavior
| Feature | Behavior |
|---|---|
| **Collapsible** | Click group chevron OR `⌥` + click; group state persisted. Collapsed-to-rail keeps top-level icons, groups become flyout menus on hover. |
| **Nested menus** | Children appear indented under parent; parent expands on click; active child highlights parent. |
| **Active indicator** | 3px left accent bar + `--primary` text on the active item; `aria-current="page"`. |
| **Search** | Dedicated input pinned at top of the rail filters nav items live; result click navigates. |
| **Keyboard shortcut** | `⌘/` focuses sidebar search; `⌘1…⌘9,⌘0` jump to sections; `[ ]` cycle recents. |
| **Favorites** | Star button on every page header + row menu; pinned at rail top with its own group. |
| **Recent pages** | LIFO list of last 5 visited (excludes dashboard spam), cleared manually. |
| **Role-based visibility** | Nav tree declares `roles: ['admin'|'editor'|'moderator'|'viewer']`; hidden items are not rendered and routes enforce server-side. |
| **Resizable** | Edge drag handle adjusts width; persisted. |

---

## 5. Route Structure

Follows the existing `app/(admin)/admin/[section]/page.tsx` pattern, extended with detail routes.

```
app/(admin)/
├── layout.tsx                    shell (rail + topbar + providers)
├── page.tsx                      redirect → /admin/dashboard
└── admin/
    ├── layout.tsx                section param validation (await params)
    ├── dashboard/page.tsx
    ├── components/
    │   ├── page.tsx              list
    │   ├── new/page.tsx          create wizard
    │   └── [slug]/page.tsx       detail
    │       └── versions/page.tsx
    ├── blocks/  templates/       (mirror of components)
    ├── docs/
    │   ├── page.tsx
    │   ├── new/page.tsx
    │   └── [slug]/page.tsx
    ├── registry/
    │   ├── page.tsx
    │   ├── namespaces/page.tsx
    │   └── [item]/page.tsx
    ├── media/
    │   ├── page.tsx
    │   └── [id]/page.tsx
    ├── users/
    │   ├── page.tsx
    │   ├── roles/page.tsx
    │   ├── permissions/page.tsx
    │   └── [id]/page.tsx
    ├── analytics/
    │   ├── page.tsx
    │   ├── search/page.tsx
    │   └── trending/page.tsx
    ├── builder/
    │   ├── page.tsx
    │   ├── homepage/page.tsx
    │   ├── collections/page.tsx
    │   └── menus/page.tsx
    ├── seo/page.tsx
    ├── settings/page.tsx
    └── system/page.tsx
```

**Convention:** every `[param]` page awaits `params` (Next 16), static sections use `generateStaticParams` where possible, and the shell's active-state resolver reads the param.

---

## 6. Component Tree

```
AdminShell
├── AdminSidebar                    (client)
│   ├── SidebarHeader               brand logo / rail toggle
│   ├── SidebarSearch               filters nav, ⌘/ focus
│   ├── NavGroup                    collapsible group
│   │   └── NavItem                 icon, label, chevron, active bar, star
│   ├── NavFlyout                   (collapsed rail → hover menu)
│   ├── FavoritesList / RecentsList
│   └── SidebarFooter               profile chip, collapse control
├── AdminTopbar                     (client)
│   ├── Breadcrumb                  computed from route + section registry
│   ├── GlobalSearch                inline input → results dropdown
│   ├── CommandTrigger              ⌘K button
│   ├── NotificationBell            dropdown w/ unread badge
│   ├── ThemeToggle                 light/dark/system
│   ├── QuickCreate                 (+) menu: component/doc/block/upload
│   └── ProfileMenu                 account, sessions, logout
└── ContentStage                    <main> renders view by [section]

PrimatePage → toolbar + body
├── PageToolbar        breadcrumb, title, actions (primary/secondary/…)
├── FilterBar          search, pills, selects, saved-filters, column editor
├── DataTable          sortable columns, selection, batch bar, row menu
│   └── RowActions     view · edit · duplicate · publish · archive · delete
├── DetailLayout       content + sticky Inspector (configurable slots)
├── Wizard             step indicator + staged forms (create flows)
└── SectionTabs        object-level tabs (Overview/Docs/Versions/Deps)

Primitives (shared, in features/admin/primitives)
  AdminCard · AdminTable · AdminSearch · AdminPagination · AdminModal
  AdminDrawer · AdminSheet · AdminBadge · AdminStatCard · AdminToggle
  AdminButton · AdminMenu (dropdown) · AdminTooltip · AdminEmptyState
  AdminSkeleton · AdminProgress · AdminAvatar · AdminTabs · AdminToast
```

**Key pattern:** pages are thin composition roots; business logic lives in hooks (`useComponentsList`, `useMediaQuery`, `useCommandPalette`, `useSidebar`); pure transforms in `utils`.

---

## 7. Folder Structure

```
features/admin/
├── shell/                    AdminShell, AdminSidebar, AdminTopbar, CommandPalette,
│                             QuickCreate, ProfileMenu, GlobalSearch, notifications
├── primitives/               design-system atoms (button, table, modal, toast, …)
├── data/                     mock + seed data (dashboard, content, docs, registry,
│                             media, users, analytics, roles, settings, builder)
├── types/                    AdminStat, AdminComponent, AdminDoc, AdminRegistryItem,
│                             AdminMedia, AdminUser, AdminRole, BuilderSection, …
├── hooks/                    useComponentsList, useSidebar, useCommandPalette,
│                             useFavorites, useRecents, useRoleGate, useToast
├── views/                    one folder per section
│   ├── dashboard/            DashboardView + cards
│   ├── components/           ComponentsView, ComponentToolbar, ComponentTable,
│   │                         ComponentFormModal, ComponentPreview, ComponentInspector,
│   │                         versions/, dependencies/
│   ├── blocks/  templates/   (shared component-* pieces, typed differently)
│   ├── docs/                 DocsView, DocEditor, MarkdownPane, VersionList
│   ├── registry/             RegistryView, RegistryJsonModal, NamespacesView,
│   │                         ValidationView
│   ├── media/                MediaView, MediaGrid, MediaPreview, UploadFlow
│   ├── users/                UsersView, UserTable, RoleMatrix, SessionList,
│   │                         ActivityLog, PermissionTree
│   ├── analytics/            AnalyticsView, ChartCards, SearchAnalyticsView
│   ├── builder/              BuilderView, HomepageEditor, SectionPicker,
│   │                         CollectionEditor, MenuEditor
│   ├── seo/                  SeoView
│   ├── settings/             SettingsView, SettingsNav, per-section panels
│   └── system/               SystemView, ServiceTable, LogStream, JobQueue
├── constants.ts              section registry + role map
└── index.ts                  public barrels
```

---

## 8. Database Schema

Conceptual schema (Postgres + Prisma-style). Versioned entities use a `snapshots` table for history.

```
users              id, name, email, password_hash, status(Active/Inactive/Suspended),
                   avatar_url, created_at, last_login_at
roles              id, name, description, system(bool)
role_permissions   role_id, permission_key
permissions        key(PK), group, label, description
sessions           id, user_id, token_hash, ip, user_agent, expires_at, revoked_at

components         id, slug(unique), name, description, category_id, type(component/block/template),
                   author_id, status(draft/published/archived), version, files JSONB,
                   dependencies JSONB, storage_bytes, downloads, likes, views,
                   created_at, updated_at, published_at
component_versions id, component_id, version, changelog, manifest JSONB, created_at
categories         id, slug, label, description, icon, sort_order
tags               id, name, slug

docs               id, slug(unique), title, category, status, author_id, content_md,
                   views, created_at, updated_at
doc_versions       id, doc_id, version, content_md, created_at

registry_items     id, namespace, name, version, manifest JSONB, status, published_at
registry_namespaces id, slug, description

media              id, key(s3), filename, kind(image/svg/video/audio/code/document),
                   size, width, height, uploader_id, alt, created_at

reviews            id, component_id, author_id, rating, content, status, created_at
reports            id, kind, target_id, reason, severity, status, reporter_id, created_at

analytics_events   id, kind(visit/download/view/search/copy_click), component_id,
                   country, device, browser, session_id, created_at (timeseries,
                   partitioned by month, aggregated into analytics_daily)

builder_sections   id, area(homepage/navbar/footer/announcement), slot, kind,
                   config JSONB, enabled, sort_order
collections        id, slug, title, description, cover_media_id, component_ids JSONB

settings           key(PK), value JSONB, group(general/logo/theme/seo/security/backup)
backups            id, filename, size_bytes, status, created_at, storage_key
audit_logs         id, user_id, action, target_type, target_id, meta JSONB, created_at
```

---

## 9. API Structure

REST over `/api/admin`, versioned, JSON, cursor + offset pagination, role-scoped middleware.

```
/api/admin
├── me                                GET/PATCH profile, preferences
├── auth/sessions                     GET list, DELETE revoke
├── components                        GET list (filters: status/category/type/search),
│                                    POST create
│   /components/:slug                 GET/PATCH/DELETE
│   /components/:slug/versions        GET, POST (snapshot)
│   /components/:slug/publish         POST (draft→published)
│   /components/:slug/archive         POST
├── blocks · /templates               (type-scoped components)
├── categories                        GET/POST · /categories/:id PATCH/DELETE
├── tags                              GET/POST · /tags/:id PATCH/DELETE
├── docs                              GET list · POST · /docs/:slug GET/PATCH/DELETE
├── registry                          GET items · /registry/:item GET/PATCH
│   /registry/:item/publish · /registry/validate (POST manifest → validation report)
├── media                             GET list · POST (multipart) · /media/:id GET/DELETE
├── users                             GET · POST · /users/:id GET/PATCH/DELETE
│   /users/:id/sessions · /users/:id/activity
├── roles · /permissions              GET/PATCH (matrix)
├── analytics
│   /analytics/overview               GET (KPIs, timeseries)
│   /analytics/traffic · /analytics/search · /analytics/trending
├── builder/sections                  GET/POST · PATCH per section · reorder
├── seo                               GET/PATCH global meta
├── settings/:group                   GET/PATCH
├── system/health                     GET
├── system/logs                       GET (stream SSE)
├── system/jobs · /backups            GET · POST run · /backups/:id restore
└── search?q=                         global admin search (unified index)
```

**Error contract:** `{ error: { code, message, details? } }` with HTTP status; 401/403 → auth wall, 404 → EmptyState+CTA, 409 → conflict (duplicate slug), 422 → field-level `details` rendered inline.

---

## 10. Production-Ready Implementation Plan

### Phase 0 — Foundations (tokens, shell, primitives)  [~2 weeks]
- Design tokens: CSS custom properties for surface/foreground/border/primary/ring in light + dark; 8pt spacing scale; radius ramp (sm 6 / md 10 / lg 14 / xl 18); elevation = border + one soft shadow.
- Type scale (tabular numerals for stats), focus-visible ring `2px + 2px offset`, reduced-motion respect.
- Shell: collapsible + resizable rail, sticky topbar, breadcrumb, active resolver (extend current `AdminShell`).
- Primitives: AdminButton, AdminTable (sortable + selection), AdminMenu, AdminModal/AdminSheet, AdminToast (portal), AdminEmptyState, AdminSkeleton, AdminTabs, AdminTooltip, AdminProgress. All keyboard + screen-reader tested (axe CI).

### Phase 1 — Content management  [~3 weeks]
- DataTable list template with filter bar, batch bar, column editor.
- Components (list → new wizard → detail + inspector → versions → deps), Blocks, Templates reuse the same scaffold via `type` scoping.
- Docs: split-pane markdown editor (CodeMirror) + live preview, examples, version snapshots, install snippets.

### Phase 2 — Distribution & people  [~2 weeks]
- Registry: manifest viewer/editor, JSON validation (schema + dependency graph), namespaces, publish/version control.
- Media: grid/table, upload queue (resumable), preview, replace, kind filters.
- Users: list → profile, sessions, activity logs; role matrix + permission tree with dependency enforcement.

### Phase 3 — Insights & build  [~2 weeks]
- Analytics: chart primitives (area, bar, donut — hand-rolled SVG, no chart lib), KPI cards, search analytics, trending, country/device/browser.
- Website Builder: section editor (homepage/navbar/footer/announcement), collections, menus — JSON config with live canvas preview.

### Phase 4 — Platform & hardening  [~2 weeks]
- SEO (meta/sitemap/OG/structured data preview), Settings (tabbed panels per group), System (health, log stream, job queue, storage gauges).
- Command palette (`⌘K`) indexing all routes/actions; global search; favorites/recents/pinned; role-based visibility (server-side route guards + client nav filtering).
- Loading skeletons per route, empty/error states, toast system; e2e (Playwright) on CRUD + publish flows; performance budgets (< 90 kB route JS, CLS 0, LCP < 1.5s).

### Phase 5 — Polish  [~1 week]
- Motion pass (page transitions, list item enter/exit, collapsible easing — `cubic-bezier(0.16,1,0.3,1)`), dark-mode audit, i18n keys, final a11y + Lighthouse scores.

### Definition of done (per page)
Server-rendered shell ✓ · loading skeleton ✓ · empty state ✓ · error state ✓ · toast feedback for all mutations ✓ · keyboard navigation ✓ · role-gated ✓ · dark mode parity ✓ · responsive (rail → drawer < `lg`) ✓ · e2e covered ✓ · no lint/tsc/build warnings ✓.

---

### Appendix — Keyboard map
| Shortcut | Action |
|---|---|
| `⌘K` / `Ctrl+K` | Command palette |
| `⌘/` | Focus sidebar search |
| `⌘1`–`⌘9`, `⌘0` | Jump to section |
| `⌥ C` | Quick create component |
| `⌘P` | New doc |
| `⌘E` | Edit current object |
| `⌘B` | Toggle sidebar (rail) |
| `G T` | Go to theme toggle |
| `?` | Show shortcuts |
