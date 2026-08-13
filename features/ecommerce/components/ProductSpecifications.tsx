import { cn } from "@/lib/cn";
import type { ProductSpecification } from "../types/ecommerce.types";

interface ProductSpecificationsProps {
  specifications: ProductSpecification[];
  className?: string;
}

export function ProductSpecifications({
  specifications,
  className,
}: ProductSpecificationsProps) {
  return (
    <div className={cn("rounded-xl border border-border/50 bg-background", className)}>
      <h3 className="border-b border-border/50 px-5 py-3 text-sm font-semibold text-foreground">
        Specifications
      </h3>
      <div className="divide-y divide-border/50">
        {specifications.map((spec, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-5 py-2.5 text-sm"
          >
            <span className="text-muted-foreground">{spec.label}</span>
            <span className="font-medium text-foreground">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
