"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/components/store";
import { formatPrice } from "@/lib/products";

export default function AccountPage() {
  const router = useRouter();
  const { ready, user, orders, signOut, addToCart } = useStore();

  if (!ready) {
    return (
      <div className="wrap" style={{ padding: "64px 24px" }}>
        <p className="muted" data-testid="account-loading">
          Loading your account…
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="narrow">
        <div className="auth-card" data-testid="account-signed-out">
          <h1>Your account</h1>
          <p className="muted" style={{ marginTop: 8 }}>
            Sign in to see your orders, addresses and saved payment methods.
          </p>
          <Link href="/login" className="btn btn-primary btn-block btn-lg" data-testid="go-to-login">
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap" style={{ paddingTop: 44, paddingBottom: 80 }} data-testid="account-signed-in">
      <div className="section-head" style={{ marginBottom: 24 }}>
        <div>
          <p className="eyebrow">Account</p>
          <h1 data-testid="account-name">{user.name}</h1>
          <p className="muted" style={{ margin: "8px 0 0" }} data-testid="account-email">
            {user.email}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="sign-out"
          onClick={() => {
            signOut();
            router.push("/");
          }}
        >
          Sign out
        </button>
      </div>

      <h2 style={{ fontSize: "1.25rem", margin: "36px 0 16px" }}>Order history</h2>

      {orders.length === 0 ? (
        <div className="empty" data-testid="no-orders">
          <p style={{ marginBottom: 4 }}>
            <strong>No orders yet.</strong>
          </p>
          <p style={{ margin: 0 }}>Your orders will appear here once you place one.</p>
          <Link href="/shop" className="btn btn-primary" style={{ marginTop: 20 }}>
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="stack" data-testid="order-list">
          {orders.map((order) => (
            <div className="panel" key={order.id} data-testid="order-row" data-order={order.id}>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }} data-testid="order-id">
                    {order.id}
                  </div>
                  <div className="small muted">
                    Placed{" "}
                    {new Date(order.placedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <span
                  className={order.status === "Delivered" ? "pill pill-muted" : "pill"}
                  data-testid="order-status"
                >
                  {order.status}
                </span>
              </div>

              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.slug}>
                      <td>
                        <Link href={`/product/${item.slug}`} style={{ textDecoration: "underline" }}>
                          {item.name}
                        </Link>
                      </td>
                      <td>{item.qty}</td>
                      <td>{formatPrice(item.price * item.qty)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  marginTop: 18,
                  flexWrap: "wrap",
                }}
              >
                <strong>Total {formatPrice(order.total)}</strong>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="reorder"
                  onClick={() => {
                    order.items.forEach((item) => addToCart(item.slug, item.qty));
                    router.push("/cart");
                  }}
                >
                  Buy it again
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
