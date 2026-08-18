"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Locate,
  MapPin,
  Navigation,
  Home,
  Building2,
  Utensils,
  Car,
} from "lucide-react";

const installCommand = `npm install @radix-ui/react-slot`;

const usageCode = `
import { Locate } from "@/components/locate-pin";

<Locate lat={40.7128} lng={-74.006} label="New York" pulse />
`;

function StoreLocatorDemo() {
  const [searched, setSearched] = useState(false);

  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Store Locator</h3>
      <p className="text-muted-foreground text-sm mb-4">
        Find nearby stores with real-time location tracking and pulse
        indicators.
      </p>
      <div className="relative h-48 bg-muted rounded-lg flex items-center justify-center mb-4">
        <Locate className="h-10 w-10 text-primary animate-pulse" />
        <span className="absolute top-4 left-4 text-xs text-muted-foreground">
          3 stores found nearby
        </span>
        <span className="absolute bottom-4 right-4 text-xs text-primary">
          0.2 mi away
        </span>
      </div>
      <button
        onClick={() => setSearched(!searched)}
        className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        {searched ? "Searching..." : "Find Stores"}
      </button>
      <div className="flex items-center gap-2 mt-3">
        <Badge variant="secondary">In Stock</Badge>
        <Badge variant="outline">Open Now</Badge>
      </div>
    </div>
  );
}

function DeliveryTrackerDemo() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Delivery Tracker</h3>
      <p className="text-muted-foreground text-sm mb-4">
        Track your package delivery location with live status updates.
      </p>
      <div className="relative h-48 bg-muted rounded-lg flex items-center justify-center">
        <Navigation className="h-8 w-8 text-green-500" />
        <div className="absolute top-4 left-4 text-xs text-muted-foreground">
          Package in transit
        </div>
        <div className="absolute bottom-4 left-4 text-xs text-green-500">
          Arriving today
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary">On Time</Badge>
        </div>
      </div>
    </div>
  );
}

function EventMapDemo() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Event Locations</h3>
      <p className="text-muted-foreground text-sm mb-4">
        Discover event locations on a map with venue details.
      </p>
      <div className="relative h-48 bg-muted rounded-lg flex items-center justify-center">
        <MapPin className="h-8 w-8 text-blue-500" />
        <div className="absolute top-4 left-4 text-xs text-muted-foreground">
          12 events this week
        </div>
        <div className="absolute bottom-4 right-4 text-xs text-blue-500">
          Downtown area
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary">Live</Badge>
        </div>
      </div>
    </div>
  );
}

function RealEstateDemo() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Property Location</h3>
      <p className="text-muted-foreground text-sm mb-4">
        Mark property locations with detailed neighborhood information.
      </p>
      <div className="relative h-48 bg-muted rounded-lg flex items-center justify-center">
        <Home className="h-8 w-8 text-orange-500" />
        <div className="absolute top-4 left-4 text-xs text-muted-foreground">
          $425,000
        </div>
        <div className="absolute bottom-4 right-4 text-xs text-orange-500">
          For Sale
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary">3 Bed / 2 Bath</Badge>
        </div>
      </div>
    </div>
  );
}

function RestaurantFinderDemo() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Restaurant Finder</h3>
      <p className="text-muted-foreground text-sm mb-4">
        Locate restaurants with ratings, cuisine type, and distance.
      </p>
      <div className="relative h-48 bg-muted rounded-lg flex items-center justify-center">
        <Utensils className="h-8 w-8 text-red-500" />
        <div className="absolute top-4 left-4 text-xs text-muted-foreground">
          Italian Cuisine
        </div>
        <div className="absolute bottom-4 right-4 text-xs text-red-500">
          0.5 mi away
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary">4.8 Stars</Badge>
        </div>
      </div>
    </div>
  );
}

function TravelPinDemo() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Travel Destination</h3>
      <p className="text-muted-foreground text-sm mb-4">
        Pin your travel destinations with trip details and wishlist status.
      </p>
      <div className="relative h-48 bg-muted rounded-lg flex items-center justify-center">
        <MapPin className="h-8 w-8 text-purple-500" />
        <div className="absolute top-4 left-4 text-xs text-muted-foreground">
          Paris, France
        </div>
        <div className="absolute bottom-4 right-4 text-xs text-purple-500">
          Dream Destination
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary">Wishlisted</Badge>
        </div>
      </div>
    </div>
  );
}

function ParkingFinderDemo() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Parking Finder</h3>
      <p className="text-muted-foreground text-sm mb-4">
        Find available parking spots with real-time occupancy and pricing.
      </p>
      <div className="relative h-48 bg-muted rounded-lg flex items-center justify-center">
        <Car className="h-8 w-8 text-teal-500" />
        <div className="absolute top-4 left-4 text-xs text-muted-foreground">
          2 spots available
        </div>
        <div className="absolute bottom-4 right-4 text-xs text-teal-500">
          $3.50/hr
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary">Open</Badge>
        </div>
      </div>
    </div>
  );
}

export default function LocatePinPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">LocatePin</h1>
        <p className="text-muted-foreground">
          An interactive map pin component for displaying locations with
          optional pulse animation and label. Supports various use cases
          including store locators, delivery tracking, and property markers.
        </p>
        <div className="flex gap-2">
          <Badge variant="secondary">Maps</Badge>
          <Badge variant="secondary">Location</Badge>
          <Badge variant="interactive">Navigation</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Examples</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <StoreLocatorDemo />
          <DeliveryTrackerDemo />
          <EventMapDemo />
          <RealEstateDemo />
          <RestaurantFinderDemo />
          <TravelPinDemo />
          <ParkingFinderDemo />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference</h2>
        <div className="rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted">
                <th className="p-3 text-left font-medium">Prop</th>
                <th className="p-3 text-left font-medium">Type</th>
                <th className="p-3 text-left font-medium">Required</th>
                <th className="p-3 text-left font-medium">Default</th>
                <th className="p-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">lat</td>
                <td className="p-3">number</td>
                <td className="p-3">Yes</td>
                <td className="p-3">-</td>
                <td className="p-3">Latitude coordinate for the pin</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">lng</td>
                <td className="p-3">number</td>
                <td className="p-3">Yes</td>
                <td className="p-3">-</td>
                <td className="p-3">Longitude coordinate for the pin</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">label</td>
                <td className="p-3">string</td>
                <td className="p-3">No</td>
                <td className="p-3">-</td>
                <td className="p-3">Optional label displayed near the pin</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">pulse</td>
                <td className="p-3">boolean</td>
                <td className="p-3">No</td>
                <td className="p-3">false</td>
                <td className="p-3">Enable pulse animation on the pin</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">className</td>
                <td className="p-3">string</td>
                <td className="p-3">No</td>
                <td className="p-3">-</td>
                <td className="p-3">Additional CSS classes to apply</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
