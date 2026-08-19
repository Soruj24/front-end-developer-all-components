import {
  PaletteIcon, SpaceIcon, BoxIcon, CircleIcon, TypeIcon, ZapIcon, LayersIcon,
} from "./icons";

export interface CustomizationOption {
  label: string;
  type: "color" | "select" | "range" | "toggle";
  value: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

export interface CustomizationGroup {
  label: string;
  icon: React.ReactNode;
  options: CustomizationOption[];
}

export const CUSTOMIZATION_GROUPS: CustomizationGroup[] = [
  {
    label: "Colors",
    icon: <PaletteIcon className="h-4 w-4" />,
    options: [
      { label: "Background", type: "color", value: "#ffffff" },
      { label: "Text", type: "color", value: "#171717" },
      { label: "Border", type: "color", value: "#e5e5e5" },
      { label: "Primary", type: "color", value: "#171717" },
    ],
  },
  {
    label: "Spacing",
    icon: <SpaceIcon className="h-4 w-4" />,
    options: [
      { label: "Padding X", type: "range", value: "16", min: 0, max: 64, step: 4 },
      { label: "Padding Y", type: "range", value: "8", min: 0, max: 64, step: 4 },
      { label: "Gap", type: "range", value: "8", min: 0, max: 32, step: 2 },
    ],
  },
  {
    label: "Border",
    icon: <BoxIcon className="h-4 w-4" />,
    options: [
      { label: "Width", type: "range", value: "1", min: 0, max: 4, step: 1 },
      { label: "Style", type: "select", value: "solid", options: ["solid", "dashed", "dotted", "none"] },
    ],
  },
  {
    label: "Radius",
    icon: <CircleIcon className="h-4 w-4" />,
    options: [
      { label: "Border Radius", type: "select", value: "rounded-lg", options: ["rounded-none", "rounded-sm", "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-full"] },
    ],
  },
  {
    label: "Shadow",
    icon: <LayersIcon className="h-4 w-4" />,
    options: [
      { label: "Box Shadow", type: "select", value: "shadow-sm", options: ["shadow-none", "shadow-sm", "shadow", "shadow-md", "shadow-lg", "shadow-xl"] },
    ],
  },
  {
    label: "Typography",
    icon: <TypeIcon className="h-4 w-4" />,
    options: [
      { label: "Font Size", type: "select", value: "text-sm", options: ["text-xs", "text-sm", "text-base", "text-lg", "text-xl"] },
      { label: "Font Weight", type: "select", value: "font-medium", options: ["font-normal", "font-medium", "font-semibold", "font-bold"] },
    ],
  },
  {
    label: "Animation",
    icon: <ZapIcon className="h-4 w-4" />,
    options: [
      { label: "Transition", type: "select", value: "transition-colors", options: ["transition-none", "transition-colors", "transition-all", "transition-transform"] },
      { label: "Duration", type: "select", value: "duration-150", options: ["duration-75", "duration-100", "duration-150", "duration-200", "duration-300"] },
    ],
  },
];
