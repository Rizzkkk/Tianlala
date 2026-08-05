import Image from "next/image";

import { categoryBySlug } from "@/data/categories";
import type { MenuItem } from "@/data/menu";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import styles from "./MenuCard.module.css";

type Props = {
  item: MenuItem;
  locale: Locale;
  t: Dictionary;
  /** Prioritise the first row so the LCP image is not lazy-loaded. */
  priority?: boolean;
};

/**
 * One card, two tiers.
 *
 * Tier 1 (item.image set)  — photo card: photo, then name / price / calories.
 * Tier 2 (item.image null) — menu-board card: the product name IS the artwork,
 *                            set large on a category tint, then price / calories.
 *
 * The tiers deliberately do not share their text layout — repeating the name in
 * both the panel and the footer would read as a bug. What they do share is
 * geometry: the same media aspect ratio and the same fixed footer height, so a
 * mixed grid keeps an even rhythm.
 *
 * Tier 2 is typographic rather than iconographic on purpose. An icon repeated
 * across a filtered category produces rows of identical glyphs; words do not.
 */
export default function MenuCard({ item, locale, t, priority = false }: Props) {
  const category = categoryBySlug.get(item.category);
  const name = item.name[locale];

  // Long names need to step down a size or they overflow the panel.
  const nameSize =
    name.length > 26
      ? styles.boardNameLong
      : name.length > 16
        ? styles.boardNameMedium
        : styles.boardNameShort;

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        {item.image ? (
          <Image
            src={item.image}
            alt={name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className={styles.board} style={{ backgroundColor: category?.tint.bg }}>
            <span
              className={styles.boardCategory}
              style={{ color: category?.tint.ink }}
            >
              {category?.name[locale]}
            </span>
            <h3
              className={`${styles.boardName} ${nameSize}`}
              style={{ color: category?.tint.ink }}
            >
              {name}
            </h3>
            <span
              className={styles.boardRule}
              style={{ backgroundColor: category?.tint.accent }}
              aria-hidden="true"
            />
          </div>
        )}

        {item.bestSeller && (
          <span className={styles.badge}>{t.home.bestSellersTitle}</span>
        )}
      </div>

      <div className={styles.body}>
        {item.image && <h3 className={styles.name}>{name}</h3>}
        <p className={`tabular ${styles.meta}`}>
          <span className={styles.price}>
            {item.priceSAR}
            <span className={styles.currency}>{t.menu.currency}</span>
          </span>
          <span className={styles.calories}>
            {item.calories} {t.menu.calories}
          </span>
        </p>
      </div>
    </article>
  );
}
