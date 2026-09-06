import type { Metadata } from "next";
import Link from "next/link";
import ProductArt from "@/components/ProductArt";

export const metadata: Metadata = {
  title: "About",
  description: "Who we are, how we source, and how shipping and returns work.",
};

const FAQ = [
  {
    q: "How fresh is the coffee when it ships?",
    a: "Every bag leaves within 24 hours of a roast. We roast Tuesdays and Fridays, so nothing sits.",
  },
  {
    q: "Do you ship outside the US?",
    a: "Canada and the UK for gear. Coffee is continental US only, because it stops being fresh in customs.",
  },
  {
    q: "Can I change my subscription?",
    a: "Pause, skip or swap the roast any time from your account. Changes made before Monday apply to that week.",
  },
  {
    q: "Is this a real store?",
    a: "No. Harbor & Pine is a demo storefront. No orders are fulfilled and no payment is ever taken.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <p className="eyebrow">Since 2016</p>
          <h1>About Harbor &amp; Pine</h1>
          <p>
            A small shop on the north side of Portland that sells the brewing
            gear we use ourselves and roasts the coffee to go with it.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <h2>Our story</h2>
            <p style={{ marginTop: 16, color: "var(--ink-2)" }}>
              We started in a 400 square foot storefront with one roaster and a
              counter made from a salvaged door. The idea was simple: carry
              fewer things, know all of them well, and be honest when the
              cheaper option is the better one.
            </p>
            <p style={{ color: "var(--ink-2)" }}>
              Ten years later the roaster is bigger and the counter is the same
              door. We still carry twelve products, and every one of them has
              lived in a staff kitchen for a season before it went on the shelf.
            </p>
          </div>
          <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "4 / 3", border: "1px solid var(--line)" }}>
            <ProductArt shape="grinder" from="#24463c" to="#c9a227" id="about" />
          </div>
        </div>
      </section>

      <section className="section" id="sourcing" style={{ background: "var(--paper-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <h2>Sourcing</h2>
          <p style={{ marginTop: 16, maxWidth: "68ch", color: "var(--ink-2)" }}>
            We buy through three importers we have worked with since the second
            year, and we publish what we paid per pound at the farm gate on every
            bag. When a lot costs more than the shelf price supports, we either
            raise the price or we do not carry it.
          </p>
        </div>
      </section>

      <section className="section" id="shipping">
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            <h2 style={{ fontSize: "1.5rem" }}>Shipping</h2>
            <p style={{ marginTop: 12, color: "var(--ink-2)" }}>
              Standard shipping is $6.50 and free over $75, arriving in four to
              six business days. Express is $14 and arrives in two. Orders placed
              before noon Pacific go out the same day.
            </p>
          </div>
          <div id="returns">
            <h2 style={{ fontSize: "1.5rem" }}>Returns</h2>
            <p style={{ marginTop: 12, color: "var(--ink-2)" }}>
              Sixty days on gear, used or unused. If it did not work out, we pay
              the return shipping. Coffee is not returnable, but if a bag is off
              we will replace it — just tell us the roast date.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="faq" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 style={{ marginBottom: 24 }}>Frequently asked</h2>
          <div className="stack" data-testid="faq-list">
            {FAQ.map((item) => (
              <div className="panel" key={item.q} data-testid="faq-item">
                <h3 style={{ fontFamily: "var(--sans)", fontSize: "1rem", marginBottom: 8 }}>{item.q}</h3>
                <p style={{ margin: 0, color: "var(--ink-2)" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="contact" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="panel" style={{ display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "1.375rem", marginBottom: 6 }}>Still have a question?</h2>
              <p className="muted" style={{ margin: 0 }}>
                We answer email within a business day — hello@harborandpine.example
              </p>
            </div>
            <Link href="/shop" className="btn btn-primary" data-testid="about-shop-cta">
              Browse the shop
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
