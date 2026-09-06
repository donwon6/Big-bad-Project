"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "./store";

const LINKS = [
  { href: "/", label: "Home", testid: "nav-home" },
  { href: "/shop", label: "Shop", testid: "nav-shop" },
  { href: "/journal", label: "Journal", testid: "nav-journal" },
  { href: "/about", label: "About", testid: "nav-about" },
];

export default function Header() {
  const pathname = usePathname();
  const { cartCount, user, ready } = useStore();

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <div className="announce" data-testid="announcement-bar">
        Free shipping on orders over $75 — roasted and shipped within 24 hours
      </div>
      <header className="site-header">
        <div className="wrap">
          <Link href="/" className="brand" data-testid="brand-link" aria-label="Harbor &amp; Pine, home">
            <BrandMark />
            Harbor &amp; Pine
          </Link>

          <nav className="nav" aria-label="Primary">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={link.testid}
                aria-current={isCurrent(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-right">
            <Link href="/account" className="cart-link" data-testid="account-link">
              {ready && user ? user.name.split(" ")[0] : "Sign in"}
            </Link>
            <Link href="/cart" className="cart-link" data-testid="cart-link">
              <CartIcon />
              Cart
              {ready && cartCount > 0 ? (
                <span className="cart-count" data-testid="cart-count">
                  {cartCount}
                </span>
              ) : null}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 3 L25 17 H7 Z" fill="currentColor" opacity="0.9" />
      <path d="M16 11 L27 27 H5 Z" fill="currentColor" opacity="0.55" />
      <rect x="14.6" y="25" width="2.8" height="5" rx="1.2" fill="currentColor" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 5h2l2.2 10.4a2 2 0 0 0 2 1.6h6.9a2 2 0 0 0 2-1.5L21 8H7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10.5" cy="20" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="20" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
