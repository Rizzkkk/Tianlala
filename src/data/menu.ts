import type { CategorySlug } from "./categories";

/**
 * TIANLALA Saudi Arabia menu.
 *
 * SOURCE: prices (SAR) and calorie figures were recovered from the HungerStation
 * Al Olaya storefront. They are NOT brand-supplied.
 *
 * REVIEW BEFORE LAUNCH:
 *  - Every `priceSAR` and `calories` value needs brand sign-off. Publishing stale
 *    prices is a commercial risk, and calorie figures are subject to SFDA menu
 *    labelling rules.
 *  - Every `name.ar` is a first-pass translation and needs a native review pass.
 *
 * IMAGES: `image: null` is not a defect. Items without a photo render as
 * typographic menu-board cards (see `MenuCard`). To promote an item to a photo
 * card, drop the file into `public/products/` and set the field.
 */
export type MenuItem = {
  slug: string;
  name: { en: string; ar: string };
  category: CategorySlug;
  priceSAR: number;
  calories: number;
  image: string | null;
  bestSeller?: boolean;
};

export const menu: MenuItem[] = [
  // Best sellers ------------------------------------------------------------
  {
    slug: "mango-shake-tea",
    name: { en: "Mango Shake Tea", ar: "شاي المانجو المخفوق" },
    category: "best-sellers",
    priceSAR: 25,
    calories: 290,
    image: "/products/shake-a-mango-tea.jpg",
    bestSeller: true,
  },
  {
    slug: "fresh-fruit-tea-bucket",
    name: { en: "Fresh Fruit Tea Bucket", ar: "دلو شاي الفواكه الطازجة" },
    category: "best-sellers",
    priceSAR: 29,
    calories: 230,
    image: "/products/fresh-fruit-tea-bucket.jpg",
    bestSeller: true,
  },
  {
    slug: "happy-family-bucket",
    name: { en: "Happy Family Bucket", ar: "دلو العائلة السعيدة" },
    category: "best-sellers",
    priceSAR: 29,
    calories: 420,
    image: "/products/happy-family-bucket.jpg",
    bestSeller: true,
  },

  // Fruit tea ---------------------------------------------------------------
  {
    slug: "refreshing-iced-lemonade",
    name: { en: "Refreshing Iced Lemonade", ar: "ليموناضة مثلجة منعشة" },
    category: "fruit-tea",
    priceSAR: 10,
    calories: 110,
    image: "/products/ice-fresh-lemonade.jpg",
  },
  {
    slug: "peach-jasmine-tea",
    name: { en: "Peach Jasmine Tea", ar: "شاي الياسمين بالخوخ" },
    category: "fruit-tea",
    priceSAR: 23,
    calories: 180,
    image: null,
  },
  {
    slug: "grape-lemon-tea",
    name: { en: "Grape Lemon Tea", ar: "شاي العنب بالليمون" },
    category: "fruit-tea",
    priceSAR: 22,
    calories: 190,
    image: "/products/grape-lemon-tea.jpg",
  },
  {
    slug: "black-lemon-tea",
    name: { en: "Black Lemon Tea", ar: "شاي أسود بالليمون" },
    category: "fruit-tea",
    priceSAR: 21,
    calories: 95,
    image: null,
  },
  {
    slug: "mango-passion-fruit-tea",
    name: { en: "Mango Passion Fruit Tea", ar: "شاي المانجو وفاكهة العاطفة" },
    category: "fruit-tea",
    priceSAR: 23,
    calories: 175,
    image: null,
  },
  {
    slug: "sweet-orange-passion-fruit-tea",
    name: {
      en: "Sweet Orange Tea With Passion Fruit",
      ar: "شاي البرتقال الحلو مع فاكهة العاطفة",
    },
    category: "fruit-tea",
    priceSAR: 22,
    calories: 185,
    image: null,
  },
  {
    slug: "peach-watermelon-bucket",
    name: { en: "Peach And Watermelon Bucket", ar: "دلو الخوخ والبطيخ" },
    category: "fruit-tea",
    priceSAR: 29,
    calories: 220,
    image: null,
  },
  {
    slug: "black-tea-with-honey",
    name: { en: "Black Tea With Honey", ar: "شاي أسود بالعسل" },
    category: "fruit-tea",
    priceSAR: 14,
    calories: 140,
    image: null,
  },
  {
    slug: "peach-oolong-tea",
    name: { en: "Peach Oolong Tea", ar: "شاي أولونغ بالخوخ" },
    category: "fruit-tea",
    priceSAR: 14,
    calories: 135,
    image: null,
  },

  // Milk tea ----------------------------------------------------------------
  {
    slug: "brown-sugar-boba-milk-tea",
    name: {
      en: "Brown Sugar Boba Milk Tea",
      ar: "شاي الحليب بالبوبا والسكر البني",
    },
    category: "milk-tea",
    priceSAR: 20,
    calories: 290,
    image: "/products/brown-sugar-boba-milk-tea.jpg",
  },
  {
    slug: "boba-milk-tea",
    name: { en: "Boba Milk Tea", ar: "شاي الحليب بالبوبا" },
    category: "milk-tea",
    priceSAR: 20,
    calories: 300,
    image: "/products/boba-milk-tea.jpg",
  },
  {
    slug: "milk-tea-caramel-pudding",
    name: { en: "Milk Tea With Caramel Pudding", ar: "شاي الحليب ببودينغ الكراميل" },
    category: "milk-tea",
    priceSAR: 20,
    calories: 310,
    image: null,
  },
  {
    slug: "milk-tea-coconut-jelly",
    name: { en: "Milk Tea With Coconut Jelly", ar: "شاي الحليب بجيلي جوز الهند" },
    category: "milk-tea",
    priceSAR: 20,
    calories: 270,
    image: "/products/coconut-jelly-milk-tea.jpg",
  },
  {
    slug: "jasmine-milk-tea",
    name: { en: "Jasmine Milk Tea", ar: "شاي الحليب بالياسمين" },
    category: "milk-tea",
    priceSAR: 19,
    calories: 185,
    image: "/products/blooming-jasmine-milk-tea.jpg",
  },
  {
    slug: "peach-oolong-milk-tea",
    name: { en: "Peach Oolong Milk Tea", ar: "شاي الحليب بأولونغ الخوخ" },
    category: "milk-tea",
    priceSAR: 19,
    calories: 185,
    image: null,
  },

  // Shakes & smoothies ------------------------------------------------------
  {
    slug: "strawberry-milkshake",
    name: { en: "Strawberry Milkshake", ar: "ميلك شيك الفراولة" },
    category: "shakes-smoothies",
    priceSAR: 18,
    calories: 300,
    image: "/products/strawberry-milk-shake.jpg",
  },
  {
    slug: "peach-milkshake",
    name: { en: "Peach Milkshake", ar: "ميلك شيك الخوخ" },
    category: "shakes-smoothies",
    priceSAR: 18,
    calories: 290,
    image: "/products/peach-milk-shake.jpg",
  },
  {
    slug: "grape-shake-tea",
    name: { en: "Grape Shake Tea", ar: "شاي العنب المخفوق" },
    category: "shakes-smoothies",
    priceSAR: 25,
    calories: 285,
    image: "/products/shake-a-grape-tea.jpg",
  },
  {
    slug: "strawberry-shake-tea",
    name: { en: "Strawberry Shake Tea", ar: "شاي الفراولة المخفوق" },
    category: "shakes-smoothies",
    priceSAR: 25,
    calories: 285,
    image: null,
  },
  {
    slug: "strawberry-pudding-smoothie",
    name: { en: "Strawberry Pudding Smoothie", ar: "سموذي الفراولة بالبودينغ" },
    category: "shakes-smoothies",
    priceSAR: 20,
    calories: 320,
    image: null,
  },
  {
    slug: "mango-pudding-smoothie",
    name: { en: "Mango Pudding Smoothie", ar: "سموذي المانجو بالبودينغ" },
    category: "shakes-smoothies",
    priceSAR: 20,
    calories: 310,
    image: null,
  },
  {
    slug: "grape-pudding-smoothie",
    name: { en: "Grape Pudding Smoothie", ar: "سموذي العنب بالبودينغ" },
    category: "shakes-smoothies",
    priceSAR: 20,
    calories: 315,
    image: null,
  },

  // Coffee ------------------------------------------------------------------
  {
    slug: "iced-americano",
    name: { en: "Iced Americano", ar: "أمريكانو مثلج" },
    category: "coffee",
    priceSAR: 12,
    calories: 15,
    image: null,
  },
  {
    slug: "brown-sugar-boba-latte",
    name: { en: "Brown Sugar Boba Latte", ar: "لاتيه البوبا بالسكر البني" },
    category: "coffee",
    priceSAR: 23,
    calories: 260,
    image: null,
  },
  {
    slug: "snow-top-coffee",
    name: { en: "Snow Top Coffee", ar: "قهوة سنو توب" },
    category: "coffee",
    priceSAR: 21,
    calories: 220,
    image: "/products/snow-top-coffee.jpg",
  },
  {
    slug: "strawberry-latte",
    name: { en: "Strawberry Latte", ar: "لاتيه الفراولة" },
    category: "coffee",
    priceSAR: 18,
    calories: 240,
    image: null,
  },

  // Ice cream ---------------------------------------------------------------
  {
    slug: "strawberry-sundae",
    name: { en: "Strawberry Sundae", ar: "صنداي الفراولة" },
    category: "ice-cream",
    priceSAR: 9,
    calories: 210,
    image: "/products/strawberry-sundae.jpg",
  },
  {
    slug: "mango-sundae",
    name: { en: "Mango Sundae", ar: "صنداي المانجو" },
    category: "ice-cream",
    priceSAR: 9,
    calories: 215,
    image: "/products/mango-sundae.jpg",
  },
  {
    slug: "peach-sundae",
    name: { en: "Peach Sundae", ar: "صنداي الخوخ" },
    category: "ice-cream",
    priceSAR: 9,
    calories: 205,
    image: null,
  },
  {
    slug: "brown-sugar-boba-sundae",
    name: { en: "Brown Sugar Boba Sundae", ar: "صنداي البوبا بالسكر البني" },
    category: "ice-cream",
    priceSAR: 9,
    calories: 280,
    image: "/products/brown-sugar-boba-sundae.jpg",
  },
];

export const bestSellers = menu.filter((item) => item.bestSeller);

export function menuByCategory(category: CategorySlug) {
  return menu.filter((item) => item.category === category);
}
