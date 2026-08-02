export type DeviceId =
  | "mobile"
  | "mobile-lg"
  | "tablet"
  | "laptop"
  | "desktop"
  | "full";

export interface DevicePreset {
  id: DeviceId;
  label: string;
  /** Short label shown in the device switcher. */
  shortLabel: string;
  /** Canvas width in px. `null` renders at 100% (full width). */
  width: number | null;
}

/** Live preview device presets, smallest to largest. */
export const DEVICES: DevicePreset[] = [
  { id: "mobile", label: "Mobile", shortLabel: "Mobile", width: 375 },
  { id: "mobile-lg", label: "Mobile Large", shortLabel: "Mobile L", width: 430 },
  { id: "tablet", label: "Tablet", shortLabel: "Tablet", width: 768 },
  { id: "laptop", label: "Laptop", shortLabel: "Laptop", width: 1024 },
  { id: "desktop", label: "Desktop", shortLabel: "Desktop", width: 1280 },
  { id: "full", label: "Full Width", shortLabel: "Full", width: null },
];

export const DEFAULT_DEVICE_ID: DeviceId = "desktop";

export function getDevice(id: DeviceId): DevicePreset {
  return DEVICES.find((device) => device.id === id) ?? DEVICES[0];
}
