import type { Metadata } from "next";
import ShopBrowser from "@/components/ShopBrowser";
import { categories, type Category } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Brewing gear, drinkware and fresh-roasted coffee.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const initialCategory =
    category && categories.includes(category as Category) ? (category as Category) : null;

  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <p className="eyebrow">Everything we carry</p>
          <h1>Shop</h1>
          <p>
            Twelve things, chosen because we use them ourselves. If it is listed
            here, someone on staff has lived with it for at least a season.
          </p>
        </div>
      </div>

      <div className="wrap section" style={{ paddingTop: 0 }}>
        <ShopBrowser initialCategory={initialCategory} />
      </div>
    </>
  );
}
