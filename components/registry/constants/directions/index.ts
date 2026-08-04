import { directionToggle } from "./direction-toggle";
import { directionBasic } from "./direction-basic";
import { directionForm } from "./direction-form";
import { directionNavigation } from "./direction-navigation";
import { directionCard } from "./direction-card";
import { directionNested } from "./direction-nested";
import { directionHook } from "./direction-hook";
import { directionMultilingual } from "./direction-multilingual";
import type { RegistryEntry } from "../../types";

export const directions: RegistryEntry[] = [
  directionToggle,
  directionBasic,
  directionForm,
  directionNavigation,
  directionCard,
  directionNested,
  directionHook,
  directionMultilingual,
];
