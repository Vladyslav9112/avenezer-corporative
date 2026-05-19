import type { MetadataRoute } from "next";

const FALLBACK_SITE_URL = "https://www.avenezer.ink";
const locales = ["uk", "en", "fr"] as const;
const publicPaths = [
  "/",
  "/about",
  "/platform",
  "/avers",
  "/connectia",
  "/faq",
  "/contact",
  "/terms",
  "/legal",
] as const;

function getSiteUrl() {
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

function getLocalizedPath(locale: (typeof locales)[number], path: string) {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return publicPaths.flatMap((path) => {
    const languages = Object.fromEntries(
      locales.map((locale) => [
        locale,
        `${siteUrl}${getLocalizedPath(locale, path)}`,
      ]),
    );

    return locales.map((locale) => ({
      url: `${siteUrl}${getLocalizedPath(locale, path)}`,
      lastModified,
      alternates: {
        languages,
      },
    }));
  });
}
