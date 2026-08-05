import Image from "next/image";
import Link from "next/link";

import type { Dictionary, Locale } from "@/i18n/dictionaries";
import styles from "./Hero.module.css";

/**
 * The hero carries the product photography rather than being a flat colour
 * block, so the section reads as a shopfront rather than a banner.
 */
const CUPS = [
  { src: "/products/happy-family-bucket.jpg", cls: "cupA" },
  { src: "/products/fresh-fruit-tea-bucket.jpg", cls: "cupB" },
  { src: "/products/strawberry-sundae.jpg", cls: "cupC" },
] as const;

export default function Hero({ locale, t }: { locale: Locale; t: Dictionary }) {
  const stats = [
    { value: "8,000+", label: t.home.statStores },
    { value: "5", label: t.home.statCountries },
    { value: "2015", label: t.home.statFounded },
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div>
          <p className={styles.eyebrow}>{t.home.eyebrow}</p>
          <h1 className={styles.title}>{t.home.title}</h1>
          <p className={styles.lede}>{t.home.lede}</p>

          <div className={styles.ctas}>
            <Link href={`/${locale}/menu`} className="btn btnPrimary">
              {t.home.ctaMenu}
            </Link>
            <Link href={`/${locale}/franchise`} className="btn btnOutline">
              {t.home.ctaFranchise}
            </Link>
          </div>

          <dl className={styles.stats}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="srOnly">{stat.label}</dt>
                <dd>
                  <span className={`tabular ${styles.statValue}`}>
                    {/*
                      <bdi dir="ltr"> isolates the figure so the bidi algorithm
                      cannot move the trailing "+" to the front in Arabic
                      ("8,000+" rendering as "+8,000"). Kept inline so the block
                      still takes the paragraph's RTL alignment.
                    */}
                    <bdi dir="ltr">{stat.value}</bdi>
                  </span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.cluster}>
          {CUPS.map((cup, i) => (
            <div key={cup.src} className={`${styles.cup} ${styles[cup.cls]}`}>
              <Image
                src={cup.src}
                alt=""
                width={520}
                height={745}
                priority={i === 0}
                sizes="(max-width: 1024px) 45vw, 22vw"
              />
            </div>
          ))}
        </div>
      </div>

      <svg
        className={styles.wave}
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0 48c180 40 360 40 540 12s360-40 540-6 300 30 360 24V90H0z"
        />
      </svg>
    </section>
  );
}
