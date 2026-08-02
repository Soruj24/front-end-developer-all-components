export type ComponentPropType =
  | "string"
  | "boolean"
  | "number"
  | "function"
  | "ReactNode"
  | "enum";

/** The public API of a component, documented as a props table. */
export interface ComponentProp {
  name: string;
  type: ComponentPropType | string;
  default?: string;
  required?: boolean;
  description: string;
  /** Candidate values for enum / union types. */
  values?: string[];
}
