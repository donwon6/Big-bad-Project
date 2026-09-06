"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useStore } from "@/components/store";
import { formatPrice } from "@/lib/products";

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="wrap" style={{ padding: "64px 24px" }}>
          <p className="muted">Loading your confirmation…</p>
        </div>
      }
    >
      <Confirmation />
    </Suspense>
  );
}

function Confirmation() {
  const params = useSearchParams();
  const { ready, orders } = useStore();
  const orderId = params.get("order");
  const order = orders.find((o) => o.id === orderId) ?? orders[0];

  if (!ready) {
    return (
      <div className="wrap" style={{ padding: "64px 24px" }}>
        <p className="muted">Loading your confirmation…</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="wrap" style={{ padding: "64px 24px" }}>
        <div className="empty" data-testid="no-order">
          <p style={{ marginBottom: 4 }}>
            <strong>We could not find that order.</strong>
          </p>
          <p style={{ margin: 0 }}>It may have been placed in a different browser.</p>
          <Link href="/shop" className="btn btn-primary" style={{ marginTop: 20 }}>
            Back to the shop
          </Link>
        </div>
      </div>
    );
  }

  const placed = new Date(order.placedAt);
  const arrives = new Date(placed.getTime() + 5 * 24 * 60 * 60 * 1000);

  return (
    <div className="wrap" style={{ paddingTop: 56, paddingBottom: 90, maxWidth: 780 }}>
      <div className="confirm-mark" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M4.5 12.5 L9.5 17.5 L19.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <p className="eyebrow">Order confirmed</p>
      <h1 data-testid="success-heading">Thank you — your order is in.</h1>
      <p className="muted" style={{ marginTop: 12 }}>
        We sent a receipt to <strong data-testid="confirmation-email">{order.email}</strong>. You
        can follow along from your account at any time.
      </p>

      <div className="order-box" data-testid="order-box">
        <dl className="order-meta">
          <div>
            <dt>Order number</dt>
            <dd data-testid="order-number">{order.id}</dd>
          </div>
          <div>
            <dt>Placed</dt>
            <dd>{placed.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</dd>
          </div>
          <div>
            <dt>Estimated arrival</dt>
            <dd data-testid="order-eta">
              {arrives.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
            </dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              <span className="pill">{order.status}</span>
            </dd>
          </div>
        </dl>

        <table className="table" data-testid="order-items">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.slug} data-testid="order-item" data-slug={item.slug}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{formatPrice(item.price * item.qty)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 18 }}>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <span>{formatPrice(order.tax)}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span data-testid="order-total">{formatPrice(order.total)}</span>
          </div>
        </div>

        <p className="small muted" style={{ margin: "20px 0 0" }}>
          Shipping to {order.shipTo}
        </p>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link href="/account" className="btn btn-primary" data-testid="view-orders">
          View my orders
        </Link>
        <Link href="/shop" className="btn btn-secondary" data-testid="keep-shopping">
          Keep shopping
        </Link>
      </div>
    </div>
  );
}
