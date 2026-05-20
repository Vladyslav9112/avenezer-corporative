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

function uniqueKeywords(keywords: readonly string[]) {
  return Array.from(
    new Set(keywords.map((keyword) => keyword.trim()).filter(Boolean)),
  );
}

function combineKeywords(
  prefixes: readonly string[],
  suffixes: readonly string[],
) {
  return prefixes.flatMap((prefix) =>
    suffixes.map((suffix) => `${prefix} ${suffix}`),
  );
}

const primaryBrandTerms = [
  "AvenEzer",
  "avenezer",
  "Aven Ezer",
  "aven ezer",
  "Avenezer",
  "avenezer company",
  "AvenEzer company",
  "AvenEzer Inc",
  "AvenEzer Inc.",
  "avenezer inc",
  "AvenEzer corporation",
  "avenezer corporation",
  "AvenEzer corporate",
  "AvenEzer corporative",
  "avenezer corporate",
  "avenezer corporative",
  "avenezer corportative",
  "AvenEzer platform",
  "avenezer platform",
  "AvenEzer corporate website",
  "AvenEzer corporative website",
  "AvenEzer business platform",
  "avenezer business platform",
  "AvenEzer digital platform",
  "avenezer digital platform",
  "AvenEzer Canada",
  "avenezer canada",
  "avenezer.ca",
  "www.avenezer.ca",
] as const;

const brandLocationTerms = [
  "Canada",
  "canada",
  "Ontario",
  "ontario",
  "London Ontario",
  "london ontario",
  "London Canada",
  "london canada",
  "Canadian",
  "canadian",
  "international",
] as const;

const brandServiceTerms = [
  "platform",
  "digital platform",
  "business platform",
  "corporate platform",
  "corporative platform",
  "business directory",
  "company directory",
  "corporate directory",
  "service directory",
  "business listing",
  "business listings",
  "business community",
  "business ecosystem",
  "digital ecosystem",
  "business network",
  "networking platform",
  "partner platform",
  "partner program",
  "partner network",
  "Aver program",
  "Aver partner program",
  "Aver partners",
  "corporate website",
  "business website",
  "business portal",
  "web portal",
  "MVP platform",
  "startup platform",
  "visibility platform",
  "business promotion platform",
  "business discovery platform",
] as const;

const marketKeywords = uniqueKeywords([
  "Canada business directory",
  "Ontario business directory",
  "London Ontario business directory",
  "Canada company directory",
  "Ontario company directory",
  "London Ontario company directory",
  "Canada service directory",
  "Ontario service directory",
  "business directory Canada",
  "company directory Canada",
  "digital business directory",
  "international business directory",
  "business listing platform",
  "business community platform",
  "business networking platform",
  "digital platform for businesses",
  "international digital platform",
  "corporate website Canada",
  "business portal Canada",
  "business ecosystem Canada",
  "Aver partner program Canada",
  ...combineKeywords(
    ["Canada", "Ontario", "London Ontario", "Canadian", "international"],
    [
      "business directory",
      "company directory",
      "service directory",
      "business platform",
      "digital platform",
      "business network",
      "business community",
      "business ecosystem",
      "business portal",
      "business listing platform",
    ],
  ),
]);

const brandedHomeKeywords = uniqueKeywords([
  ...combineKeywords(primaryBrandTerms, brandLocationTerms),
  ...combineKeywords(primaryBrandTerms, brandServiceTerms),
  ...combineKeywords(
    [
      "AvenEzer corporate",
      "AvenEzer corporative",
      "avenezer corporate",
      "avenezer corporative",
      "avenezer corportative",
    ],
    [
      "Canada",
      "Ontario",
      "London Ontario",
      "platform",
      "website",
      "business platform",
      "corporate website",
      "business directory",
    ],
  ),
  ...combineKeywords(
    ["Aver", "AvenEzer Aver", "AvenEzer partner", "avenezer partner"],
    ["program", "partner program", "partners", "school", "community"],
  ),
]);

const brandKeywords = uniqueKeywords([
  ...primaryBrandTerms,
  ...brandedHomeKeywords,
]);

const routeTopicKeywords: Record<string, readonly string[]> = {
  "/": [
    "business directory",
    "company directory",
    "service directory",
    "business listings",
    "digital business platform",
    "platform for businesses",
    "business community",
    "international business ecosystem",
  ],
  "/about": [
    "about",
    "company",
    "mission",
    "corporate information",
    "business platform company",
  ],
  "/platform": [
    "MVP platform",
    "digital platform",
    "web platform",
    "business platform",
    "business visibility platform",
  ],
  "/avers": [
    "Aver program",
    "Aver partners",
    "partner program",
    "partner network",
    "AvenEzer School",
  ],
  "/connectia": [
    "business club",
    "networking club",
    "business networking",
    "business community",
    "Connectia Business Club",
  ],
  "/faq": [
    "FAQ",
    "frequently asked questions",
    "how it works",
    "platform questions",
    "partner questions",
  ],
  "/contact": [
    "contact",
    "contact information",
    "company contact",
    "business inquiries",
    "support contact",
  ],
  "/terms": ["terms of use", "platform terms", "legal terms"],
  "/legal": ["legal policies", "corporate legal information", "privacy and legal"],
};

const baseKeywords: Record<AppLocale, readonly string[]> = {
  uk: [
    ...brandKeywords,
    ...marketKeywords,
    "AvenEzer платформа",
    "міжнародна цифрова платформа",
    "цифрова платформа для бізнесу",
    "бізнес-каталог Канада",
    "бізнес-спільнота",
    "цифрова екосистема",
    "Aver партнери",
    "бізнес у Канаді",
    "платформа для партнерів",
    "avenezer.ca",
  ],
  en: [
    ...brandKeywords,
    ...marketKeywords,
    "international digital platform",
    "digital platform for businesses",
    "Canada business directory",
    "business community platform",
    "digital ecosystem",
    "Aver partner program",
    "business visibility in Canada",
    "London Ontario business platform",
    "avenezer.ca",
  ],
  fr: [
    ...brandKeywords,
    ...marketKeywords,
    "plateforme AvenEzer",
    "plateforme numerique pour entreprises",
    "plateforme d'affaires internationale",
    "annuaire d'entreprises Canada",
    "communaute d'affaires",
    "ecosysteme numerique",
    "programme partenaire Aver",
    "visibilite d'entreprise au Canada",
    "plateforme d'affaires London Ontario",
    "avenezer.ca",
  ],
};

const pageKeywords: Record<string, Partial<Record<AppLocale, readonly string[]>>> = {
  "/": {
    uk: [
      "каталог бізнесів",
      "пошук компаній і сервісів",
      "платформа для бізнесів і користувачів",
      "міжнародна бізнес-екосистема",
    ],
    en: [
      "business directory",
      "find companies and services",
      "platform for businesses and users",
      "international business ecosystem",
    ],
    fr: [
      "annuaire d'entreprises",
      "trouver entreprises et services",
      "plateforme pour entreprises et utilisateurs",
      "ecosysteme d'affaires international",
    ],
  },
  "/about": {
    uk: [
      "про AvenEzer",
      "місія AvenEzer",
      "компанія AvenEzer",
      "міжнародна бізнес-платформа",
    ],
    en: [
      "about AvenEzer",
      "AvenEzer mission",
      "AvenEzer company",
      "international business platform",
    ],
    fr: [
      "a propos d'AvenEzer",
      "mission AvenEzer",
      "entreprise AvenEzer",
      "plateforme d'affaires internationale",
    ],
  },
  "/platform": {
    uk: [
      "MVP платформа",
      "веб-платформа для бізнесу",
      "цифровий каталог бізнесів",
      "платформа видимості для бізнесу",
    ],
    en: [
      "MVP platform",
      "web platform for businesses",
      "digital business directory",
      "business visibility platform",
    ],
    fr: [
      "plateforme MVP",
      "plateforme web pour entreprises",
      "annuaire numerique d'entreprises",
      "plateforme de visibilite pour entreprises",
    ],
  },
  "/avers": {
    uk: [
      "Aver програма",
      "Aver партнери",
      "партнерська програма AvenEzer",
      "AvenEzer School",
    ],
    en: [
      "Aver program",
      "Aver partners",
      "AvenEzer partner program",
      "AvenEzer School",
    ],
    fr: [
      "programme Aver",
      "partenaires Aver",
      "programme partenaire AvenEzer",
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
      "business networking community",
      "AvenEzer business community",
    ],
    fr: [
      "Connectia Business Club",
      "club d'affaires Canada",
      "communaute de reseautage d'affaires",
      "communaute d'affaires AvenEzer",
    ],
  },
  "/faq": {
    uk: [
      "часті питання AvenEzer",
      "як працює AvenEzer",
      "питання про платформу",
      "FAQ AvenEzer",
    ],
    en: [
      "AvenEzer FAQ",
      "how AvenEzer works",
      "platform questions",
      "Aver FAQ",
    ],
    fr: [
      "FAQ AvenEzer",
      "comment fonctionne AvenEzer",
      "questions sur la plateforme",
      "FAQ Aver",
    ],
  },
  "/contact": {
    uk: [
      "контакти AvenEzer",
      "зв'язатися з AvenEzer",
      "email AvenEzer",
      "телефон AvenEzer",
    ],
    en: [
      "AvenEzer contact",
      "contact AvenEzer",
      "AvenEzer email",
      "AvenEzer phone",
    ],
    fr: [
      "contact AvenEzer",
      "joindre AvenEzer",
      "email AvenEzer",
      "telephone AvenEzer",
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
  ogImageAlt: "AvenEzer digital platform brand card",
  description: {
    uk: "AvenEzer - mizhnarodna tsyfrova platforma dlia biznesiv, partneriv Aver ta spilnot.",
    en: "AvenEzer is an international digital platform for businesses, Aver partners, and communities.",
    fr: "AvenEzer est une plateforme numerique internationale pour les entreprises, les partenaires Aver et les communautes.",
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
  const routeKeywords = routeTopicKeywords[normalizedPath] ?? [];
  const brandedRouteKeywords = combineKeywords(
    [
      "AvenEzer",
      "avenezer",
      "AvenEzer corporate",
      "AvenEzer corporative",
      "avenezer corporate",
      "avenezer corporative",
      "avenezer corportative",
    ],
    routeKeywords,
  );

  return uniqueKeywords([
    ...siteConfig.keywords[locale],
    ...localizedPageKeywords,
    ...routeKeywords,
    ...brandedRouteKeywords,
    siteConfig.name,
    siteConfig.legalName,
    siteConfig.email,
  ]);
}
