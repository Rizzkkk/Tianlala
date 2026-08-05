export type CategorySlug =
  | "best-sellers"
  | "fruit-tea"
  | "milk-tea"
  | "shakes-smoothies"
  | "coffee"
  | "ice-cream";

export type Category = {
  slug: CategorySlug;
  name: { en: string; ar: string };
  /**
   * Tint used by the typographic (photo-less) card so each category reads as a
   * group. Kept as data rather than CSS because `MenuCard` applies these as
   * inline styles, one tint per category, from this single source.
   */
  tint: { bg: string; ink: string; accent: string };
};

export const categories: Category[] = [
  {
    slug: "best-sellers",
    name: { en: "Best Sellers", ar: "الأكثر مبيعًا" },
    tint: { bg: "#FFF6D6", ink: "#4A3B00", accent: "#F5D01E" },
  },
  {
    slug: "fruit-tea",
    name: { en: "Fruit Tea", ar: "شاي الفواكه" },
    tint: { bg: "#E8F7E4", ink: "#1F4620", accent: "#5FB85C" },
  },
  {
    slug: "milk-tea",
    name: { en: "Milk Tea", ar: "شاي الحليب" },
    tint: { bg: "#F5EADC", ink: "#4A3524", accent: "#B4855A" },
  },
  {
    slug: "shakes-smoothies",
    name: { en: "Shakes & Smoothies", ar: "المخفوقات والسموذي" },
    tint: { bg: "#FBE7EF", ink: "#5B1F38", accent: "#E1698F" },
  },
  {
    slug: "coffee",
    name: { en: "Coffee", ar: "القهوة" },
    tint: { bg: "#EDE4DC", ink: "#3A2A1E", accent: "#8B5E3C" },
  },
  {
    slug: "ice-cream",
    name: { en: "Ice Cream", ar: "الآيس كريم" },
    tint: { bg: "#E6EEF9", ink: "#1F3550", accent: "#6A93C8" },
  },
];

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));
