import { checkboxDefault } from "./checkbox-default";
import { checkboxSizes } from "./checkbox-sizes";
import { checkboxVariants } from "./checkbox-variants";
import { checkboxWithDescription } from "./checkbox-with-description";
import { checkboxCard } from "./checkbox-card";
import { checkboxGroup } from "./checkbox-group";
import { checkboxError } from "./checkbox-error";
import { checkboxForm } from "./checkbox-form";
import { checkboxTodo } from "./checkbox-todo";
import type { RegistryEntry } from "../../types";

/** Individual examples. Each is one preview block on the Checkbox page. */
export const checkboxes: RegistryEntry[] = [
  checkboxDefault,
  checkboxSizes,
  checkboxVariants,
  checkboxWithDescription,
  checkboxCard,
  checkboxGroup,
  checkboxError,
  checkboxForm,
  checkboxTodo,
];
