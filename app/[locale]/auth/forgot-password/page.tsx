import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ForgotPasswordPageClient from "./ForgotPasswordPageClient";
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
    pathname: "/auth/forgot-password",
    title: t("forgotTitle", { default: "Forgot password" }),
    description: t("forgotHint", {
      default: "Enter your email and we will send a reset link.",
    }),
    includeAlternates: false,
    noIndex: true,
  });
}

export default async function ForgotPasswordPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <ForgotPasswordPageClient locale={locale} />;
}
