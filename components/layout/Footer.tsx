"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

const SITE = {
  brand: "AvenEzer",
  domain: "www.avenezer.ink",
  email: "info@avenezer.ink",
};

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="mt-12 border-t border-black/10 bg-[var(--bg-main)] text-[var(--text-invert)]">
      <Container className="flex flex-col gap-4 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p>{t("tagline")}</p>

          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
            <Link
              href={`mailto:${SITE.email}`}
              className="text-[var(--text-invert)] underline-offset-4 transition hover:underline"
            >
              {SITE.email}
            </Link>

            <Link
              href={`https://${SITE.domain}`}
              className="text-[var(--text-invert)] underline-offset-4 transition hover:underline"
            >
              {SITE.domain}
            </Link>
          </div>
        </div>

        <p className="text-xs uppercase tracking-[0.3em] opacity-70">
          {SITE.brand} © {new Date().getFullYear()}
        </p>
      </Container>
    </footer>
  );
}
