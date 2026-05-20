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
    return NextResponse.redirect(url, { status: 308 });
  }

  // /uk/register -> /uk/auth/register
  const m2 = pathname.match(/^\/(uk|en|fr)\/register\/?$/);
  if (m2) {
    const locale = m2[1];
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/auth/register`;
    return NextResponse.redirect(url, { status: 308 });
  }

  const response = intlMiddleware(req);

  // Strengthen the homepage locale redirect for crawlers and canonicalization.
  if (pathname === "/" && response.status === 307) {
    const location = response.headers.get("location");

    if (location) {
      const redirect = NextResponse.redirect(new URL(location, req.url), {
        status: 308,
      });

      response.headers.forEach((value, key) => {
        if (key.toLowerCase() !== "location") {
          redirect.headers.set(key, value);
        }
      });

      return redirect;
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
