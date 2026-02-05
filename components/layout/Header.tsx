"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";

type NavItem = {
  label: string;
  href: string;
};

const SITE = {
  brand: "AvenEzer",
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
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="border-b border-black/10 bg-[color:rgba(79,140,131,0.9)] backdrop-blur">
        <Container className="flex items-center justify-between py-5">
          <Link
            href="/"
            className="text-lg font-[var(--font-display)] uppercase tracking-[0.2em] text-[var(--text-invert)]"
          >
            {SITE.brand}
          </Link>

          <nav className="hidden items-center gap-3 md:flex">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
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
          </nav>

          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(242,232,225,0.5)] px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--text-invert)] md:hidden"
          >
            Menu
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
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
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
