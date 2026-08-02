import { paginationStyleVariants } from "./pagination-style-variants";
import { paginationSizeVariants } from "./pagination-size-variants";
import { paginationPageCounts } from "./pagination-page-counts";
import { paginationPageSize } from "./pagination-page-size";
import { paginationJumpToPage } from "./pagination-jump-to-page";
import { paginationRangeText } from "./pagination-range-text";
import { paginationTable } from "./pagination-table";
import { paginationSkeleton } from "./pagination-skeleton";
import { paginationCondensed } from "./pagination-condensed";
import { paginationCardGrid } from "./pagination-card-grid";
import { paginationComments } from "./pagination-comments";
import { paginationSearchResults } from "./pagination-search-results";
import { paginationMinimal } from "./pagination-minimal";
import { paginationTotalBadge } from "./pagination-total-badge";
import { paginationLoadMore } from "./pagination-load-more";
import { paginationButtonGroup } from "./pagination-button-group";
import { paginationProgress } from "./pagination-progress";
import { paginationColorThemes } from "./pagination-color-themes";
import { paginationStepper } from "./pagination-stepper";
import { paginationGradient } from "./pagination-gradient";
import { paginationThumbnails } from "./pagination-thumbnails";
import { paginationMobile } from "./pagination-mobile";

export { chevronSource, paginationBarSource } from "./shared";
import type { RegistryEntry } from "../../types";

/** Pagination examples. */
export const pagination: RegistryEntry[] = [
  paginationStyleVariants,
  paginationSizeVariants,
  paginationPageCounts,
  paginationPageSize,
  paginationJumpToPage,
  paginationRangeText,
  paginationTable,
  paginationSkeleton,
  paginationCondensed,
  paginationCardGrid,
  paginationComments,
  paginationSearchResults,
  paginationMinimal,
  paginationTotalBadge,
  paginationLoadMore,
  paginationButtonGroup,
  paginationProgress,
  paginationColorThemes,
  paginationStepper,
  paginationGradient,
  paginationThumbnails,
  paginationMobile,
];
