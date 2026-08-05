import { formatPrice } from "../constants/properties";
import { MARKET_TRENDS } from "../constants/market-data";

export function MarketTrends() {
  const maxVolume = Math.max(...MARKET_TRENDS.map((t) => t.salesVolume));

  return (
    <div className="rounded-xl border border-border/50 bg-background p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Market Trends
      </h3>
      <div className="flex items-end justify-between gap-2" style={{ height: 140 }}>
        {MARKET_TRENDS.map((t) => {
          const heightPercent = (t.salesVolume / maxVolume) * 100;
          return (
            <div key={t.year} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-[10px] text-muted-foreground">{formatPrice(t.medianPrice)}</span>
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-primary to-primary/60 transition-all hover:from-primary/90 hover:to-primary/50"
                style={{ height: `${heightPercent}%` }}
              />
              <span className="text-[10px] text-muted-foreground">{t.year}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>Median: {formatPrice(MARKET_TRENDS[MARKET_TRENDS.length - 1].medianPrice)}</span>
        <span className="text-success">↑ 5.7% YoY</span>
      </div>
    </div>
  );
}
