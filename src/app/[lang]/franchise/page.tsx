import type { Metadata } from "next";
import { notFound } from "next/navigation";

import FranchiseForm from "@/components/FranchiseForm";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import styles from "../pages.module.css";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/franchise">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);

  return {
    title: t.franchise.title,
    description: t.franchise.lede,
    alternates: {
      canonical: `/${lang}/franchise`,
      languages: { en: "/en/franchise", ar: "/ar/franchise" },
    },
    openGraph: { title: t.franchise.title, description: t.franchise.lede },
  };
}

export default async function FranchisePage({
  params,
}: PageProps<"/[lang]/franchise">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <div className={`container ${styles.page}`}>
      <header className="pageHead">
        <h1>{t.franchise.title}</h1>
        <p>{t.franchise.lede}</p>
      </header>

      <div className={styles.franchiseGrid}>
        <section>
          <h2 className={styles.sectionTitle}>{t.franchise.whyTitle}</h2>
          <ul className={styles.reasons}>
            {t.franchise.why.map((item) => (
              <li key={item.title} className={styles.reason}>
                <h3 className={styles.reasonTitle}>{item.title}</h3>
                <p className={styles.reasonBody}>{item.body}</p>
              </li>
            ))}
          </ul>

          <h2 className={styles.sectionTitle} style={{ marginTop: "3rem" }}>
            {t.franchise.packageTitle}
          </h2>
          <p className={styles.packageNote}>{t.franchise.packageTodo}</p>
        </section>

        <section id="apply" className={styles.formPanel}>
          <h2 className={styles.sectionTitle}>{t.franchise.formTitle}</h2>
          <div className={styles.formPanelInner}>
            <FranchiseForm t={t} />
          </div>
        </section>
      </div>
    </div>
  );
}
