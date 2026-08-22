"use client";

import { useState } from "react";

export function CircleEqualizer() {
  const [levels] = useState([50, 70, 30, 85, 40, 60, 25, 75]);
  return (
    <div className="w-full p-4">
      <div className="max-w-xl mx-auto">
        <h4 className="font-medium mb-4">Circular Equalizer</h4>
        <div className="flex justify-center gap-4 flex-wrap">
          {levels.map((level, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="6" fill="none" className="text-muted" />
                <circle
                  cx="40" cy="40" r="32"
                  stroke="currentColor" strokeWidth="6" fill="none" className="text-primary"
                  strokeDasharray={201}
                  strokeDashoffset={201 - (201 * level / 100)}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.3s ease" }}
                />
              </svg>
              <span className="text-xs text-muted-foreground">{["Bass", "Low", "Mid", "High", "Pres", "Air", "Sub", "Ultra"][i]}</span>
              <span className="text-xs font-mono text-primary">{level}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
