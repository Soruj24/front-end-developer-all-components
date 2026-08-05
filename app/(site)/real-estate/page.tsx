"use client";

import { useState, useMemo } from "react";
import {
  PropertyCard,
  PropertyFilters,
  FeaturedProperty,
  AgentCard,
  MortgageCalculator,
  MarketTrendsChart,
  NeighborhoodInfoCard,
  SchoolRatingsList,
  PriceHistoryList,
  OpenHouseSchedule,
  PROPERTIES,
  formatPrice,
} from "@/features/real-estate";
import type { PropertyType, ListingStatus } from "@/features/real-estate";

export default function RealEstatePage() {
  const [type, setType] = useState<PropertyType>("All");
  const [status, setStatus] = useState<ListingStatus>("All");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [minBaths, setMinBaths] = useState("");

  const featured = PROPERTIES.find((p) => p.featured);

  const filtered = useMemo(() => {
    return PROPERTIES.filter((p) => {
      if (type !== "All" && p.type !== type) return false;
      if (status !== "All" && p.status !== status) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.address.toLowerCase().includes(search.toLowerCase())) return false;
      if (minPrice && p.price < parseInt(minPrice)) return false;
      if (maxPrice && p.price > parseInt(maxPrice)) return false;
      if (minBeds && p.beds < parseInt(minBeds)) return false;
      if (minBaths && p.baths < parseInt(minBaths)) return false;
      return true;
    });
  }, [type, status, search, minPrice, maxPrice, minBeds, minBaths]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 p-6 sm:p-8 lg:p-12">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Real Estate
        </h1>
        <p className="mt-1 text-muted-foreground">
          Find your dream home with powerful search and insights.
        </p>
      </header>

      {featured && <FeaturedProperty property={featured} />}

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              {filtered.length} properties found
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.length === 0 ? (
              <div className="col-span-full py-16 text-center">
                <p className="text-muted-foreground">No properties match your criteria.</p>
              </div>
            ) : (
              filtered.map((p) => <PropertyCard key={p.id} property={p} />)
            )}
          </div>
        </div>

        <aside className="w-full shrink-0 space-y-6 lg:w-80">
          <PropertyFilters
            activeType={type}
            activeStatus={status}
            search={search}
            minPrice={minPrice}
            maxPrice={maxPrice}
            minBeds={minBeds}
            minBaths={minBaths}
            onTypeChange={setType}
            onStatusChange={setStatus}
            onSearchChange={setSearch}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            onMinBedsChange={setMinBeds}
            onMinBathsChange={setMinBaths}
          />
          <AgentCard />
          <MortgageCalculator />
          <MarketTrendsChart />
          <NeighborhoodInfoCard />
          <SchoolRatingsList />
          <PriceHistoryList />
          <OpenHouseSchedule />
        </aside>
      </div>
    </div>
  );
}
