"use client"

import { useState } from "react"
import { Badge } from "@/components/design-system/Badge"
import { ComponentPreview } from "@/components/preview"
import { CodeBlock } from "@/components/home/CodeBlock"
import {
  LineChart,
  TrendingUp,
  DollarSign,
  Users,
  Thermometer,
  BarChart3,
  Activity,
} from "lucide-react"

const installCommand = `npx shadcn-ui@latest add line-chart-pro`

const usageCode = `import { LineChartPro } from "@/components/ui/line-chart-pro"

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 450 },
  { name: "May", value: 600 },
  { name: "Jun", value: 550 },
]

export default function Chart() {
  return (
    <LineChartPro
      data={data}
      showGrid={true}
      animated={true}
      className="h-[400px]"
    />
  )
}`

function RevenueChartDemo() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const data = [
    { name: "Jan", value: 12400 },
    { name: "Feb", value: 15800 },
    { name: "Mar", value: 14200 },
    { name: "Apr", value: 18900 },
    { name: "May", value: 22100 },
    { name: "Jun", value: 19500 },
    { name: "Jul", value: 24300 },
    { name: "Aug", value: 21800 },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <DollarSign className="h-4 w-4 text-emerald-500" />
        <span className="text-sm font-medium">Monthly Revenue</span>
        <Badge variant="success">+12.5%</Badge>
      </div>
      <div className="relative h-[300px] w-full">
        <svg viewBox="0 0 800 300" className="h-full w-full">
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          {data.map((item, i) => {
            const x = (i / (data.length - 1)) * 700 + 50
            const y = 280 - (item.value / 25000) * 250
            return (
              <g key={item.name}>
                {i < data.length - 1 && (
                  <line
                    x1={x}
                    y1={y}
                    x2={(i + 1) / (data.length - 1) * 700 + 50}
                    y2={280 - (data[i + 1].value / 25000) * 250}
                    stroke="#10b981"
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#10b981"
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </g>
            )
          })}
        </svg>
      </div>
      {hoveredIndex !== null && (
        <div className="rounded-lg border bg-card p-3 shadow-sm">
          <p className="text-sm font-medium">{data[hoveredIndex].name}</p>
          <p className="text-lg font-bold text-emerald-500">
            ${data[hoveredIndex].value.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  )
}

function UserGrowthDemo() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const data = [
    { name: "Q1 2023", value: 1200 },
    { name: "Q2 2023", value: 2800 },
    { name: "Q3 2023", value: 4500 },
    { name: "Q4 2023", value: 7200 },
    { name: "Q1 2024", value: 9800 },
    { name: "Q2 2024", value: 13400 },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-blue-500" />
        <span className="text-sm font-medium">User Growth</span>
        <Badge variant="info">+82.5%</Badge>
      </div>
      <div className="relative h-[300px] w-full">
        <svg viewBox="0 0 800 300" className="h-full w-full">
          <defs>
            <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {data.map((item, i) => {
            const x = (i / (data.length - 1)) * 700 + 50
            const y = 280 - (item.value / 15000) * 250
            return (
              <g key={item.name}>
                {i < data.length - 1 && (
                  <line
                    x1={x}
                    y1={y}
                    x2={(i + 1) / (data.length - 1) * 700 + 50}
                    y2={280 - (data[i + 1].value / 15000) * 250}
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#3b82f6"
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </g>
            )
          })}
        </svg>
      </div>
      {hoveredIndex !== null && (
        <div className="rounded-lg border bg-card p-3 shadow-sm">
          <p className="text-sm font-medium">{data[hoveredIndex].name}</p>
          <p className="text-lg font-bold text-blue-500">
            {data[hoveredIndex].value.toLocaleString()} users
          </p>
        </div>
      )}
    </div>
  )
}

function TemperatureChartDemo() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const data = [
    { name: "6AM", value: 18 },
    { name: "9AM", value: 22 },
    { name: "12PM", value: 28 },
    { name: "3PM", value: 32 },
    { name: "6PM", value: 27 },
    { name: "9PM", value: 21 },
    { name: "12AM", value: 17 },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Thermometer className="h-4 w-4 text-orange-500" />
        <span className="text-sm font-medium">Temperature Today</span>
      </div>
      <div className="relative h-[300px] w-full">
        <svg viewBox="0 0 800 300" className="h-full w-full">
          {data.map((item, i) => {
            const x = (i / (data.length - 1)) * 700 + 50
            const y = 280 - ((item.value - 10) / 30) * 250
            return (
              <g key={item.name}>
                {i < data.length - 1 && (
                  <line
                    x1={x}
                    y1={y}
                    x2={(i + 1) / (data.length - 1) * 700 + 50}
                    y2={280 - ((data[i + 1].value - 10) / 30) * 250}
                    stroke="#f97316"
                    strokeWidth="2"
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#f97316"
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </g>
            )
          })}
        </svg>
      </div>
      {hoveredIndex !== null && (
        <div className="rounded-lg border bg-card p-3 shadow-sm">
          <p className="text-sm font-medium">{data[hoveredIndex].name}</p>
          <p className="text-lg font-bold text-orange-500">
            {data[hoveredIndex].value}°C
          </p>
        </div>
      )}
    </div>
  )
}

function StockPriceDemo() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const data = [
    { name: "Mon", value: 142 },
    { name: "Tue", value: 138 },
    { name: "Wed", value: 145 },
    { name: "Thu", value: 152 },
    { name: "Fri", value: 148 },
    { name: "Mon", value: 155 },
    { name: "Tue", value: 161 },
    { name: "Wed", value: 158 },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-violet-500" />
        <span className="text-sm font-medium">Stock Price (ACME)</span>
        <Badge variant="success">+$16.00</Badge>
      </div>
      <div className="relative h-[300px] w-full">
        <svg viewBox="0 0 800 300" className="h-full w-full">
          <defs>
            <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {data.map((item, i) => {
            const x = (i / (data.length - 1)) * 700 + 50
            const y = 280 - ((item.value - 130) / 40) * 250
            return (
              <g key={item.name + i}>
                {i < data.length - 1 && (
                  <line
                    x1={x}
                    y1={y}
                    x2={(i + 1) / (data.length - 1) * 700 + 50}
                    y2={280 - ((data[i + 1].value - 130) / 40) * 250}
                    stroke="#8b5cf6"
                    strokeWidth="2"
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#8b5cf6"
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </g>
            )
          })}
        </svg>
      </div>
      {hoveredIndex !== null && (
        <div className="rounded-lg border bg-card p-3 shadow-sm">
          <p className="text-sm font-medium">{data[hoveredIndex].name}</p>
          <p className="text-lg font-bold text-violet-500">
            ${data[hoveredIndex].value.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  )
}

function SalesAnalyticsDemo() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const online = [
    { name: "Jan", value: 4200 },
    { name: "Feb", value: 5100 },
    { name: "Mar", value: 4800 },
    { name: "Apr", value: 6200 },
    { name: "May", value: 7100 },
    { name: "Jun", value: 6800 },
  ]

  const offline = [
    { name: "Jan", value: 3100 },
    { name: "Feb", value: 3400 },
    { name: "Mar", value: 3800 },
    { name: "Apr", value: 4100 },
    { name: "May", value: 3900 },
    { name: "Jun", value: 4500 },
  ]

  const colors = ["#06b6d4", "#f59e0b"]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-4 w-4 text-cyan-500" />
        <span className="text-sm font-medium">Sales Analytics</span>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[0] }} />
          <span className="text-xs text-muted-foreground">Online</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[1] }} />
          <span className="text-xs text-muted-foreground">Offline</span>
        </div>
      </div>
      <div className="relative h-[300px] w-full">
        <svg viewBox="0 0 800 300" className="h-full w-full">
          {[online, offline].map((series, si) =>
            series.map((item, i) => {
              const x = (i / (series.length - 1)) * 700 + 50
              const y = 280 - (item.value / 8000) * 250
              return (
                <g key={si + "-" + item.name}>
                  {i < series.length - 1 && (
                    <line
                      x1={x}
                      y1={y}
                      x2={(i + 1) / (series.length - 1) * 700 + 50}
                      y2={280 - (series[i + 1].value / 8000) * 250}
                      stroke={colors[si]}
                      strokeWidth="2"
                    />
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill={colors[si]}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredIndex(si * series.length + i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                </g>
              )
            })
          )}
        </svg>
      </div>
      {hoveredIndex !== null && (
        <div className="rounded-lg border bg-card p-3 shadow-sm">
          <p className="text-sm font-medium">
            {hoveredIndex < online.length
              ? online[hoveredIndex].name
              : offline[hoveredIndex - online.length].name}
          </p>
          <p className="text-lg font-bold text-cyan-500">
            ${hoveredIndex < online.length
              ? online[hoveredIndex].value.toLocaleString()
              : offline[hoveredIndex - online.length].value.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  )
}

function PerformanceMetricsDemo() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const data = [
    { name: "W1", value: 85 },
    { name: "W2", value: 72 },
    { name: "W3", value: 91 },
    { name: "W4", value: 88 },
    { name: "W5", value: 95 },
    { name: "W6", value: 89 },
    { name: "W7", value: 92 },
    { name: "W8", value: 97 },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Activity className="h-4 w-4 text-rose-500" />
        <span className="text-sm font-medium">Performance Score</span>
        <Badge variant="success">+12pts</Badge>
      </div>
      <div className="relative h-[300px] w-full">
        <svg viewBox="0 0 800 300" className="h-full w-full">
          <defs>
            <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
            </linearGradient>
          </defs>
          {data.map((item, i) => {
            const x = (i / (data.length - 1)) * 700 + 50
            const y = 280 - (item.value / 100) * 250
            return (
              <g key={item.name}>
                {i < data.length - 1 && (
                  <line
                    x1={x}
                    y1={y}
                    x2={(i + 1) / (data.length - 1) * 700 + 50}
                    y2={280 - (data[i + 1].value / 100) * 250}
                    stroke="#f43f5e"
                    strokeWidth="2"
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#f43f5e"
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </g>
            )
          })}
        </svg>
      </div>
      {hoveredIndex !== null && (
        <div className="rounded-lg border bg-card p-3 shadow-sm">
          <p className="text-sm font-medium">{data[hoveredIndex].name}</p>
          <p className="text-lg font-bold text-rose-500">
            {data[hoveredIndex].value}%
          </p>
        </div>
      )}
    </div>
  )
}

function CustomTooltipDemo() {
  const [selectedPoint, setSelectedPoint] = useState<{
    name: string
    value: number
    x: number
    y: number
  } | null>(null)

  const data = [
    { name: "Jan", value: 3200 },
    { name: "Feb", value: 4100 },
    { name: "Mar", value: 3800 },
    { name: "Apr", value: 5200 },
    { name: "May", value: 4900 },
    { name: "Jun", value: 6100 },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <LineChart className="h-4 w-4 text-teal-500" />
        <span className="text-sm font-medium">Custom Tooltip Chart</span>
      </div>
      <div className="relative h-[300px] w-full">
        <svg viewBox="0 0 800 300" className="h-full w-full">
          <defs>
            <linearGradient id="tooltipGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {data.map((item, i) => {
            const x = (i / (data.length - 1)) * 700 + 50
            const y = 280 - (item.value / 7000) * 250
            return (
              <g key={item.name}>
                {i < data.length - 1 && (
                  <line
                    x1={x}
                    y1={y}
                    x2={(i + 1) / (data.length - 1) * 700 + 50}
                    y2={280 - (data[i + 1].value / 7000) * 250}
                    stroke="#14b8a6"
                    strokeWidth="2"
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill="#14b8a6"
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() =>
                    setSelectedPoint({ name: item.name, value: item.value, x, y })
                  }
                  onMouseLeave={() => setSelectedPoint(null)}
                />
              </g>
            )
          })}
        </svg>
        {selectedPoint && (
          <div
            className="absolute z-10 rounded-lg border bg-card p-3 shadow-lg"
            style={{
              left: (selectedPoint.x / 800) * 100 + "%",
              top: (selectedPoint.y / 300) * 100 - 15 + "%",
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-teal-500" />
              <span className="text-sm font-semibold">{selectedPoint.name}</span>
            </div>
            <p className="text-lg font-bold text-teal-500">
              ${selectedPoint.value.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

const apiReference = [
  {
    prop: "data",
    type: "Array<{ name: string; value: number }>",
    required: true,
    default: "-",
    description: "The data points to render in the chart",
  },
  {
    prop: "showGrid",
    type: "boolean",
    required: false,
    default: "false",
    description: "Whether to display grid lines",
  },
  {
    prop: "animated",
    type: "boolean",
    required: false,
    default: "false",
    description: "Whether to animate the chart on mount",
  },
  {
    prop: "className",
    type: "string",
    required: false,
    default: "-",
    description: "Additional CSS classes to apply",
  },
]

export default function LineChartProPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 py-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Line Chart Pro</h1>
        <p className="text-lg text-muted-foreground">
          A professional line chart component with interactive tooltips, multiple series support,
          and customizable styling.
        </p>
        <div className="flex gap-2">
          <Badge variant="success">Stable</Badge>
          <Badge variant="info">Charts</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-semibold">Examples</h2>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Revenue Chart</h3>
          <ComponentPreview>
            <RevenueChartDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">User Growth</h3>
          <ComponentPreview>
            <UserGrowthDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Temperature Changes</h3>
          <ComponentPreview>
            <TemperatureChartDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Stock Price Trends</h3>
          <ComponentPreview>
            <StockPriceDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Sales Analytics</h3>
          <ComponentPreview>
            <SalesAnalyticsDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Performance Metrics</h3>
          <ComponentPreview>
            <PerformanceMetricsDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Custom Tooltip</h3>
          <ComponentPreview>
            <CustomTooltipDemo />
          </ComponentPreview>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {apiReference.map((row) => (
                <tr key={row.prop} className="border-b last:border-0">
                  <td className="px-4 py-3 font-mono text-sm">{row.prop}</td>
                  <td className="px-4 py-3 font-mono text-sm text-muted-foreground">
                    {row.type}
                  </td>
                  <td className="px-4 py-3">
                    {row.required ? (
                      <Badge variant="destructive">Required</Badge>
                    ) : (
                      <Badge variant="outline">Optional</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm">{row.default}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
