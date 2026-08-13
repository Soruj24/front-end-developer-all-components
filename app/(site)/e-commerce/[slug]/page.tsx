"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/design-system/Badge";
import { Button } from "@/components/design-system/Button";
import {
  ProductCard,
  PRODUCTS,
  useCart,
  ProductBreadcrumbs,
  ProductSpecifications,
  ProductReviews,
  ProductShareButtons,
  ProductWishlistButton,
  RecentlyViewedProducts,
  TrustBadges,
  DeliveryEstimate,
  SizeGuide,
  ProductImageZoom,
  FlashSaleBanner,
  QuantityDiscountDisplay,
  BackInStockNotification,
  CompareButton,
} from "@/features/ecommerce";
import { StarRating } from "@/features/ecommerce/components/StarRating";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = use(params);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const cart = useCart();

  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  useEffect(() => {
    if (product) {
      cart.addRecentlyViewed(product.id);
    }
  }, [product?.id]);

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const reviews = product.reviews || [];
  const specs = product.specifications || [];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
      <ProductBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/e-commerce" },
          { label: product.category, href: `/e-commerce?category=${product.category}` },
          { label: product.title },
        ]}
        className="mb-8"
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative">
            <ProductImageZoom
              src={product.images[selectedImage]}
              alt={product.title}
              className="aspect-square"
            />
            {product.badge && (
              <Badge className="absolute left-4 top-4 z-10 bg-primary text-primary-foreground">
                {product.badge}
              </Badge>
            )}
            {discount && !product.badge && (
              <Badge className="absolute left-4 top-4 z-10 bg-danger text-danger-foreground">
                -{discount}%
              </Badge>
            )}
            <div className="absolute right-4 top-4 z-10">
              <ProductWishlistButton
                isWishlisted={cart.isInWishlist(product.id)}
                onToggle={() => cart.toggleWishlist(product.id)}
              />
            </div>
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-colors",
                    selectedImage === i
                      ? "border-primary"
                      : "border-border/50 hover:border-border"
                  )}
                >
                  <Image
                    src={img}
                    alt={`${product.title} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <Badge className="mb-3 w-fit" variant="secondary">
              {product.category}
            </Badge>
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
              {product.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <StarRating rating={product.rating} />
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviewCount.toLocaleString()} reviews)
            </span>
            {product.sold && (
              <>
                <span className="text-border">·</span>
                <span className="text-sm text-muted-foreground">
                  {product.sold.toLocaleString()} sold
                </span>
              </>
            )}
            {product.viewers && product.viewers > 0 && (
              <>
                <span className="text-border">·</span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  {product.viewers} viewing now
                </span>
              </>
            )}
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">
              ${product.flashSale ? product.flashSale.salePrice.toFixed(2) : product.price.toFixed(2)}
            </span>
            {(product.originalPrice || product.flashSale) && (
              <span className="text-lg text-muted-foreground line-through">
                ${(product.flashSale ? product.price : product.originalPrice || 0).toFixed(2)}
              </span>
            )}
            {discount && (
              <Badge className="bg-danger/10 text-danger">Save {discount}%</Badge>
            )}
          </div>

          {product.flashSale && (
            <FlashSaleBanner flashSale={product.flashSale} />
          )}

          {product.quantityDiscounts && product.quantityDiscounts.length > 0 && (
            <QuantityDiscountDisplay
              discounts={product.quantityDiscounts}
              currentQuantity={quantity}
            />
          )}

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <DeliveryEstimate
            estimatedDays={product.shipping?.estimatedDays}
            freeShipping={product.shipping?.freeShipping}
            expressAvailable={product.shipping?.ExpressAvailable}
          />

          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Availability:</span>
            {product.stock > 0 ? (
              <span className="font-medium text-success">In Stock ({product.stock} left)</span>
            ) : (
              <span className="font-medium text-danger">Out of Stock</span>
            )}
          </div>

          {product.stock === 0 && (
            <BackInStockNotification productId={product.id} productTitle={product.title} />
          )}

          {product.variants && product.variants.length > 0 && (
            <div className="space-y-4">
              {product.variants.map((variant) => (
                <div key={variant.type}>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {variant.name}:
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {selectedVariants[variant.type] || variant.options[0].label}
                    </span>
                    {variant.type === "size" && (
                      <SizeGuide category={product.category} />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          setSelectedVariants((prev) => ({
                            ...prev,
                            [variant.type]: option.label,
                          }))
                        }
                        className={cn(
                          "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                          (selectedVariants[variant.type] || variant.options[0].label) ===
                            option.label
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border text-muted-foreground hover:border-border hover:text-foreground",
                          !option.inStock && "opacity-40 line-through"
                        )}
                        disabled={!option.inStock && option.inStock !== undefined}
                      >
                        {option.label}
                        {option.priceModifier && option.priceModifier > 0 && (
                          <span className="ml-1 text-xs">+${option.priceModifier}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:bg-muted"
              >
                -
              </button>
              <span className="flex h-10 w-12 items-center justify-center text-sm font-medium text-foreground">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:bg-muted"
              >
                +
              </button>
            </div>

            <Button
              size="lg"
              className="flex-1"
              onClick={() => cart.addItem(product, quantity)}
              disabled={product.stock === 0}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
              Add to Cart
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => cart.toggleWishlist(product.id)}
            >
              <svg
                className={cn("h-5 w-5", cart.isInWishlist(product.id) && "fill-red-500 text-red-500")}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </Button>
          </div>

          <CompareButton productId={product.id} />

          <div className="flex items-center justify-between border-t border-border/50 pt-4">
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <ProductShareButtons title={product.title} url={`/e-commerce/${product.slug}`} />
          </div>
        </div>
      </div>

      <TrustBadges className="mt-12" />

      {specs.length > 0 && (
        <ProductSpecifications specifications={specs} className="mt-10" />
      )}

      {reviews.length > 0 && (
        <ProductReviews
          reviews={reviews}
          reviewCount={product.reviewCount}
          rating={product.rating}
          className="mt-10"
        />
      )}

      <RecentlyViewedProducts
        products={PRODUCTS.filter((p) =>
          cart.recentlyViewed.includes(p.id) && p.id !== product.id
        ).slice(0, 6)}
        className="mt-12"
      />

      {related.length > 0 && (
        <section className="mt-12 border-t border-border/50 pt-10">
          <h2 className="mb-6 text-xl font-semibold text-foreground">
            Related Products
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={cart.addItem}
                isWishlisted={cart.isInWishlist(p.id)}
                onToggleWishlist={() => cart.toggleWishlist(p.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
