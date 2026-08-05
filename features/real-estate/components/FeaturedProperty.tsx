import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/design-system/Badge";
import { formatPrice } from "../constants/properties";
import type { Property } from "../types/real-estate.types";

interface FeaturedPropertyProps {
  property: Property;
}

export function FeaturedProperty({ property }: FeaturedPropertyProps) {
  return (
    <Link
      href={`/real-estate/${property.slug}`}
      className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br from-primary/90 via-primary to-primary/70 p-8 text-white transition-all duration-300 hover:shadow-xl hover:shadow-primary/20"
    >
      {property.images[0] && (
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover opacity-30 transition-transform duration-500 group-hover:scale-105"
          sizes="100vw"
          priority
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="relative z-10">
        <div className="absolute right-0 top-0 flex gap-2">
          <Badge className="bg-white/20 text-white backdrop-blur-sm">{property.status}</Badge>
          <Badge className="bg-amber-400/30 text-amber-200 backdrop-blur-sm">Featured</Badge>
        </div>

        <Badge className="mb-3 w-fit bg-white/20 text-white backdrop-blur-sm">
          {property.type} · {property.address.split(", ").pop()}
        </Badge>

        <h2 className="mb-2 text-2xl font-bold group-hover:underline">
          {property.title}
        </h2>

        <p className="mb-4 max-w-2xl text-sm text-white/80">
          {property.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
          {property.beds > 0 && (
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              {property.beds} Beds
            </span>
          )}
          {property.baths > 0 && (
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {property.baths} Baths
            </span>
          )}
          {property.sqft > 0 && (
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              {property.sqft.toLocaleString()} sqft
            </span>
          )}
          <span className="ml-auto text-2xl font-bold text-white">
            {formatPrice(property.price)}
          </span>
        </div>
      </div>
    </Link>
  );
}
