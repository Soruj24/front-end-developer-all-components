"use client";

import { ReactNode } from "react";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type?: string;
  icon?: ReactNode;
}

export interface TimelineProps {
  events: TimelineEvent[];
  variant?: "vertical" | "horizontal";
  onEventClick?: (index: number) => void;
  expandedIndex?: number | null;
}

const typeColors: Record<string, string> = {
  work: "bg-info",
  personal: "bg-success",
  milestone: "bg-warning",
  default: "bg-muted-foreground",
};

const Timeline = ({
  events,
  variant = "vertical",
  onEventClick,
  expandedIndex,
}: TimelineProps) => {
  if (variant === "horizontal") {
    return (
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-0 min-w-max">
          {events.map((event, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="flex items-center">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    typeColors[event.type || "default"]
                  } text-white`}
                >
                  {event.icon || (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
                {i < events.length - 1 && (
                  <div className="h-0.5 w-24 bg-muted" />
                )}
              </div>
              <div
                onClick={() => onEventClick?.(i)}
                className="mt-2 w-48 cursor-pointer rounded-xl border border-border bg-surface p-3"
              >
                <span className="text-xs text-muted-foreground">{event.date}</span>
                <h4 className="mt-1 text-sm font-medium text-foreground">
                  {event.title}
                </h4>
                <p
                  className={`mt-1 text-xs text-muted-foreground ${
                    expandedIndex !== i ? "line-clamp-2" : ""
                  }`}
                >
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-muted" />
      <div className="flex flex-col gap-6">
        {events.map((event, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={i}
              className="relative flex items-start"
            >
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    typeColors[event.type || "default"]
                  } text-white`}
                >
                  {event.icon || (
                    <div className="h-3 w-3 rounded-full bg-white" />
                  )}
                </div>
              </div>
              <div className="hidden md:flex flex-1" />
              <div
                onClick={() => onEventClick?.(i)}
                className={`cursor-pointer rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-muted md:w-[calc(50%-28px)] ${
                  isLeft ? "md:mr-auto md:-ml-[calc(50%-28px)]" : ""
                } flex-1 md:flex-none`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      event.type === "work"
                        ? "bg-info-soft text-info"
                        : event.type === "personal"
                        ? "bg-success-soft text-success"
                        : event.type === "milestone"
                        ? "bg-warning-soft text-warning"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {event.date}
                  </span>
                </div>
                <h4 className="mt-2 text-sm font-medium text-foreground">
                  {event.title}
                </h4>
                <p
                  className={`mt-1 text-xs text-muted-foreground ${
                    expandedIndex !== i ? "line-clamp-2" : ""
                  }`}
                >
                  {event.description}
                </p>
              </div>
              {!isLeft && <div className="hidden md:block flex-1" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
