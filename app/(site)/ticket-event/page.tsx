"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Ticket,
  Calendar,
  MapPin,
  Clock,
  Users,
  QrCode,
  Star,
} from "lucide-react";

const installCommand = `npx shadcn@latest add ticket-event`;

const usageCode = `import { TicketEvent } from "@/components/ticket-event";

export default function Demo() {
  return (
    <TicketEvent
      eventName="Summer Concert"
      date="2024-07-15"
      venue="Madison Square Garden"
    />
  );
}`;

function EventTicket() {
  const [ticketType, setTicketType] = useState("general");

  const tickets = [
    { id: "general", name: "General", price: 49, perks: ["Entry", "Standing"] },
    { id: "vip", name: "VIP", price: 149, perks: ["Entry", "Seated", "Drinks"] },
    { id: "backstage", name: "Backstage", price: 299, perks: ["All VIP perks", "Meet & Greet"] },
  ];

  const selected = tickets.find((t) => t.id === ticketType);

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Ticket className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Event Tickets</h3>
      </div>
      <div className="flex gap-2">
        {tickets.map((t) => (
          <button
            key={t.id}
            onClick={() => setTicketType(t.id)}
            className={`flex-1 p-3 rounded-lg border text-center transition-all ${
              ticketType === t.id
                ? "border-primary bg-primary/5"
                : "hover:border-primary/50"
            }`}
          >
            <div className="font-medium">{t.name}</div>
            <div className="text-lg font-bold mt-1">${t.price}</div>
          </button>
        ))}
      </div>
      {selected && (
        <div className="p-4 rounded-lg bg-muted space-y-2">
          <div className="font-medium">{selected.name} Ticket</div>
          <div className="space-y-1">
            {selected.perks.map((perk) => (
              <div key={perk} className="flex items-center gap-2 text-sm">
                <Star className="h-3 w-3 text-yellow-500" />
                {perk}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ConcertPass() {
  const [selected, setSelected] = useState("weekend");

  const passes = [
    { id: "day", name: "Day Pass", price: 89, days: 1 },
    { id: "weekend", name: "Weekend Pass", price: 199, days: 3 },
    { id: "vip", name: "VIP Pass", price: 499, days: 3 },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-purple-500" />
        <h3 className="font-semibold">Concert Passes</h3>
      </div>
      <div className="space-y-2">
        {passes.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p.id)}
            className={`w-full p-4 rounded-lg border text-left flex items-center justify-between transition-all ${
              selected === p.id
                ? "border-primary bg-primary/5"
                : "hover:border-primary/50"
            }`}
          >
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-muted-foreground">
                {p.days} {p.days === 1 ? "day" : "days"} of access
              </div>
            </div>
            <div className="text-xl font-bold">${p.price}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function EventCard() {
  const [category, setCategory] = useState("music");

  const events = [
    { name: "Jazz Night", category: "music", date: "Mar 15", venue: "Blue Note" },
    { name: "Tech Conference", category: "tech", date: "Apr 20", venue: "Convention Center" },
    { name: "Art Exhibition", category: "art", date: "May 10", venue: "Modern Gallery" },
  ];

  const filtered = category === "all" ? events : events.filter((e) => e.category === category);

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-red-500" />
        <h3 className="font-semibold">Event Cards</h3>
      </div>
      <div className="flex gap-2 flex-wrap">
        {["all", "music", "tech", "art"].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1 rounded-full text-sm capitalize ${
              category === c
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map((event) => (
          <div key={event.name} className="p-3 rounded-lg border flex items-center justify-between">
            <div>
              <div className="font-medium">{event.name}</div>
              <div className="text-xs text-muted-foreground">{event.venue}</div>
            </div>
            <Badge variant="outline">{event.date}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function TicketScanner() {
  const [ticketId, setTicketId] = useState("");
  const [status, setStatus] = useState<"idle" | "valid" | "invalid">("idle");

  const handleScan = () => {
    if (ticketId.startsWith("TKT-")) {
      setStatus("valid");
    } else {
      setStatus("invalid");
    }
  };

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <QrCode className="h-5 w-5 text-green-500" />
        <h3 className="font-semibold">Ticket Scanner</h3>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter ticket ID (TKT-XXXX)"
          value={ticketId}
          onChange={(e) => {
            setTicketId(e.target.value);
            setStatus("idle");
          }}
          className="flex-1 px-3 py-2 rounded-md border bg-background text-sm"
        />
        <button
          onClick={handleScan}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm"
        >
          Scan
        </button>
      </div>
      {status !== "idle" && (
        <div
          className={`p-3 rounded-lg text-center font-medium ${
            status === "valid"
              ? "bg-green-500/10 text-green-600 border border-green-500/20"
              : "bg-red-500/10 text-red-600 border border-red-500/20"
          }`}
        >
          {status === "valid" ? "Valid Ticket - Entry Granted" : "Invalid Ticket - Entry Denied"}
        </div>
      )}
    </div>
  );
}

function SeatingMap() {
  const [section, setSection] = useState("general");

  const sections = [
    { id: "vip", name: "VIP", price: 200, available: 12 },
    { id: "general", name: "General", price: 75, available: 150 },
    { id: "balcony", name: "Balcony", price: 50, available: 80 },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-blue-500" />
        <h3 className="font-semibold">Seating Map</h3>
      </div>
      <div className="aspect-video rounded-lg bg-muted relative overflow-hidden">
        {sections.map((s, i) => (
          <div
            key={s.id}
            onClick={() => setSection(s.id)}
            className={`absolute rounded-lg cursor-pointer transition-all flex items-center justify-center text-xs font-medium ${
              section === s.id
                ? "bg-primary text-primary-foreground"
                : "bg-background hover:bg-background/80"
            }`}
            style={{
              top: `${20 + i * 25}%`,
              left: `${10 + i * 10}%`,
              width: "30%",
              height: "20%",
            }}
          >
            {s.name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {sections.map((s) => (
          <div key={s.id} className="p-2 rounded-lg bg-muted text-center">
            <div className="text-sm font-medium">{s.name}</div>
            <div className="text-lg font-bold">${s.price}</div>
            <div className="text-xs text-muted-foreground">{s.available} left</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VIPPass() {
  const [perks, setPerks] = useState<string[]>(["lounge"]);

  const availablePerks = [
    { id: "lounge", name: "VIP Lounge", icon: Star },
    { id: "drinks", name: "Free Drinks", icon: Star },
    { id: "merch", name: "Merch Pack", icon: Star },
    { id: "meet", name: "Meet & Greet", icon: Star },
  ];

  const togglePerk = (id: string) => {
    setPerks((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 text-yellow-500" />
        <h3 className="font-semibold">VIP Pass Builder</h3>
      </div>
      <div className="space-y-2">
        {availablePerks.map((perk) => (
          <label
            key={perk.id}
            className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted cursor-pointer"
          >
            <input
              type="checkbox"
              checked={perks.includes(perk.id)}
              onChange={() => togglePerk(perk.id)}
              className="rounded border-gray-300"
            />
            <perk.icon className="h-4 w-4 text-yellow-500" />
            <span className="text-sm">{perk.name}</span>
          </label>
        ))}
      </div>
      <div className="p-3 rounded-lg bg-muted">
        <div className="text-sm text-muted-foreground">Selected perks: {perks.length}</div>
        <div className="text-xl font-bold mt-1">
          Total: ${49 + perks.length * 25}
        </div>
      </div>
    </div>
  );
}

function EventCountdown() {
  const [eventDate, setEventDate] = useState("2024-12-31");

  const calculateTimeLeft = () => {
    const difference = new Date(eventDate).getTime() - Date.now();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
    };
  };

  const timeLeft = calculateTimeLeft();

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-indigo-500" />
        <h3 className="font-semibold">Event Countdown</h3>
      </div>
      <div className="flex gap-4 justify-center py-4">
        <div className="text-center">
          <div className="text-4xl font-bold">{timeLeft.days}</div>
          <div className="text-sm text-muted-foreground">Days</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold">{timeLeft.hours}</div>
          <div className="text-sm text-muted-foreground">Hours</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold">{timeLeft.minutes}</div>
          <div className="text-sm text-muted-foreground">Minutes</div>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Event Date</label>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="w-full mt-1 px-3 py-2 rounded-md border bg-background text-sm"
        />
      </div>
    </div>
  );
}

export default function TicketEventPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Ticket Event</h1>
        <p className="text-lg text-muted-foreground">
          Complete event management system with ticketing, seating, VIP passes,
          and countdown timers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Examples</h2>

        <ComponentPreview name="EventTicket">
          <EventTicket />
        </ComponentPreview>

        <ComponentPreview name="ConcertPass">
          <ConcertPass />
        </ComponentPreview>

        <ComponentPreview name="EventCard">
          <EventCard />
        </ComponentPreview>

        <ComponentPreview name="TicketScanner">
          <TicketScanner />
        </ComponentPreview>

        <ComponentPreview name="SeatingMap">
          <SeatingMap />
        </ComponentPreview>

        <ComponentPreview name="VIPPass">
          <VIPPass />
        </ComponentPreview>

        <ComponentPreview name="EventCountdown">
          <EventCountdown />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-2 text-left font-medium">Prop</th>
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">Default</th>
                <th className="px-4 py-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">eventName</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">Name of the event</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">date</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">Event date (ISO format)</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">venue</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">Event venue name</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">capacity</td>
                <td className="px-4 py-2">number</td>
                <td className="px-4 py-2">100</td>
                <td className="px-4 py-2">Maximum attendees</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">className</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
