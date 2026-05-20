import { defaultLocale, locales } from "@/i18n";

export type AppLocale = (typeof locales)[number];
export { defaultLocale, locales };

const FALLBACK_SITE_URL = "https://www.avenezer.ca";

const localeHrefLangMap: Record<AppLocale, string> = {
  uk: "uk",
  en: "en",
  fr: "fr",
};

const openGraphLocaleMap: Record<AppLocale, string> = {
  uk: "uk_UA",
  en: "en_CA",
  fr: "fr_CA",
};

export const publicPagePaths = [
  "/",
  "/about",
  "/platform",
  "/avers",
  "/connectia",
  "/faq",
  "/contact",
] as const;

export const legalCanonicalPaths = ["/terms", "/legal"] as const;

export const siteConfig = {
  name: "AvenEzer",
  legalName: "AvenEzer Inc.",
  titleTemplate: "%s | AvenEzer",
  defaultLocale,
  locales,
  phone: "+1 382-577-1006",
  email: "info@avenezer.ca",
  streetAddress: "714 York St, Office C6",
  addressLocality: "London",
  addressRegion: "Ontario",
  postalCode: "N5W 2S8",
  addressCountry: "CA",
  foundingDate: "2025-09-15",
  corporationNumber: "1731845-6",
  naics: "519130",
  ogImageAlt: "AvenEzer digital platform brand card",
  description: {
    uk: "AvenEzer - mizhnarodna tsyfrova platforma dlia biznesiv, partneriv Aver ta spilnot.",
    en: "AvenEzer is an international digital platform for businesses, Aver partners, and communities.",
    fr: "AvenEzer est une plateforme numerique internationale pour les entreprises, les partenaires Aver et les communautes.",
  },
} as const;

export function getSiteUrl() {
  const envUrl = process.env.APP_URL?.trim();

  if (!envUrl) {
    return FALLBACK_SITE_URL;
  }

  try {
    const url = new URL(envUrl);

    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
      return FALLBACK_SITE_URL;
    }

    return url.origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export function getMetadataBase() {
  return new URL(getSiteUrl());
}

export function getLocalizedPath(locale: AppLocale, path: string) {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function getAbsoluteUrl(path: string) {
  return `${getSiteUrl()}${path}`;
}

export function getAbsoluteLocaleUrl(locale: AppLocale, path: string) {
  return getAbsoluteUrl(getLocalizedPath(locale, path));
}

export function getHrefLang(locale: AppLocale) {
  return localeHrefLangMap[locale];
}

export function getOpenGraphLocale(locale: AppLocale) {
  return openGraphLocaleMap[locale];
}

export function getOtherOpenGraphLocales(locale: AppLocale) {
  return locales
    .filter((candidate) => candidate !== locale)
    .map((candidate) => getOpenGraphLocale(candidate));
}
