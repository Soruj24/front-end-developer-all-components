import { formatPrice } from "../constants/properties";
import { PRICE_HISTORY } from "../constants/market-data";

export function PriceHistory() {
  return (
    <div className="rounded-xl border border-border/50 bg-background p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Price History
      </h3>
      <div className="flex flex-col gap-2">
        {PRICE_HISTORY.slice(0, 5).map((h, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg bg-muted/40 p-3">
            <div className="flex items-center gap-3">
              <div
                className={`h-2 w-2 rounded-full ${
                  h.event === "Sold"
                    ? "bg-success"
                    : h.event === "Price Reduced"
                      ? "bg-danger"
                      : "bg-info"
                }`}
              />
              <div>
                <p className="text-sm font-medium text-foreground">{h.event}</p>
                <p className="text-[11px] text-muted-foreground">{h.date}</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-foreground">{formatPrice(h.price)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
