"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import ProductArt from "@/components/ProductArt";
import {
  newOrderId,
  shippingFor,
  taxFor,
  useStore,
  type Order,
} from "@/components/store";
import { formatPrice } from "@/lib/products";

const STATES = [
  "CA", "CO", "FL", "GA", "IL", "MA", "MI", "MN", "NC", "NY",
  "OH", "OR", "PA", "TX", "VA", "WA", "WI",
];

const EXPRESS_COST = 14;

type Fields = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  card: string;
  expiry: string;
  cvc: string;
};

const EMPTY: Fields = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  apt: "",
  city: "",
  state: "",
  zip: "",
  card: "",
  expiry: "",
  cvc: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { ready, cartDetailed, subtotal, clearCart, addOrder, user } = useStore();

  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [method, setMethod] = useState<"standard" | "express">("standard");
  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // Prefill the email of a signed-in shopper.
  useEffect(() => {
    if (user?.email) setFields((f) => (f.email ? f : { ...f, email: user.email }));
  }, [user]);

  // An empty cart has nothing to check out — but not once the order is placed,
  // which empties the cart on its way to the confirmation page.
  useEffect(() => {
    if (ready && !placed && cartDetailed.length === 0) router.replace("/cart");
  }, [ready, placed, cartDetailed.length, router]);

  const shipping = method === "express" ? EXPRESS_COST : shippingFor(subtotal);
  const tax = taxFor(subtotal);
  const total = subtotal + shipping + tax;

  const set = (key: keyof Fields) => (value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  function validate(values: Fields) {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!values.email.trim()) next.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = "That does not look like a valid email address.";

    if (!values.firstName.trim()) next.firstName = "Enter your first name.";
    if (!values.lastName.trim()) next.lastName = "Enter your last name.";
    if (!values.address.trim()) next.address = "Enter your street address.";
    if (!values.city.trim()) next.city = "Enter your city.";
    if (!values.state) next.state = "Select a state.";

    if (!values.zip.trim()) next.zip = "Enter your ZIP code.";
    else if (!/^\d{5}(-\d{4})?$/.test(values.zip.trim()))
      next.zip = "Use a 5-digit ZIP code.";

    const digits = values.card.replace(/[\s-]/g, "");
    if (!digits) next.card = "Enter your card number.";
    else if (!/^\d{13,19}$/.test(digits)) next.card = "Enter a card number of 13 to 19 digits.";

    if (!values.expiry.trim()) next.expiry = "Enter the expiry date.";
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(values.expiry.trim()))
      next.expiry = "Use MM/YY format.";

    if (!values.cvc.trim()) next.cvc = "Enter the security code.";
    else if (!/^\d{3,4}$/.test(values.cvc.trim())) next.cvc = "The code is 3 or 4 digits.";

    return next;
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const found = validate(fields);
    setErrors(found);
    setShowSummary(Object.keys(found).length > 0);
    if (Object.keys(found).length > 0) {
      document.querySelector<HTMLElement>('[data-testid="error-summary"]')?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setSubmitting(true);
    const order: Order = {
      id: newOrderId(),
      placedAt: new Date().toISOString(),
      email: fields.email.trim(),
      shipTo: `${fields.firstName.trim()} ${fields.lastName.trim()}, ${fields.address.trim()}${
        fields.apt.trim() ? ` ${fields.apt.trim()}` : ""
      }, ${fields.city.trim()}, ${fields.state} ${fields.zip.trim()}`,
      items: cartDetailed.map(({ product, qty }) => ({
        slug: product.slug,
        name: product.name,
        price: product.price,
        qty,
      })),
      subtotal,
      shipping,
      tax,
      total,
      status: "Processing",
    };

    // A short pause so the button's pending state is observable.
    window.setTimeout(() => {
      setPlaced(true);
      addOrder(order);
      clearCart();
      router.push(`/checkout/success?order=${order.id}`);
    }, 600);
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  if (!ready || cartDetailed.length === 0) {
    return (
      <div className="wrap" style={{ padding: "64px 24px" }}>
        <p className="muted" data-testid="checkout-loading">
          {placed ? "Placing your order…" : "Loading checkout…"}
        </p>
      </div>
    );
  }

  return (
    <div className="wrap" style={{ paddingTop: 44 }}>
      <p className="steps" data-testid="checkout-steps">
        <Link href="/cart">Cart</Link> <span>›</span> <b>Details</b> <span>›</span>{" "}
        <span>Confirmation</span>
      </p>

      <h1 style={{ marginBottom: 28 }}>Checkout</h1>

      <div className="two-col">
        <form onSubmit={onSubmit} noValidate data-testid="checkout-form">
          {showSummary && errorCount > 0 ? (
            <div className="alert alert-error" role="alert" data-testid="error-summary">
              <strong>
                {errorCount} {errorCount === 1 ? "field needs" : "fields need"} your attention.
              </strong>{" "}
              Check the highlighted fields below.
            </div>
          ) : null}

          <h2 style={{ fontSize: "1.25rem", marginBottom: 16 }}>Contact</h2>
          <Field
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={fields.email}
            onChange={set("email")}
            error={errors.email}
          />

          <h2 style={{ fontSize: "1.25rem", margin: "30px 0 16px" }}>Shipping address</h2>
          <div className="field-row">
            <Field
              id="firstName"
              label="First name"
              value={fields.firstName}
              onChange={set("firstName")}
              error={errors.firstName}
            />
            <Field
              id="lastName"
              label="Last name"
              value={fields.lastName}
              onChange={set("lastName")}
              error={errors.lastName}
            />
          </div>
          <Field
            id="address"
            label="Street address"
            value={fields.address}
            onChange={set("address")}
            error={errors.address}
          />
          <Field
            id="apt"
            label="Apartment, suite (optional)"
            value={fields.apt}
            onChange={set("apt")}
          />
          <div className="field-row">
            <Field id="city" label="City" value={fields.city} onChange={set("city")} error={errors.city} />
            <div className="field">
              <label htmlFor="state">State</label>
              <select
                id="state"
                className="select"
                data-testid="input-state"
                value={fields.state}
                aria-invalid={errors.state ? true : undefined}
                onChange={(e) => set("state")(e.target.value)}
              >
                <option value="">Select a state</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.state ? (
                <p className="field-error" data-testid="error-state">
                  {errors.state}
                </p>
              ) : null}
            </div>
          </div>
          <Field
            id="zip"
            label="ZIP code"
            inputMode="numeric"
            placeholder="97217"
            value={fields.zip}
            onChange={set("zip")}
            error={errors.zip}
          />

          <h2 style={{ fontSize: "1.25rem", margin: "30px 0 16px" }}>Shipping method</h2>
          <div className="stack" data-testid="shipping-method" style={{ marginBottom: 30 }}>
            <ShippingOption
              id="standard"
              title="Standard — 4 to 6 business days"
              cost={shippingFor(subtotal) === 0 ? "Free" : formatPrice(shippingFor(subtotal))}
              checked={method === "standard"}
              onSelect={() => setMethod("standard")}
            />
            <ShippingOption
              id="express"
              title="Express — 2 business days"
              cost={formatPrice(EXPRESS_COST)}
              checked={method === "express"}
              onSelect={() => setMethod("express")}
            />
          </div>

          <h2 style={{ fontSize: "1.25rem", marginBottom: 6 }}>Payment</h2>
          <p className="small muted" style={{ marginBottom: 16 }}>
            This is a demo store. Nothing is charged — any well-formed card number works.
          </p>
          <Field
            id="card"
            label="Card number"
            inputMode="numeric"
            placeholder="4242 4242 4242 4242"
            value={fields.card}
            onChange={set("card")}
            error={errors.card}
          />
          <div className="field-row">
            <Field
              id="expiry"
              label="Expiry (MM/YY)"
              placeholder="04/29"
              value={fields.expiry}
              onChange={set("expiry")}
              error={errors.expiry}
            />
            <Field
              id="cvc"
              label="Security code"
              inputMode="numeric"
              placeholder="123"
              value={fields.cvc}
              onChange={set("cvc")}
              error={errors.cvc}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block"
            data-testid="place-order"
            disabled={submitting}
            style={{ marginTop: 10 }}
          >
            {submitting ? "Placing order…" : `Place order · ${formatPrice(total)}`}
          </button>
        </form>

        <aside className="panel sticky" data-testid="checkout-summary">
          <h2>Your order</h2>
          {cartDetailed.map(({ product, qty }) => (
            <div className="mini-item" key={product.slug} data-testid="summary-line" data-slug={product.slug}>
              <div className="mini-art">
                <ProductArt {...product.art} id={`co-${product.slug}`} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{product.name}</div>
                <div className="muted">Qty {qty}</div>
              </div>
              <div style={{ fontWeight: 600 }}>{formatPrice(product.price * qty)}</div>
            </div>
          ))}

          <div style={{ marginTop: 16, borderTop: "1px solid var(--line)", paddingTop: 10 }}>
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
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  inputMode?: "numeric" | "text";
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        className="input"
        type={type}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        data-testid={`input-${id}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      {error ? (
        <p className="field-error" id={`${id}-error`} data-testid={`error-${id}`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ShippingOption({
  id,
  title,
  cost,
  checked,
  onSelect,
}: {
  id: string;
  title: string;
  cost: string;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        border: `1px solid ${checked ? "var(--pine)" : "var(--line)"}`,
        borderRadius: "var(--radius)",
        background: "var(--paper-2)",
        padding: "14px 16px",
        cursor: "pointer",
      }}
    >
      <input
        type="radio"
        name="shipping-method"
        value={id}
        checked={checked}
        onChange={onSelect}
        data-testid={`shipping-${id}`}
      />
      <span style={{ flex: 1, fontSize: "0.9375rem" }}>{title}</span>
      <span style={{ fontWeight: 600, fontSize: "0.9375rem" }}>{cost}</span>
    </label>
  );
}
