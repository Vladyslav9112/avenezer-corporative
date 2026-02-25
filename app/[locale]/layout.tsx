import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { locales } from "@/i18n";
import GlobalAnimatedBackground from "@/components/animation/GlobalAnimatedBackground";
import PageTransition from "@/components/animation/PageTransition";

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

export const metadata: Metadata = {
  title: "AvenEzer",
  description: "AvenEzer — international digital platform.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // ✅ params як Promise
}) {
  const { locale } = await params; // ✅ await

  if (!locales.includes(locale as any)) notFound();

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
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
