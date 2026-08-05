import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import styles from "../pages.module.css";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);

  return {
    title: t.about.title,
    description: t.about.lede,
    alternates: {
      canonical: `/${lang}/about`,
      languages: { en: "/en/about", ar: "/ar/about" },
    },
    openGraph: { title: t.about.title, description: t.about.lede },
  };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <div className={`container ${styles.page}`}>
      <header className="pageHead">
        <h1>{t.about.title}</h1>
        <p>{t.about.lede}</p>
      </header>

      <section className={styles.prose}>
        <h2 className={styles.sectionTitle}>{t.about.storyTitle}</h2>
        <div className={styles.proseBody}>
          {t.about.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className={styles.valuesSection}>
        <h2 className={styles.sectionTitle}>{t.about.valuesTitle}</h2>
        <ul className={styles.values}>
          {t.about.values.map((value) => (
            <li key={value.title} className={styles.reason}>
              <h3 className={styles.reasonTitle}>{value.title}</h3>
              <p className={styles.reasonBody}>{value.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
