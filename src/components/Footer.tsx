import Link from "next/link";

import Logo from "@/components/Logo";
import { site } from "@/data/site";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import styles from "./Footer.module.css";

type Props = { locale: Locale; t: Dictionary };

/** Renders a value, or a muted "confirming" chip when it is still a placeholder. */
function PendingValue({ value, label }: { value: string | null; label: string }) {
  if (value) return <span>{value}</span>;
  return <span className="pending">{label}</span>;
}

export default function Footer({ locale, t }: Props) {
  const links = [
    { href: `/${locale}/menu`, label: t.nav.menu },
    { href: `/${locale}/locations`, label: t.nav.locations },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/franchise`, label: t.nav.franchise },
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brandCol}>
          <Logo />
          <p className={styles.tagline}>{t.footer.tagline}</p>
        </div>

        <div>
          <h2 className={styles.colTitle}>{t.footer.explore}</h2>
          <ul className={styles.list}>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={styles.colTitle}>{t.footer.contact}</h2>
          <ul className={styles.list}>
            <li>
              <PendingValue value={site.contact.phone} label={t.footer.phonePending} />
            </li>
            <li>
              <PendingValue value={site.contact.email} label={t.footer.emailPending} />
            </li>
            <li>
              <a href={site.delivery.hungerstation} target="_blank" rel="noopener noreferrer">
                {t.footer.orderOn}
              </a>
            </li>
            <li>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <p>
            &copy; {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </p>
          <p className={styles.legal}>
            <span>
              CR:{" "}
              <PendingValue
                value={site.legal.commercialRegistration}
                label={t.footer.pending}
              />
            </span>
            <span>
              VAT: <PendingValue value={site.legal.vatNumber} label={t.footer.pending} />
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
