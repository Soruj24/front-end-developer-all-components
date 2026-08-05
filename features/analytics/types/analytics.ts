export type TimeRange = "1H" | "24H" | "7D" | "30D" | "90D" | "1Y" | "All";

export interface Kpi {
  title: string;
  value: string;
  change: string;
  up: boolean;
  color: string;
  icon: string;
  spark: number[];
}

export interface TrafficSource {
  source: string;
  visitors: number;
  pct: number;
  change: string;
  up: boolean;
  color: string;
}

export interface TopPage {
  page: string;
  views: number;
  unique: number;
  avgTime: string;
  bounce: string;
}

export interface Region {
  name: string;
  pct: number;
}

export interface Device {
  name: string;
  pct: number;
  count: string;
  color: string;
  icon: string;
}
