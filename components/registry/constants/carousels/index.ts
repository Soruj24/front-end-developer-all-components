import { carouselInteractive } from "./carousel-interactive";
import { carouselTransitions } from "./carousel-transitions";
import { carouselAutoplay } from "./carousel-autoplay";
import { carouselNavigation } from "./carousel-navigation";
import { carouselThumbnails } from "./carousel-thumbnails";
import { carouselSizes } from "./carousel-sizes";
import { carouselContent } from "./carousel-content";
import { carouselStyles } from "./carousel-styles";
import { carouselFullFeatured } from "./carousel-full-featured";
import { carouselControlled } from "./carousel-controlled";
import { navigationBasic } from "./navigation-basic";
import { navigationSticky } from "./navigation-sticky";
import { navigationProgress } from "./navigation-progress";
import { navigationScrollspy } from "./navigation-scrollspy";
import { navigationBreadcrumbs } from "./navigation-breadcrumbs";
import { navigationTabs } from "./navigation-tabs";
import { navigationPagination } from "./navigation-pagination";

export { carouselData, carouselSource } from "./shared";
import type { RegistryEntry } from "../../types";

/** Carousel + navigation examples. */
export const carousels: RegistryEntry[] = [
  carouselInteractive,
  carouselTransitions,
  carouselAutoplay,
  carouselNavigation,
  carouselThumbnails,
  carouselSizes,
  carouselContent,
  carouselStyles,
  carouselFullFeatured,
  carouselControlled,
  navigationBasic,
  navigationSticky,
  navigationProgress,
  navigationScrollspy,
  navigationBreadcrumbs,
  navigationTabs,
  navigationPagination,
];
