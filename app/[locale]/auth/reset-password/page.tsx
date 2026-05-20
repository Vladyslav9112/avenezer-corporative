import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ResetPasswordPageClient from "./ResetPasswordPageClient";
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
    pathname: "/auth/reset-password",
    title: t("resetTitle", { default: "Reset password" }),
    description: t("resetTitle", { default: "Reset password" }),
    includeAlternates: false,
    noIndex: true,
  });
}

export default async function ResetPasswordPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { locale } = await params;
  const { token } = await searchParams;

  return <ResetPasswordPageClient locale={locale} token={token || ""} />;
}
