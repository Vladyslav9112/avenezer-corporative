import type { MetadataRoute } from "next";
import {
  defaultLocale,
  legalCanonicalPaths,
  locales,
  publicPagePaths,
} from "@/lib/site";
import { getAbsoluteLocaleUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const localizedPages = publicPagePaths.flatMap((pathname) => {
    const languages = {
      ...Object.fromEntries(
        locales.map((locale) => [locale, getAbsoluteLocaleUrl(locale, pathname)]),
      ),
      "x-default": getAbsoluteLocaleUrl(defaultLocale, pathname),
    };

    return locales.map((locale) => ({
      url: getAbsoluteLocaleUrl(locale, pathname),
      lastModified,
      alternates: {
        languages,
      },
    }));
  });

  const legalPages = legalCanonicalPaths.map((pathname) => ({
    url: getAbsoluteLocaleUrl("en", pathname),
    lastModified,
  }));

  return [...localizedPages, ...legalPages];
}
