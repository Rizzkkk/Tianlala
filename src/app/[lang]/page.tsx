import Link from "next/link";
import { notFound } from "next/navigation";

import Hero from "@/components/Hero";
import MenuCard from "@/components/MenuCard";
import { bestSellers } from "@/data/menu";
import { site } from "@/data/site";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import styles from "./home.module.css";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    sameAs: [site.social.instagram].filter(Boolean),
    foundingDate: "2015",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero locale={lang} t={t} />

      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHead}>
          <div>
            <h2 className={styles.sectionTitle}>{t.home.bestSellersTitle}</h2>
            <p className={styles.sectionLede}>{t.home.bestSellersLede}</p>
          </div>
          <Link href={`/${lang}/menu`} className={styles.moreLink}>
            {t.home.viewFullMenu}
          </Link>
        </div>

        <ul className={styles.bestSellers}>
          {bestSellers.map((item) => (
            <li key={item.slug}>
              <MenuCard item={item} locale={lang} t={t} />
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.story}>
        <div className={`container ${styles.storyInner}`}>
          <div>
            <h2 className={styles.sectionTitle}>{t.home.storyTitle}</h2>
            <p className={styles.storyBody}>{t.home.storyBody}</p>
          </div>
          <ul className={styles.values}>
            {t.about.values.map((value) => (
              <li key={value.title} className={styles.value}>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueBody}>{value.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`container ${styles.section}`}>
        <div className={styles.cta}>
          <h2 className={styles.ctaTitle}>{t.home.franchiseTeaser}</h2>
          <p className={styles.ctaBody}>{t.home.franchiseTeaserBody}</p>
          <div className={styles.ctaButton}>
            <Link href={`/${lang}/franchise`} className="btn btnBrand">
              {t.home.franchiseTeaserCta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
