# @sun-ui/cli - Production-Ready Implementation Plan

## Executive Summary

A production-ready CLI tool for installing and managing UI components from a registry, following the developer experience patterns established by shadcn/ui. The CLI communicates with a Registry API to fetch component metadata, download files, resolve dependencies, and safely merge components into user projects.

## User Decisions

| Decision | Choice |
|----------|--------|
| **Location** | `packages/@sun-ui/cli` (monorepo packages/) |
| **Package** | Separate npm package (`@sun-ui/cli`) |
| **Registry URL** | Default `localhost:3000` (dev) |
| **Scope** | Core commands first: `init`, `add`, `remove`, `list`, `search`, `update` |

---

## 1. Folder Structure

```
packages/@sun-ui/cli/
├── package.json                    # CLI package manifest
├── tsconfig.json                   # TypeScript config (noEmit: false, outDir: dist)
├── tsup.config.ts                  # Build config (esbuild bundler)
├── README.md                       # Usage documentation
├── src/
│   ├── index.ts                    # Entry point (registers all commands, parses argv)
│   ├── cli.ts                      # Commander program definition + global options
│   ├── config/
│   │   ├── index.ts                # Barrel export
│   │   ├── constants.ts            # Registry URL, default paths, timeout values
│   │   ├── schema.ts               # Zod schema for sun-ui.json config file
│   │   └── loader.ts               # Read/validate/write sun-ui.json
│   ├── registry/
│   │   ├── index.ts                # Barrel export
│   │   ├── client.ts               # HTTP client (fetch wrapper with retry/timeout)
│   │   ├── types.ts                # RegistryItem, RegistryManifest, ComponentFile
│   │   ├── parser.ts               # Parse/validate registry responses
│   │   └── cache.ts                # TTL cache for registry responses (~5 min)
│   ├── detectors/
│   │   ├── index.ts                # Barrel export
│   │   ├── framework.ts            # Detect Next.js, React, Vite, etc.
│   │   ├── package-manager.ts      # Detect npm, pnpm, yarn, bun
│   │   ├── tailwind.ts             # Detect Tailwind CSS version + config
│   │   └── typescript.ts           # Detect tsconfig.json + strict mode
│   ├── validators/
│   │   ├── index.ts                # Barrel export
│   │   ├── project.ts              # Validate project structure + prerequisites
│   │   ├── component.ts            # Validate component compatibility
│   │   └── dependencies.ts         # Validate dependency conflicts
│   ├── resolvers/
│   │   ├── index.ts                # Barrel export
│   │   ├── dependencies.ts         # Resolve full dependency tree
│   │   ├── conflicts.ts            # Detect file/dependency conflicts
│   │   └── versions.ts             # Resolve version ranges
│   ├── installers/
│   │   ├── index.ts                # Barrel export
│   │   ├── files.ts                # Write component files to disk
│   │   ├── dependencies.ts         # Install npm packages
│   │   ├── exports.ts              # Update barrel exports (index.ts)
│   │   └── tailwind.ts             # Merge tailwind.config.ts if needed
│   ├── updaters/
│   │   ├── index.ts                # Barrel export
│   │   ├── diff.ts                 # Compute diff between local + remote
│   │   ├── merge.ts                # Safe merge with conflict detection
│   │   └── rollback.ts             # Backup + rollback on failure
│   ├── commands/
│   │   ├── index.ts                # Register all commands with program
│   │   ├── init/
│   │   │   ├── index.ts            # Command definition
│   │   │   ├── prompts.ts          # Interactive prompts
│   │   │   └── handler.ts          # Implementation
│   │   ├── add/
│   │   │   ├── index.ts            # Command definition
│   │   │   ├── handler.ts          # Implementation (10-step flow)
│   │   │   └── prompts.ts          # Interactive prompts (overwrite?, which deps?)
│   │   ├── remove/
│   │   │   ├── index.ts            # Command definition
│   │   │   ├── handler.ts          # Implementation
│   │   │   └── cleanup.ts          # Remove unused dependencies
│   │   ├── search/
│   │   │   ├── index.ts            # Command definition
│   │   │   └── handler.ts          # Search registry
│   │   ├── list/
│   │   │   ├── index.ts            # Command definition
│   │   │   └── handler.ts          # List installed components
│   │   ├── update/
│   │   │   ├── index.ts            # Command definition
│   │   │   ├── handler.ts          # Implementation
│   │   │   └── diff.ts             # Show diff before applying
│   │   └── doctor/
│   │       ├── index.ts            # Command definition
│   │       └── handler.ts          # System diagnostics
│   ├── utils/
│   │   ├── index.ts                # Barrel export
│   │   ├── fs.ts                   # Safe file read/write/mkdir
│   │   ├── git.ts                  # Git helpers (isRepo, hasChanges)
│   │   ├── logger.ts               # Chalk + Ora logger
│   │   ├── errors.ts               # Custom error classes
│   │   ├── spinner.ts              # Ora spinner wrapper
│   │   ├── exec.ts                 # Execa wrapper for package manager commands
│   │   └── hashing.ts              # Content hashing for cache invalidation
│   └── types/
│       ├── index.ts                # Barrel export
│       ├── config.ts               # SunUIConfig type
│       ├── project.ts              # ProjectInfo type
│       └── command.ts              # CommandContext type
├── tests/
│   ├── setup.ts                    # Test setup (MSW, mocked fs)
│   ├── commands/
│   │   ├── init.test.ts
│   │   ├── add.test.ts
│   │   ├── remove.test.ts
│   │   └── ...
│   ├── registry/
│   │   ├── client.test.ts
│   │   └── parser.test.ts
│   ├── detectors/
│   │   ├── framework.test.ts
│   │   └── package-manager.test.ts
│   └── utils/
│       └── fs.test.ts
└── fixtures/
    ├── projects/                   # Mock project structures for tests
    │   ├── nextjs/
    │   ├── react-vite/
    │   └── vanilla/
    └── registry/                   # Mock registry responses
        ├── manifest.json
        └── button.json
```

**Rationale:** Each command is isolated in its own folder with `index.ts` (definition), `handler.ts` (implementation), and optional `prompts.ts` (interactive UI). Shared logic lives in domain folders (`registry/`, `detectors/`, `validators/`, etc.). All files stay under 150 lines.

---

## 2. Command Architecture

### 2.1 Entry Point (`src/index.ts`)

```typescript
#!/usr/bin/env node
import { program } from "./cli";

program.parse(process.argv);
```

### 2.2 CLI Definition (`src/cli.ts`)

```typescript
import { Command } from "commander";
import { registerCommands } from "./commands";

const program = new Command()
  .name("@sun-ui/cli")
  .version("1.0.0")
  .description("Install and manage UI components from the Sun UI registry");

registerCommands(program);
```

### 2.3 Command Registration Pattern

Each command follows this pattern:

```typescript
// commands/add/index.ts
import { Command } from "commander";
import { AddHandler } from "./handler";

export const addCommand = new Command("add")
  .description("Add a component to your project")
  .argument("<components...>", "Component name(s) to add")
  .option("--yes", "Skip confirmation prompts")
  .option("--overwrite", "Overwrite existing files")
  .option("--registry <url>", "Registry URL override")
  .action(async (components, options) => {
    await new AddHandler(components, options).run();
  });
```

### 2.4 Command Context Pattern

Every handler receives a `CommandContext`:

```typescript
interface CommandContext {
  config: SunUIConfig;           // Parsed sun-ui.json
  projectInfo: ProjectInfo;       // Detected framework, PM, TS, Tailwind
  registry: RegistryClient;       // HTTP client for registry
  logger: Logger;                 // Chalk + Ora output
  dryRun: boolean;                // --dry-run flag
}
```

### 2.5 Command List (Phase 1-3: Core Commands)

| Command | Description | Key Options | Phase |
|---------|-------------|-------------|-------|
| `init` | Initialize project config | `--defaults`, `--registry <url>` | 1 |
| `add <components...>` | Add component(s) | `--yes`, `--overwrite`, `--registry` | 1 |
| `remove <components...>` | Remove component(s) | `--yes`, `--unused` (cleanup deps) | 2 |
| `search <query>` | Search registry | `--json`, `--limit <n>` | 2 |
| `list` | List installed | `--json`, `--outdated` | 2 |
| `update [components...]` | Update to latest | `--all`, `--dry-run` | 3 |
| `doctor` | System diagnostics | `--fix` | 2 |

**Future Commands (Phase 4+):** `upgrade`, `publish`, `login`, `logout`, `config`, `diff`, `validate`, `sync`

---

## 3. Registry Protocol

### 3.1 Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/registry.json` | GET | Index manifest (all components) |
| `/registry/[slug].json` | GET | Component detail + inline source |
| `/registry/[slug]/files/[path]` | GET | Individual file content |
| `/registry/search?q=<query>` | GET | Search components |
| `/registry/auth/login` | POST | OAuth device flow |
| `/registry/auth/token` | POST | Exchange code for token |
| `/registry/publish` | POST | Publish component (auth required) |

### 3.2 Response Schemas (Zod)

```typescript
// Registry Manifest
const RegistryManifestSchema = z.object({
  $schema: z.literal("https://ui.shadcn.com/schema.json"),
  name: z.string(),
  type: z.literal("registry:ui"),
  items: z.array(z.object({
    name: z.string(),
    type: z.literal("registry:ui"),
    path: z.string(),
  })),
});

// Component Detail
const ComponentDetailSchema = z.object({
  $schema: z.literal("https://ui.shadcn.com/schema.json"),
  name: z.string(),
  type: z.literal("registry:ui"),
  title: z.string(),
  description: z.string(),
  dependencies: z.array(z.string()).default([]),
  registryDependencies: z.array(z.string()).default([]),
  files: z.array(z.object({
    path: z.string(),
    type: z.string(),
    content: z.string(),
  })),
  cssVars: z.record(z.string()).optional(),
  css: z.string().optional(),
});
```

### 3.3 Communication Flow

```
CLI                          Registry API
 │                                │
 │  GET /registry.json            │
 │ ──────────────────────────────>│
 │ <──────────────────────────────│
 │  { items: [...] }              │
 │                                │
 │  GET /registry/button.json     │
 │ ──────────────────────────────>│
 │ <──────────────────────────────│
 │  { files: [...], deps: [...] } │
 │                                │
 │  GET /registry/search?q=card   │
 │ ──────────────────────────────>│
 │ <──────────────────────────────│
 │  { results: [...] }            │
```

### 3.4 Authentication

- **Device Flow:** `login` starts a device flow, shows user a URL + code
- **Token Storage:** `~/.sun-ui/config.json` stores auth token
- **Header:** `Authorization: Bearer <token>` for publish/protected endpoints

---

## 4. Error Handling Strategy

### 4.1 Custom Error Hierarchy

```typescript
class CLIError extends Error {
  constructor(message: string, public code: string, public exitCode = 1) {
    super(message);
    this.name = "CLIError";
  }
}

class RegistryError extends CLIError { }      // HTTP/fetch errors
class ValidationError extends CLIError { }     // Input validation
class ConflictError extends CLIError { }       // File/dependency conflicts
class AuthError extends CLIError { }           // Authentication failures
class ConfigError extends CLIError { }         // Config file errors
```

### 4.2 Error Recovery

| Error Type | Recovery Strategy |
|------------|-------------------|
| Network timeout | Retry 3x with exponential backoff |
| 404 Not Found | Suggest `search` command |
| 409 Conflict | Prompt: overwrite / skip / merge |
| Auth expired | Re-prompt login |
| Config invalid | Show validation errors + fix suggestions |
| File exists | `--overwrite` flag or interactive prompt |

### 4.3 User-Facing Output

```
✖ Failed to fetch component "button"
  Error: Registry returned 404 Not Found
  
  Tip: Run `sun-ui search button` to find available components
  Docs: https://sun-ui.com/docs/cli
```

### 4.4 Global Error Handler

```typescript
// In cli.ts
program.exitOverride();
try {
  program.parse(process.argv);
} catch (err) {
  if (err instanceof CLIError) {
    logger.error(err.message);
    if (err.code) logger.dim(`Error code: ${err.code}`);
    process.exit(err.exitCode);
  } else {
    logger.error("Unexpected error");
    logger.dim(String(err));
    process.exit(1);
  }
}
```

---

## 5. Update Strategy

### 5.1 Version Comparison

```typescript
import semver from "semver";

function needsUpdate(local: string, remote: string): boolean {
  return semver.lt(local, remote);
}
```

### 5.2 Update Flow

1. Fetch registry manifest
2. Compare installed versions (from `sun-ui.json`)
3. Show outdated components table
4. For each component:
   a. Fetch remote files
   b. Compute diff (unified format)
   c. Show diff to user
   d. Prompt: apply / skip / view full diff
   e. Create backup of local files
   f. Apply changes
   g. Validate result
   h. On failure: rollback from backup

### 5.3 Diff Display

```
Updated: button (1.2.0 → 1.3.0)

  components/ui/button.tsx
  @@ -12,6 +12,8 @@
   import { cn } from "@/lib/utils"
   
  +import { Loader2 } from "lucide-react"
  +
   const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  -  ({ className, variant, size, ...props }, ref) => {
  +  ({ className, variant, size, loading, ...props }, ref) => {
```

### 5.4 Backup & Rollback

- Before any update: copy affected files to `.sun-ui/backups/<timestamp>/`
- After failed update: restore from backup
- Keep last 5 backups, auto-prune older ones

### 5.5 Sync Command

The `sync` command performs a full reconciliation:
1. Fetch registry manifest
2. Compare all installed components
3. Show: outdated / missing / extra local modifications
4. Offer: update all / selective / export local changes

---

## 6. Testing Strategy

### 6.1 Test Framework

- **Vitest** (fast, TypeScript-native, Vite ecosystem)
- **MSW** (Mock Service Worker) for API mocking
- **memfs** or **tmp-promise** for filesystem mocking
- **@testing-library/cli** or custom assertions

### 6.2 Test Categories

| Category | Coverage Target | Tools |
|----------|-----------------|-------|
| Unit tests | 90%+ | Vitest |
| Integration tests | 80%+ | Vitest + memfs |
| E2E tests | Critical paths | Vitest + real temp dirs |
| Snapshot tests | Output formatting | Vitest snapshots |

### 6.3 Test Structure

```typescript
// tests/commands/add.test.ts
describe("add command", () => {
  it("detects Next.js project", async () => { ... });
  it("fetches component from registry", async () => { ... });
  it("resolves nested dependencies", async () => { ... });
  it("writes files to correct location", async () => { ... });
  it("handles file conflicts with --overwrite", async () => { ... });
  it("rolls back on failure", async () => { ... });
});
```

### 6.4 E2E Test Scenarios

1. **Fresh Next.js project:** init → add button → verify files
2. **Conflict resolution:** add button twice → prompt → verify
3. **Dependency chain:** add data-table → verify dialog + select installed
4. **Update flow:** add@1.0 → update → verify diff applied
5. **Offline mode:** cache → add → verify cached response used
6. **Error recovery:** network failure → retry → succeed

### 6.5 CI Integration

```yaml
# .github/workflows/cli-test.yml
- name: Test CLI
  run: |
    cd cli
    pnpm install
    pnpm test
    pnpm build
    pnpm test:e2e
```

---

## 7. Production-Ready Implementation Plan

### Phase 1: Foundation (Days 1-3)

| Task | Files | LOC |
|------|-------|-----|
| Package setup (package.json, tsconfig, tsup) | 3 | ~80 |
| Logger (chalk + ora) | 1 | ~100 |
| Config loader + schema | 3 | ~120 |
| Error classes | 1 | ~80 |
| Type definitions | 4 | ~120 |
| **Subtotal** | **12** | **~500** |

### Phase 2: Core Infrastructure (Days 4-7)

| Task | Files | LOC |
|------|-------|-----|
| Registry client (fetch, retry, cache) | 4 | ~140 |
| Registry types + Zod schemas | 2 | ~100 |
| Framework detector | 1 | ~80 |
| Package manager detector | 1 | ~80 |
| Tailwind detector | 1 | ~60 |
| TypeScript detector | 1 | ~50 |
| Project validator | 2 | ~120 |
| **Subtotal** | **12** | **~630** |

### Phase 3: Core Commands (Days 8-14)

| Task | Files | LOC |
|------|-------|-----|
| `init` command | 3 | ~120 |
| `add` command (10-step flow) | 3 | ~150 |
| `remove` command | 3 | ~120 |
| `list` command | 2 | ~80 |
| `search` command | 2 | ~80 |
| `update` command | 3 | ~130 |
| `doctor` command | 2 | ~100 |
| Command registration | 1 | ~60 |
| CLI entry point | 2 | ~40 |
| **Subtotal** | **21** | **~880** |

### Phase 4: Testing (Days 15-18)

| Task | Files | LOC |
|------|-------|-----|
| Test setup (MSW, fixtures) | 3 | ~100 |
| Unit tests (all utils) | 8 | ~400 |
| Integration tests (commands) | 6 | ~300 |
| **Subtotal** | **17** | **~800** |

### Total Estimate (Core Commands)

- **Total files:** ~62
- **Total LOC:** ~2,810
- **Timeline:** 18 working days
- **Team:** 1-2 developers

---

## 8. Key Design Decisions

### 8.1 Why shadcn-Compatible Schema?

- Leverages existing ecosystem tooling
- Users familiar with shadcn/ui can adopt immediately
- Registry API already serves this format
- Future interoperability with other registries

### 8.2 Why Zod Over Manual Validation?

- Schema-first approach reduces bugs
- Co-types for runtime + compile-time
- Error messages are human-readable
- Integrates with TypeScript inference

### 8.3 Why Commander Over Yargs?

- Simpler API for complex subcommands
- Better TypeScript support
- Built-in help generation
- Stronger community maintenance

### 8.4 Why Separate Detector Modules?

- Each detector is independently testable
- Detectors can be extended (e.g., Vue, Svelte)
- Clear separation of concerns
- Avoids monolithic detection logic

### 8.5 Why Backup Before Update?

- Safety net for automated updates
- Enables rollback without git
- Critical for production environments
- Small storage cost vs. high safety value

---

## 9. Integration with Existing Codebase

### 9.1 Existing Registry API

The CLI consumes:
- `GET /registry.json` → `app/registry.json/route.ts`
- `GET /registry/[slug].json` → `app/registry/[file]/route.ts`

### 9.2 Component File Convention

Components follow:
- `components/ui/<slug>.tsx` (main file)
- `components/_<slug>/<Name>.tsx` (modular pattern)
- `components/_<slug>/<Name>.types.ts` (types)
- `components/_<slug>/<Name>.constants.ts` (constants)
- `components/_<slug>/index.ts` (barrel)

### 9.3 Config File Location

- Project-level: `./sun-ui.json` (in user's project root)
- Global: `~/.sun-ui/config.json`
- Registry URL default: from `features/registry/constants/install.ts`

---

## 10. Security Considerations

1. **No `eval()` or dynamic code execution** from registry
2. **Content validation** before writing to disk
3. **Auth tokens stored securely** (file permissions 0600)
4. **HTTPS only** for registry communication
5. **Dependency auditing** before install
6. **No arbitrary file paths** from registry (whitelist `components/`, `lib/`, `utils/`)
7. **Sandboxed publish** (validate before upload)

---

## 11. Performance Optimizations

1. **Parallel downloads** for multi-component installs
2. **Registry caching** with TTL (5 minutes)
3. **Incremental updates** (only fetch changed files)
4. **Content hashing** to skip unchanged files
5. **Lazy loading** of commands (only load what's needed)
6. **Streaming progress** for large file sets

---

## 12. Documentation Requirements

1. **CLI Reference** — All commands + options
2. **Registry Protocol** — API spec for registry providers
3. **Configuration Guide** — `sun-ui.json` schema
4. **Troubleshooting** — Common errors + fixes
5. **Contributing** — Development setup + guidelines
