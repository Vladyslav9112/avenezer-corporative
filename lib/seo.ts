import type { Metadata } from "next";
import type { AppLocale } from "@/lib/site";
import {
  getAbsoluteUrl,
  getAbsoluteLocaleUrl,
  getHrefLang,
  getMetadataBase,
  getOtherOpenGraphLocales,
  getOpenGraphLocale,
  getPageKeywords,
  siteConfig,
} from "@/lib/site";

type BuildPageMetadataOptions = {
  locale: AppLocale;
  pathname: string;
  title: string;
  description: string;
  canonicalLocale?: AppLocale;
  includeAlternates?: boolean;
  noIndex?: boolean;
  keywords?: string[];
};

function buildLanguageAlternates(pathname: string) {
  return {
    ...Object.fromEntries(
      siteConfig.locales.map((locale) => [
        getHrefLang(locale),
        getAbsoluteLocaleUrl(locale, pathname),
      ]),
    ),
    "x-default": getAbsoluteLocaleUrl(siteConfig.defaultLocale, pathname),
  };
}

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
  canonicalLocale = locale,
  includeAlternates = true,
  noIndex = false,
  keywords,
}: BuildPageMetadataOptions): Metadata {
  const canonicalUrl = getAbsoluteLocaleUrl(canonicalLocale, pathname);
  const metadataKeywords = noIndex
    ? undefined
    : keywords ?? getPageKeywords(locale, pathname);
  const socialImage = {
    url: getAbsoluteUrl(siteConfig.ogImagePath),
    width: 1200,
    height: 630,
    alt: siteConfig.ogImageAlt,
  };

  return {
    metadataBase: getMetadataBase(),
    title,
    description,
    keywords: metadataKeywords,
    alternates: {
      canonical: canonicalUrl,
      languages: includeAlternates ? buildLanguageAlternates(pathname) : undefined,
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url: canonicalUrl,
      locale: getOpenGraphLocale(locale),
      alternateLocale: includeAlternates
        ? getOtherOpenGraphLocales(locale)
        : undefined,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : undefined,
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildBreadcrumbSchema(
  locale: AppLocale,
  items: BreadcrumbItem[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteLocaleUrl(locale, item.path),
    })),
  };
}

export function buildOrganizationSchema() {
  const url = getAbsoluteLocaleUrl(siteConfig.defaultLocale, "/");

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url,
    logo: getAbsoluteUrl(siteConfig.iconPath),
    description: siteConfig.description.en,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    foundingDate: siteConfig.foundingDate,
    naics: siteConfig.naics,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: siteConfig.email,
        telephone: siteConfig.phone,
        availableLanguage: ["en", "fr", "uk"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.streetAddress,
      addressLocality: siteConfig.addressLocality,
      addressRegion: siteConfig.addressRegion,
      postalCode: siteConfig.postalCode,
      addressCountry: siteConfig.addressCountry,
    },
    identifier: [
      {
        "@type": "PropertyValue",
        propertyID: "Corporation Number",
        value: siteConfig.corporationNumber,
      },
    ],
  };
}

export function buildWebSiteSchema(locale: AppLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: siteConfig.legalName,
    url: getAbsoluteLocaleUrl(locale, "/"),
    description: siteConfig.description[locale],
    inLanguage: getHrefLang(locale),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: getAbsoluteLocaleUrl(siteConfig.defaultLocale, "/"),
    },
  };
}
