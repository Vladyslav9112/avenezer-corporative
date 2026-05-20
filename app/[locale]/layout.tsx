import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RoutePhoto } from "@/components/layout/RoutePhoto";
import { locales } from "@/i18n";
import GlobalAnimatedBackground from "@/components/animation/GlobalAnimatedBackground";
import PageTransition from "@/components/animation/PageTransition";
import {
  getAbsoluteUrl,
  getMetadataBase,
  getPageKeywords,
  siteConfig,
  type AppLocale,
} from "@/lib/site";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: siteConfig.name,
  description: siteConfig.description.en,
  keywords: getPageKeywords(siteConfig.defaultLocale, "/"),
  applicationName: siteConfig.name,
  icons: {
    icon: siteConfig.iconPath,
    shortcut: siteConfig.iconPath,
    apple: siteConfig.iconPath,
  },
  referrer: "origin-when-cross-origin",
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description.en,
    images: [
      {
        url: getAbsoluteUrl(siteConfig.ogImagePath),
        width: 1200,
        height: 630,
        alt: siteConfig.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description.en,
    images: [getAbsoluteUrl(siteConfig.ogImagePath)],
  },

  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      uk: "/uk",
      fr: "/fr",
      "x-default": "/uk",
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? {
        google: process.env.GOOGLE_SITE_VERIFICATION,
      }
    : undefined,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as AppLocale)) notFound();

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${displayFont.variable} ${bodyFont.variable} min-h-screen bg-(--bg-main) font-(--font-body) text-(--text-invert) antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <GlobalAnimatedBackground />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <RoutePhoto />
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
