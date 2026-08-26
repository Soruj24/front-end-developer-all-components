import { useState } from "react";
import type { Job } from "../types";

interface JobMapViewProps {
  jobs: Job[];
  onJobClick: (job: Job) => void;
}

const CITY_COORDS: Record<string, { x: number; y: number }> = {
  "San Francisco, CA": { x: 12, y: 45 },
  "New York, NY": { x: 78, y: 38 },
  "Austin, TX": { x: 45, y: 65 },
  "Seattle, WA": { x: 14, y: 18 },
  "Chicago, IL": { x: 60, y: 32 },
  "Remote": { x: 50, y: 50 },
  "London, UK": { x: 48, y: 22 },
  "Berlin, Germany": { x: 54, y: 25 },
  "Stockholm, Sweden": { x: 53, y: 15 },
  "Los Gatos, CA": { x: 11, y: 47 },
  "Mountain View, CA": { x: 11.5, y: 44 },
  "San Francisco": { x: 12, y: 45 },
  "Remote, US": { x: 50, y: 50 },
};

export function JobMapView({ jobs, onJobClick }: JobMapViewProps) {
  const [hoveredJob, setHoveredJob] = useState<Job | null>(null);

  const jobsWithCoords = jobs.map((job) => {
    const key = Object.keys(CITY_COORDS).find((k) => job.location.includes(k)) || "Remote";
    return { ...job, coords: CITY_COORDS[key] || CITY_COORDS["Remote"] };
  });

  const clustered = jobsWithCoords.reduce<Record<string, typeof jobsWithCoords>>((acc, job) => {
    const key = `${Math.round(job.coords.x / 5) * 5},${Math.round(job.coords.y / 5) * 5}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(job);
    return acc;
  }, {});

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Job Map</h3>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">{jobs.length} locations</span>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50" style={{ height: 300 }}>
        <svg viewBox="0 0 100 80" className="h-full w-full">
          <rect x="0" y="0" width="100" height="80" fill="transparent" />
          <path d="M5,20 Q15,15 25,22 T45,18 T65,25 T85,20 L85,75 Q75,70 65,72 T45,68 T25,73 T5,70 Z" fill="currentColor" className="text-zinc-200 dark:text-zinc-700" opacity={0.3} />

          {Object.entries(clustered).map(([key, cluster]) => {
            const cx = cluster[0].coords.x;
            const cy = cluster[0].coords.y;
            const isHovered = hoveredJob && cluster.some((j) => j.id === hoveredJob.id);
            const size = Math.min(2 + cluster.length * 0.8, 5);

            return (
              <g key={key}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? size + 1 : size}
                  fill={isHovered ? "#3b82f6" : "#6366f1"}
                  opacity={0.8}
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredJob(cluster[0])}
                  onMouseLeave={() => setHoveredJob(null)}
                  onClick={() => onJobClick(cluster[0])}
                />
                {cluster.length > 1 && (
                  <text x={cx} y={cy + 0.5} textAnchor="middle" fontSize="2.5" fill="white" fontWeight="bold" className="pointer-events-none">
                    {cluster.length}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {hoveredJob && (
          <div className="absolute left-4 top-4 max-w-xs rounded-lg border border-zinc-200 bg-white p-3 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
            <div className="flex items-center gap-2">
              <img src={hoveredJob.companyLogo} alt={hoveredJob.company} className="h-8 w-8 rounded-md object-cover" />
              <div>
                <p className="text-xs font-semibold text-zinc-900 dark:text-white">{hoveredJob.title}</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{hoveredJob.company} &middot; {hoveredJob.location}</p>
                <p className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">{hoveredJob.salary}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
