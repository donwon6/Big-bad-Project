export type Category = "Brewing" | "Drinkware" | "Coffee" | "Home";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: Category;
  rating: number;
  reviewCount: number;
  badge?: string;
  inStock: boolean;
  details: string[];
  /** Drives the generated product artwork. */
  art: { shape: ArtShape; from: string; to: string };
};

export type ArtShape = "mug" | "kettle" | "grinder" | "bag" | "press" | "dripper";

export const products: Product[] = [
  {
    slug: "cascade-pour-over-kettle",
    name: "Cascade Pour-Over Kettle",
    tagline: "Gooseneck control, 1L capacity",
    description:
      "A counterbalanced gooseneck spout gives you a slow, steady pour at any angle. Brushed stainless body with a heat-isolated walnut handle that stays cool through the whole brew.",
    price: 78,
    category: "Brewing",
    rating: 4.8,
    reviewCount: 214,
    badge: "Best seller",
    inStock: true,
    details: [
      "1L / 34oz capacity",
      "Brushed 304 stainless steel",
      "Walnut handle, heat-isolated",
      "Induction and gas compatible",
    ],
    art: { shape: "kettle", from: "#2f4f4a", to: "#7fa8a0" },
  },
  {
    slug: "harbor-hand-grinder",
    name: "Harbor Hand Grinder",
    tagline: "Conical burrs, 38 clicks",
    description:
      "Stainless conical burrs with 38 clicks of adjustment take you from espresso to French press without guesswork. The folding crank tucks flat for travel.",
    price: 132,
    category: "Brewing",
    rating: 4.9,
    reviewCount: 386,
    badge: "Staff pick",
    inStock: true,
    details: [
      "38-click stepped adjustment",
      "Hardened stainless conical burrs",
      "30g bean capacity",
      "Folding crank for packing",
    ],
    art: { shape: "grinder", from: "#3b3a55", to: "#8f8ab8" },
  },
  {
    slug: "pine-ridge-french-press",
    name: "Pine Ridge French Press",
    tagline: "Double-wall, 32oz",
    description:
      "Double-walled stainless keeps four cups hot for an hour, and the two-stage filter pulls out fines so the last cup is as clean as the first.",
    price: 64,
    category: "Brewing",
    rating: 4.6,
    reviewCount: 141,
    inStock: true,
    details: [
      "32oz / four cups",
      "Two-stage mesh filter",
      "Double-wall insulated",
      "Dishwasher safe",
    ],
    art: { shape: "press", from: "#4a3f35", to: "#a9927d" },
  },
  {
    slug: "meridian-glass-dripper",
    name: "Meridian Glass Dripper",
    tagline: "Borosilicate, flat bottom",
    description:
      "A flat-bottom bed and three tapered ribs give an even extraction that is forgiving of a slightly rushed pour. Sits on any mug or carafe up to 4 inches wide.",
    price: 42,
    category: "Brewing",
    rating: 4.5,
    reviewCount: 97,
    inStock: true,
    details: [
      "Borosilicate glass",
      "Flat-bottom brew bed",
      "Uses #2 flat papers",
      "Fits mugs up to 4in",
    ],
    art: { shape: "dripper", from: "#2c4a63", to: "#87b3cf" },
  },
  {
    slug: "everyday-stoneware-mug",
    name: "Everyday Stoneware Mug",
    tagline: "12oz, reactive glaze",
    description:
      "Thrown from speckled stoneware and finished in a reactive glaze, so no two are quite alike. Heavy enough to hold heat, light enough for a morning grip.",
    price: 28,
    category: "Drinkware",
    rating: 4.7,
    reviewCount: 512,
    badge: "Best seller",
    inStock: true,
    details: [
      "12oz capacity",
      "Speckled stoneware",
      "Reactive glaze, one of a kind",
      "Microwave and dishwasher safe",
    ],
    art: { shape: "mug", from: "#6b4f3a", to: "#d3b092" },
  },
  {
    slug: "tidewater-travel-tumbler",
    name: "Tidewater Travel Tumbler",
    tagline: "16oz, six-hour hold",
    description:
      "Vacuum-sealed and gasket-lined, it holds temperature for six hours and fits every cupholder we could find. The lid disassembles for a real cleaning.",
    price: 46,
    category: "Drinkware",
    rating: 4.4,
    reviewCount: 268,
    inStock: false,
    details: [
      "16oz capacity",
      "Six-hour heat retention",
      "Fully disassembling lid",
      "Fits standard cupholders",
    ],
    art: { shape: "mug", from: "#1f3a4d", to: "#6f9bb5" },
  },
  {
    slug: "north-cove-espresso",
    name: "North Cove Espresso",
    tagline: "Whole bean, 12oz",
    description:
      "A medium-dark blend of Colombian and Sumatran beans roasted for syrup and cocoa. Pulls a forgiving shot and holds up to milk without disappearing.",
    price: 21,
    category: "Coffee",
    rating: 4.8,
    reviewCount: 733,
    badge: "Subscribe & save",
    inStock: true,
    details: [
      "12oz whole bean",
      "Colombia + Sumatra blend",
      "Medium-dark roast",
      "Notes of cocoa, molasses, dried fig",
    ],
    art: { shape: "bag", from: "#3d2b23", to: "#9b7358" },
  },
  {
    slug: "morning-watch-filter-roast",
    name: "Morning Watch Filter Roast",
    tagline: "Whole bean, 12oz",
    description:
      "A light-medium Ethiopian washed lot with enough structure for a pour-over and enough sweetness to drink black all morning.",
    price: 23,
    category: "Coffee",
    rating: 4.7,
    reviewCount: 419,
    inStock: true,
    details: [
      "12oz whole bean",
      "Ethiopia, washed",
      "Light-medium roast",
      "Notes of citrus, jasmine, honey",
    ],
    art: { shape: "bag", from: "#7a5a2a", to: "#dcc48a" },
  },
  {
    slug: "decaf-lantern-blend",
    name: "Decaf Lantern Blend",
    tagline: "Whole bean, 12oz",
    description:
      "Sugarcane-processed decaf that keeps its body and sweetness. The one we reach for after four in the afternoon.",
    price: 22,
    category: "Coffee",
    rating: 4.3,
    reviewCount: 156,
    inStock: true,
    details: [
      "12oz whole bean",
      "Sugarcane EA process",
      "Medium roast",
      "Notes of caramel, plum, almond",
    ],
    art: { shape: "bag", from: "#4b3a52", to: "#b096bd" },
  },
  {
    slug: "linen-tea-towel-set",
    name: "Linen Tea Towel Set",
    tagline: "Set of three",
    description:
      "Stonewashed European flax that gets softer every wash and actually dries a wet carafe instead of pushing water around it.",
    price: 34,
    category: "Home",
    rating: 4.6,
    reviewCount: 88,
    inStock: true,
    details: [
      "Set of three",
      "100% European flax linen",
      "Stonewashed finish",
      "20 x 28 inches",
    ],
    art: { shape: "mug", from: "#5b6b4f", to: "#b9c8a5" },
  },
  {
    slug: "walnut-counter-tray",
    name: "Walnut Counter Tray",
    tagline: "Corrals the whole setup",
    description:
      "A shallow walnut tray with a rubber-footed base that keeps grinder, kettle and mugs from wandering across the counter.",
    price: 89,
    category: "Home",
    rating: 4.5,
    reviewCount: 62,
    inStock: true,
    details: [
      "Solid black walnut",
      "16 x 11 inches",
      "Non-slip rubber feet",
      "Finished with hardwax oil",
    ],
    art: { shape: "grinder", from: "#5a3f2b", to: "#c39a6b" },
  },
  {
    slug: "brew-scale-mini",
    name: "Brew Scale Mini",
    tagline: "0.1g, built-in timer",
    description:
      "Reads to a tenth of a gram and starts its timer the moment your first drops land. Slim enough to live under the dripper.",
    price: 58,
    category: "Brewing",
    rating: 4.4,
    reviewCount: 203,
    inStock: true,
    details: [
      "0.1g resolution, 2kg max",
      "Auto-start brew timer",
      "USB-C rechargeable",
      "Silicone heat pad",
    ],
    art: { shape: "dripper", from: "#33474f", to: "#93b6b3" },
  },
];

export const categories: Category[] = ["Brewing", "Drinkware", "Coffee", "Home"];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(cents: number): string {
  return cents.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
