"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
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
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Real Estate</h1>
          <Badge variant="primary">8 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Real estate listings with filters, featured properties, mortgage calculator, and market trends.
        </p>
      </header>

    
 

      {/* Examples */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Featured Property</h3>
          <p className="text-sm text-muted-foreground">Highlighted featured property with large image and details.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            {featured && <FeaturedProperty property={featured} />}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Property Grid with Filters</h3>
          <p className="text-sm text-muted-foreground">Filterable property grid with sidebar tools.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-4">{filtered.length} properties found</p>
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
        </div>
      </section>


    </div>
  );
}
