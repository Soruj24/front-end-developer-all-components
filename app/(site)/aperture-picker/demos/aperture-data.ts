export interface ApertureStop {
  fStop: string;
  label: string;
  ev: number;
  dof: "Very Shallow" | "Shallow" | "Medium" | "Deep" | "Very Deep";
  bestFor: string;
}

export const apertureData: ApertureStop[] = [
  { fStop: "f/1.4", label: "1.4", ev: 0, dof: "Very Shallow", bestFor: "Portraits, low light" },
  { fStop: "f/2", label: "2", ev: 1, dof: "Very Shallow", bestFor: "Portraits, bokeh" },
  { fStop: "f/2.8", label: "2.8", ev: 2, dof: "Shallow", bestFor: "Street photography" },
  { fStop: "f/4", label: "4", ev: 3, dof: "Shallow", bestFor: "Travel, everyday" },
  { fStop: "f/5.6", label: "5.6", ev: 4, dof: "Medium", bestFor: "Group photos" },
  { fStop: "f/8", label: "8", ev: 5, dof: "Medium", bestFor: "Landscapes, sharp" },
  { fStop: "f/11", label: "11", ev: 6, dof: "Deep", bestFor: "Architecture" },
  { fStop: "f/16", label: "16", ev: 7, dof: "Deep", bestFor: "Max depth" },
  { fStop: "f/22", label: "22", ev: 8, dof: "Very Deep", bestFor: "Starburst effect" },
];

export const DOF_LEVELS = ["Very Shallow", "Shallow", "Medium", "Deep", "Very Deep"] as const;

export function dofIndex(dof: ApertureStop["dof"]): number {
  return Math.max(0, DOF_LEVELS.indexOf(dof));
}

export const formatEv = (ev: number) => `${ev > 0 ? "+" : ""}${ev}`;
