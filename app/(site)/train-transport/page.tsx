"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Train, MapPin, Clock, Ticket, Users, Navigation, Calendar } from "lucide-react";

const installCommand = "npx shadcn@latest add train-transport";
const usageCode = "import { TrainSchedule } from \"@/components/train-transport\";\n\nexport default function Page() {\n  return <TrainSchedule />;\n}";

function TrainSchedule() {
  const [selectedLine, setSelectedLine] = useState("intercity");
  const trains = [
    { id: 1, name: "Express A1", from: "Central Station", to: "North Terminal", time: "08:30", platform: 3, status: "On Time" },
    { id: 2, name: "Regional B2", from: "Downtown", to: "Airport", time: "09:15", platform: 1, status: "Delayed" },
    { id: 3, name: "Metro C3", from: "East Hub", to: "West End", time: "10:00", platform: 5, status: "On Time" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {["intercity", "regional", "metro"].map((line) => (
          <Badge key={line} variant={selectedLine === line ? "default" : "outline"} className="cursor-pointer" onClick={() => setSelectedLine(line)}>
            {line.charAt(0).toUpperCase() + line.slice(1)}
          </Badge>
        ))}
      </div>
      <div className="rounded-lg border p-4 space-y-2">
        {trains.map((train) => (
          <div key={train.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
            <div className="flex items-center gap-3">
              <Train className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">{train.name}</p>
                <p className="text-xs text-muted-foreground">{train.from} → {train.to}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-mono">{train.time}</p>
              <Badge variant={train.status === "On Time" ? "default" : "destructive"} className="text-xs">
                {train.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StationMap() {
  const [activeStation, setActiveStation] = useState<string | null>(null);
  const stations = [
    { id: "central", name: "Central Station", x: 50, y: 40, connections: 4 },
    { id: "north", name: "North Terminal", x: 50, y: 10, connections: 2 },
    { id: "east", name: "East Hub", x: 85, y: 40, connections: 3 },
    { id: "west", name: "West End", x: 15, y: 40, connections: 2 },
    { id: "airport", name: "Airport", x: 85, y: 80, connections: 1 },
  ];
  const activeName = activeStation ? stations.find(s => s.id === activeStation)?.name : "";
  const activeConns = activeStation ? stations.find(s => s.id === activeStation)?.connections : 0;
  return (
    <div className="relative w-full h-64 rounded-lg border bg-gradient-to-b from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <line x1="50" y1="40" x2="50" y2="10" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground/30" />
        <line x1="50" y1="40" x2="85" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground/30" />
        <line x1="50" y1="40" x2="15" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground/30" />
        <line x1="85" y1="40" x2="85" y2="80" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground/30" />
      </svg>
      {stations.map((station) => (
        <button
          key={station.id}
          className={["absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all", activeStation === station.id ? "bg-primary border-primary scale-125" : "bg-background border-muted-foreground/50 hover:border-primary"].join(" ")}
          style={{ left: station.x + "%", top: station.y + "%" }}
          onClick={() => setActiveStation(station.id)}
        >
          <MapPin className="h-3 w-3 mx-auto" />
        </button>
      ))}
      {activeStation && (
        <div className="absolute bottom-2 left-2 right-2 bg-background/90 backdrop-blur rounded-md p-2 text-xs">
          {activeName} - {activeConns} connections
        </div>
      )}
    </div>
  );
}

function TicketBooking() {
  const [passengers, setPassengers] = useState(1);
  const [ticketType, setTicketType] = useState("standard");
  const prices = { standard: 25, business: 45, first: 75 };
  const total = prices[ticketType as keyof typeof prices] * passengers;
  return (
    <div className="rounded-lg border p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Ticket className="h-5 w-5 text-primary" />
        <h3 className="font-medium">Book Tickets</h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {(["standard", "business", "first"] as const).map((type) => (
          <button
            key={type}
            className={["p-2 rounded-md border text-center text-sm transition-colors", ticketType === type ? "bg-primary text-primary-foreground" : "hover:bg-muted"].join(" ")}
            onClick={() => setTicketType(type)}
          >
            <span className="block font-medium capitalize">{type}</span>
            <span className="text-xs">${prices[type]}</span>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Passengers</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-7 w-7 rounded-md border flex items-center justify-center text-sm" onClick={() => setPassengers(Math.max(1, passengers - 1))}>-</button>
          <span className="w-6 text-center text-sm font-medium">{passengers}</span>
          <button className="h-7 w-7 rounded-md border flex items-center justify-center text-sm" onClick={() => setPassengers(Math.min(10, passengers + 1))}>+</button>
        </div>
      </div>
      <div className="pt-2 border-t flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Total</span>
        <span className="text-lg font-bold">${total}</span>
      </div>
    </div>
  );
}

function RoutePlanner() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const routes = [
    { duration: "1h 45m", transfers: 0, price: "$32" },
    { duration: "2h 10m", transfers: 1, price: "$24" },
    { duration: "1h 30m", transfers: 0, price: "$45" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <Navigation className="h-5 w-5 text-primary" />
        <h3 className="font-medium">Route Planner</h3>
      </div>
      <div className="space-y-2">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input className="w-full pl-9 pr-3 py-2 rounded-md border bg-background text-sm" placeholder="From: Central Station" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
          <input className="w-full pl-9 pr-3 py-2 rounded-md border bg-background text-sm" placeholder="To: Airport Terminal" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
      </div>
      <button className="w-full py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium">Find Routes</button>
      <div className="space-y-2 mt-3">
        {routes.map((route, i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded-md border text-sm">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{route.duration}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">{route.transfers === 0 ? "Direct" : route.transfers + " transfer"}</span>
              <Badge variant="outline">{route.price}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DelayAlert() {
  const alerts = [
    { id: 1, train: "Express A1", delay: "15 min", reason: "Signal failure", severity: "high" },
    { id: 2, train: "Regional B2", delay: "5 min", reason: "Weather conditions", severity: "low" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-destructive" />
          <h3 className="font-medium">Active Delays</h3>
        </div>
        <Badge variant="destructive">{alerts.length}</Badge>
      </div>
      <div className="space-y-2">
        {alerts.map((alert) => (
          <div key={alert.id} className={["p-3 rounded-lg border-l-4 bg-muted/50", alert.severity === "high" ? "border-l-destructive" : "border-l-muted-foreground"].join(" ")}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">{alert.train}</span>
              <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>{alert.delay}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">{alert.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SeatReservation() {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const seats = [
    { id: "A1", status: "available" }, { id: "A2", status: "taken" }, { id: "A3", status: "available" }, { id: "A4", status: "reserved" },
    { id: "B1", status: "available" }, { id: "B2", status: "available" }, { id: "B3", status: "taken" }, { id: "B4", status: "available" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <Train className="h-5 w-5 text-primary" />
        <h3 className="font-medium">Seat Selection</h3>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {seats.map((seat) => (
          <button
            key={seat.id}
            disabled={seat.status !== "available"}
            className={["h-10 rounded-md text-xs font-medium transition-colors",
              selectedSeat === seat.id ? "bg-primary text-primary-foreground" :
              seat.status === "available" ? "bg-background border hover:bg-muted" :
              seat.status === "taken" ? "bg-muted text-muted-foreground line-through" :
              "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
            ].join(" ")}
            onClick={() => setSelectedSeat(seat.id)}
          >
            {seat.id}
          </button>
        ))}
      </div>
      <div className="flex gap-4 text-xs text-muted-foreground pt-2">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded border bg-background"></span> Available</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary"></span> Selected</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-muted"></span> Taken</span>
      </div>
      {selectedSeat && (
        <p className="text-sm">Selected: <strong>Seat {selectedSeat}</strong> - Click confirm to reserve</p>
      )}
    </div>
  );
}

function CommuteTracker() {
  const trips = [
    { date: "Mon", distance: 24, duration: "45m", cost: 12 },
    { date: "Tue", distance: 24, duration: "42m", cost: 12 },
    { date: "Wed", distance: 18, duration: "35m", cost: 9 },
    { date: "Thu", distance: 24, duration: "50m", cost: 12 },
    { date: "Fri", distance: 24, duration: "38m", cost: 12 },
  ];
  const totalDistance = trips.reduce((acc, t) => acc + t.distance, 0);
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        <h3 className="font-medium">Weekly Commute</h3>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="text-center p-2 rounded-md bg-muted/50">
          <p className="text-lg font-bold">{totalDistance} km</p>
          <p className="text-xs text-muted-foreground">Distance</p>
        </div>
        <div className="text-center p-2 rounded-md bg-muted/50">
          <p className="text-lg font-bold">5</p>
          <p className="text-xs text-muted-foreground">Trips</p>
        </div>
        <div className="text-center p-2 rounded-md bg-muted/50">
          <p className="text-lg font-bold">$57</p>
          <p className="text-xs text-muted-foreground">Cost</p>
        </div>
      </div>
      <div className="space-y-1">
        {trips.map((trip, i) => (
          <div key={i} className="flex items-center justify-between text-sm p-1.5 rounded">
            <span className="font-medium w-8">{trip.date}</span>
            <div className="flex-1 mx-3 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: (trip.distance / 30) * 100 + "%" }} />
            </div>
            <span className="text-xs text-muted-foreground w-12 text-right">{trip.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrainTransportPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <Train className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Train Transport</h1>
          <Badge variant="secondary">New</Badge>
        </div>
        <p className="text-muted-foreground text-lg">
          Interactive train transport components for schedules, bookings, and route planning.
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
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Examples</h2>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Train className="h-5 w-5" /> Train Schedule</h3>
          <ComponentPreview code={TrainSchedule.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><MapPin className="h-5 w-5" /> Station Map</h3>
          <ComponentPreview code={StationMap.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Ticket className="h-5 w-5" /> Ticket Booking</h3>
          <ComponentPreview code={TicketBooking.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Navigation className="h-5 w-5" /> Route Planner</h3>
          <ComponentPreview code={RoutePlanner.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Clock className="h-5 w-5" /> Delay Alert</h3>
          <ComponentPreview code={DelayAlert.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Users className="h-5 w-5" /> Seat Reservation</h3>
          <ComponentPreview code={SeatReservation.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Calendar className="h-5 w-5" /> Commute Tracker</h3>
          <ComponentPreview code={CommuteTracker.toString()} />
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Prop</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Default</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="p-3"><code>selectedLine</code></td><td className="p-3">string</td><td className="p-3">&quot;intercity&quot;</td><td className="p-3">Currently selected train line filter</td></tr>
              <tr className="border-t"><td className="p-3"><code>passengers</code></td><td className="p-3">number</td><td className="p-3">1</td><td className="p-3">Number of passengers for booking</td></tr>
              <tr className="border-t"><td className="p-3"><code>ticketType</code></td><td className="p-3">&quot;standard&quot; | &quot;business&quot; | &quot;first&quot;</td><td className="p-3">&quot;standard&quot;</td><td className="p-3">Ticket class selection</td></tr>
              <tr className="border-t"><td className="p-3"><code>trains</code></td><td className="p-3">Train[]</td><td className="p-3">[]</td><td className="p-3">Array of train schedule data</td></tr>
              <tr className="border-t"><td className="p-3"><code>onStationSelect</code></td><td className="p-3">(stationId: string) =&gt; void</td><td className="p-3">-</td><td className="p-3">Callback when a station is selected on the map</td></tr>
              <tr className="border-t"><td className="p-3"><code>seats</code></td><td className="p-3">Seat[]</td><td className="p-3">[]</td><td className="p-3">Seat layout data for reservation component</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
