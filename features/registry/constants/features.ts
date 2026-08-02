export const componentFeatures = [
  "variants",
  "sizes",
  "icons",
  "loading",
  "disabled",
  "rounded",
  "full-width",
  "dark-mode",
  "light-mode",
  "accessibility",
  "responsive",
] as const;

export const featureLabel: Record<string, string> = {
  variants: "Variants",
  sizes: "Sizes",
  icons: "Icons",
  loading: "Loading",
  disabled: "Disabled",
  rounded: "Rounded",
  "full-width": "Full width",
  "dark-mode": "Dark mode",
  "light-mode": "Light mode",
  accessibility: "Accessible",
  responsive: "Responsive",
};
