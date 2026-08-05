"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Logo from "@/components/Logo";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import { otherLocale } from "@/i18n/dictionaries";
import styles from "./Header.module.css";

type Props = { locale: Locale; t: Dictionary };

export default function Header({ locale, t }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // The menu closes because the user chose to navigate, so close it in the
  // click handler. Doing it in an effect keyed on pathname would trigger a
  // cascading render on every navigation.
  const close = () => setOpen(false);

  const links = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/menu`, label: t.nav.menu },
    { href: `/${locale}/locations`, label: t.nav.locations },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/franchise`, label: t.nav.franchise },
  ];

  const other = otherLocale(locale);
  // Swap only the locale segment, keeping the reader on the same page.
  const switchHref = pathname.replace(/^\/(en|ar)/, `/${other}`) || `/${other}`;

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href : pathname.startsWith(href);

  return (
    <header className={styles.header}>
      <nav className={`container ${styles.bar}`} aria-label={t.nav.home}>
        <Link href={`/${locale}`} className={styles.brand} onClick={close}>
          <Logo />
          <span className="srOnly">{t.nav.home}</span>
        </Link>

        <ul className={styles.nav}>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`${styles.navLink} ${isActive(link.href) ? styles.navLinkActive : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Link
            href={switchHref}
            hrefLang={other}
            lang={other}
            onClick={close}
            className={styles.langSwitch}
          >
            {t.nav.switchLanguage}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className={styles.burger}
          >
            <span className="srOnly">{t.nav.menu}</span>
            <svg
              viewBox="0 0 24 24"
              className={styles.burgerIcon}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-nav" className={`container ${styles.mobileNav}`}>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                onClick={close}
                className={`${styles.mobileLink} ${isActive(link.href) ? styles.mobileLinkActive : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
