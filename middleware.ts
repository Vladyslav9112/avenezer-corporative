import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/i18n";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /uk/login -> /uk/auth/login
  const m1 = pathname.match(/^\/(uk|en|fr)\/login\/?$/);
  if (m1) {
    const locale = m1[1];
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/auth/login`;
    return NextResponse.redirect(url);
  }

  // /uk/register -> /uk/auth/register
  const m2 = pathname.match(/^\/(uk|en|fr)\/register\/?$/);
  if (m2) {
    const locale = m2[1];
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/auth/register`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
