export interface ShadowPreset {
  id: string;
  label: string;
  css: string;
}

export const SHADOW_PRESETS: ShadowPreset[] = [
  { id: "none", label: "None", css: "none" },
  { id: "xs", label: "XS", css: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
  { id: "sm", label: "SM", css: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" },
  { id: "md", label: "MD", css: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" },
  { id: "lg", label: "LG", css: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" },
  { id: "xl", label: "XL", css: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" },
  { id: "glow", label: "Glow", css: "0 0 24px -6px rgb(99 102 241 / 0.55)" },
];

export function getShadowPreset(id: string): ShadowPreset {
  return SHADOW_PRESETS.find((preset) => preset.id === id) ?? SHADOW_PRESETS[0];
}
