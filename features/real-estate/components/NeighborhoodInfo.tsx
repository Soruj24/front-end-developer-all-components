import { formatPrice } from "../constants/properties";
import { NEIGHBORHOOD } from "../constants/market-data";

export function NeighborhoodInfo() {
  return (
    <div className="rounded-xl border border-border/50 bg-background p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Neighborhood
      </h3>
      <h4 className="mb-2 text-base font-bold text-foreground">{NEIGHBORHOOD.name}</h4>
      <p className="mb-4 text-sm text-muted-foreground">{NEIGHBORHOOD.description}</p>

      <div className="mb-4 grid grid-cols-3 gap-2">
        <div className="rounded-lg bg-success/10 p-2 text-center">
          <p className="text-lg font-bold text-success">{NEIGHBORHOOD.walkScore}</p>
          <p className="text-[10px] text-muted-foreground">Walk</p>
        </div>
        <div className="rounded-lg bg-info/10 p-2 text-center">
          <p className="text-lg font-bold text-info">{NEIGHBORHOOD.transitScore}</p>
          <p className="text-[10px] text-muted-foreground">Transit</p>
        </div>
        <div className="rounded-lg bg-primary/10 p-2 text-center">
          <p className="text-lg font-bold text-primary">{NEIGHBORHOOD.bikeScore}</p>
          <p className="text-[10px] text-muted-foreground">Bike</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-lg bg-muted/40 p-2">
          <span className="block font-bold text-foreground">{formatPrice(NEIGHBORHOOD.medianHomePrice)}</span>
          <span className="text-muted-foreground">Median Home</span>
        </div>
        <div className="rounded-lg bg-muted/40 p-2">
          <span className="block font-bold text-foreground">${NEIGHBORHOOD.avgRent.toLocaleString()}</span>
          <span className="text-muted-foreground">Avg Rent</span>
        </div>
        <div className="rounded-lg bg-muted/40 p-2">
          <span className="block font-bold text-foreground">{NEIGHBORHOOD.population}</span>
          <span className="text-muted-foreground">Population</span>
        </div>
      </div>
    </div>
  );
}
