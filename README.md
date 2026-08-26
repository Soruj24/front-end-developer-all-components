# Component Library

A comprehensive collection of 180+ UI components, page templates, and application patterns built with Next.js 16, React 19, and Tailwind CSS 4.

**[Documentation](https://github.com/Soruj24/front-end-developer-all-components)** · **[Report Bug](https://github.com/Soruj24/front-end-developer-all-components/issues)** · **[Discord](https://discord.gg/sun-ui)**

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.2.12 | App Router, Turbopack, Server Components |
| React | 19.2.4 | UI framework |
| TypeScript | ^5 | Type safety |
| Tailwind CSS | ^4 | Utility-first styling |
| MongoDB | ^9.9.1 | Database (via Mongoose) |
| NextAuth | ^5.0.0-beta.32 | Authentication |

### AI / LLM Providers

LangChain ecosystem with support for LangGraph, OpenRouter, GROQ, Anthropic, Google Gemini, Cohere, Mistral, and Ollama (local).

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20)
- **MongoDB** instance (local or cloud)
- npm, yarn, or pnpm

### Installation

```bash
git clone https://github.com/Soruj24/front-end-developer-all-component.git
cd front-end-developer-all-component/client
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Authentication
AUTH_SECRET=your-secret-here
MONGODB_URI=mongodb://localhost:27017/component-library

# AI Providers (optional — choose one or more)
OPENAI_API_KEY=your-openai-key
OPENROUTER_API_KEY=your-openrouter-key
GROQ_API_KEY=your-groq-key
ANTHROPIC_API_KEY=your-anthropic-key
GOOGLE_GENERATIVE_AI_API_KEY=your-google-key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

```bash
npm run build
npm run start
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run audit:preview` | Audit preview widths |

---

## Project Structure

```
client/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth routes (login, register, forgot-password, reset-password, verify-email)
│   ├── (site)/                   # Main site (180+ component pages)
│   ├── account/                  # User account area (17 sections)
│   └── api/                      # API routes
├── components/
│   ├── _<name>/                  # Modularized components (44)
│   ├── ui/                       # Core UI components
│   ├── registry/                 # Component registry
│   ├── home/                     # Homepage sections
│   ├── preview/                  # Preview system
│   └── navigation/               # Navigation components
├── features/                     # Domain modules
│   ├── ai/                       # AI service layer (providers, streaming, tools)
│   ├── auth/                     # Authentication system
│   ├── components/               # Component explorer
│   ├── registry/                 # Component registry system
│   └── ...                       # Blog, chat, ecommerce, saas, etc.
├── hooks/                        # Shared React hooks
├── lib/                          # Utilities (cn, env, zip)
├── types/                        # Shared TypeScript types
├── constants/                    # Navigation, tokens
├── styles/
│   └── globals.css               # Design system (oklch colors, tokens, animations)
├── docs/                         # Architecture documentation
└── public/                       # Static assets
```

---

## Features

### 120+ Component Categories

Accordion · Activity Feed · Alert · Alert Dialog · Animated Counter · Aspect Ratio · Attachment · Audio Player · Avatar · Background Patterns · Badge · Barcode Scanner · Bento Grid · Breadcrumb · Buttons · Calendar · Camera Capture · Cards · Carousel · Checkbox · Color Picker · Combobox · Command · Command Palette · Comparison Table · Confetti · Context Menu · Countdown · Currency Input · Data Grid · Data Table · Date Picker · Dependency Graph · Dialog · Dock · Drawer · Dropdown Menu · Dual Range Slider · Empty State · FAQ · File Upload · Floating Toolbar · Forms · Gallery · Grid · Heat Map · Hover Card · Image · Image Comparison · Infinite Scroll · Input Group · Input OTP · JSON Tree Viewer · Kbd · Kanban Board · List · Markdown Editor · Masonry · Message · Metric Card · Modal · Multi Select · Navigation Menu · Notification · Number Input · Pagination · Password Generator · Phone Input · Pie Chart · Pin Input · Popover · Progress · QR Code · Radio Group · Range Calendar · Rating Input · Rich Text Editor · Scroll Area · Select · Separator · Sheet · Signature Pad · Sidebar Layout · Skeleton · Slider · Snackbar · Split View · Spotlight Search · Stack Layout · Steps · Switch · Tabs · Table · Tags · Terminal Emulator · Textarea · Timeline · Toast · Toggle Group · Tooltip · Tree · Typing Indicator · Typography · Wave Loader

### 11 Application Templates

Blog · E-commerce · Chat · Portfolio · SaaS · Project Management · Social Media · LMS · Job Board · Restaurant · Real Estate

### Authentication System

Full NextAuth v5 integration with MongoDB: login, register, forgot/reset password, email verification, protected routes, and 17-section user account area.

### AI Service Layer

Modular AI architecture under `features/ai/` with:
- Multi-provider support (LangGraph, OpenRouter, GROQ, Anthropic, Google, Cohere, Mistral, Ollama)
- Streaming via SSE
- Tool calling, RAG, vector search
- MCP (Model Context Protocol) support
- Usage analytics and token tracking

### Design System

Custom design system built on **oklch** color space with:
- Light + dark themes with full token sets
- Semantic tokens (background, foreground, surface, primary, secondary, success, warning, danger, info)
- Shadow scale, motion tokens, spacing scale, radius scale
- 20+ keyframe animations (fade, scale, slide, shimmer, pulse, confetti, glitch)
- Reduced motion support
- Utility classes: `glass`, `surface`, `text-gradient`, `scrollbar-thin`, `bg-grid`, `bg-dots`

---

## Component Architecture

### Modularized Components (`components/_<name>/`)

```
components/_<name>/
├── <Name>.tsx          # Main component (≤150 lines)
├── <Name>.types.ts     # TypeScript interfaces
├── <Name>.constants.ts # Static data, presets
└── index.ts            # Barrel export
```

### File Size Limits

| Type | Preferred | Hard Ceiling |
|------|-----------|-------------|
| Component | 100 lines | 200 lines |
| Page | 150 lines | 200 lines |
| Hook | 100 lines | 120 lines |
| Service | 100 lines | 120 lines |

### Conventions

- Path alias: `@/*` → `./*`
- Component naming: `ComponentName/ComponentName.tsx`
- Barrel exports via `index.ts`
- React 19 patterns (no `forwardRef`)
- ESLint: `core-web-vitals` + `typescript`

---

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Soruj24/front-end-developer-all-components)

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Follow the [AGENTS.md](./AGENTS.md) architecture rules
4. Commit changes (`git commit -m 'feat: add amazing feature'`)
5. Push to the branch (`git push origin feat/amazing-feature`)
6. Open a Pull Request

### Development Guidelines

- Keep files under 200 lines (preferred: 100)
- Use the modularized component structure (`_name/`)
- Export through `index.ts` barrels only
- Run `npm run lint` before committing
- Test in both light and dark themes

---

## License

MIT

---

<p align="center">
  Built with Next.js, React, and Tailwind CSS
</p>
