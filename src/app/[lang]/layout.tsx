import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";

import Analytics from "@/components/Analytics";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/data/site";
import {
  dir,
  getDictionary,
  hasLocale,
  locales,
  type Locale,
} from "@/i18n/dictionaries";
import "../globals.css";

const latin = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  const isArabic = lang === "ar";

  const title = isArabic
    ? "تيان لالا | شاي الفواكه الطازج في الرياض"
    : "TIANLALA | Fresh Fruit Tea in Riyadh";

  return {
    metadataBase: new URL(site.url),
    title: {
      default: title,
      template: `%s | ${site.name}`,
    },
    description: t.home.lede,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        ar: "/ar",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description: t.home.lede,
      locale: isArabic ? "ar_SA" : "en_SA",
      alternateLocale: isArabic ? "en_SA" : "ar_SA",
      url: `/${lang}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t.home.lede,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const t = await getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={dir(locale)}
      className={`${latin.variable} ${arabic.variable}`}
    >
      <body>
        <a href="#main" className="skipLink">
          {t.nav.skipToContent}
        </a>
        <Header locale={locale} t={t} />
        <main id="main" className="main">
          {children}
        </main>
        <Footer locale={locale} t={t} />
        <Analytics />
      </body>
    </html>
  );
}
