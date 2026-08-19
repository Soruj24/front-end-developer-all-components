"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Calendar, RefreshCcw, Settings, Moon, Sun, MapPin, Globe, BarChart, Layout, ArrowRightArrowLeft, Timer, Zap, LogOut } from "lucide-react";

const DATE_RANGE_SOURCE = "use client";

function DateRangeDemo() {
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  });
  const [showTime, setShowTime] = useState(false);

  const fromString = dateRange.from
    ? dateRange.from.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : "Start";
  const toString = dateRange.to ? dateRange.to.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "End";

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">From</label>
        <input
          type="date"
          value:from={dateRange.from}
          onChange={(e) =>
            setDateRange({
              from: e.target.valueAsDate ?? null,
              to: dateRange.to,
            })
          }
          className="rounded-border border-border w-full px-3 py-2 text-sm focus:ring-1"
        />
        {showTime && (
          <p className="mt-2 text-xs text-muted-foreground">
            From {fromString} {dateRange.from?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">To</label>
        <input
          type="date"
          value:to={dateRange.to}
          onChange={(e) =>
            setDateRange({
              from: dateRange.from,
              to: e.target.valueAsDate ?? null,
            })
          }
          className="rounded-border border-border w-full px-3 py-2 text-sm focus:ring-1"
        />
        {showTime && (
          <p className="mt-2 text-xs text-muted-foreground">
            To {toString} {dateRange.to?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => setDateRange({ from: new Date(new Date().setDate(new Date().getDate() - 7)), to: new Date() })} className="rounded-border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors">
          <Calendar className="h-4 w-4 mr-2" /> Last 7 days
        </button>
        <button onClick={() => setDateRange({ from: new Date(new Date().setMonth(new Date().getMonth() - 1)), to: new Date() })} className="rounded-border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors">
          <Moon className="h-4 w-4 mr-2" /> Last month
        </button>
        <button onClick={() => setDateRange({ from: new Date(), to: new Date() })} className="rounded-border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors">
          <Sun className="h-4 w-4 mr-2" /> This day
        </button>
      </div>
    </div>
  );
}

export default function DateRangePage() {
  return (
    <ComponentDocPage
      name="Date Range"
      category="Layout"
      description="A date range picker for selecting start and end dates with predefined periods."
    >
      <PreviewPanel filename="date-range.tsx">
        <DateRangeDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={DATE_RANGE_SOURCE}
        filename="components/ui/DateRange/DateRange.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-4">
        <ExampleBlock title="Custom Range" description="Select a custom date range." code={DATE_RANGE_SOURCE}>
          <DateRangeDemo />
        </ExampleBlock>

        <ExampleBlock title="Preset Periods" description="Quick selection of common time periods." code={DATE_RANGE_SOURCE}>
          <DateRangeDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}