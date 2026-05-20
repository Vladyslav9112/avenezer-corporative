import type { MetadataRoute } from "next";
import { locales, getSiteUrl } from "@/lib/site";

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
