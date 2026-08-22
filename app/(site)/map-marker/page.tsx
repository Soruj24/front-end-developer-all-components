"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { MAP_MARKER_SOURCE } from "./map-marker-source";
import {
  LOCATION_PIN_EXAMPLE,
  STORE_LOCATOR_EXAMPLE,
  DELIVERY_TRACKER_EXAMPLE,
  EVENT_MAP_EXAMPLE,
  REAL_ESTATE_EXAMPLE,
  RESTAURANT_FINDER_EXAMPLE,
  PARKING_FINDER_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./map-marker-examples";
import {
  LocationPin,
  StoreLocator,
  DeliveryTracker,
  EventMap,
  RealEstate,
  RestaurantFinder,
  ParkingFinder,
  PlaygroundDemo,
} from "./demos";

export default function MapMarkerPage() {
  return (
    <ComponentDocPage
      name="Map Marker"
      category="Navigation"
      description="Map and location components including pins, store locators, delivery trackers, and interactive map markers for various use cases."
    >
      <PreviewPanel filename="map-marker.tsx">
        <LocationPin />
      </PreviewPanel>

      <SourceCodeViewer
        source={MAP_MARKER_SOURCE}
        filename="components/ui/MapMarker/MapMarker.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all map marker variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Location Pin" description="Interactive map with selectable location pins." code={LOCATION_PIN_EXAMPLE}>
          <LocationPin />
        </ExampleBlock>
        <ExampleBlock title="Store Locator" description="Find nearby stores with category filters and ratings." code={STORE_LOCATOR_EXAMPLE}>
          <StoreLocator />
        </ExampleBlock>
        <ExampleBlock title="Delivery Tracker" description="Step-by-step delivery progress tracker." code={DELIVERY_TRACKER_EXAMPLE}>
          <DeliveryTracker />
        </ExampleBlock>
        <ExampleBlock title="Event Map" description="Map with event markers and RSVP details." code={EVENT_MAP_EXAMPLE}>
          <EventMap />
        </ExampleBlock>
        <ExampleBlock title="Real Estate" description="Property listings with type filters and pricing." code={REAL_ESTATE_EXAMPLE}>
          <RealEstate />
        </ExampleBlock>
        <ExampleBlock title="Restaurant Finder" description="Browse restaurants by cuisine with ratings and delivery times." code={RESTAURANT_FINDER_EXAMPLE}>
          <RestaurantFinder />
        </ExampleBlock>
        <ExampleBlock title="Parking Finder" description="Find parking lots with availability and pricing." code={PARKING_FINDER_EXAMPLE}>
          <ParkingFinder />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
