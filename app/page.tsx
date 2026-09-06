import Link from "next/link";
import ProductArt from "@/components/ProductArt";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function HomePage() {
  const featured = products.filter((p) => p.badge).slice(0, 3);
  const coffee = products.filter((p) => p.category === "Coffee");

  return (
    <>
      <section className="hero" data-testid="hero">
        <div className="wrap">
          <div>
            <p className="eyebrow">Portland, Oregon — since 2016</p>
            <h1>Better coffee starts with better tools.</h1>
            <p className="lede">
              We stock the small number of things that actually change how your
              morning cup tastes, and we roast the beans to go with them.
            </p>
            <div className="hero-actions">
              <Link href="/shop" className="btn btn-primary btn-lg" data-testid="hero-shop-cta">
                Shop everything
              </Link>
              <Link href="/shop?category=Coffee" className="btn btn-secondary btn-lg" data-testid="hero-coffee-cta">
                Browse coffee
              </Link>
            </div>
          </div>
          <div className="hero-art">
            <ProductArt shape="kettle" from="#24463c" to="#c9a227" id="hero" />
          </div>
        </div>
      </section>

      <section className="trust">
        <div className="wrap">
          <div>
            <h3>Roasted to order</h3>
            <p>Beans leave the roaster within 24 hours of your order being placed.</p>
          </div>
          <div>
            <h3>Free shipping over $75</h3>
            <p>Flat $6.50 below that, anywhere in the continental US.</p>
          </div>
          <div>
            <h3>Sixty-day returns</h3>
            <p>Use it for two months. If it is not right, send it back on us.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>What people keep buying</h2>
              <p>The three we restock most often.</p>
            </div>
            <Link href="/shop" className="btn btn-ghost" data-testid="view-all-featured">
              View all →
            </Link>
          </div>
          <div className="grid" data-testid="featured-grid">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="quote">
        <div className="wrap">
          <blockquote>
            “I came in for a filter and left with a grinder I did not know I
            needed. Six months later it is the thing I would replace first.”
          </blockquote>
          <cite>Dana R. — verified buyer, Seattle</cite>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>This month on the roaster</h2>
              <p>Small lots, roasted Tuesdays and Fridays.</p>
            </div>
            <Link href="/shop?category=Coffee" className="btn btn-ghost" data-testid="view-all-coffee">
              All coffee →
            </Link>
          </div>
          <div className="grid" data-testid="coffee-grid">
            {coffee.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
