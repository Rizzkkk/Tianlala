import type { Metadata } from "next";
import { notFound } from "next/navigation";

import MenuBrowser from "@/components/MenuBrowser";
import { menu } from "@/data/menu";
import { site } from "@/data/site";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import styles from "../pages.module.css";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/menu">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);

  return {
    title: t.menu.title,
    description: t.menu.lede,
    alternates: {
      canonical: `/${lang}/menu`,
      languages: { en: "/en/menu", ar: "/ar/menu" },
    },
    openGraph: { title: t.menu.title, description: t.menu.lede },
  };
}

export default async function MenuPage({ params }: PageProps<"/[lang]/menu">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  // Schema.org Menu, so search engines can surface items and prices directly.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${site.name} ${t.menu.title}`,
    inLanguage: lang,
    hasMenuItem: menu.map((item) => ({
      "@type": "MenuItem",
      name: item.name[lang],
      offers: {
        "@type": "Offer",
        price: item.priceSAR,
        priceCurrency: "SAR",
      },
      nutrition: {
        "@type": "NutritionInformation",
        calories: `${item.calories} cal`,
      },
    })),
  };

  return (
    <div className={`container ${styles.page}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="pageHead">
        <h1>{t.menu.title}</h1>
        <p>{t.menu.lede}</p>
      </header>

      <div style={{ marginTop: "2.5rem" }}>
        <MenuBrowser locale={lang} t={t} />
      </div>

      <footer className={styles.notes}>
        <p>{t.menu.vatNote}</p>
        <p>{t.menu.caloriesNote}</p>
        <p className={styles.notesMuted}>{t.menu.priceDisclaimer}</p>
      </footer>
    </div>
  );
}
