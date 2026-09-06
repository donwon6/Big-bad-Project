# Harbor & Pine — demo storefront

A small, real-looking e-commerce site built to be **walked through by an agent**.
It is a complete shopping flow — browse, filter, product page, cart, a validating
checkout, order confirmation, sign-in and order history — with no backend, no
external assets and no API keys. Deploys to Vercel with zero configuration.

Everything is fake: no order is fulfilled and no payment is ever taken.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build && npm start   # production build
npm run typecheck            # tsc --noEmit
```

## Deploy to Vercel

Zero config — Vercel detects Next.js and needs no environment variables.

- **Dashboard:** import the repo at [vercel.com/new](https://vercel.com/new) and accept the defaults.
- **CLI:** `npx vercel` (preview) or `npx vercel --prod`.

## Demo account

| Field    | Value                    |
| -------- | ------------------------ |
| Email    | `dana@harborandpine.com` |
| Password | `brewbetter`             |

Any other combination is rejected with a visible error, so both the happy and
unhappy sign-in paths are walkable. The credentials are also printed on the
sign-in page.

## Flows to walk

Each of these is a self-contained scenario with an observable end state.

1. **Browse and filter** — `/shop`: search box, four category chips, four sort
   orders, live result count, and an empty state with a *Clear filters* button
   (search `xyzzy` to reach it).
2. **Product to cart** — `/product/harbor-hand-grinder`: quantity stepper
   (clamped 1–10), *Add to cart*, inline confirmation, header cart badge.
3. **Sold-out product** — `/product/tidewater-travel-tumbler`: the add button is
   disabled and the stock pill reads *Sold out*.
4. **Cart maths** — `/cart`: per-line quantity and remove, subtotal, shipping
   (free at $75, otherwise $6.50), 8.25% tax, and a "spend $X more for free
   shipping" nudge that disappears once you cross the threshold.
5. **Checkout validation** — `/checkout`: submitting empty raises 10 field
   errors plus a summary banner. Malformed email, a 3-digit ZIP, a short card
   number and a bad `MM/YY` each produce their own message. Errors clear as you
   type. Switching to express shipping changes the total.
6. **Place an order** — a valid submit shows a pending button, empties the cart
   and lands on `/checkout/success` with a generated order number (`HP-XXXXXX`).
7. **Sign in** — `/login`: wrong password shows an error; the demo account lands
   on `/account`.
8. **Order history and reorder** — `/account`: past orders with status, and
   *Buy it again*, which refills the cart and navigates to it.
9. **404** — any unknown URL, e.g. `/product/does-not-exist`.

An empty cart redirects `/checkout` back to `/cart`, so step 5 needs step 2 first.

## Selectors

Every interactive element carries a stable `data-testid`. Lists also carry a
`data-slug` (or `data-order`) so a single row can be addressed directly:

```
[data-testid="cart-line"][data-slug="harbor-hand-grinder"]
```

| Area     | Test ids                                                                                                          |
| -------- | ----------------------------------------------------------------------------------------------------------------- |
| Header   | `brand-link`, `nav-home`, `nav-shop`, `nav-journal`, `nav-about`, `account-link`, `cart-link`, `cart-count`          |
| Shop     | `search-input`, `filter-all`, `filter-brewing`, `filter-drinkware`, `filter-coffee`, `filter-home`, `sort-select`, `result-count`, `product-grid`, `product-card`, `empty-results`, `clear-filters` |
| Product  | `product-detail`, `product-title`, `detail-price`, `stock-status`, `qty-decrease`, `qty-value`, `qty-increase`, `add-to-cart`, `added-confirmation`, `spec-list` |
| Cart     | `cart-lines`, `cart-line`, `line-qty`, `line-qty-increase`, `line-qty-decrease`, `line-total`, `remove-item`, `cart-empty`, `summary-subtotal`, `summary-shipping`, `summary-tax`, `summary-total`, `free-shipping-note`, `checkout-button` |
| Checkout | `checkout-form`, `error-summary`, `input-email`, `input-firstName`, `input-lastName`, `input-address`, `input-city`, `input-state`, `input-zip`, `input-card`, `input-expiry`, `input-cvc`, `error-<field>`, `shipping-standard`, `shipping-express`, `place-order` |
| Success  | `success-heading`, `order-number`, `order-total`, `order-eta`, `order-items`, `order-item`, `view-orders`           |
| Auth     | `login-form`, `login-email`, `login-password`, `login-submit`, `login-error`, `demo-credentials`                    |
| Account  | `account-signed-in`, `account-signed-out`, `account-name`, `account-email`, `order-list`, `order-row`, `order-id`, `order-status`, `reorder`, `sign-out` |

## How it is built

- **Next.js 15 (App Router) + TypeScript.** Content pages are static; only
  `/shop` is dynamic, for its `?category=` query.
- **No external requests.** Product imagery is generated inline SVG and the type
  is a system font stack, so the site renders identically offline and takes the
  same screenshot every time.
- **State lives in `localStorage`** (`components/store.tsx`) — cart, session and
  orders. Reads happen after mount behind a `ready` flag, so there is no
  hydration mismatch and no flash of an empty cart. Clearing site data resets
  the demo.
- **Hand-written CSS** in `app/globals.css`, one set of tokens at the top.

```
app/          routes: home, shop, product/[slug], cart, checkout, success, login, account, journal, about
components/   Header, Footer, ProductCard, ProductArt, ShopBrowser, AddToCart, store
lib/          products.ts (12 products), journal.ts (3 posts)
```

To change the catalogue, edit `lib/products.ts` — the grid, filters, product
pages and related-product rails all read from it.
