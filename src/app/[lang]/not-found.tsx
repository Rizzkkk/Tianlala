import Link from "next/link";
import { lang } from "next/root-params";

import { defaultLocale, getDictionary, hasLocale } from "@/i18n/dictionaries";
import styles from "./pages.module.css";

/**
 * A real 404. The old PH site answered every unknown URL with HTTP 200 and a
 * Chinese error page, which let search engines index unlimited junk URLs.
 * Rendering this file makes Next return a genuine 404 status.
 */
export default async function NotFound() {
  const segment = await lang();
  const locale = segment && hasLocale(segment) ? segment : defaultLocale;
  const t = await getDictionary(locale);

  return (
    <div className={`container ${styles.notFound}`}>
      <p className={styles.notFoundCode}>404</p>
      <h1 className={styles.notFoundTitle}>{t.notFound.title}</h1>
      <p className={styles.notFoundBody}>{t.notFound.body}</p>
      <div className={styles.notFoundCta}>
        <Link href={`/${locale}`} className="btn btnPrimary">
          {t.notFound.cta}
        </Link>
      </div>
    </div>
  );
}
