"use client";

import { useMemo, useState } from "react";

import MenuCard from "@/components/MenuCard";
import { categories, type CategorySlug } from "@/data/categories";
import { menu } from "@/data/menu";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import styles from "./MenuBrowser.module.css";

type Filter = CategorySlug | "all";

export default function MenuBrowser({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () => (filter === "all" ? menu : menu.filter((i) => i.category === filter)),
    [filter],
  );

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: t.menu.all },
    ...categories.map((c) => ({ value: c.slug as Filter, label: c.name[locale] })),
  ];

  return (
    <>
      {/*
        A filter, not a tabset: these buttons narrow one list rather than swap
        between panels. role="tab" without matching tabpanels would mislead a
        screen reader, so this is a group of toggle buttons with aria-pressed.
      */}
      <div role="group" aria-label={t.menu.title} className={styles.filters}>
        {filters.map((f) => {
          const selected = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(f.value)}
              className={`${styles.filter} ${selected ? styles.filterActive : ""}`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <p className={`tabular ${styles.count}`} aria-live="polite">
        {t.menu.itemCount.replace("{count}", String(visible.length))}
      </p>

      {visible.length === 0 ? (
        <p className={styles.empty}>{t.menu.empty}</p>
      ) : (
        <ul className={styles.grid}>
          {visible.map((item, i) => (
            <li key={item.slug}>
              <MenuCard item={item} locale={locale} t={t} priority={i < 4} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
