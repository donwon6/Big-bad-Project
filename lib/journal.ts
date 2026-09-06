export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readingTime: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "grind-size-is-the-whole-game",
    title: "Grind size is most of the game",
    excerpt:
      "Before you buy another dripper, spend two weeks changing one variable. It is almost always this one.",
    date: "2026-08-14",
    author: "Dana Whitfield",
    readingTime: "4 min read",
    body: [
      "Every week someone comes into the shop with a bag of good coffee and a cup they are unhappy with. Nine times out of ten we do not sell them anything. We ask what grinder they are using, and we ask them to go two clicks finer.",
      "Extraction is a race between water and time. Grind too coarse and the water runs through before it has picked up the sugars, leaving something thin and sour. Grind too fine and it lingers, pulling out the bitter compounds that sit deeper in the bean.",
      "The practical advice: change one thing at a time, and give each change three days. Keep your dose and your water the same. Move the grind, taste, write down one word. In a week you will have a setting, and it will be yours rather than one you read on the internet.",
    ],
  },
  {
    slug: "why-we-roast-on-tuesdays",
    title: "Why we roast on Tuesdays and Fridays",
    excerpt:
      "A small roaster's schedule is not an aesthetic choice. It is what keeps the coffee on your counter fresh.",
    date: "2026-07-29",
    author: "Marcus Bell",
    readingTime: "3 min read",
    body: [
      "Coffee is at its best somewhere between four and twenty days off the roast. Earlier than that it is still degassing and the brew is unpredictable. Later, the aromatics start to flatten out.",
      "Twice a week is the rhythm that keeps every bag we ship inside that window without leaving us with pallets of stale inventory. It also means that when a lot sells out we do not backfill it with something older from the warehouse.",
      "If you subscribe, your bag is roasted on the run closest to your renewal date and goes out the same afternoon. That is the whole trick — there is not much more to it.",
    ],
  },
  {
    slug: "a-kettle-that-earns-its-counter-space",
    title: "A kettle that earns its counter space",
    excerpt:
      "What actually matters in a gooseneck, and what is just marketing on a stainless body.",
    date: "2026-06-11",
    author: "Dana Whitfield",
    readingTime: "5 min read",
    body: [
      "The three things that matter are the balance of the spout, the mass of the base, and whether the handle stays cool. Everything else — the temperature readout, the app, the color options — is a preference.",
      "Balance is the one people underrate. A well-counterweighted kettle lets you hold a slow pour at the end of the brew, when the water level is low and a badly balanced kettle wants to dump. That is exactly the moment a pour-over is won or lost.",
      "We carry one kettle. It is not the cheapest and it is not the most expensive. It is the one that four of us kept using at home after the review was over.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
