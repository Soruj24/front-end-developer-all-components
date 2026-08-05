import type { Product } from "../types/ecommerce.types";
import { PRODUCTS_PART_1 } from "./products-1";
import { PRODUCTS_PART_2 } from "./products-2";

export const PRODUCTS: Product[] = [...PRODUCTS_PART_1, ...PRODUCTS_PART_2];
