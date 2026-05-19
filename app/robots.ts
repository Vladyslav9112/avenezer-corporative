import type { MetadataRoute } from "next";

const FALLBACK_SITE_URL = "https://www.avenezer.ink";
const locales = ["uk", "en", "fr"] as const;

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

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const disallow = [
    "/api/",
    "/_next/",
    ...locales.flatMap((locale) => [
      `/${locale}/auth/`,
      `/${locale}/lessons/`,
      `/${locale}/school`,
      `/${locale}/login`,
      `/${locale}/register`,
    ]),
  ];

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow,
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
