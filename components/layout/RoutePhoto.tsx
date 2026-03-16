"use client";

import { usePathname } from "@/navigation";
import { Container } from "@/components/ui/Container";
import { locales } from "@/i18n";

type RoutePhoto = {
  src: string;
  alt: string;
};

const ROUTE_PHOTOS: Record<string, RoutePhoto> = {
  home: {
    src: "https://images.unsplash.com/photo-1769740333462-9a63bfa914bc?auto=format&fit=crop&w=1800&q=80",
    alt: "Business team discussing project results",
  },
  about: {
    src: "https://images.unsplash.com/photo-1763739530672-4aadafbd81ff?auto=format&fit=crop&w=1800&q=80",
    alt: "Two professionals in discussion",
  },
  platform: {
    src: "https://images.unsplash.com/photo-1771923082503-0a3381c46cef?auto=format&fit=crop&w=1800&q=80",
    alt: "Digital dashboard on laptop screen",
  },
  avers: {
    src: "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?auto=format&fit=crop&w=1800&q=80",
    alt: "Collaborative team workshop",
  },
  connectia: {
    src: "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?auto=format&fit=crop&w=1800&q=80",
    alt: "Community collaboration meeting",
  },
  faq: {
    src: "https://images.unsplash.com/photo-1769740333462-9a63bfa914bc?auto=format&fit=crop&w=1800&q=80",
    alt: "Team answering questions during meeting",
  },
  contact: {
    src: "https://images.unsplash.com/photo-1766066014237-00645c74e9c6?auto=format&fit=crop&w=1800&q=80",
    alt: "Customer support team at work",
  },
  school: {
    src: "https://images.unsplash.com/photo-1627556704302-624286467c65?auto=format&fit=crop&w=1800&q=80",
    alt: "Graduation cap in front of academy building",
  },
  lessons: {
    src: "https://images.unsplash.com/photo-1627556704302-624286467c65?auto=format&fit=crop&w=1800&q=80",
    alt: "Learning and education concept",
  },
  auth: {
    src: "https://images.unsplash.com/photo-1763739530672-4aadafbd81ff?auto=format&fit=crop&w=1800&q=80",
    alt: "Professional onboarding conversation",
  },
  legal: {
    src: "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?auto=format&fit=crop&w=1800&q=80",
    alt: "Corporate boardroom discussion",
  },
  default: {
    src: "https://images.unsplash.com/photo-1769740333462-9a63bfa914bc?auto=format&fit=crop&w=1800&q=80",
    alt: "Business collaboration scene",
  },
};

function stripLocale(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (!parts.length) return "/";

  if (locales.includes(parts[0] as (typeof locales)[number])) {
    const withoutLocale = parts.slice(1);
    return withoutLocale.length ? `/${withoutLocale.join("/")}` : "/";
  }

  return pathname;
}

function pickRouteKey(pathname: string): keyof typeof ROUTE_PHOTOS {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/platform")) return "platform";
  if (pathname.startsWith("/avers")) return "avers";
  if (pathname.startsWith("/connectia")) return "connectia";
  if (pathname.startsWith("/faq")) return "faq";
  if (pathname.startsWith("/contact")) return "contact";
  if (pathname.startsWith("/school")) return "school";
  if (pathname.startsWith("/lessons")) return "lessons";
  if (pathname.startsWith("/auth")) return "auth";
  if (pathname.startsWith("/terms") || pathname.startsWith("/legal"))
    return "legal";
  return "default";
}

export function RoutePhoto() {
  const rawPathname = usePathname();
  const pathname = stripLocale(rawPathname);
  const photo = ROUTE_PHOTOS[pickRouteKey(pathname)];

  return (
    <section aria-hidden="true" className="pt-5 sm:pt-7">
      <Container>
        <div className="relative h-44 overflow-hidden rounded-2xl border border-black/10 shadow-[0_10px_22px_rgba(0,0,0,0.12)] sm:h-60">
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className="h-full w-full object-cover opacity-80"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[color:rgba(42,93,89,0.45)] via-transparent to-[color:rgba(79,140,131,0.35)]" />
        </div>
      </Container>
    </section>
  );
}
