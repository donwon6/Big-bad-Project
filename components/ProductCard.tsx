import Link from "next/link";
import ProductArt from "./ProductArt";
import Stars from "./Stars";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="card"
      data-testid="product-card"
      data-slug={product.slug}
    >
      <div className="card-art">
        <ProductArt {...product.art} id={`card-${product.slug}`} />
        {!product.inStock ? (
          <span className="badge badge-out">Sold out</span>
        ) : product.badge ? (
          <span className="badge">{product.badge}</span>
        ) : null}
      </div>
      <div className="card-body">
        <h3 data-testid="product-name">{product.name}</h3>
        <p className="card-tagline">{product.tagline}</p>
        <div className="card-foot">
          <span className="price" data-testid="product-price">
            {formatPrice(product.price)}
          </span>
          <Stars rating={product.rating} count={product.reviewCount} />
        </div>
      </div>
    </Link>
  );
}
