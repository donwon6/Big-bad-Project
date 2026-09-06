import Link from "next/link";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { href: "/shop?category=Brewing", label: "Brewing" },
      { href: "/shop?category=Drinkware", label: "Drinkware" },
      { href: "/shop?category=Coffee", label: "Coffee" },
      { href: "/shop?category=Home", label: "Home" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "Our story" },
      { href: "/journal", label: "Journal" },
      { href: "/about#sourcing", label: "Sourcing" },
      { href: "/about#contact", label: "Contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/account", label: "Order status" },
      { href: "/about#shipping", label: "Shipping" },
      { href: "/about#returns", label: "Returns" },
      { href: "/about#faq", label: "FAQ" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer" data-testid="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ marginBottom: 12 }}>
              Harbor &amp; Pine
            </div>
            <p className="small muted" style={{ maxWidth: "34ch" }}>
              Brewing gear and small-lot coffee from a shop on the north side of
              Portland. Since 2016.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-note">
          <span>© {new Date().getFullYear()} Harbor &amp; Pine Supply Co.</span>
          <span>Demo storefront — no real orders are placed and no payment is taken.</span>
        </div>
      </div>
    </footer>
  );
}
