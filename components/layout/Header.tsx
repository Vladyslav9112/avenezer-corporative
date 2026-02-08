"use client";

import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/navigation";

type NavItem = {
  label: string;
  href: string;
};

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Platform", href: "/platform" },
  { label: "Avers", href: "/avers" },
  { label: "Connectia", href: "/connectia" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname(); // ✅ locale-aware pathname from next-intl/navigation
  const locale = useLocale();
  const t = useTranslations("nav");

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // ✅ локалізуємо labels через next-intl, але структуру/стилі не чіпаємо
  const nav = useMemo<NavItem[]>(
    () => [
      { label: t("home"), href: "/" },
      { label: t("about"), href: "/about" },
      { label: t("platform"), href: "/platform" },
      { label: t("avers"), href: "/avers" },
      { label: t("connectia"), href: "/connectia" },
      { label: t("contact"), href: "/contact" },
    ],
    [t],
  );

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="border-b border-black/10 bg-[color:rgba(79,140,131,0.9)] backdrop-blur">
        <Container className="flex items-center justify-between py-5">
          <Link
            href="/"
            locale={locale} // ✅ гарантуємо збереження поточної мови
            className="text-lg font-[var(--font-display)] uppercase tracking-[0.2em] text-[var(--text-invert)]"
          >
            <img src="/logo.webp" alt="Logo" className="w-[92px] h-14" />
          </Link>

          <nav className="hidden items-center gap-3 md:flex">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  locale={locale} // ✅ усі лінки зберігають поточну мову
                  className={`rounded-full px-4 py-2 text-sm uppercase tracking-[0.2em] text-[var(--text-invert)] transition ${
                    active
                      ? "bg-[color:rgba(242,232,225,0.2)]"
                      : "opacity-80 hover:opacity-100 hover:bg-[color:rgba(242,232,225,0.12)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <LanguageSwitcher />
          </nav>

          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(242,232,225,0.5)] px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--text-invert)] md:hidden"
          >
            {t("menu")}
            <span className="text-base leading-none">{isOpen ? "−" : "+"}</span>
          </button>
        </Container>
      </div>

      <div
        id="mobile-nav"
        className={`border-b border-black/10 bg-[color:rgba(79,140,131,0.96)] md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <Container className="flex flex-col gap-2 py-4">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                locale={locale} // ✅ і тут теж
                className={`rounded-xl px-4 py-3 text-sm uppercase tracking-[0.2em] text-[var(--text-invert)] transition ${
                  active
                    ? "bg-[color:rgba(242,232,225,0.2)]"
                    : "opacity-80 hover:opacity-100 hover:bg-[color:rgba(242,232,225,0.12)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </Container>
      </div>
    </header>
  );
}
