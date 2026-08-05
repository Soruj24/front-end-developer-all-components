import { OPEN_HOUSES } from "../constants/market-data";

export function OpenHouseSchedule() {
  return (
    <div className="rounded-xl border border-border/50 bg-background p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Open Houses
      </h3>
      <div className="flex flex-col gap-2">
        {OPEN_HOUSES.map((oh, i) => (
          <div key={i} className="rounded-lg bg-muted/40 p-3 transition-colors hover:bg-muted">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-primary">{oh.date}</span>
              <span className="text-[11px] text-muted-foreground">{oh.time}</span>
            </div>
            <p className="mt-1 text-sm font-medium text-foreground">{oh.title}</p>
            <p className="text-[11px] text-muted-foreground">{oh.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
