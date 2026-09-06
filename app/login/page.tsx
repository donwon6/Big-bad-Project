"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useStore, type Order } from "@/components/store";

const DEMO_EMAIL = "dana@harborandpine.com";
const DEMO_PASSWORD = "brewbetter";

/** One delivered order so a fresh sign-in has some history to look at. */
function sampleOrder(email: string): Order {
  const placed = new Date(Date.now() - 19 * 24 * 60 * 60 * 1000);
  return {
    id: "HP-4KD92X",
    placedAt: placed.toISOString(),
    email,
    shipTo: "Dana Whitfield, 1412 N Skidmore St, Portland, OR 97217",
    items: [
      { slug: "everyday-stoneware-mug", name: "Everyday Stoneware Mug", price: 28, qty: 2 },
      { slug: "north-cove-espresso", name: "North Cove Espresso", price: 21, qty: 1 },
    ],
    subtotal: 77,
    shipping: 0,
    tax: 6.35,
    total: 83.35,
    status: "Delivered",
  };
}

export default function LoginPage() {
  const router = useRouter();
  const { signIn, orders, addOrder } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Enter both your email address and password.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError("That does not look like a valid email address.");
      return;
    }
    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError("We could not find an account with those details.");
      return;
    }

    setSubmitting(true);
    window.setTimeout(() => {
      signIn({ name: "Dana Whitfield", email: DEMO_EMAIL });
      if (orders.length === 0) addOrder(sampleOrder(DEMO_EMAIL));
      router.push("/account");
    }, 500);
  }

  return (
    <div className="narrow">
      <div className="auth-card">
        <h1>Sign in</h1>
        <p className="muted small" style={{ marginBottom: 24 }}>
          Track your orders and reorder in a couple of clicks.
        </p>

        <form onSubmit={onSubmit} noValidate data-testid="login-form">
          {error ? (
            <div className="alert alert-error" role="alert" data-testid="login-error">
              {error}
            </div>
          ) : null}

          <div className="field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              className="input"
              type="email"
              autoComplete="username"
              data-testid="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              className="input"
              type="password"
              autoComplete="current-password"
              data-testid="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            data-testid="login-submit"
            disabled={submitting}
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="hint" data-testid="demo-credentials">
          <strong>Demo account</strong>
          <br />
          Email <code>{DEMO_EMAIL}</code>
          <br />
          Password <code>{DEMO_PASSWORD}</code>
        </div>

        <p className="small muted" style={{ marginTop: 20, textAlign: "center" }}>
          No account yet? <Link href="/shop" style={{ textDecoration: "underline" }}>Start shopping</Link> — you can
          create one at checkout.
        </p>
      </div>
    </div>
  );
}
