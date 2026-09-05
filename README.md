# Component Library

A comprehensive collection of UI components, page templates, and application patterns built with Next.js 16, React 19, and Tailwind CSS 4.

Component count and catalog stats are dynamic — see `lib/stats.ts:getHomeStats()` (`registryCatalog.length`, `registryCategories.length`, download sums, GitHub stars). The App Router contains 191 demo pages under `app/(site)`, 5 auth pages under `app/(auth)`, and 16 account pages under `app/account`.

**[GitHub](https://github.com/Soruj24/front-end-developer-all-components)** · **[Report Bug](https://github.com/Soruj24/front-end-developer-all-components/issues)** · **[Discord](https://discord.gg/sun-ui)**

> No live demo URL is configured in `config/site.ts` (only GitHub + Discord). No screenshots are shipped in `public/` (only `esbuild.wasm` and SVG icons).

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.2.12 | App Router, Server Components |
| React / React DOM | 19.2.4 | UI framework |
| TypeScript | ^5 | Type safety |
| Tailwind CSS | ^4 (+ `@tailwindcss/postcss`) | Utility-first styling (CSS-first, no `tailwind.config.js`) |
| MongoDB via Mongoose | ^9.9.1 | Database (optional — fail-soft fallback to static seed) |
| NextAuth (Auth.js) | ^5.0.0-beta.32 | Authentication (JWT, Credentials) |
| Redux Toolkit / React-Redux | ^2.12.0 / ^9.3.0 | E-commerce demo state + RTK Query |
| Zod | ^4.4.3 | Validation (auth, registry, checkout, AI) |
| Nodemailer | ^8.0.11 | SMTP mailer (fallback: Resend REST, console in dev) |
| bcryptjs | ^3.0.3 | Password hashing (cost 12) |

### AI / LLM Providers

LangChain ecosystem (`@langchain/core/openai/anthropic/google-genai/groq/langgraph/mistralai/ollama/cohere`, `langchain`), orchestration via `@langchain/langgraph` + `deepagents`, MCP via `@modelcontextprotocol/sdk@^1.30.0`. Isolated via `next.config.ts:serverExternalPackages`.

Editors: `codemirror@6 + @codemirror/* + @lezer/*`, `esbuild-wasm`. UI: `lucide-react@^1.28`, `clsx`, `tailwind-merge`.

---

## Architecture Overview

- **App Router only** (no Pages Router). Groups `(auth)/(site)` are URL-transparent; `account/` is a real protected segment.
- **Layouts:** `app/layout.tsx` (Geist fonts, `ThemeInit`, `StoreProvider`) → `app/template.tsx` (fade-slide remount) → `(auth)/layout.tsx` (bare) / `(site)/layout.tsx` (`Header + Sidebar + Footer` via `getNavigationSections()`) / `account/layout.tsx` (`auth() + findUserById` guard → `AccountShell`) / `(site)/e-commerce/layout.tsx` (shop shell + `CartDrawer`).
- **Server boundary:** React Server Actions (`features/auth/actions/*`, `features/registry/server/actions.ts`, `features/ai/actions/chat.ts`) + `auth()` + Mongoose services. Only 3 route handlers exist (see API).
- **Auth edge:** root `proxy.ts` (not `middleware.ts`): `NextAuth(authConfig).auth`, `matcher: [/account/:path*, /login, /register]`.
- **DB pattern:** dual cached Mongoose (`features/auth/server/db.ts`, `features/registry/server/connect.ts`, `globalThis` cache, `serverSelectionTimeoutMS 5000`). Returns `null` if `MONGODB_URI` missing; registry falls back to `features/registry/data/factory + seed`.
- **Secrets:** `lib/env.ts:{requireEnv (throws in prod), optionalEnv}` read at request time, never module scope.
- **Rules:** `AGENTS.md` — preferred 100 lines, hard ceiling 200 lines; `features/<name>/` barrel-only imports; `features/ai/server/` internal only.

---

## Project Structure

```
client/
├── app/
│   ├── layout.tsx / template.tsx / error.tsx / not-found.tsx
│   ├── (auth)/login|register|forgot-password|reset-password|verify-email/page.tsx (5)
│   ├── (site)/page.tsx + 191 demo pages (blog/[slug], e-commerce/*, real-estate/[slug], [slug] fallback, ...)
│   │   └── e-commerce/layout.tsx (shop shell)
│   ├── (site)/layout.tsx (Header+Sidebar+Footer)
│   ├── account/layout.tsx + page.tsx + 15 subdirs (16 pages total)
│   ├── api/auth/[...nextauth]/route.ts (only app/api handler)
│   ├── registry.json/route.ts + registry/[file]/route.ts
├── components/ (70 entries)
│   ├── _*/ (44 modularized primitives: _dialog, _data-table, ...)
│   ├── ui/ / registry/ / layout/ / navigation/ / preview/ / search/ / code/ / docs/ / home/ ...
│   ├── store-provider.tsx / theme-init.tsx / markdown.tsx
├── features/ (18)
│   ├── ai/ (service layer + server/providers|prompts|streaming|memory|tools|rag|vector|cache|errors|analytics|mcp|agents|workflows|nodes|jobs)
│   ├── auth/server|schemas|actions|components|constants|types|hooks
│   ├── registry/server|data|api|utils|constants|types
│   ├── ecommerce/api|slices|hooks|schemas|components
│   ├── chat/ (static mock) / blog/ lms/ job-board/ social-media/ saas/ portfolio/ real-estate/ restaurant/ project-management/
│   ├── components/ design/ hero/ templates/ (templates = types-only stub)
├── store/index.ts (makeStore)
├── hooks/ (useActivePath, useSidebar, useLocalStorage, useMediaQuery, useToggle, useRegistryActions, useRedux)
├── lib/cn.ts + env.ts + stats.ts + zip.ts
├── config/site.ts (branding, SEO, nav)
├── constants/navigation.tsx + tokens.ts / types/navigation.ts / utils/docs.ts + navigation.ts
├── styles/globals.css (OKLCH tokens, Tailwind v4 @theme)
├── docs/architecture.md + auth-system.md + header-redesign.md
├── features/ai/docs/architecture.md
└── public/esbuild.wasm + *.svg
```

---

## How the Application Works

1. **Anonymous browse:** `(site)/layout:getNavigationSections()` → Sidebar/Header → `page.tsx` → `registryCatalog.getComponentBySlug()` → `LivePreview + CodeViewer + CustomizationPanel (tailwind-generator) + ComponentInstall`. No auth required.
2. **Account:** form `useActionState` → Server Action → `service.ts` → Mongoose → `signIn()` → JWT → `redirect(/account)` → `account/layout:auth()+findUserById` → `AccountShell`.
3. **E-commerce demo:** RTK Query `https://dummyjson.com` or local `PRODUCTS` → filters/search → `ProductGrid/Card` → `useCart` (Redux + `localStorage:ecommerce-*`) → `CartDrawer/Summary` → `useCheckout` + Zod → success.
4. **AI (service ready, routes missing):** `ChatInput → useChat.send() → sendChatMessageAction → ChatService.invoke/stream → ModelRegistry.resolve → BaseChatModel (+2 tool rounds) → persist + usage.record + cache → SSE start/delta/done/error`. No client provider calls.

---

## Core Features

- **Component explorer (`features/components`):** grid/search/filter/detail/preview/code/customize; reads `features/registry` via `data/registryCatalog`, mutates via `hooks/useRegistryActions → registry/server/actions`.
- **11 template domains (frontend-only, static `constants/*-data.ts` → `useState/useMemo` → cards):** blog, e-commerce, chat, portfolio, SaaS, project-management, social-media, LMS, job-board, restaurant, real-estate. No server actions / DB except ecommerce (RTKQ) and registry.
- **`features/chat` is a static mock:** `useState(activeId, allMessages, typingUsers)`, local `m-${Date.now()}` append. No fetch/socket.
- **`features/templates` is a stub:** `types/templates.ts` only, no components/index.
- **Registry:** full-stack catalog + admin CRUD (`create/update/delete/duplicate/setPublishStatus`) guarded by `isAuthenticated()`, `revalidateAll()` after mutations.
- **Design system:** OKLCH `styles/globals.css`, `glass/surface/text-gradient/scrollbar-thin/bg-grid/bg-dots`, 20+ keyframes, `prefers-reduced-motion` support.

---

## Authentication Flow

- **Strategy:** JWT only (`session.strategy:jwt, maxAge 30d`). Edge `authConfig` has empty providers; full `server/auth.ts` has `Credentials({email,password})`.
- **Register (`actions/signin.ts`):** Zod + `password===confirm` → `register:{ip} 10/hr` → uniqueness → `bcrypt(12)` → HMAC verification token (24h) → `appUrl(/verify-email?token)` mail → auto `signIn → /account`.
- **Login:** Zod → `login:{ip}:{email} 5/min` → `validateCredentials (active + bcrypt.compare)` → `jwt/session` callbacks (`id/role/emailVerified/remember`) → `events.signIn: markLogin + recordLoginEvent(success) + createDeviceSession(HMAC, ip/ua/device)` → redirect. Fail → generic `Invalid email or password` + `recordLoginEvent(failed)`. Remember-me is `localStorage:cl-remember*` only.
- **Verify/Resend:** `hashToken(raw)` lookup + expiry → `emailVerified:true`. Resend `3/min`, generic message.
- **Forgot/Reset:** `3/min`, generic return, HMAC 30min, `consumeResetPassword → rehash → auto signIn`.
- **Account:** `auth()` guard → `updateProfile / changePassword (verify→rehash) / revokeSession (AccountSession.revokedAt)`.
- **Guards:** `proxy.ts:authorized` redirects unauth `/account→/login`, authed `/login|/register→/account`; `account/layout` re-checks.
- **OAuth:** stubbed — `signInWithProvider` returns `coming soon` if `AUTH_GITHUB_ID/_SECRET` or `AUTH_GOOGLE_ID/_SECRET` missing. Types include `google/github/microsoft/gitlab/magic/passkey` for future.

---

## API Documentation

| Endpoint | Methods | File | Notes |
|----------|---------|------|-------|
| `/api/auth/*` | `GET,POST` | `app/api/auth/[...nextauth]/route.ts` | Re-exported `handlers`, `dynamic=force-dynamic` |
| `/registry.json` | `GET` | `app/registry.json/route.ts` | Manifest `{name, items:[{name,type,path}] }`, `Cache-Control: public, s-maxage=3600, stale-while-revalidate` |
| `/registry/:file` e.g. `/registry/button.json` | `GET` | `app/registry/[file]/route.ts` | Shadcn-compatible `{name,type,title,description,dependencies,files:[{path,content}]}` or `404 {error:Component not found}` |

> `POST /api/ai/chat` (JSON vs SSE) and `GET/POST /api/mcp` (streamable HTTP) are documented in `features/ai/docs/architecture.md:50-59,89-91` but **no route files exist**. Use `sendChatMessageAction` + `useChat({endpoint:/api/ai/chat})` only after implementing handlers.

---

## Database Architecture

- **Connection:** `connectAuthDb() / connectDb()` cached `globalThis`, `null` without `MONGODB_URI`. Registry lazily `seedDatabase()` once. AI `isMongoAvailable()` swaps `MongoMemoryStore/MongoCacheStore/MongoUsageTracker`, else in-memory.
- **Models:**
  - `User: name*, username? unique sparse, email* unique, passwordHash*, avatarUrl?, role[guest/member/creator/moderator/admin/super_admin]=member, status[active/suspended/deleted]=active, emailVerified, verificationHash/Expires, resetHash/Expires, twoFactorEnabled/Secret/recoveryCodes, lastLoginAt/Ip + timestamps`
  - `AccountSession: userId→User index, tokenHash* unique, ip/ua/device, createdAt/lastSeenAt, expiresAt 30d TTL, revokedAt?`
  - `LoginEvent: userId→User index, ip/ua, method[credentials/google/github/microsoft/gitlab/magic/passkey], status[success/failed], createdAt TTL 90d, index {userId,-createdAt}`
  - `Component: slug* unique, category index, tags, status[stable/beta/new/deprecated], publishStatus[draft/published/archived/scheduled] index, visibility, code variants, props[]/examples[], stats{downloads/likes/bookmarks/comments/views}, version/releases[], featured/popular, publishedAt/scheduledAt/deletedAt + text index`
  - `ComponentVersion, Category, Tag, Setting, NavItem[sidebar/navbar/footer], Session(tokenHash TTL, cmp_session 7d)`
  - `ai_conversations / ai_usage / ai_cache` (`features/ai/server/db/models`).

---

## State Management

- `store/index.ts:makeStore({productsApi, cart:{items:{product,quantity}[],isOpen}, toast:{items[]}, wishlist:{ids[]}})` + `productsApi.middleware`. `components/store-provider.tsx` lazy `useRef`, mounted in `app/layout.tsx`. `hooks/useRedux.ts` typed `useAppDispatch/useAppSelector`.
- **Slices:** `cart: addItem/removeItem/updateQuantity/clearCart/toggle|open|closeCart`; `wishlist: toggleWishlist`; `toast: addToast(crypto.randomUUID)/removeToast`. RTKQ: `getProducts/getProductById/searchProducts/getCategories/getProductsByCategory` → `https://dummyjson.com`.
- Auth uses NextAuth JWT, not Redux. Domain UI uses `useState/useMemo` + `localStorage` (`ecommerce-cart/wishlist/recent`, `blog-bookmarks`, `job-bookmarks/history/alerts/notes`).

---

## AI Integration

- **Facade:** `ChatService{invoke,stream}` + `createChatService(deps)` (defaults: `DefaultModelRegistry/PromptRegistry`, Mongo* if `MONGODB_URI` else in-memory, `createMcpAgentToolRegistry()`, fallback IDs). Constructor-injected, never singletons importing globals (except `isMongoAvailable` check).
- **Catalog (18):** `openai/gpt-4o|mini, anthropic/claude-3-5-sonnet|haiku, gemini/1.5-pro|flash, grok/grok-2, deepseek-chat, openrouter/*2, mistral/large|small, cohere/command-r-plus, groq/llama-3.3-70b (DEFAULT)|llama-3.1-8b, ollama/llama3.1|mistral|llama3.2`. Config-driven `selectModelId({preferred|fastest|capacity})`, `invokeWithFallback` only on `provider_unavailable|rate_limited` + `withRetry(2)`.
- **Concerns:** prompts (`PromptTemplate {{var}}` + registry), memory (`trimHistory 12`), tools (`bindTools maxRounds 2`), RAG (`topK 4` injected into system prompt), vector (in-memory cosine), cache (TTL 5min, skipped if tools), analytics (tokens/model/provider/latency/cacheHit/cost every call), errors (`AiError` + `classifyError`), streaming (SSE `encodeChatEvent`), agents (`createDeepAgent`), workflows/nodes/jobs (`graph.stream updates`, `PipelineEventBus`), MCP 23 tools (`registry/docs/db/memory/usage/fs/git/agent`).

---

## Real-Time Communication

- **SSE only.** No WebSocket/Socket.io/Pusher/Ably/polling in `features/chat` or `features/ai` (verified grep 0 hits; portfolio resume text excluded).
- Token stream: `ChatService.stream → chatEventStream → readChatEventStream → delta merge by messageId → AbortController.stop()`. Events: `start/delta/tool/done/error`.
- `features/chat/TypingIndicator` is static prop render; workflow `PipelineEventBus (start/node_end/gate/approval_needed/preview_ready/error/done)` is in-process, designed to bridge to SSE.

---

## Environment Variables

Create `.env.local` (gitignored via `.env*`). Placeholders only — never commit real secrets.

```env
# Auth / DB
SESSION_SECRET=your-session-secret
AUTH_SECRET=your-auth-secret-fallback
MONGODB_URI=mongodb://localhost:27017/component-library
ADMIN_PASSWORD=your-admin-password

# OAuth (stubbed — missing values return 'coming soon')
AUTH_GITHUB_ID=your-github-id
AUTH_GITHUB_SECRET=your-github-secret
AUTH_GOOGLE_ID=your-google-id
AUTH_GOOGLE_SECRET=your-google-secret

# Mail (SMTP > Resend > console-dev-only)
SMTP_HOST=localhost
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-pass
SMTP_SECURE=false
EMAIL_FROM=noreply@example.com
RESEND_API_KEY=your-resend-key

# AI providers (pick one or more)
OPENAI_API_KEY=your-openai-key
OPENROUTER_API_KEY=your-openrouter-key
GROQ_API_KEY=your-groq-key
ANTHROPIC_API_KEY=your-anthropic-key
GOOGLE_GENERATIVE_AI_API_KEY=your-google-key
```

Secrets are read via `lib/env.ts` at request time. `SESSION_SECRET` is primary (`registry/server/auth.ts`); `AUTH_SECRET` is fallback for HMAC (`auth/server/tokens.ts:10`). `MONGODB_URI` absent → in-memory/seed fallback.

---

## Installation

```bash
git clone https://github.com/Soruj24/front-end-developer-all-components.git
cd front-end-developer-all-components/client
npm install
```

- Requires `package-lock.json` (npm). No `pnpm-lock/yarn.lock` shipped.
- Node.js: no `engines` field — use current LTS. MongoDB optional for demos (static seed fallback).

---

## Development Setup

1. Copy env above to `.env.local`.
2. (Optional) Start local MongoDB or set cloud `MONGODB_URI`.
3. `npm run dev` → open `http://localhost:3000`.
4. Follow `AGENTS.md`: 100-line preferred / 200-line ceiling, barrel-only imports, AI in `features/ai/server/`.

---

## Build Instructions

```bash
npm run lint
npm run build
```

Note: `next.config.ts:typescript.ignoreBuildErrors:true` + `tsconfig:skipLibCheck` may hide type errors — fix lint/TS warnings before shipping.

---

## Production Instructions

```bash
npm run build
npm run start
```

Set all required env in host (`SESSION_SECRET/AUTH_SECRET`, `MONGODB_URI`, mailer, AI keys). Never use console mailer in prod (logs tokens). `app/api/auth` is `force-dynamic`; registry routes cache 1h.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint (`core-web-vitals + typescript`) |
| `npm run audit:preview` | `node scripts/audit-preview-widths.mjs` |

---

## API Examples

```bash
curl http://localhost:3000/registry.json
curl http://localhost:3000/registry/button.json
curl http://localhost:3000/api/auth/session
```

```ts
// Server action (implemented)
import { sendChatMessageAction } from "@/features/ai/actions/chat";
const res = await sendChatMessageAction({ messages: [{ role: "user", content: "hi" }], stream: false });

// Client hook (streaming endpoint /api/ai/chat not yet implemented)
import { useChat } from "@/features/ai/hooks/useChat";
const { messages, send } = useChat({ stream: true });
await send("Explain SSE streaming");
```

---

## Security Considerations

- bcrypt 12, 32-byte HMAC tokens (verify 24h, reset 30min), JWT 30d, `httpOnly/sameSite:lax/secure=prod`, enumeration-safe messages, `escapeRegex`, Zod `strict()` + slug regex + caps.
- Fixed-window in-memory limiter (login/register/forgot/resend) — resets on restart, non-distributed; use Redis at scale.
- Device revocation sets `revokedAt` but JWT remains valid until expiry — needs blocklist for true kill.
- Legacy `cmp_session` scrypt (`N=16384,r=8,p=1`, stable salt) coexists with NextAuth — two truth sources.
- No CSP/HSTS/security headers in `next.config.ts`; CSRF relies on Auth.js defaults.

---

## Error Handling

- `app/error.tsx` client boundary (`console.error`, `error.digest`, `unstable_retry`), `app/not-found.tsx`, no per-segment `loading.tsx`.
- Auth actions return `{errors, message}` for `useActionState`; HTTP returns `{error:{code,message}}`.
- AI returns `AiError{auth_missing|rate_limited|provider_unavailable|invalid_request|context_length|tool_failed|unknown, retryable}` via `classifyError`.
- Registry `404 {error:Component not found}`.

---

## Performance Considerations

- `app/template.tsx` remounts every navigation (resets state).
- `(site)/layout` fetches navigation per nav; `lib/stats.ts` GitHub fetch `revalidate 3600`.
- `revalidateAll()` (`revalidatePath(/,layout)`) on every registry mutation is heavy.
- AI multipliers: `HISTORY 12, RAG 4, tool rounds 2, retries 2`; no token budget guard.
- `serverExternalPackages` isolates LangChain/MCP/nodemailer; `globals.css` 987 lines + CodeMirror increase CSS/JS weight.

---

## Deployment

Generic Next.js only (no `Dockerfile`/`vercel.json` in repo, no `output:standalone`):

1. Push to GitHub.
2. Import in host (e.g. Vercel), set env vars above.
3. `npm run build` → `npm run start`.

Do not use the previous `standalone` Docker snippet — it is untested against this config.

---

## Troubleshooting

- **DB empty/fallback data:** `MONGODB_URI` missing → `connect*()` returns `null`, static `factory/seed` used. Set URI for persistence.
- **Auth throws `Missing required environment variable`:** set `SESSION_SECRET` (or `AUTH_SECRET`) in prod (`lib/env.ts`).
- **Admin login disabled:** `ADMIN_PASSWORD` unset (`registry/server/auth.ts:56`).
- **Mail not sent:** no `SMTP_HOST`/`RESEND_API_KEY` → console mailer (dev only, may log tokens).
- **OAuth `coming soon`:** set `AUTH_<PROVIDER>_ID/_SECRET`.
- **AI `provider_unavailable`:** missing provider key; check `apiKeyEnv` per `server/providers/*`.
- **`POST /api/ai/chat` 404:** route not implemented — use `sendChatMessageAction`.

---

## Future Improvements

From `docs/auth-system.md §10` + audit gaps: OAuth (Google/GitHub/Microsoft/GitLab), magic link, passkeys, TOTP 2FA (`twoFactorSecret` already in schema), refresh rotation, creator dashboard, bookmarks/collections/likes, scoped API keys, admin user management, Redis limiter/blocklist, `POST /api/ai/chat` + `GET/POST /api/mcp` handlers, split 10 oversized files (`PromptBuilder 1261L`, `StreamingResponse 1282L`, etc.), shared filter/pagination module, `loading.tsx`/suspense, remove global remount, token/cost budgets, Playwright e2e + Lighthouse/a11y gates.

---

## Contributing

1. Fork, branch (`feat/...`), follow `AGENTS.md` (200-line ceiling, module template, barrel-only, AI service rules).
2. `npm run lint` clean, test light + dark themes.
3. PR with scope-limited changes, keep build green per module.

---

## License

No `LICENSE` file found in the repository. The previous README claimed MIT — unconfirmed. Add a `LICENSE` before publishing.

---

<p align="center">
  Built with Next.js, React, and Tailwind CSS
</p>
