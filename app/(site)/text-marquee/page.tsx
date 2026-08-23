"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { ArrowLeft, ArrowRight, Zap, Star, Bell, Megaphone, Sparkles } from "lucide-react";

const installCommand = "npx ui-add text-marquee";
const usageCode = `import { TextMarquee } from "@/components/ui/text-marquee";

<TextMarquee speed="normal">
  Breaking news headline goes here
</TextMarquee>
`;

function HorizontalMarquee() {
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [speed, setSpeed] = useState<"slow" | "normal" | "fast">("normal");

  const speedMap = { slow: "30s", normal: "20s", fast: "10s" };

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-4 items-center">
        <button
          onClick={() => setDirection("left")}
          className={`p-2 rounded-lg transition-colors ${
            direction === "left" ? "bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => setDirection("right")}
          className={`p-2 rounded-lg transition-colors ${
            direction === "right" ? "bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          <ArrowRight className="h-4 w-4" />
        </button>
        <select
          value={speed}
          onChange={(e) => setSpeed(e.target.value as typeof speed)}
          className="px-3 py-1 rounded-lg border bg-background text-sm"
        >
          <option value="slow">Slow</option>
          <option value="normal">Normal</option>
          <option value="fast">Fast</option>
        </select>
      </div>
      <div className="overflow-hidden border rounded-lg bg-card p-4">
        <div
          className="flex whitespace-nowrap gap-8"
          style={{
            animation: `marquee ${speedMap[speed]} linear infinite ${direction === "right" ? "reverse" : ""}`,
          }}
        >
          <span className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            This is a horizontal marquee component
          </span>
          <span className="flex items-center gap-2">
            <Star className="h-4 w-4 text-blue-500" />
            It scrolls continuously across the screen
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            Perfect for announcements and news
          </span>
          <span className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            This is a horizontal marquee component
          </span>
          <span className="flex items-center gap-2">
            <Star className="h-4 w-4 text-blue-500" />
            It scrolls continuously across the screen
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            Perfect for announcements and news
          </span>
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

function VerticalMarquee() {
  const [pause, setPause] = useState(false);

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="overflow-hidden h-32 border rounded-lg bg-card">
        <div
          className={`flex flex-col gap-4 p-4 ${pause ? "" : "animate-marquee-y"}`}
          style={{ animationPlayState: pause ? "paused" : "running" }}
        >
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-red-500" />
            <span>New notification received</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span>System update available</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-blue-500" />
            <span>Your task has been completed</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span>New feature released</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => setPause(!pause)}
        className={`px-4 py-2 rounded-lg transition-colors ${
          pause ? "bg-primary text-primary-foreground" : "bg-muted"
        }`}
      >
        {pause ? "Resume" : "Pause"}
      </button>
      <style jsx>{`
        @keyframes marquee-y {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-100%); }
        }
        .animate-marquee-y {
          animation: marquee-y 10s linear infinite;
        }
      `}</style>
    </div>
  );
}

function NewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const headlines = [
    "Stock market reaches all-time high",
    "New climate agreement signed by 190 countries",
    "Tech company announces breakthrough AI",
    "Space agency confirms water on Mars",
    "Global economy shows strong recovery",
  ];

  return (
    <div className="w-full space-y-4">
      <div className="relative overflow-hidden border rounded-lg bg-card p-4">
        <div className="flex items-center gap-3">
          <Badge variant="destructive" className="shrink-0">LIVE</Badge>
          <div className="overflow-hidden">
            <p className="whitespace-nowrap animate-marquee-x">{headlines[currentIndex]}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + headlines.length) % headlines.length)}
          className="px-3 py-1 rounded border text-sm hover:bg-accent"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % headlines.length)}
          className="px-3 py-1 rounded border text-sm hover:bg-accent"
        >
          Next
        </button>
      </div>
      <style jsx>{`
        @keyframes marquee-x {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee-x {
          animation: marquee-x 8s linear infinite;
        }
      `}</style>
    </div>
  );
}

function AnnouncementScroll() {
  const [activeIndex, setActiveIndex] = useState(0);
  const announcements = [
    { id: 1, icon: Bell, text: "System maintenance scheduled for tonight", color: "text-blue-500" },
    { id: 2, icon: Zap, text: "New features launched in v2.0", color: "text-yellow-500" },
    { id: 3, icon: Star, text: "You have 3 unread messages", color: "text-purple-500" },
  ];

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        {announcements.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveIndex(i)}
              className={`flex items-center gap-3 w-full p-3 rounded-lg border transition-colors ${
                activeIndex === i
                  ? "border-primary bg-primary/10"
                  : "hover:bg-accent"
              }`}
            >
              <Icon className={`h-5 w-5 ${item.color}`} />
              <span className="text-sm text-left">{item.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AlertScroll() {
  const [alerts, setAlerts] = useState([
    { id: 1, text: "Server load high", type: "warning" as const },
    { id: 2, text: "Database connection lost", type: "error" as const },
    { id: 3, text: "Backup completed", type: "success" as const },
  ]);

  const typeColors = {
    warning: "bg-yellow-500/10 border-yellow-500/50 text-yellow-700",
    error: "bg-red-500/10 border-red-500/50 text-red-700",
    success: "bg-green-500/10 border-green-500/50 text-green-700",
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-center justify-between p-3 rounded-lg border ${typeColors[alert.type]}`}
          >
            <span className="text-sm">{alert.text}</span>
            <button
              onClick={() => setAlerts(alerts.filter((a) => a.id !== alert.id))}
              className="text-current opacity-60 hover:opacity-100"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  const brands = ["Vercel", "Next.js", "Tailwind", "Prisma", "Stripe", "Supabase", "Clerk", "Resend"];

  return (
    <div className="w-full space-y-4">
      <div
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex gap-8 items-center"
          style={{
            animation: isPaused ? "none" : "marquee 20s linear infinite",
          }}
        >
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="px-6 py-3 rounded-lg border bg-card whitespace-nowrap"
            >
              <span className="font-medium">{brand}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        {isPaused ? "Paused" : "Hover to pause"}
      </p>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

function EventMarquee() {
  const [currentEvent, setCurrentEvent] = useState(0);

  const events = [
    { id: 1, name: "Tech Conference 2024", date: "Mar 15-17", icon: Zap },
    { id: 2, name: "Design Workshop", date: "Apr 5", icon: Star },
    { id: 3, name: "Product Launch", date: "Apr 20", icon: Megaphone },
  ];

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="relative overflow-hidden border rounded-lg bg-card">
        <div className="p-4">
          {(() => {
            const event = events[currentEvent];
            const Icon = event.icon;
            return (
              <div className="flex items-center gap-4">
                <Icon className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">{event.name}</p>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
      <div className="flex justify-center gap-2">
        {events.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentEvent(i)}
            className={`h-2 w-2 rounded-full transition-colors ${
              currentEvent === i ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function TextMarqueePage() {
  return (
    <div className="container max-w-4xl py-12 space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold">Text Marquee</h1>
          <Badge variant="secondary">UI Component</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Animated scrolling text for announcements, news tickers, and alerts.
        </p>
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
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Horizontal Marquee</h3>
            <ComponentPreview>
              <HorizontalMarquee />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Vertical Marquee</h3>
            <ComponentPreview>
              <VerticalMarquee />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">News Ticker</h3>
            <ComponentPreview>
              <NewsTicker />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Announcement Scroll</h3>
            <ComponentPreview>
              <AnnouncementScroll />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Alert Scroll</h3>
            <ComponentPreview>
              <AlertScroll />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Brand Marquee</h3>
            <ComponentPreview>
              <BrandMarquee />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Event Marquee</h3>
            <ComponentPreview>
              <EventMarquee />
            </ComponentPreview>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium">Prop</th>
                <th className="text-left py-2 font-medium">Type</th>
                <th className="text-left py-2 font-medium">Default</th>
                <th className="text-left py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">children</td>
                <td className="py-2">ReactNode</td>
                <td className="py-2">required</td>
                <td className="py-2">Content to scroll</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">direction</td>
                <td className="py-2">"left" | "right" | "up" | "down"</td>
                <td className="py-2">"left"</td>
                <td className="py-2">Scroll direction</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">speed</td>
                <td className="py-2">"slow" | "normal" | "fast"</td>
                <td className="py-2">"normal"</td>
                <td className="py-2">Scroll speed</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">pauseOnHover</td>
                <td className="py-2">boolean</td>
                <td className="py-2">true</td>
                <td className="py-2">Pause on mouse hover</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
