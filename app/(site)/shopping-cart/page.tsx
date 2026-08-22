"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { SHOPPING_CART_SOURCE } from "./shopping-cart-source";
import {
  CART_ITEM_EXAMPLE,
  CART_SUMMARY_EXAMPLE,
  ADD_TO_CART_EXAMPLE,
  QUANTITY_SELECTOR_EXAMPLE,
  CART_BADGE_EXAMPLE,
  CHECKOUT_BUTTON_EXAMPLE,
  EMPTY_CART_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./shopping-cart-examples";
import {
  CartItem,
  CartSummary,
  AddToCart,
  QuantitySelector,
  CartBadge,
  CheckoutButton,
  EmptyCart,
  PlaygroundDemo,
} from "./demos";

export default function ShoppingCartPage() {
  return (
    <ComponentDocPage
      name="Shopping Cart"
      category="E-Commerce"
      description="A full-featured shopping cart system with item management, quantity controls, order summaries, and checkout flow."
    >
      <PreviewPanel filename="shopping-cart.tsx">
        <CartItem />
      </PreviewPanel>

      <SourceCodeViewer
        source={SHOPPING_CART_SOURCE}
        filename="components/ui/ShoppingCart/CartItem.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all shopping cart variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Cart Item" description="Product row with image, quantity controls, price, and delete." code={CART_ITEM_EXAMPLE}>
          <CartItem />
        </ExampleBlock>
        <ExampleBlock title="Cart Summary" description="Order summary with subtotal, shipping, tax, and total." code={CART_SUMMARY_EXAMPLE}>
          <CartSummary />
        </ExampleBlock>
        <ExampleBlock title="Add to Cart" description="Add-to-cart button with success state and coupon action." code={ADD_TO_CART_EXAMPLE}>
          <AddToCart />
        </ExampleBlock>
        <ExampleBlock title="Quantity Selector" description="Standalone quantity stepper with min/max limits." code={QUANTITY_SELECTOR_EXAMPLE}>
          <QuantitySelector />
        </ExampleBlock>
        <ExampleBlock title="Cart Badge" description="Shopping cart icon with animated item count badge." code={CART_BADGE_EXAMPLE}>
          <CartBadge />
        </ExampleBlock>
        <ExampleBlock title="Checkout Button" description="Primary checkout button with loading spinner state." code={CHECKOUT_BUTTON_EXAMPLE}>
          <CheckoutButton />
        </ExampleBlock>
        <ExampleBlock title="Empty Cart" description="Empty state with dashed border and call-to-action." code={EMPTY_CART_EXAMPLE}>
          <EmptyCart />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
