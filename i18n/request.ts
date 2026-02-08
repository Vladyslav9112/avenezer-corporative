import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale } from "@/i18n";

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locales.includes(locale as any)
    ? (locale as (typeof locales)[number])
    : defaultLocale;

  const messages = (await import(`../messages/${safeLocale}.json`)).default;

  return {
    locale: safeLocale, // ✅ ОБОВʼЯЗКОВО для типів next-intl
    messages,
  };
});
