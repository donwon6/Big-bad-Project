import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";
import ProductArt from "@/components/ProductArt";
import ProductCard from "@/components/ProductCard";
import Stars from "@/components/Stars";
import { formatPrice, getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return { title: product.name, description: product.description };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="wrap">
      <nav className="crumbs" aria-label="Breadcrumb" data-testid="breadcrumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`}>{product.category}</Link>
        <span>/</span>
        {product.name}
      </nav>

      <div className="pdp" data-testid="product-detail" data-slug={product.slug}>
        <div className="pdp-art">
          <ProductArt {...product.art} id={`pdp-${product.slug}`} />
          {!product.inStock ? <span className="badge badge-out">Sold out</span> : null}
        </div>

        <div>
          <p className="eyebrow">{product.category}</p>
          <h1 data-testid="product-title">{product.name}</h1>
          <div className="pdp-meta">
            <span className="price" data-testid="detail-price">
              {formatPrice(product.price)}
            </span>
            <Stars rating={product.rating} count={product.reviewCount} />
            <span
              className={product.inStock ? "pill" : "pill pill-muted"}
              data-testid="stock-status"
            >
              {product.inStock ? "In stock" : "Sold out"}
            </span>
          </div>

          <p data-testid="product-description">{product.description}</p>

          <AddToCart product={product} />

          <h3 style={{ margin: "28px 0 4px", fontSize: "1rem" }}>Details</h3>
          <ul className="spec-list" data-testid="spec-list">
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>

          <p className="small muted" style={{ marginTop: 20 }}>
            Ships in 1–2 business days · Free returns for 60 days
          </p>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-head">
            <h2>Goes well with</h2>
          </div>
          <div className="grid" data-testid="related-grid">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
