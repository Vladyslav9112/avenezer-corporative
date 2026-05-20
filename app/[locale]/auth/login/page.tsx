import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import LoginPageClient from "./LoginPageClient";
import { buildPageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/auth/login",
    title: t("loginTitle", { default: "Login" }),
    description: t("loginTitle", { default: "Login" }),
    includeAlternates: false,
    noIndex: true,
  });
}

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ next?: string }>;
}) {
  const { locale } = await params;
  const { next } = await searchParams;

  return (
    <LoginPageClient
      locale={locale}
      nextPath={next || `/${locale}/school`}
    />
  );
}
