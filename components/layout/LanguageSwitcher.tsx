"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { Globe, ChevronDown } from "lucide-react";

const LOCALES = [
  { code: "uk", label: "UA" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = LOCALES.find((l) => l.code === locale);

  return (
    <div ref={ref} className="relative">
      {/* BUTTON */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="
          inline-flex items-center gap-2
          rounded-full border border-[color:rgba(242,232,225,0.5)]
          px-2 py-2 lg:px-2.5 xl:px-3
          text-xs lg:text-sm xl:text-s
          uppercase tracking-[0.2em]
          text-[var(--text-invert)]
          transition hover:bg-[color:rgba(242,232,225,0.12)]
        "
      >
        <Globe className="h-4 w-4 lg:h-[18px] lg:w-[18px] xl:h-5 xl:w-5 opacity-80" />
        <span className="leading-none">{current?.label}</span>
        <ChevronDown
          className={`h-4 w-4 lg:h-[18px] lg:w-[18px] xl:h-5 xl:w-5 transition ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          role="listbox"
          className="
            absolute right-0 mt-2
            overflow-hidden
            rounded-xl border border-white/40
            bg-[rgba(255,255,255,0.75)]
            backdrop-blur-md
            shadow-[0_12px_28px_rgba(0,0,0,0.18)]
            min-w-[84px] lg:min-w-[92px] xl:min-w-[104px]
          "
        >
          {LOCALES.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={locale === l.code}
              onClick={() => {
                setOpen(false);
                router.replace(pathname, { locale: l.code });
              }}
              className={`
                flex w-full items-center justify-center
                px-3 py-2 lg:px-3.5 lg:py-2.5 xl:px-4 xl:py-3
                text-xs lg:text-sm xl:text-s
                uppercase tracking-[0.2em]
                transition cursor-pointer text-[#222]
                ${
                  locale === l.code
                    ? "bg-[rgba(79,140,131,0.15)] font-semibold"
                    : "hover:bg-[rgba(79,140,131,0.08)]"
                }
              `}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
