"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "./store";
import type { Product } from "@/lib/products";

export default function AddToCart({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product.inStock) {
    return (
      <>
        <div className="buy-row">
          <button type="button" className="btn btn-primary btn-lg" disabled data-testid="add-to-cart">
            Sold out
          </button>
        </div>
        <p className="small muted" data-testid="restock-note">
          More arriving in early spring. Sign in to be notified first.
        </p>
      </>
    );
  }

  return (
    <>
      <div className="buy-row">
        <div className="qty" data-testid="qty-stepper">
          <button
            type="button"
            aria-label="Decrease quantity"
            data-testid="qty-decrease"
            disabled={qty <= 1}
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <output data-testid="qty-value">{qty}</output>
          <button
            type="button"
            aria-label="Increase quantity"
            data-testid="qty-increase"
            disabled={qty >= 10}
            onClick={() => setQty((q) => Math.min(10, q + 1))}
          >
            +
          </button>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          data-testid="add-to-cart"
          onClick={() => {
            addToCart(product.slug, qty);
            setAdded(true);
          }}
        >
          Add to cart
        </button>
      </div>

      {added ? (
        <div className="alert alert-info" role="status" data-testid="added-confirmation">
          Added to your cart.{" "}
          <Link href="/cart" style={{ textDecoration: "underline", fontWeight: 600 }} data-testid="go-to-cart">
            View cart
          </Link>
        </div>
      ) : null}
    </>
  );
}
