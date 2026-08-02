import { tableBasicSimple } from "./table-basic-simple";
import { tableBasicStriped } from "./table-basic-striped";
import { tableBasicActions } from "./table-basic-actions";
import { tableBasicStatus } from "./table-basic-status";
import { tableSortable } from "./table-sortable";
import { tableSelectable } from "./table-selectable";
import { tableFilterable } from "./table-filterable";
import { tablePaginated } from "./table-paginated";
import { tableExpandable } from "./table-expandable";
import { tableResponsive } from "./table-responsive";
import { tableComparison } from "./table-comparison";

export { productsSource, starSvg, starSvgSm, statusColorsSource, usersSource } from "./shared";
import type { RegistryEntry } from "../../types";

export const tables: RegistryEntry[] = [
  tableBasicSimple,
  tableBasicStriped,
  tableBasicActions,
  tableBasicStatus,
  tableSortable,
  tableSelectable,
  tableFilterable,
  tablePaginated,
  tableExpandable,
  tableResponsive,
  tableComparison,
];
