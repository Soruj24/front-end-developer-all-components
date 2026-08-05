"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/design-system/Badge";
import { Button } from "@/components/design-system/Button";
import {
  PropertyCard,
  PROPERTIES,
  AgentCard,
  MortgageCalculator,
  formatPrice,
} from "@/features/real-estate";

interface PropertyDetailPageProps {
  params: Promise<{ slug: string }>;
}

const statusColors: Record<string, string> = {
  "For Sale": "bg-success/10 text-success",
  "For Rent": "bg-info/10 text-info",
  Pending: "bg-warning/10 text-warning",
  Sold: "bg-muted text-muted-foreground",
  New: "bg-primary/10 text-primary",
};

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = use(params);
  const [selectedImage, setSelectedImage] = useState(0);

  const property = PROPERTIES.find((p) => p.slug === slug);

  if (!property) {
    notFound();
  }

  const related = PROPERTIES.filter(
    (p) => p.type === property.type && p.id !== property.id
  ).slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
      <Link
        href="/real-estate"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to listings
      </Link>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
            <Image
              src={property.images[selectedImage] || property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
            <div className="absolute left-4 top-4 flex gap-2">
              <Badge className={cn(statusColors[property.status])}>{property.status}</Badge>
              {property.featured && <Badge className="bg-amber-500/10 text-amber-500">Featured</Badge>}
            </div>
          </div>

          {property.images.length > 1 && (
            <div className="flex gap-3">
              {property.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "relative h-20 w-28 overflow-hidden rounded-lg border-2 transition-colors",
                    selectedImage === i ? "border-primary" : "border-border/50 hover:border-border"
                  )}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="112px" />
                </button>
              ))}
            </div>
          )}

          <div>
            <Badge className="mb-3" variant="secondary">{property.type}</Badge>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {property.title}
            </h1>
            <p className="mt-2 flex items-center gap-1 text-muted-foreground">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {property.address}
            </p>
          </div>

          <div className="flex flex-wrap gap-6 border-y border-border/50 py-4">
            {property.beds > 0 && (
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{property.beds}</p>
                <p className="text-xs text-muted-foreground">Beds</p>
              </div>
            )}
            {property.baths > 0 && (
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{property.baths}</p>
                <p className="text-xs text-muted-foreground">Baths</p>
              </div>
            )}
            {property.sqft > 0 && (
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{property.sqft.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Sq Ft</p>
              </div>
            )}
            {property.lotSize && (
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{property.lotSize}</p>
                <p className="text-xs text-muted-foreground">Lot Size</p>
              </div>
            )}
            {property.year > 0 && (
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{property.year}</p>
                <p className="text-xs text-muted-foreground">Year Built</p>
              </div>
            )}
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Description</h2>
            <p className="text-muted-foreground leading-relaxed">{property.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {property.garage && (
              <div className="rounded-xl border border-border/50 bg-background p-4 text-center">
                <p className="text-lg font-bold text-foreground">{property.garage}</p>
                <p className="text-xs text-muted-foreground">Garage Spaces</p>
              </div>
            )}
            {property.hoa !== undefined && (
              <div className="rounded-xl border border-border/50 bg-background p-4 text-center">
                <p className="text-lg font-bold text-foreground">
                  {property.hoa > 0 ? `$${property.hoa}` : "None"}
                </p>
                <p className="text-xs text-muted-foreground">HOA/mo</p>
              </div>
            )}
            <div className="rounded-xl border border-border/50 bg-background p-4 text-center">
              <p className="text-lg font-bold text-foreground">
                {property.price > 0 ? formatPrice(property.price / property.sqft) : "N/A"}
              </p>
              <p className="text-xs text-muted-foreground">Price/Sq Ft</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-background p-4 text-center">
              <p className="text-lg font-bold text-foreground">{property.status}</p>
              <p className="text-xs text-muted-foreground">Status</p>
            </div>
          </div>

          {related.length > 0 && (
            <section className="border-t border-border/50 pt-8">
              <h2 className="mb-5 text-lg font-semibold text-foreground">Similar Properties</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          <div className="sticky top-24 rounded-xl border border-border/50 bg-background p-5">
            <p className="text-3xl font-bold text-foreground">
              {property.status === "For Rent"
                ? `$${property.price.toLocaleString()}/mo`
                : formatPrice(property.price)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{property.address}</p>

            <div className="mt-4 flex flex-col gap-2">
              <Button className="w-full" size="lg">Schedule Tour</Button>
              <Button variant="outline" className="w-full">Contact Agent</Button>
            </div>
          </div>

          <AgentCard />
          <MortgageCalculator />
        </div>
      </div>
    </div>
  );
}
