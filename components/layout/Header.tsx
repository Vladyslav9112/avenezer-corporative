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

export function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const nav = useMemo<NavItem[]>(
    () => [
      { label: t("home"), href: "/" },
      { label: t("about"), href: "/about" },
      { label: t("platform"), href: "/platform" },
      { label: t("avers"), href: "/avers" },
      { label: t("connectia"), href: "/connectia" },
      { label: t("faq"), href: "/faq" },
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
          {/* LOGO */}
          <Link
            href="/"
            locale={locale}
            className="text-lg font-[var(--font-display)] uppercase tracking-[0.2em] text-[var(--text-invert)]"
          >
            <img src="/logo.webp" alt="Logo" className="h-14 w-[92px]" />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center lg:flex">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  locale={locale}
                  className={`rounded-full xl:px-4 lg:px-2.5 px-2 py-2 xl:text-s lg:text-sm text-[10px] uppercase tracking-[0.2em] text-[var(--text-invert)] transition ${
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

          {/* MOBILE RIGHT SIDE (Language + Menu) */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* ✅ ТЕПЕР свічер видно завжди на мобілці */}

            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              onClick={() => setIsOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(242,232,225,0.5)] px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--text-invert)]"
            >
              {t("menu")}
              <span className="text-base leading-none">
                {isOpen ? "−" : "+"}
              </span>
            </button>
          </div>
        </Container>
      </div>

      {/* MOBILE NAV */}
      <div
        id="mobile-nav"
        className={`border-b border-black/10 bg-[color:rgba(79,140,131,0.96)] lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <Container className="flex flex-col gap-2 py-4">
          {/* (опційно) лишаємо тут підпис "Мова" + ще раз свічер */}
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--text-invert)]/80">
              {t("language")}
            </span>
            <LanguageSwitcher />
          </div>

          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                locale={locale}
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
