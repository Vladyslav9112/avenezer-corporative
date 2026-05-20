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

const baseKeywords: Record<AppLocale, readonly string[]> = {
  uk: [
    "AvenEzer",
    "AvenEzer Canada",
    "AvenEzer Inc.",
    "avenezer.ca",
    "міжнародна цифрова платформа",
    "цифрова платформа для бізнесів",
    "канадська бізнес-платформа",
    "бізнес-каталог Канада",
    "Aver Program",
    "AvenEzer app",
    "Connectia Business Club",
    "AvenEzer School",
  ],
  en: [
    "AvenEzer",
    "AvenEzer Canada",
    "AvenEzer Inc.",
    "avenezer.ca",
    "international digital platform",
    "digital platform for businesses",
    "Canada business platform",
    "business directory Canada",
    "Aver Program",
    "AvenEzer app",
    "Connectia Business Club",
    "AvenEzer School",
  ],
  fr: [
    "AvenEzer",
    "AvenEzer Canada",
    "AvenEzer Inc.",
    "avenezer.ca",
    "plateforme numérique internationale",
    "plateforme numérique pour entreprises",
    "plateforme d'affaires Canada",
    "annuaire d'entreprises Canada",
    "programme Aver",
    "application AvenEzer",
    "Connectia Business Club",
    "AvenEzer School",
  ],
};

const pageKeywords: Record<string, Partial<Record<AppLocale, readonly string[]>>> = {
  "/": {
    uk: [
      "міжнародна цифрова екосистема",
      "платформа для бізнесів і партнерів",
      "каталог компаній і сервісів",
      "бізнес-спільнота AvenEzer",
    ],
    en: [
      "international business ecosystem",
      "platform for businesses and partners",
      "company and service directory",
      "AvenEzer business community",
    ],
    fr: [
      "écosystème d'affaires international",
      "plateforme pour entreprises et partenaires",
      "annuaire d'entreprises et de services",
      "communauté d'affaires AvenEzer",
    ],
  },
  "/about": {
    uk: [
      "про AvenEzer Inc.",
      "місія AvenEzer",
      "цифрова бізнес-екосистема",
      "канадська технологічна компанія",
    ],
    en: [
      "about AvenEzer Inc.",
      "AvenEzer mission",
      "digital business ecosystem",
      "Canadian technology company",
    ],
    fr: [
      "à propos d'AvenEzer Inc.",
      "mission AvenEzer",
      "écosystème numérique d'affaires",
      "entreprise technologique canadienne",
    ],
  },
  "/platform": {
    uk: [
      "MVP веб-платформа",
      "цифровий бізнес-каталог",
      "бізнес-платформа Канада",
      "екосистема для бізнесів",
    ],
    en: [
      "MVP web platform",
      "digital business directory",
      "Canada business platform",
      "ecosystem for businesses",
    ],
    fr: [
      "plateforme web MVP",
      "annuaire numérique d'entreprises",
      "plateforme d'affaires Canada",
      "écosystème pour entreprises",
    ],
  },
  "/avers": {
    uk: [
      "Aver Program",
      "партнерська програма AvenEzer",
      "партнери AvenEzer",
      "AvenEzer School",
    ],
    en: [
      "Aver Program",
      "AvenEzer partner program",
      "AvenEzer partners",
      "AvenEzer School",
    ],
    fr: [
      "programme Aver",
      "programme partenaire AvenEzer",
      "partenaires AvenEzer",
      "AvenEzer School",
    ],
  },
  "/connectia": {
    uk: [
      "Connectia Business Club",
      "бізнес-клуб Канада",
      "нетворкінг для бізнесу",
      "бізнес-спільнота AvenEzer",
    ],
    en: [
      "Connectia Business Club",
      "Canada business club",
      "business networking",
      "AvenEzer business community",
    ],
    fr: [
      "Connectia Business Club",
      "club d'affaires Canada",
      "réseautage d'affaires",
      "communauté d'affaires AvenEzer",
    ],
  },
  "/faq": {
    uk: [
      "AvenEzer FAQ",
      "питання про Aver Program",
      "питання про AvenEzer app",
      "відповіді про бізнес-платформу",
    ],
    en: [
      "AvenEzer FAQ",
      "Aver Program questions",
      "AvenEzer app questions",
      "business platform answers",
    ],
    fr: [
      "FAQ AvenEzer",
      "questions sur le programme Aver",
      "questions sur l'application AvenEzer",
      "réponses sur la plateforme d'affaires",
    ],
  },
  "/contact": {
    uk: [
      "контакти AvenEzer Canada",
      "партнерські запити",
      "бізнес-запити",
      "зв'язок з AvenEzer Inc.",
    ],
    en: [
      "AvenEzer Canada contact",
      "partnership inquiries",
      "business inquiries",
      "contact AvenEzer Inc.",
    ],
    fr: [
      "contact AvenEzer Canada",
      "demandes de partenariat",
      "demandes d'affaires",
      "contacter AvenEzer Inc.",
    ],
  },
  "/terms": {
    en: [
      "AvenEzer terms of use",
      "AvenEzer platform terms",
      "AvenEzer legal terms",
    ],
  },
  "/legal": {
    en: [
      "AvenEzer legal policies",
      "AvenEzer privacy and legal",
      "AvenEzer corporate legal information",
    ],
  },
};

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
  ogImagePath: "/og-cover.png",
  iconPath: "/logo.webp",
  themeColor: "#2A5D59",
  backgroundColor: "#f2e8e1",
  ogImageAlt: "AvenEzer digital platform brand card",
  description: {
    uk: "AvenEzer — канадська компанія, що будує міжнародну цифрову платформу для бізнесів, партнерів Aver і спільнот.",
    en: "AvenEzer is a Canadian company building an international digital platform for businesses, Aver partners, and communities.",
    fr: "AvenEzer est une entreprise canadienne qui construit une plateforme numérique internationale pour les entreprises, les partenaires Aver et les communautés.",
  },
  keywords: baseKeywords,
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

function normalizeKeywordPath(path: string) {
  if (!path || path === "/") {
    return "/";
  }

  if (path.startsWith("/lessons/")) {
    return "/lessons";
  }

  return path.endsWith("/") ? path.slice(0, -1) : path;
}

export function getPageKeywords(locale: AppLocale, path: string) {
  const normalizedPath = normalizeKeywordPath(path);
  const localizedPageKeywords =
    pageKeywords[normalizedPath]?.[locale] ?? pageKeywords[normalizedPath]?.en ?? [];

  return Array.from(
    new Set([
      ...siteConfig.keywords[locale],
      ...localizedPageKeywords,
      siteConfig.legalName,
      siteConfig.email,
    ]),
  );
}
