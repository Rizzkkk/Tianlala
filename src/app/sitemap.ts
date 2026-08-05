import type { MetadataRoute } from "next";

import { site } from "@/data/site";
import { locales } from "@/i18n/dictionaries";

const routes = ["", "/menu", "/locations", "/about", "/franchise"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${site.url}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${site.url}/${l}${route}`]),
        ),
      },
    })),
  );
}
