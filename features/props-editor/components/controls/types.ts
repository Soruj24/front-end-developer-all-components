import type { FieldDef, PropValue } from "../../types";

export interface ControlProps {
  field: FieldDef;
  value: PropValue;
  onChange: (value: PropValue) => void;
  onBegin?: () => void;
  onEnd?: () => void;
  onCommit?: (value: PropValue) => void;
}
