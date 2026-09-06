"use client";

import Link from "next/link";
import ProductArt from "@/components/ProductArt";
import { SHIPPING_FREE_THRESHOLD, shippingFor, taxFor, useStore } from "@/components/store";
import { formatPrice } from "@/lib/products";

export default function CartPage() {
  const { ready, cartDetailed, subtotal, setQty, removeFromCart } = useStore();
  const shipping = shippingFor(subtotal);
  const tax = taxFor(subtotal);
  const total = subtotal + shipping + tax;
  const awayFromFree = Math.max(0, SHIPPING_FREE_THRESHOLD - subtotal);

  return (
    <div className="wrap" style={{ paddingTop: 44 }}>
      <h1 style={{ marginBottom: 28 }}>Your cart</h1>

      {!ready ? (
        <p className="muted" data-testid="cart-loading">
          Loading your cart…
        </p>
      ) : cartDetailed.length === 0 ? (
        <div className="empty" data-testid="cart-empty">
          <p style={{ marginBottom: 4 }}>
            <strong>Your cart is empty.</strong>
          </p>
          <p style={{ margin: 0 }}>Once you add something it will show up here.</p>
          <Link href="/shop" className="btn btn-primary" style={{ marginTop: 20 }} data-testid="empty-shop-link">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="two-col">
          <div>
            <div className="line-items" data-testid="cart-lines">
              {cartDetailed.map(({ product, qty }) => (
                <div className="line-item" key={product.slug} data-testid="cart-line" data-slug={product.slug}>
                  <div className="line-item-art">
                    <ProductArt {...product.art} id={`cart-${product.slug}`} />
                  </div>
                  <div>
                    <h3>
                      <Link href={`/product/${product.slug}`}>{product.name}</Link>
                    </h3>
                    <p className="small muted" style={{ margin: 0 }}>
                      {formatPrice(product.price)} each · {product.category}
                    </p>
                    <div className="line-item-actions">
                      <div className="qty">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${product.name}`}
                          data-testid="line-qty-decrease"
                          onClick={() => setQty(product.slug, qty - 1)}
                        >
                          −
                        </button>
                        <output data-testid="line-qty">{qty}</output>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${product.name}`}
                          data-testid="line-qty-increase"
                          onClick={() => setQty(product.slug, qty + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="link-danger"
                        data-testid="remove-item"
                        onClick={() => removeFromCart(product.slug)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="line-total" data-testid="line-total">
                    {formatPrice(product.price * qty)}
                  </div>
                </div>
              ))}
            </div>

            <Link href="/shop" className="btn btn-ghost" style={{ marginTop: 20 }} data-testid="continue-shopping">
              ← Continue shopping
            </Link>
          </div>

          <aside className="panel sticky" data-testid="order-summary">
            <h2>Order summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span data-testid="summary-subtotal">{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span data-testid="summary-shipping">
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </span>
            </div>
            <div className="summary-row">
              <span>Estimated tax</span>
              <span data-testid="summary-tax">{formatPrice(tax)}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span data-testid="summary-total">{formatPrice(total)}</span>
            </div>

            {awayFromFree > 0 ? (
              <p className="small muted" style={{ marginTop: 14 }} data-testid="free-shipping-note">
                Add {formatPrice(awayFromFree)} more for free shipping.
              </p>
            ) : null}

            <Link
              href="/checkout"
              className="btn btn-primary btn-block btn-lg"
              style={{ marginTop: 18 }}
              data-testid="checkout-button"
            >
              Checkout
            </Link>
            <p className="small muted" style={{ textAlign: "center", margin: "14px 0 0" }}>
              Demo checkout — no card is charged.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
