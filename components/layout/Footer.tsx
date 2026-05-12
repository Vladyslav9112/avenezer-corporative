"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Link as LocalizedLink } from "@/navigation";

const SITE = {
  phone: "382-577-1006",
  email: "info@avenezer.ca",
};

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="mt-12 border-t border-black/10 bg-[var(--bg-main)] text-[var(--text-invert)]">
      <Container className="flex flex-col gap-4 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p>{t("tagline")}</p>

          <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href={`tel:${SITE.phone.replace(/-/g, "")}`}
              className="text-[var(--text-invert)] underline-offset-4 transition hover:underline"
            >
              {SITE.phone}
            </Link>

            <Link
              href={`mailto:${SITE.email}`}
              className="text-[var(--text-invert)] underline-offset-4 transition hover:underline"
            >
              {SITE.email}
            </Link>

            <LocalizedLink
              href="/faq"
              className="text-[var(--text-invert)] underline-offset-4 transition hover:underline"
            >
              {t("faq")}
            </LocalizedLink>

            <LocalizedLink
              href="/terms"
              className="text-[var(--text-invert)] underline-offset-4 transition hover:underline"
            >
              {t("terms")}
            </LocalizedLink>

            <LocalizedLink
              href="/legal"
              className="text-[var(--text-invert)] underline-offset-4 transition hover:underline"
            >
              {t("legal")}
            </LocalizedLink>
          </div>
        </div>

        <div className="space-y-1 text-xs opacity-70 sm:text-right">
          <p>© 2026 AvenEzer Inc. All rights reserved.</p>
          <p>AvenEzer™ is a trademark of AvenEzer Inc.</p>
        </div>
      </Container>
    </footer>
  );
}
