"use client"

import { useState, useEffect, useCallback } from "react"
import { DocsLayout } from "@/components/docs"

const staticData = {
  users: 1247,
  posts: 3821,
  comments: 15492,
  categories: 8,
  lastUpdated: "2026-07-30T12:00:00Z",
}

const mockUser = {
  id: 1,
  name: "Alex Morgan",
  email: "alex@example.com",
  role: "Developer",
}

const mockOrders = [
  { id: "ORD-001", product: "Wireless Headphones", quantity: 2, total: 199.98 },
  { id: "ORD-002", product: "Mechanical Keyboard", quantity: 1, total: 149.99 },
  { id: "ORD-003", product: "USB-C Hub", quantity: 3, total: 89.97 },
]

const mockCards = [
  { title: "Total Revenue", value: "$48,290" },
  { title: "Active Users", value: "2,847" },
  { title: "Conversion Rate", value: "3.24%" },
]

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded bg-muted ${className}`} />
  )
}

export default function DataFetchingPage() {
  return (
    <DocsLayout
      title="Data Fetching"
      description="Interactive demos of data fetching patterns in Next.js."
      contentClassName="flex flex-col gap-16"
    >
      <StaticFetchSection />
      <DynamicFetchSection />
      <IsrSection />
      <ParallelFetchSection />
      <SequentialFetchSection />
      <ErrorHandlingSection />
    </DocsLayout>
  )
}

function StaticFetchSection() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">1. Static Fetch (force-cache)</h2>
      <p className="text-sm text-muted-foreground">
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm dark:bg-muted">cache: &quot;force-cache&quot;</code>{" "}
        (default) fetches data once and caches it indefinitely. Data never changes after the initial load — same as static generation.
      </p>
      <div className="rounded-lg border border-black/[.08] bg-black/[.02] p-4 dark:border-white/[.145] dark:bg-white/[.02]">
        <pre className="overflow-x-auto text-sm">{JSON.stringify(staticData, null, 2)}</pre>
      </div>
      <p className="text-xs text-muted-foreground/70">
        This is a static snapshot — it will never change unless the page is rebuilt.
      </p>
    </section>
  )
}

function DynamicFetchSection() {
  const [number, setNumber] = useState<number | null>(null)
  const [lastFetched, setLastFetched] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const refetch = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setNumber(Math.floor(Math.random() * 1000) + 1)
      setLastFetched(new Date().toLocaleTimeString())
      setLoading(false)
    }, 400)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => refetch(), 0)
    return () => clearTimeout(timer)
  }, [refetch])

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">2. Dynamic Fetch (no-store)</h2>
      <p className="text-sm text-muted-foreground">
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm dark:bg-muted">cache: &quot;no-store&quot;</code>{" "}
        fetches fresh data on every request. Each click simulates a new network request with different results.
      </p>
      <div className="flex flex-col items-center gap-4 rounded-lg border border-black/[.08] p-6 dark:border-white/[.145]">
        {loading ? (
          <Skeleton className="h-16 w-32" />
        ) : (
          <div className="text-5xl font-bold tabular-nums tracking-tight">{number}</div>
        )}
        <p className="text-sm text-muted-foreground/70">
          Last fetched: {lastFetched ?? "—"}
        </p>
        <button
          onClick={refetch}
          disabled={loading}
          className="rounded-full border border-black/[.08] px-6 py-2 text-sm font-medium transition-colors hover:bg-black/[.04] disabled:opacity-40 dark:border-white/[.145] dark:hover:bg-white/[.06]"
        >
          {loading ? "Fetching..." : "Refetch"}
        </button>
      </div>
    </section>
  )
}

function IsrSection() {
  const [seconds, setSeconds] = useState(0)
  const [counter, setCounter] = useState(0)
  const [revalidated, setRevalidated] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (seconds > 0 && seconds % 10 === 0) {
      const timer = setTimeout(() => {
        setCounter((prev) => prev + 1)
        setRevalidated(true)
      }, 0)
      const reset = setTimeout(() => setRevalidated(false), 1500)
      return () => {
        clearTimeout(timer)
        clearTimeout(reset)
      }
    }
  }, [seconds])

  const manualRevalidate = useCallback(() => {
    setCounter((prev) => prev + 1)
    setSeconds(0)
    setRevalidated(true)
    setTimeout(() => setRevalidated(false), 1500)
  }, [])

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">3. Revalidating Fetch (ISR) — revalidate: 10</h2>
      <p className="text-sm text-muted-foreground">
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm dark:bg-muted">{'next: { revalidate: 10 }'}</code>{" "}
        revalidates data every 10 seconds. Counter auto-increments. Click to manually trigger revalidation.
      </p>
      <div className="flex flex-col items-center gap-4 rounded-lg border border-black/[.08] p-6 dark:border-white/[.145]">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold tabular-nums">{counter}</span>
          <span className="text-muted-foreground/70">(revalidations)</span>
        </div>
        <p className="text-sm text-muted-foreground/70">
          Seconds since last revalidation: <span className="font-mono">{seconds}s</span>
        </p>
        {revalidated && (
          <div className="rounded bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
            Data revalidated!
          </div>
        )}
        <button
          onClick={manualRevalidate}
          className="rounded-full border border-black/[.08] px-6 py-2 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-white/[.06]"
        >
          Revalidate Now
        </button>
      </div>
    </section>
  )
}

function ParallelFetchSection() {
  const [cards, setCards] = useState<{ title: string; value: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true)
      const requests = mockCards.map(
        (card, i) =>
          new Promise<{ title: string; value: string }>((resolve) =>
            setTimeout(() => resolve(card), 600 + i * 200)
          )
      )
      Promise.all(requests).then((results) => {
        setCards(results)
        setLoading(false)
      })
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">4. Parallel Fetching</h2>
      <p className="text-sm text-muted-foreground">
        Multiple fetches start simultaneously using <code className="rounded bg-muted px-1.5 py-0.5 text-sm dark:bg-muted">Promise.all</code>. All requests run in parallel — total time is the slowest single request.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {loading
          ? mockCards.map((card, i) => (
              <div
                key={i}
                className="rounded-lg border border-black/[.08] p-4 dark:border-white/[.145]"
              >
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-8 w-32" />
              </div>
            ))
          : cards.map((card) => (
              <div
                key={card.title}
                className="rounded-lg border border-black/[.08] p-4 dark:border-white/[.145]"
              >
                <p className="text-sm text-muted-foreground">{card.title}</p>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
            ))}
      </div>
      {loading && <p className="text-sm text-muted-foreground/70 italic">Loading data in parallel...</p>}
    </section>
  )
}

function SequentialFetchSection() {
  const [user, setUser] = useState<typeof mockUser | null>(null)
  const [orders, setOrders] = useState<typeof mockOrders | null>(null)
  const [loadingUser, setLoadingUser] = useState(false)
  const [loadingOrders, setLoadingOrders] = useState(false)

  const fetchSequential = useCallback(() => {
    setUser(null)
    setOrders(null)
    setLoadingUser(true)
    setLoadingOrders(false)

    setTimeout(() => {
      setUser(mockUser)
      setLoadingUser(false)
      setLoadingOrders(true)

      setTimeout(() => {
        setOrders(mockOrders)
        setLoadingOrders(false)
      }, 800)
    }, 600)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => fetchSequential(), 0)
    return () => clearTimeout(timer)
  }, [fetchSequential])

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">5. Sequential Fetching</h2>
      <p className="text-sm text-muted-foreground">
        Fetches happen one after another. &quot;Fetch User&quot; completes first, then &quot;Fetch User&apos;s Orders&quot; uses the user data. Total time is the sum of all requests.
      </p>

      <div className="flex flex-col gap-4 rounded-lg border border-black/[.08] p-4 dark:border-white/[.145]">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Step 1: Fetch User
          </h3>
          {loadingUser ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-56" />
            </div>
          ) : user ? (
            <div className="flex flex-col gap-1 text-sm">
              <p><span className="font-medium">Name:</span> {user.name}</p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Role:</span> {user.role}</p>
            </div>
          ) : null}
        </div>

        <div className="border-t border-black/[.08] pt-4 dark:border-white/[.145]">
          <h3 className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Step 2: Fetch User&apos;s Orders
          </h3>
          {loadingOrders ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : orders ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/[.08] text-left dark:border-white/[.145]">
                  <th scope="col" className="pb-1 pr-2 font-medium text-muted-foreground">Order</th>
                  <th scope="col" className="pb-1 pr-2 font-medium text-muted-foreground">Product</th>
                  <th scope="col" className="pb-1 pr-2 font-medium text-muted-foreground">Qty</th>
                  <th scope="col" className="pb-1 text-right font-medium text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-black/[.04] dark:border-white/[.06]">
                    <td className="py-1.5 pr-2 font-mono text-xs">{order.id}</td>
                    <td className="py-1.5 pr-2">{order.product}</td>
                    <td className="py-1.5 pr-2">{order.quantity}</td>
                    <td className="py-1.5 text-right">${order.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
      </div>

      <button
        onClick={fetchSequential}
        className="self-start rounded-full border border-black/[.08] px-6 py-2 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-white/[.06]"
      >
        Re-fetch Sequentially
      </button>
    </section>
  )
}

function ErrorHandlingSection() {
  const [isOn, setIsOn] = useState(true)
  const [data, setData] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const simulateFetch = useCallback(() => {
    setData(null)
    setError(null)

    setTimeout(() => {
      try {
        if (!isOn) {
          throw new Error("Failed to fetch data. Network error simulated.")
        }
        setData("Successfully fetched 42 records from the API.")
      } catch (e) {
        setError(e instanceof Error ? e.message : "An unexpected error occurred.")
      }
    }, 400)
  }, [isOn])

  useEffect(() => {
    const timer = setTimeout(() => simulateFetch(), 0)
    return () => clearTimeout(timer)
  }, [simulateFetch])

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">6. Error Handling (try/catch)</h2>
      <p className="text-sm text-muted-foreground">
        Demonstrates wrapping fetches in <code className="rounded bg-muted px-1.5 py-0.5 text-sm dark:bg-muted">try/catch</code> blocks. Toggle to trigger a success or error state.
      </p>

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Toggle error state:</span>
        <button
          onClick={() => setIsOn((prev) => !prev)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isOn ? "bg-emerald-500" : "bg-red-500"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isOn ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <span className="text-sm font-medium">{isOn ? "Success State" : "Error State"}</span>
      </div>

      <div className="rounded-lg border border-black/[.08] p-4 dark:border-white/[.145]">
        {data && (
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">{data}</span>
          </div>
        )}
        {error && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
            <button
              onClick={simulateFetch}
              className="self-start rounded-full border border-red-300 px-5 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
