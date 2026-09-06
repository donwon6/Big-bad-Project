"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct, type Product } from "@/lib/products";

/* ------------------------------------------------------------------ *
 * Types
 * ------------------------------------------------------------------ */
export type CartLine = { slug: string; qty: number };

export type OrderItem = { slug: string; name: string; price: number; qty: number };

export type Order = {
  id: string;
  placedAt: string;
  email: string;
  shipTo: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: "Processing" | "Shipped" | "Delivered";
};

export type User = { name: string; email: string };

type StoreValue = {
  /** False during the first client render, before localStorage is read. */
  ready: boolean;
  cart: CartLine[];
  cartCount: number;
  cartDetailed: { product: Product; qty: number }[];
  subtotal: number;
  addToCart: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

const KEYS = {
  cart: "hp.cart",
  user: "hp.user",
  orders: "hp.orders",
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode or full quota — the demo still works, it just forgets */
  }
}

/* ------------------------------------------------------------------ *
 * Provider
 * ------------------------------------------------------------------ */
export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  // Hydrate after mount so server and client markup match on first paint.
  useEffect(() => {
    setCart(read<CartLine[]>(KEYS.cart, []));
    setUser(read<User | null>(KEYS.user, null));
    setOrders(read<Order[]>(KEYS.orders, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) write(KEYS.cart, cart);
  }, [cart, ready]);
  useEffect(() => {
    if (ready) write(KEYS.user, user);
  }, [user, ready]);
  useEffect(() => {
    if (ready) write(KEYS.orders, orders);
  }, [orders, ready]);

  const addToCart = useCallback((slug: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((l) => l.slug === slug);
      if (existing) {
        return prev.map((l) =>
          l.slug === slug ? { ...l, qty: Math.min(l.qty + qty, 99) } : l,
        );
      }
      return [...prev, { slug, qty: Math.min(qty, 99) }];
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(qty, 99) } : l)),
    );
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setCart((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);
  const signIn = useCallback((next: User) => setUser(next), []);
  const signOut = useCallback(() => setUser(null), []);
  const addOrder = useCallback((order: Order) => setOrders((prev) => [order, ...prev]), []);

  const cartDetailed = useMemo(
    () =>
      cart
        .map((line) => {
          const product = getProduct(line.slug);
          return product ? { product, qty: line.qty } : null;
        })
        .filter((x): x is { product: Product; qty: number } => x !== null),
    [cart],
  );

  const value = useMemo<StoreValue>(
    () => ({
      ready,
      cart,
      cartCount: cart.reduce((n, l) => n + l.qty, 0),
      cartDetailed,
      subtotal: cartDetailed.reduce((sum, l) => sum + l.product.price * l.qty, 0),
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      user,
      signIn,
      signOut,
      orders,
      addOrder,
    }),
    [
      ready,
      cart,
      cartDetailed,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      user,
      signIn,
      signOut,
      orders,
      addOrder,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}

/* ------------------------------------------------------------------ *
 * Order helpers
 * ------------------------------------------------------------------ */
export const SHIPPING_FLAT = 6.5;
export const SHIPPING_FREE_THRESHOLD = 75;
export const TAX_RATE = 0.0825;

export function shippingFor(subtotal: number): number {
  return subtotal >= SHIPPING_FREE_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT;
}

export function taxFor(subtotal: number): number {
  return Math.round(subtotal * TAX_RATE * 100) / 100;
}

/** Human-friendly, sortable order number: HP-8FK3QZ. */
export function newOrderId(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `HP-${out}`;
}
