"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { categories, products, type Category } from "@/lib/products";

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

const SORTS: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

export default function ShopBrowser({ initialCategory }: { initialCategory: Category | null }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | null>(initialCategory);
  const [sort, setSort] = useState<Sort>("featured");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = products.filter((p) => {
      if (category && p.category !== category) return false;
      if (!needle) return true;
      return (
        p.name.toLowerCase().includes(needle) ||
        p.tagline.toLowerCase().includes(needle) ||
        p.category.toLowerCase().includes(needle)
      );
    });

    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [query, category, sort]);

  return (
    <>
      <div className="filters">
        <input
          className="input search"
          type="search"
          placeholder="Search products"
          aria-label="Search products"
          data-testid="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="chips" role="group" aria-label="Filter by category">
          <button
            type="button"
            className="chip"
            data-testid="filter-all"
            aria-pressed={category === null}
            onClick={() => setCategory(null)}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className="chip"
              data-testid={`filter-${c.toLowerCase()}`}
              aria-pressed={category === c}
              onClick={() => setCategory(category === c ? null : c)}
            >
              {c}
            </button>
          ))}
        </div>

        <select
          className="select"
          aria-label="Sort products"
          data-testid="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <p className="result-count" data-testid="result-count">
        {visible.length} {visible.length === 1 ? "product" : "products"}
        {category ? ` in ${category}` : ""}
        {query.trim() ? ` matching “${query.trim()}”` : ""}
      </p>

      {visible.length === 0 ? (
        <div className="empty" data-testid="empty-results">
          <p style={{ marginBottom: 4 }}>
            <strong>Nothing matched that search.</strong>
          </p>
          <p style={{ margin: 0 }}>Try a broader term, or clear the filters.</p>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ marginTop: 20 }}
            data-testid="clear-filters"
            onClick={() => {
              setQuery("");
              setCategory(null);
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid" data-testid="product-grid">
          {visible.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
