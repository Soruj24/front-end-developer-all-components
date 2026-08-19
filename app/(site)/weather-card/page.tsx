"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { CloudSun, Droplets, Wind } from "lucide-react";

const WEATHER_CARD_SOURCE = `"use client";

import { CloudSun, Droplets, Wind, type LucideIcon } from "lucide-react";

interface WeatherCardProps {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon?: LucideIcon;
  className?: string;
}

export function WeatherCard({
  city,
  temperature,
  condition,
  humidity,
  windSpeed,
  icon: Icon = CloudSun,
  className = "",
}: WeatherCardProps) {
  return (
    <div className={\`max-w-xs overflow-hidden rounded-lg border bg-card p-6 \${className}\`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{city}</p>
          <p className="mt-1 text-4xl font-bold">{temperature}°</p>
          <p className="text-sm text-muted-foreground">{condition}</p>
        </div>
        <Icon className="h-12 w-12 text-amber-500" />
      </div>
      <div className="mt-4 flex gap-4 border-t pt-4">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Droplets className="h-4 w-4" /> {humidity}%
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Wind className="h-4 w-4" /> {windSpeed} mph
        </div>
      </div>
    </div>
  );
}`;

function WeatherCardDemo() {
  return (
    <div className="w-full p-4">
      <div className="max-w-xs overflow-hidden rounded-lg border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">San Francisco</p>
            <p className="mt-1 text-4xl font-bold">72°</p>
            <p className="text-sm text-muted-foreground">Partly Cloudy</p>
          </div>
          <CloudSun className="h-12 w-12 text-amber-500" />
        </div>
        <div className="mt-4 flex gap-4 border-t pt-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Droplets className="h-4 w-4" /> 65%
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Wind className="h-4 w-4" /> 12 mph
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WeatherCardPage() {
  return (
    <ComponentDocPage
      name="Weather Card"
      category="Data Display"
      description="A weather information card showing current conditions and forecast."
    >
      <PreviewPanel filename="weather-card.tsx">
        <WeatherCardDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={WEATHER_CARD_SOURCE}
        filename="components/ui/WeatherCard/WeatherCard.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Basic"
          description="Current weather conditions display."
          code={`<WeatherCard
  city="San Francisco"
  temperature={72}
  condition="Partly Cloudy"
  humidity={65}
  windSpeed={12}
/>`}
        >
          <WeatherCardDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
