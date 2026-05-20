import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import RegisterPageClient from "./RegisterPageClient";
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
    pathname: "/auth/register",
    title: t("registerTitle", { default: "Create account" }),
    description: t("registerTitle", { default: "Create account" }),
    includeAlternates: false,
    noIndex: true,
  });
}

export default async function RegisterPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ next?: string }>;
}) {
  const { locale } = await params;
  const { next } = await searchParams;

  return (
    <RegisterPageClient
      locale={locale}
      nextPath={next || `/${locale}/school`}
    />
  );
}
