"use client";

import Link from "next/link";
import { usePathname, useSearchParams, useRouter, useParams } from "next/navigation";
import { useState, useEffect, useCallback, Suspense } from "react";
import { DocsLayout } from "@/components/docs";

const pages = [
  { name: "Dashboard", path: "/dashboard", category: "Pages" },
  { name: "Admin", path: "/admin", category: "Pages" },
  { name: "Analytics", path: "/analytics", category: "Data" },
  { name: "AI", path: "/ai", category: "Pages" },
  { name: "Authentication", path: "/authentication", category: "Pages" },
  { name: "Avatar", path: "/avatar", category: "Data" },
  { name: "Badge", path: "/badge", category: "Data" },
  { name: "Blog", path: "/blog", category: "Content" },
  { name: "Buttons", path: "/buttons", category: "UI" },
  { name: "Calendar", path: "/calendar", category: "Data" },
  { name: "Cards", path: "/cards", category: "Data" },
  { name: "Carousel", path: "/carousel", category: "Data" },
  { name: "Charts", path: "/charts", category: "Data" },
  { name: "Chat", path: "/chat", category: "Pages" },
  { name: "Command Menu", path: "/command-menu", category: "UI" },
  { name: "Context Menu", path: "/context-menu", category: "UI" },
  { name: "Data Fetching", path: "/data-fetching", category: "Utility" },
  { name: "Dialog", path: "/dialog", category: "Overlay" },
  { name: "Drawer", path: "/drawer", category: "Overlay" },
  { name: "Dropdown", path: "/dropdown", category: "UI" },
  { name: "E-Commerce", path: "/e-commerce", category: "Pages" },
  { name: "Empty State", path: "/empty-state", category: "Utility" },
  { name: "Error", path: "/error", category: "Utility" },
  { name: "FAQ", path: "/faq", category: "Content" },
  { name: "Footer", path: "/footer", category: "Layout" },
  { name: "Forms", path: "/forms", category: "Input" },
  { name: "Hero", path: "/hero", category: "Layout" },
  { name: "Inputs", path: "/inputs", category: "Input" },
  { name: "Landing", path: "/landing", category: "Pages" },
  { name: "Loading", path: "/loading", category: "Utility" },
  { name: "Modal", path: "/modal", category: "Overlay" },
  { name: "Navbar", path: "/navbar", category: "Layout" },
  { name: "Navigation", path: "/navigation", category: "Layout" },
  { name: "Pagination", path: "/pagination", category: "UI" },
  { name: "Popover", path: "/popover", category: "Overlay" },
  { name: "Portfolio", path: "/portfolio", category: "Pages" },
  { name: "Pricing", path: "/pricing", category: "Pages" },
  { name: "Routing", path: "/routing", category: "Utility" },
  { name: "Search", path: "/search", category: "Input" },
  { name: "Sidebar", path: "/sidebar", category: "Layout" },
  { name: "Skeleton", path: "/skeleton", category: "Data" },
  { name: "Styling", path: "/styling", category: "Styling" },
  { name: "Table", path: "/table", category: "Data" },
  { name: "Tabs", path: "/tabs", category: "UI" },
  { name: "Testimonials", path: "/testimonials", category: "Pages" },
  { name: "Timeline", path: "/timeline", category: "Data" },
  { name: "Toast", path: "/toast", category: "Overlay" },
  { name: "Tooltip", path: "/tooltip", category: "Overlay" },
  { name: "404", path: "/404", category: "Utility" },
];

const categories = [...new Set(pages.map((p) => p.category))];

function RoutingPageContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();

  const [selectedProduct, setSelectedProduct] = useState("alpha");
  const [simulatedRoute, setSimulatedRoute] = useState("");
  const [countdownValue, setCountdownValue] = useState(3);
  const [searchInputs, setSearchInputs] = useState({ name: "", value: "" });
  const [queryLog, setQueryLog] = useState<string[]>([]);
  const [routeLog, setRouteLog] = useState<string[]>([]);
  const [errorSimulated, setErrorSimulated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRouteLog((prev) => [...prev.slice(-9), `Navigated to: ${pathname}${window.location.search}`]);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const p = new URLSearchParams(searchParams.toString());
      p.set(name, value);
      return p.toString();
    },
    [searchParams]
  );

  const activeTab = searchParams.get("tab") || "overview";

  const setTab = (tab: string) => {
    router.push(pathname + "?" + createQueryString("tab", tab));
  };

  const setHash = (hash: string) => {
    if (hash === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const simulateDynamicRoute = (id: string) => {
    setSimulatedRoute(`/products/${id}`);
  };

  const [countdownId, setCountdownId] = useState<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = () => {
    if (countdownId) clearInterval(countdownId);
    setCountdownValue(3);
    const id = setInterval(() => {
      setCountdownValue((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setCountdownId(null);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setCountdownId(id);
  };

  if (errorSimulated) {
    throw new Error("Simulated error from Error UI demo");
  }

  return (
    <DocsLayout
      title="Routing in Next.js"
      description="Interactive guide to all routing concepts in the App Router."
      contentClassName="flex flex-col gap-14"
    >
      <section id="file-based" className="scroll-mt-20">
        <h2 className="text-xl font-semibold">1. File-Based Routing</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Every file or folder inside <code className="rounded bg-muted px-1 dark:bg-muted">app/</code> becomes a route
        </p>
        <div className="mt-4 rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm dark:border-border dark:bg-zinc-900">
          <div className="text-muted-foreground">app/</div>
          <div className="ml-4">
            <span className="text-muted-foreground">├── </span><span className="text-sky-600 dark:text-sky-400">page.tsx</span>
            <span className="ml-2 text-xs text-muted-foreground/70">→ /</span>
          </div>
          <div className="ml-4">
            <span className="text-muted-foreground">├── </span>layout.tsx <span className="text-xs text-muted-foreground/70">shared shell</span>
          </div>
          <div className="ml-4">
            <span className="text-muted-foreground">├── </span>dashboard/
          </div>
          <div className="ml-8">
            <span className="text-muted-foreground">│   └── </span><span className="text-sky-600 dark:text-sky-400">page.tsx</span>
            <span className="ml-2 text-xs text-muted-foreground/70">→ /dashboard</span>
          </div>
          <div className="ml-4">
            <span className="text-muted-foreground">├── </span>blog/
          </div>
          <div className="ml-8">
            <span className="text-muted-foreground">│   └── </span><span className="text-sky-600 dark:text-sky-400">page.tsx</span>
            <span className="ml-2 text-xs text-muted-foreground/70">→ /blog</span>
          </div>
          <div className="ml-4">
            <span className="text-muted-foreground">├── </span>products/
          </div>
          <div className="ml-8">
            <span className="text-muted-foreground">│   └── </span><span className="text-amber-600 dark:text-amber-400">[id]</span>
          </div>
          <div className="ml-12">
            <span className="text-muted-foreground">│       └── </span><span className="text-sky-600 dark:text-sky-400">page.tsx</span>
            <span className="ml-2 text-xs text-muted-foreground/70">→ /products/1 (dynamic)</span>
          </div>
          <div className="ml-4">
            <span className="text-muted-foreground">├── </span>api/
          </div>
          <div className="ml-8">
            <span className="text-muted-foreground">│   └── </span>hello/
          </div>
          <div className="ml-12">
            <span className="text-muted-foreground">│       └── </span><span className="text-purple-600 dark:text-purple-400">route.ts</span>
            <span className="ml-2 text-xs text-muted-foreground/70">→ API route</span>
          </div>
          <div className="ml-4">
            <span className="text-muted-foreground">├── </span>loading.tsx <span className="text-xs text-muted-foreground/70">loading UI</span>
          </div>
          <div className="ml-4">
            <span className="text-muted-foreground">├── </span>error.tsx <span className="text-xs text-muted-foreground/70">error UI</span>
          </div>
          <div className="ml-4">
            <span className="text-muted-foreground">├── </span>not-found.tsx <span className="text-xs text-muted-foreground/70">404 UI</span>
          </div>
          <div className="ml-4">
            <span className="text-muted-foreground">├── </span>(marketing)/
          </div>
          <div className="ml-8">
            <span className="text-muted-foreground">│   └── </span>about/
          </div>
          <div className="ml-12">
            <span className="text-muted-foreground">│       └── </span><span className="text-sky-600 dark:text-sky-400">page.tsx</span>
            <span className="ml-2 text-xs text-muted-foreground/70">→ /about (route group)</span>
          </div>
          <div className="ml-4">
            <span className="text-muted-foreground">├── </span>@modal/
          </div>
          <div className="ml-8">
            <span className="text-muted-foreground">│   └── </span>login/
          </div>
          <div className="ml-12">
            <span className="text-muted-foreground">│       └── </span><span className="text-sky-600 dark:text-sky-400">page.tsx</span>
            <span className="ml-2 text-xs text-muted-foreground/70">→ parallel route slot</span>
          </div>
          <div className="mt-2 flex gap-4 text-xs">
            <span className="text-sky-600 dark:text-sky-400">■ page.tsx</span>
            <span className="text-amber-600 dark:text-amber-400">■ [param]</span>
            <span className="text-purple-600 dark:text-purple-400">■ route.ts</span>
            <span className="text-muted-foreground/70">■ folder</span>
          </div>
        </div>
      </section>

      <section id="page-routes" className="scroll-mt-20">
        <h2 className="text-xl font-semibold">2. Page Routes</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {pages.length} pages in this project grouped by category
        </p>
        {categories.map((cat) => (
          <div key={cat} className="mt-4">
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">{cat}</h3>
            <div className="flex flex-wrap gap-2">
              {pages
                .filter((p) => p.category === cat)
                .map((p) => (
                  <Link
                    key={p.path}
                    href={p.path}
                    className="rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/40 dark:border-border dark:bg-muted dark:hover:bg-zinc-750"
                  >
                    {p.name}
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </section>

      <section id="nested-routes" className="scroll-mt-20">
        <h2 className="text-xl font-semibold">3. Nested Routes</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Folders nest inside folders = URLs nest: <code className="rounded bg-muted px-1 dark:bg-muted">app/blog/post-1/page.tsx</code> → <code className="rounded bg-muted px-1 dark:bg-muted">/blog/post-1</code>
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border p-4 dark:border-border">
            <div className="font-mono text-sm leading-7">
              <div className="text-muted-foreground">app/<span className="text-sky-600 dark:text-sky-400">blog</span>/</div>
              <div className="ml-4 text-muted-foreground">├── <span className="text-sky-600 dark:text-sky-400">page.tsx</span> → <span className="text-muted-foreground/70">/blog</span></div>
              <div className="ml-4 text-muted-foreground">└── <span className="text-sky-600 dark:text-sky-400">[slug]</span>/</div>
              <div className="ml-8 text-muted-foreground">&nbsp;&nbsp;&nbsp;└── <span className="text-sky-600 dark:text-sky-400">page.tsx</span> → <span className="text-muted-foreground/70">/blog/post-1</span></div>
            </div>
          </div>
          <div className="rounded-lg border border-border p-4 dark:border-border">
            <div className="font-mono text-sm leading-7">
              <div className="text-muted-foreground">app/<span className="text-sky-600 dark:text-sky-400">dashboard</span>/</div>
              <div className="ml-4 text-muted-foreground">├── <span className="text-sky-600 dark:text-sky-400">page.tsx</span> → <span className="text-muted-foreground/70">/dashboard</span></div>
              <div className="ml-4 text-muted-foreground">├── <span className="text-sky-600 dark:text-sky-400">settings</span>/</div>
              <div className="ml-8 text-muted-foreground">│&nbsp;&nbsp;└── <span className="text-sky-600 dark:text-sky-400">page.tsx</span> → <span className="text-muted-foreground/70">/dashboard/settings</span></div>
              <div className="ml-4 text-muted-foreground">└── <span className="text-sky-600 dark:text-sky-400">analytics</span>/</div>
              <div className="ml-8 text-muted-foreground">&nbsp;&nbsp;&nbsp;└── <span className="text-sky-600 dark:text-sky-400">page.tsx</span> → <span className="text-muted-foreground/70">/dashboard/analytics</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="dynamic-routes" className="scroll-mt-20">
        <h2 className="text-xl font-semibold">4. Dynamic Routes</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          <code className="rounded bg-muted px-1 dark:bg-muted">[id]</code> folders create dynamic segments. Select a product ID:
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["alpha", "beta", "gamma", "delta", "epsilon"].map((id) => (
            <button
              key={id}
              onClick={() => { setSelectedProduct(id); simulateDynamicRoute(id); }}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                selectedProduct === id
                  ? "border-sky-500 bg-sky-50 text-sky-700 dark:border-sky-400 dark:bg-sky-950 dark:text-sky-300"
                  : "border-border hover:bg-muted/40 dark:border-border dark:hover:bg-muted"
              }`}
            >
              {id}
            </button>
          ))}
        </div>
        <div className="mt-3 rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm dark:border-border dark:bg-zinc-900">
          <div className="text-muted-foreground/70">{"// file: app/products/[id]/page.tsx"}</div>
          <div className="mt-1">
            Route pattern: <span className="text-sky-600 dark:text-sky-400">/products/[id]</span>
          </div>
          <div className="mt-1">
            Current selection: <span className="text-amber-600 dark:text-amber-400">/products/{selectedProduct}</span>
          </div>
          <div className="mt-1">
            Simulated URL: <span className="text-green-600 dark:text-green-400">{simulatedRoute || "—"}</span>
          </div>
          <div className="mt-1 text-muted-foreground/70">
            params: {`{ id: "${selectedProduct}" }`}
          </div>
        </div>
        <Link
          href={`/routing?product=${selectedProduct}`}
          className="mt-3 inline-block rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
        >
          Navigate to /routing?product={selectedProduct}
        </Link>
      </section>

      <section id="layouts" className="scroll-mt-20">
        <h2 className="text-xl font-semibold">5. Layouts</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          <code className="rounded bg-muted px-1 dark:bg-muted">layout.tsx</code> wraps pages and persists across navigations
        </p>
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="w-full max-w-md rounded-t-2xl border-2 border-border bg-muted p-4 text-center text-sm font-medium dark:border-border dark:bg-muted">
            Root Layout (app/layout.tsx) — Header + Sidebar + {`{children}`}
            <div className="mx-auto mt-3 max-w-sm rounded-xl border-2 border-dashed border-sky-400 bg-sky-50 p-3 text-xs text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              Nested Layout (app/dashboard/layout.tsx) — Dashboard nav + {`{children}`}
              <div className="mx-auto mt-2 max-w-xs rounded-lg border-2 border-amber-400 bg-amber-50 p-2 text-xs text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                Page (app/dashboard/page.tsx)
              </div>
            </div>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>Layout persists across: /dashboard, /dashboard/settings, /dashboard/analytics</span>
          </div>
        </div>
      </section>

      <section id="loading-error" className="scroll-mt-20">
        <h2 className="text-xl font-semibold">6-8. Loading, Error, Not Found</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border p-4 dark:border-border">
            <h3 className="font-medium">Loading UI</h3>
            <p className="mt-1 text-xs text-muted-foreground">loading.tsx shows during page load</p>
            <Link
              href="/loading"
              className="mt-3 inline-block rounded-md bg-zinc-800 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-700 dark:bg-muted dark:text-zinc-900 dark:hover:bg-muted"
            >
              Go to /loading
            </Link>
          </div>
          <div className="rounded-lg border border-border p-4 dark:border-border">
            <h3 className="font-medium">Error UI</h3>
            <p className="mt-1 text-xs text-muted-foreground">error.tsx catches errors in the segment</p>
            <button
              onClick={() => setErrorSimulated(true)}
              className="mt-3 rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
            >
              Simulate Error
            </button>
          </div>
          <div className="rounded-lg border border-border p-4 dark:border-border">
            <h3 className="font-medium">Not Found</h3>
            <p className="mt-1 text-xs text-muted-foreground">not-found.tsx for 404s</p>
            <Link
              href="/this-path-does-not-exist-xyz"
              className="mt-3 inline-block rounded-md bg-amber-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-700"
            >
              Go to unknown page
            </Link>
          </div>
        </div>
      </section>

      <section id="link-examples" className="scroll-mt-20">
        <h2 className="text-xl font-semibold">9. Link Component</h2>
        <p className="mt-1 text-sm text-muted-foreground">6 Link examples with different props</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-border p-4 dark:border-border">
            <div className="text-xs text-muted-foreground/70">Basic Link</div>
            <Link href="/dashboard" className="mt-1 block text-sm font-medium text-sky-600 hover:underline dark:text-sky-400">
              /dashboard
            </Link>
          </div>
          <div className="rounded-lg border border-border p-4 dark:border-border">
            <div className="text-xs text-muted-foreground/70">prefetch disabled</div>
            <Link href="/blog" prefetch={false} className="mt-1 block text-sm font-medium text-sky-600 hover:underline dark:text-sky-400">
              /blog (no prefetch)
            </Link>
          </div>
          <div className="rounded-lg border border-border p-4 dark:border-border">
            <div className="text-xs text-muted-foreground/70">replace (no history entry)</div>
            <Link href="/" replace className="mt-1 block text-sm font-medium text-sky-600 hover:underline dark:text-sky-400">
              Home (replace)
            </Link>
          </div>
          <div className="rounded-lg border border-border p-4 dark:border-border">
            <div className="text-xs text-muted-foreground/70">scroll={false}</div>
            <Link href="/routing" scroll={false} className="mt-1 block text-sm font-medium text-sky-600 hover:underline dark:text-sky-400">
              /routing (no scroll)
            </Link>
          </div>
          <div className="rounded-lg border border-border p-4 dark:border-border">
            <div className="text-xs text-muted-foreground/70">onNavigate callback</div>
            <Link
              href="/cards"
              onNavigate={() => console.log("Navigating to cards")}
              className="mt-1 block text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
            >
              /cards (log on nav)
            </Link>
          </div>
          <div className="rounded-lg border border-border p-4 dark:border-border">
            <div className="text-xs text-muted-foreground/70">Link with query</div>
            <Link
              href={{ pathname: "/search", query: { q: "nextjs" } }}
              className="mt-1 block text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
            >
              /search?q=nextjs
            </Link>
          </div>
        </div>
      </section>

      <section id="use-router" className="scroll-mt-20">
        <h2 className="text-xl font-semibold">10. useRouter</h2>
        <p className="mt-1 text-sm text-muted-foreground">Programmatic navigation with router methods</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => router.push("/dashboard")}
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
          >
            router.push(&quot;/dashboard&quot;)
          </button>
          <button
            onClick={() => router.replace("/")}
            className="rounded-lg bg-zinc-700 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-600"
          >
            router.replace(&quot;/&quot;)
          </button>
          <button
            onClick={() => router.back()}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted dark:border-border dark:hover:bg-muted"
          >
            router.back()
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted dark:border-border dark:hover:bg-muted"
          >
            router.forward()
          </button>
          <button
            onClick={() => router.prefetch("/blog")}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted dark:border-border dark:hover:bg-muted"
          >
            router.prefetch(&quot;/blog&quot;)
          </button>
          <button
            onClick={() => router.refresh()}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            router.refresh()
          </button>
        </div>
      </section>

      <section id="use-pathname" className="scroll-mt-20">
        <h2 className="text-xl font-semibold">11. usePathname</h2>
        <p className="mt-1 text-sm text-muted-foreground">Reads the current URL pathname</p>
        <div className="mt-4 rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm dark:border-border dark:bg-zinc-900">
          <div>usePathname() = <span className="text-sky-600 dark:text-sky-400">&quot;{pathname}&quot;</span></div>
          <div className="mt-2 text-muted-foreground/70">
            Segments: [
            {pathname.split("/").filter(Boolean).map((s, i) => (
              <span key={i}>
                {i > 0 && <span>, </span>}
                <span className="text-amber-600 dark:text-amber-400">&quot;{s}&quot;</span>
              </span>
            ))}
            ]
          </div>
          {pathname !== "/routing" && (
            <div className="mt-2 text-xs text-muted-foreground/70">Try navigating to other pages and come back</div>
          )}
        </div>
      </section>

      <section id="use-search-params" className="scroll-mt-20">
        <h2 className="text-xl font-semibold">12. useSearchParams</h2>
        <p className="mt-1 text-sm text-muted-foreground">Read and set URL query parameters — tabs example</p>
        <Suspense fallback={<div className="text-sm text-muted-foreground/70">Loading search params...</div>}>
          <SearchParamsDemo pathname={pathname} createQueryString={createQueryString} activeTab={activeTab} setTab={setTab} />
        </Suspense>
      </section>

      <section id="use-params" className="scroll-mt-20">
        <h2 className="text-xl font-semibold">13. useParams</h2>
        <p className="mt-1 text-sm text-muted-foreground">Dynamic params from the current route</p>
        <div className="mt-4 rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm dark:border-border dark:bg-zinc-900">
          <div>useParams() = {JSON.stringify(params, null, 2) || <span className="text-muted-foreground/70">{ }</span>}</div>
          <div className="mt-2 text-xs text-muted-foreground/70">This route has no dynamic params, so it returns { }</div>
        </div>
      </section>

      <section id="active-links" className="scroll-mt-20">
        <h2 className="text-xl font-semibold">14. Active Links</h2>
        <p className="mt-1 text-sm text-muted-foreground">Navigation with active state based on current pathname</p>
        <nav className="mt-4 flex gap-1 rounded-lg border border-border bg-muted/40 p-2 dark:border-border dark:bg-zinc-900">
          {[
            { href: "/", label: "Home" },
            { href: "/dashboard", label: "Dashboard" },
            { href: "/blog", label: "Blog" },
            { href: "/cards", label: "Cards" },
            { href: "/forms", label: "Forms" },
            { href: "/routing", label: "Routing" },
          ].map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sky-600 text-white"
                    : "text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </section>

      <section id="advanced-patterns" className="scroll-mt-20">
        <h2 className="text-xl font-semibold">15-20. Advanced Routing Patterns</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-border p-4 dark:border-border">
            <h3 className="font-medium">15. Route Groups</h3>
            <p className="mt-1 text-xs text-muted-foreground">(marketing) and (dashboard) groups organize routes without affecting URLs</p>
            <pre className="mt-2 rounded bg-muted p-2 text-xs dark:bg-muted">
              app/{`{`}
              {"\n"}  (marketing)/about/page.tsx → /about
              {"\n"}  (dashboard)/settings/page.tsx → /settings
              {"\n"}{`}`}
            </pre>
          </div>

          <div className="rounded-lg border border-border p-4 dark:border-border">
            <h3 className="font-medium">16. Parallel Routes</h3>
            <p className="mt-1 text-xs text-muted-foreground">@modal and @sidebar slots render independently</p>
            <pre className="mt-2 rounded bg-muted p-2 text-xs dark:bg-muted">
              app/{`{`}
              {"\n"}  @modal/default.tsx
              {"\n"}  @modal/login/page.tsx
              {"\n"}  @sidebar/page.tsx
              {"\n"}  layout.tsx (receives modal, sidebar)
              {"\n"}{`}`}
            </pre>
          </div>

          <div className="rounded-lg border border-border p-4 dark:border-border">
            <h3 className="font-medium">17. Intercepting Routes</h3>
            <p className="mt-1 text-xs text-muted-foreground">(.) (..) (..)(..) patterns intercept parent segments</p>
            <pre className="mt-2 rounded bg-muted p-2 text-xs dark:bg-muted">
              (.)same level
              (..)parent
              (..)(..)grandparent
              (...)root
            </pre>
          </div>

          <div className="rounded-lg border border-border p-4 dark:border-border">
            <h3 className="font-medium">18. Route Handlers</h3>
            <p className="mt-1 text-xs text-muted-foreground">app/api/ route.ts files create API endpoints</p>
            <pre className="mt-2 rounded bg-muted p-2 text-xs dark:bg-muted">
              app/api/hello/route.ts
              {"\n"}→ GET /api/hello
              {"\n"}→ POST /api/hello
            </pre>
          </div>

          <div className="rounded-lg border border-border p-4 dark:border-border">
            <h3 className="font-medium">19. Middleware</h3>
            <p className="mt-1 text-xs text-muted-foreground">middleware.ts runs before every request</p>
            <pre className="mt-2 rounded bg-muted p-2 text-xs dark:bg-muted">
              {"// middleware.ts"}
              export function middleware(req) {`{`}
              {"\n  // redirect, rewrite, auth check"}
              {"\n"}{`}`}
            </pre>
            <button
              onClick={() => {
                const confirmed = window.confirm("Simulate middleware redirect to /?from=redirect");
                if (confirmed) router.push("/?from=redirect");
              }}
              className="mt-2 rounded bg-zinc-800 px-3 py-1 text-xs text-white dark:bg-muted dark:text-zinc-900"
            >
              Simulate middleware redirect
            </button>
          </div>

          <div className="rounded-lg border border-border p-4 dark:border-border">
            <h3 className="font-medium">20. Redirects</h3>
            <p className="mt-1 text-xs text-muted-foreground">next.config.js redirects or router.push</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => router.push("/")}
                className="rounded bg-sky-600 px-3 py-1 text-xs text-white hover:bg-sky-700"
              >
                router.push Home
              </button>
              <button
                onClick={() => router.replace("/dashboard")}
                className="rounded bg-zinc-700 px-3 py-1 text-xs text-white hover:bg-zinc-600"
              >
                router.replace Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="query-hash" className="scroll-mt-20">
        <h2 className="text-xl font-semibold">21-26. Query, Hash, Programmatic, History, Events</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border p-4 dark:border-border">
            <h3 className="font-medium">21. Query Parameters</h3>
            <p className="mt-1 text-xs text-muted-foreground">Set name=value and see URL change</p>
            <div className="mt-2 flex gap-2">
              <input
                placeholder="name"
                value={searchInputs.name}
                onChange={(e) => setSearchInputs((p) => ({ ...p, name: e.target.value }))}
                className="w-20 rounded border border-border bg-transparent px-2 py-1 text-xs dark:border-border"
              />
              <input
                placeholder="value"
                value={searchInputs.value}
                onChange={(e) => setSearchInputs((p) => ({ ...p, value: e.target.value }))}
                className="w-20 rounded border border-border bg-transparent px-2 py-1 text-xs dark:border-border"
              />
              <button
                onClick={() => {
                  if (searchInputs.name && searchInputs.value) {
                    router.push(pathname + "?" + createQueryString(searchInputs.name, searchInputs.value));
                    setQueryLog((prev) => [...prev.slice(-4), `?${searchInputs.name}=${searchInputs.value}`]);
                  }
                }}
                className="rounded bg-sky-600 px-3 py-1 text-xs text-white hover:bg-sky-700"
              >
                Apply
              </button>
            </div>
            {queryLog.length > 0 && (
              <div className="mt-2 text-xs text-muted-foreground/70">
                History: {queryLog.map((q, i) => <span key={i} className="mr-1">{q}</span>)}
              </div>
            )}
          </div>

          <div className="rounded-lg border border-border p-4 dark:border-border">
            <h3 className="font-medium">22. Hash Navigation</h3>
            <p className="mt-1 text-xs text-muted-foreground">Scroll to any section on this page</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button onClick={() => setHash("top")} className="rounded border border-border px-3 py-1 text-xs hover:bg-muted dark:border-border dark:hover:bg-muted">
                #top
              </button>
              <button onClick={() => setHash("file-based")} className="rounded border border-border px-3 py-1 text-xs hover:bg-muted dark:border-border dark:hover:bg-muted">
                #file-based
              </button>
              <button onClick={() => setHash("dynamic-routes")} className="rounded border border-border px-3 py-1 text-xs hover:bg-muted dark:border-border dark:hover:bg-muted">
                #dynamic-routes
              </button>
              <button onClick={() => setHash("use-router")} className="rounded border border-border px-3 py-1 text-xs hover:bg-muted dark:border-border dark:hover:bg-muted">
                #use-router
              </button>
              <button onClick={() => setHash("advanced-patterns")} className="rounded border border-border px-3 py-1 text-xs hover:bg-muted dark:border-border dark:hover:bg-muted">
                #advanced-patterns
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-border p-4 dark:border-border">
            <h3 className="font-medium">23. Programmatic Navigation</h3>
            <p className="mt-1 text-xs text-muted-foreground">Countdown then navigate, confirm before leaving</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={startCountdown}
                className="rounded bg-purple-600 px-3 py-1 text-xs text-white hover:bg-purple-700"
              >
                {countdownId ? `Navigating in ${countdownValue}...` : "Navigate in 3s"}
              </button>
              <button
                onClick={() => {
                  const confirmed = window.confirm("Are you sure you want to leave?");
                  if (confirmed) router.push("/");
                }}
                className="rounded border border-border px-3 py-1 text-xs hover:bg-muted dark:border-border dark:hover:bg-muted"
              >
                Confirm before leave
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-border p-4 dark:border-border">
            <h3 className="font-medium">24. Shallow Routing</h3>
            <p className="mt-1 text-xs text-muted-foreground">Update query params without reload</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => router.push(pathname + "?view=grid")}
                className="rounded bg-teal-600 px-3 py-1 text-xs text-white hover:bg-teal-700"
              >
                ?view=grid
              </button>
              <button
                onClick={() => router.push(pathname + "?view=list")}
                className="rounded bg-teal-600 px-3 py-1 text-xs text-white hover:bg-teal-700"
              >
                ?view=list
              </button>
              <button
                onClick={() => router.push(pathname)}
                className="rounded border border-border px-3 py-1 text-xs hover:bg-muted dark:border-border dark:hover:bg-muted"
              >
                Clear
              </button>
            </div>
            <div className="mt-2 text-xs text-muted-foreground/70">
              Current view: {searchParams.get("view") || "none"}
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border p-4 dark:border-border">
            <h3 className="font-medium">25. History Management</h3>
            <p className="mt-1 text-xs text-muted-foreground">Track navigation stack</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => router.push("/routing?h=1")}
                className="rounded bg-zinc-800 px-3 py-1 text-xs text-white hover:bg-zinc-700 dark:bg-muted dark:text-zinc-900 dark:hover:bg-muted"
              >
                Push state 1
              </button>
              <button
                onClick={() => router.push("/routing?h=2")}
                className="rounded bg-zinc-800 px-3 py-1 text-xs text-white hover:bg-zinc-700 dark:bg-muted dark:text-zinc-900 dark:hover:bg-muted"
              >
                Push state 2
              </button>
              <button
                onClick={() => router.back()}
                className="rounded border border-border px-3 py-1 text-xs hover:bg-muted dark:border-border dark:hover:bg-muted"
              >
                Back
              </button>
              <button
                onClick={() => router.forward()}
                className="rounded border border-border px-3 py-1 text-xs hover:bg-muted dark:border-border dark:hover:bg-muted"
              >
                Forward
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-border p-4 dark:border-border">
            <h3 className="font-medium">26. Router Events (Route Change Log)</h3>
            <p className="mt-1 text-xs text-muted-foreground">Logs every route change detected via usePathname/useSearchParams</p>
            <div className="mt-2 max-h-24 overflow-y-auto rounded bg-muted p-2 font-mono text-xs dark:bg-muted">
              {routeLog.length === 0 && <span className="text-muted-foreground/70">No navigations yet</span>}
              {routeLog.map((entry, i) => (
                <div key={i} className="text-muted-foreground">{entry}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-mt-20">
        <h2 className="text-xl font-semibold">27-30. More Routing Patterns</h2>        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border p-4 dark:border-border">
            <h3 className="font-medium">27. i18n Routing</h3>
            <p className="mt-1 text-xs text-muted-foreground">/en/about, /fr/about, /es/about</p>
            <pre className="mt-2 rounded bg-muted p-2 text-xs dark:bg-muted">
              app/[lang]/about/page.tsx
              {"\n"}→ /en/about
              {"\n"}→ /fr/about
            </pre>
            <div className="mt-2 flex gap-1">
              <Link href="/" className="text-xs text-sky-600 hover:underline dark:text-sky-400">/en</Link>
              <span className="text-xs text-muted-foreground/70">|</span>
              <Link href="/" className="text-xs text-sky-600 hover:underline dark:text-sky-400">/fr</Link>
              <span className="text-xs text-muted-foreground/70">|</span>
              <Link href="/" className="text-xs text-sky-600 hover:underline dark:text-sky-400">/es</Link>
            </div>
          </div>

          <div className="rounded-lg border border-border p-4 dark:border-border">
            <h3 className="font-medium">28. Catch-all [...slug]</h3>
            <p className="mt-1 text-xs text-muted-foreground">Catches all remaining path segments</p>
            <pre className="mt-2 rounded bg-muted p-2 text-xs dark:bg-muted">
              app/shop/[...slug]/page.tsx
              {"\n"}→ /shop/a → {`{slug: ['a']}`}
              {"\n"}→ /shop/a/b → {`{slug: ['a','b']}`}
            </pre>
          </div>

          <div className="rounded-lg border border-border p-4 dark:border-border">
            <h3 className="font-medium">29. Optional Catch-all [[...slug]]</h3>
            <p className="mt-1 text-xs text-muted-foreground">Same as catch-all but matches / without slug</p>
            <pre className="mt-2 rounded bg-muted p-2 text-xs dark:bg-muted">
              app/[[...slug]]/page.tsx
              {"\n"}→ / → {`{slug: undefined}`}
              {"\n"}→ /a/b → {`{slug: ['a','b']}`}
            </pre>
          </div>

          <div className="rounded-lg border border-border p-4 dark:border-border">
            <h3 className="font-medium">30. Route Groups & Layouts</h3>
            <p className="mt-1 text-xs text-muted-foreground">Different layouts per group</p>
            <pre className="mt-2 rounded bg-muted p-2 text-xs dark:bg-muted">
              (marketing)/layout.tsx ← nav + hero
              (dashboard)/layout.tsx ← sidebar + stats
              Both render at same URL level
            </pre>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}

function SearchParamsDemo({
  pathname,
  createQueryString,
  activeTab,
  setTab,
}: {
  pathname: string;
  createQueryString: (name: string, value: string) => string;
  activeTab: string;
  setTab: (tab: string) => void;
}) {
  const searchParams = useSearchParams();

  return (
    <div className="mt-4">
      <div className="flex gap-1">
        {["overview", "details", "settings", "activity"].map((tab) => (
          <button
            key={tab}
            onClick={() => setTab(tab)}
            className={`rounded-t-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-sky-600 text-white"
                : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="rounded-b-lg rounded-r-lg border border-border bg-muted/40 p-4 dark:border-border dark:bg-zinc-900">
        <p className="text-sm">
          Active tab: <span className="font-medium text-sky-600 dark:text-sky-400">{activeTab}</span>
        </p>
        <div className="mt-2 font-mono text-xs text-muted-foreground/70">
          URL: {pathname}?{createQueryString("tab", activeTab)}
        </div>
        <div className="mt-2 text-xs text-muted-foreground/70">
          All params:{searchParams.toString()
            ? " " + searchParams.toString().split("&").map((p, i) => (
                <span key={i} className="mr-2 text-amber-600 dark:text-amber-400">{p}</span>
              ))
            : " (none)"}
        </div>
      </div>
    </div>
  );
}

export default function RoutingPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center p-12 text-muted-foreground/70">Loading routing examples...</div>}>
      <RoutingPageContent />
    </Suspense>
  );
}
