import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/design-system/Badge";
import { formatPrice } from "../constants/properties";
import type { Property } from "../types/real-estate.types";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

const statusColors: Record<string, string> = {
  "For Sale": "bg-success/10 text-success",
  "For Rent": "bg-info/10 text-info",
  Pending: "bg-warning/10 text-warning",
  Sold: "bg-muted text-muted-foreground",
  New: "bg-primary/10 text-primary",
};

export function PropertyCard({ property, className }: PropertyCardProps) {
  return (
    <Link
      href={`/real-estate/${property.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border/50 bg-background",
        "transition-all duration-200 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {property.images[0] ? (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted/30">
            <svg className="h-12 w-12 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
        )}

        <div className="absolute left-3 top-3 flex gap-2">
          <Badge className={cn("text-[10px]", statusColors[property.status] || "bg-muted text-muted-foreground")}>
            {property.status}
          </Badge>
          {property.featured && (
            <Badge className="bg-amber-500/10 text-amber-500 text-[10px]">Featured</Badge>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary line-clamp-1">
          {property.title}
        </h3>

        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="line-clamp-1">{property.address}</span>
        </p>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {property.beds > 0 && (
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              {property.beds} beds
            </span>
          )}
          {property.baths > 0 && (
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {property.baths} baths
            </span>
          )}
          {property.sqft > 0 && (
            <span>{property.sqft.toLocaleString()} sqft</span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-2 border-t border-border/50">
          <span className="text-lg font-bold text-foreground">
            {property.status === "For Rent"
              ? `$${property.price.toLocaleString()}/mo`
              : formatPrice(property.price)}
          </span>
          <span className="text-xs text-muted-foreground">{property.type}</span>
        </div>
      </div>
    </Link>
  );
}
