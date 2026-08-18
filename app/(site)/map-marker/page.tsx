"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  MapPin,
  Navigation,
  Home,
  Building2,
  Utensils,
  Car,
  Star,
} from "lucide-react";

const installCommand = "npx shadcn@latest add map-marker";
const usageCode = `import { MapMarker } from "@/components/map-marker";

export function MapExample() {
  return (
    <MapMarker
      label="Home"
      coordinates={{ lat: 28.6139, lng: 77.2090 }}
    />
  );
}`;

function LocationPin() {
  const [selected, setSelected] = useState<string | null>(null);
  const locations = [
    { id: "home", label: "Home", icon: Home, color: "bg-blue-500" },
    { id: "office", label: "Office", icon: Building2, color: "bg-green-500" },
    { id: "gym", label: "Gym", icon: Star, color: "bg-orange-500" },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Location Pin</h3>
      </div>
      <div className="relative h-48 bg-muted rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
        {locations.map((loc) => {
          const Icon = loc.icon;
          return (
            <button
              key={loc.id}
              onClick={() => setSelected(loc.id)}
              className={`absolute transform -translate-x-1/2 -translate-y-full transition-transform ${
                selected === loc.id ? "scale-125 z-10" : "hover:scale-110"
              }`}
              style={{
                left: loc.id === "home" ? "30%" : loc.id === "office" ? "60%" : "45%",
                top: loc.id === "home" ? "40%" : loc.id === "office" ? "30%" : "65%",
              }}
            >
              <div className={`flex flex-col items-center`}>
                <div className={`${loc.color} text-white p-2 rounded-full shadow-lg`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-current opacity-50" />
              </div>
            </button>
          );
        })}
      </div>
      <div className="flex gap-2 mt-3">
        {locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setSelected(loc.id)}
            className={`flex-1 p-2 text-xs rounded-md border transition-colors ${
              selected === loc.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            {loc.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function StoreLocator() {
  const [filter, setFilter] = useState<string | null>(null);
  const stores = [
    { id: 1, name: "Tech Store", distance: "0.5 km", type: "electronics", rating: 4.5 },
    { id: 2, name: "Fashion Hub", distance: "1.2 km", type: "clothing", rating: 4.2 },
    { id: 3, name: "Grocery Mart", distance: "0.8 km", type: "grocery", rating: 4.8 },
    { id: 4, name: "Book Corner", distance: "2.1 km", type: "books", rating: 4.0 },
  ];

  const filtered = filter ? stores.filter((s) => s.type === filter) : stores;

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Navigation className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Store Locator</h3>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {["electronics", "clothing", "grocery", "books"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(filter === type ? null : type)}
            className={`px-3 py-1 text-xs rounded-full capitalize border transition-colors ${
              filter === type
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map((store) => (
          <div key={store.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{store.name}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{store.distance}</span>
                <span>-</span>
                <span className="flex items-center gap-0.5">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {store.rating}
                </span>
              </div>
            </div>
            <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md">
              Directions
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeliveryTracker() {
  const [step, setStep] = useState(0);
  const steps = ["Order Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Car className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Delivery Tracker</h3>
      </div>
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  i <= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span className="text-xs text-center mt-2 text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-muted -z-0">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="flex-1 px-3 py-2 text-sm border rounded-md hover:bg-muted disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          disabled={step === steps.length - 1}
          className="flex-1 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function EventMap() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const events = [
    { id: 1, name: "Tech Conference", date: "Mar 15", attendees: 250, x: 20, y: 30 },
    { id: 2, name: "Design Workshop", date: "Mar 20", attendees: 50, x: 65, y: 45 },
    { id: 3, name: "Startup Meetup", date: "Mar 25", attendees: 120, x: 40, y: 70 },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Event Map</h3>
      </div>
      <div className="relative h-48 bg-muted rounded-lg overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M10,50 Q30,30 50,50 T90,50" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            <path d="M20,20 L80,20 L80,80 L20,80 Z" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
          </svg>
        </div>
        {events.map((event) => (
          <button
            key={event.id}
            onClick={() => setSelectedEvent(event.id)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
              selectedEvent === event.id ? "scale-125 z-10" : "hover:scale-110"
            }`}
            style={{ left: `${event.x}%`, top: `${event.y}%` }}
          >
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium shadow-lg whitespace-nowrap">
              {event.name}
            </div>
          </button>
        ))}
      </div>
      {selectedEvent && (
        <div className="mt-3 p-3 bg-muted rounded-lg">
          {(() => {
            const event = events.find((e) => e.id === selectedEvent);
            if (!event) return null;
            return (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{event.name}</p>
                  <p className="text-xs text-muted-foreground">{event.date} - {event.attendees} attending</p>
                </div>
                <Badge>RSVP</Badge>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

function RealEstate() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const properties = [
    { id: 1, type: "apartment", price: 4500000, beds: 2, area: 1200, location: "Downtown" },
    { id: 2, type: "villa", price: 12000000, beds: 4, area: 3500, location: "Suburbs" },
    { id: 3, type: "apartment", price: 3200000, beds: 1, area: 800, location: "Midtown" },
  ];

  const filtered = selectedType
    ? properties.filter((p) => p.type === selectedType)
    : properties;

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Home className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Real Estate</h3>
      </div>
      <div className="flex gap-2 mb-4">
        {["apartment", "villa"].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(selectedType === type ? null : type)}
            className={`px-3 py-1 text-xs rounded-full capitalize border transition-colors ${
              selectedType === type
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((prop) => (
          <div key={prop.id} className="p-3 border rounded-lg hover:bg-muted/50">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">{prop.type}</Badge>
                  <span className="text-xs text-muted-foreground">{prop.location}</span>
                </div>
                <p className="text-lg font-bold mt-1">
                  {"\u20B9"}{(prop.price / 100000).toFixed(1)}L
                </p>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p>{prop.beds} beds</p>
                <p>{prop.area} sq ft</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RestaurantFinder() {
  const [cuisine, setCuisine] = useState<string | null>(null);
  const restaurants = [
    { id: 1, name: "Spice Garden", cuisine: "indian", rating: 4.5, delivery: "30 min" },
    { id: 2, name: "Pizza Palace", cuisine: "italian", rating: 4.2, delivery: "25 min" },
    { id: 3, name: "Dragon Wok", cuisine: "chinese", rating: 4.7, delivery: "35 min" },
    { id: 4, name: "Taco Fiesta", cuisine: "mexican", rating: 4.0, delivery: "20 min" },
  ];

  const filtered = cuisine
    ? restaurants.filter((r) => r.cuisine === cuisine)
    : restaurants;

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Utensils className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Restaurant Finder</h3>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {["indian", "italian", "chinese", "mexican"].map((c) => (
          <button
            key={c}
            onClick={() => setCuisine(cuisine === c ? null : c)}
            className={`px-3 py-1 text-xs rounded-full capitalize border transition-colors ${
              cuisine === c
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map((rest) => (
          <div key={rest.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Utensils className="h-5 w-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{rest.name}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="capitalize">{rest.cuisine}</span>
                <span>-</span>
                <span className="flex items-center gap-0.5">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {rest.rating}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">{rest.delivery}</p>
              <button className="text-xs text-primary font-medium">Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ParkingFinder() {
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);
  const spots = [
    { id: 1, name: "Lot A", type: "covered", price: 200, available: 15 },
    { id: 2, name: "Lot B", type: "open", price: 100, available: 42 },
    { id: 3, name: "Lot C", type: "valet", price: 350, available: 5 },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Car className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Parking Finder</h3>
      </div>
      <div className="space-y-3">
        {spots.map((spot) => (
          <div
            key={spot.id}
            onClick={() => setSelectedSpot(spot.id)}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedSpot === spot.id
                ? "border-primary bg-primary/5"
                : "hover:bg-muted/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  spot.available > 20
                    ? "bg-green-100 text-green-600"
                    : spot.available > 10
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}>
                  <Car className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-sm">{spot.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{spot.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm">{"\u20B9"}{spot.price}/hr</p>
                <p className={`text-xs ${
                  spot.available > 20 ? "text-green-600" : spot.available > 10 ? "text-yellow-600" : "text-red-600"
                }`}>
                  {spot.available} spots
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MapMarkerPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <MapPin className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Map Marker</h1>
          <Badge>Components</Badge>
        </div>
        <p className="text-muted-foreground">
          Map and location components including pins, store locators, delivery trackers,
          and interactive map markers for various use cases.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Examples</h2>
        <div className="grid gap-6">
          <ComponentPreview name="LocationPin">
            <LocationPin />
          </ComponentPreview>
          <ComponentPreview name="StoreLocator">
            <StoreLocator />
          </ComponentPreview>
          <ComponentPreview name="DeliveryTracker">
            <DeliveryTracker />
          </ComponentPreview>
          <ComponentPreview name="EventMap">
            <EventMap />
          </ComponentPreview>
          <ComponentPreview name="RealEstate">
            <RealEstate />
          </ComponentPreview>
          <ComponentPreview name="RestaurantFinder">
            <RestaurantFinder />
          </ComponentPreview>
          <ComponentPreview name="ParkingFinder">
            <ParkingFinder />
          </ComponentPreview>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">API Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left font-medium">Prop</th>
                <th className="p-2 text-left font-medium">Type</th>
                <th className="p-2 text-left font-medium">Default</th>
                <th className="p-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">label</td>
                <td className="p-2 font-mono text-xs">string</td>
                <td className="p-2 font-mono text-xs">required</td>
                <td className="p-2">Marker label text</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">coordinates</td>
                <td className="p-2 font-mono text-xs">{"{ lat: number; lng: number }"}</td>
                <td className="p-2 font-mono text-xs">required</td>
                <td className="p-2">Geographic coordinates</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">color</td>
                <td className="p-2 font-mono text-xs">string</td>
                <td className="p-2 font-mono text-xs">"primary"</td>
                <td className="p-2">Marker color theme</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">draggable</td>
                <td className="p-2 font-mono text-xs">boolean</td>
                <td className="p-2 font-mono text-xs">false</td>
                <td className="p-2">Allow marker to be dragged</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">onClick</td>
                <td className="p-2 font-mono text-xs">() =&gt; void</td>
                <td className="p-2 font-mono text-xs">undefined</td>
                <td className="p-2">Click handler for marker</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
