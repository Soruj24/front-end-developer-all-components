"use client";

import { useState, useMemo } from "react";
import {
  ProductGrid,
  ProductFilters,
  CartDrawer,
  useCart,
  PRODUCTS,
  PRICE_RANGES,
} from "@/features/ecommerce";
import { Button } from "@/components/design-system/Button";
import { Badge } from "@/components/design-system/Badge";
import type { ProductCategory, ProductSort } from "@/features/ecommerce";

export default function EcommercePage() {
  const cart = useCart();
  const [category, setCategory] = useState<ProductCategory>("All");
  const [priceRange, setPriceRange] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<ProductSort>("featured");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      const matchCat = category === "All" || p.category === category;
      const range = PRICE_RANGES[priceRange];
      const matchPrice = p.price >= range.min && p.price <= range.max;
      const matchRating = p.rating >= minRating;
      const matchSearch =
        search === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchPrice && matchRating && matchSearch;
    });

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [category, priceRange, minRating, sort, search]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 sm:p-8 lg:p-12">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Shop
          </h1>
          <p className="mt-1 text-muted-foreground">
            Discover our curated collection of premium products
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => setCartOpen(true)}
          className="relative w-fit"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
          Cart
          {cart.totalItems > 0 && (
            <Badge className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px]">
              {cart.totalItems}
            </Badge>
          )}
        </Button>
      </header>

      <div className="flex flex-col gap-8 lg:flex-row">
        <ProductFilters
          selectedCategory={category}
          selectedPriceRange={priceRange}
          minRating={minRating}
          sort={sort}
          search={search}
          onCategoryChange={setCategory}
          onPriceRangeChange={setPriceRange}
          onMinRatingChange={setMinRating}
          onSortChange={setSort}
          onSearchChange={setSearch}
        />

        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <ProductGrid products={filtered} onAddToCart={cart.addItem} />
        </div>
      </div>

      <CartDrawer
        items={cart.items}
        totalItems={cart.totalItems}
        totalPrice={cart.totalPrice}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeItem}
        onClearCart={cart.clearCart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </div>
  );
}
