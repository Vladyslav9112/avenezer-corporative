import type { MetadataRoute } from "next";

import { defaultLocale, siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.legalName,
    short_name: siteConfig.name,
    description: siteConfig.description.en,
    start_url: `/${defaultLocale}`,
    display: "standalone",
    background_color: siteConfig.backgroundColor,
    theme_color: siteConfig.themeColor,
    icons: [
      {
        src: siteConfig.iconPath,
        type: "image/webp",
        sizes: "512x512",
      },
    ],
  };
}
