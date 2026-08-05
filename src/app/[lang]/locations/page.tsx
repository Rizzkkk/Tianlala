import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { branches, site } from "@/data/site";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import styles from "../pages.module.css";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/locations">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);

  return {
    title: t.locations.title,
    description: t.locations.lede,
    alternates: {
      canonical: `/${lang}/locations`,
      languages: { en: "/en/locations", ar: "/ar/locations" },
    },
    openGraph: { title: t.locations.title, description: t.locations.lede },
  };
}

export default async function LocationsPage({
  params,
}: PageProps<"/[lang]/locations">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  const jsonLd = branches.map((branch) => ({
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: `${site.name} ${branch.name[lang]}`,
    servesCuisine: "Bubble tea",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SA",
      addressLocality: branch.city[lang],
      addressRegion: branch.district[lang],
      ...(branch.address ? { streetAddress: branch.address[lang] } : {}),
    },
  }));

  return (
    <div className={`container ${styles.page}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="pageHead">
        <h1>{t.locations.title}</h1>
        <p>{t.locations.lede}</p>
      </header>

      <ul className={styles.branches}>
        {branches.map((branch) => (
          <li key={branch.slug} className={styles.branch}>
            <h2 className={styles.branchName}>{branch.name[lang]}</h2>
            <p className={styles.branchDistrict}>
              {branch.district[lang]}, {branch.city[lang]}
            </p>

            <p className={styles.branchDetail}>
              {branch.address ? (
                branch.address[lang]
              ) : (
                <span className="pending">{t.locations.addressPending}</span>
              )}
            </p>
            <p className={styles.branchDetail}>
              {branch.hours ?? (
                <span className="pending">{t.locations.hoursPending}</span>
              )}
            </p>

            <div className={styles.branchActions}>
              <a
                href={site.delivery.hungerstation}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btnPrimary"
              >
                {t.locations.orderDelivery}
              </a>
              {branch.mapsUrl && (
                <a
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btnOutline"
                >
                  {t.locations.getDirections}
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>

      <p className={styles.moreSoon}>{t.locations.moreSoon}</p>
    </div>
  );
}
