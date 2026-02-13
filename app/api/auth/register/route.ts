import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { signAuthToken } from "@/lib/auth/jwt";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// змінюй версію, коли оновиш тексти Terms/Legal
const LEGAL_VERSION = "2026-02-13";

function getClientIp(req: Request) {
  const xf = req.headers.get("x-forwarded-for");
  if (!xf) return null;
  return xf.split(",")[0]?.trim() || null;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      email?: string;
      password?: string;
      acceptLegal?: boolean;
    };

    const email = (body.email ?? "").trim().toLowerCase();
    const password = (body.password ?? "").trim();
    const acceptLegal = Boolean(body.acceptLegal);

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email." },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { ok: false, error: "Password must be at least 8 characters." },
        { status: 400 },
      );
    }

    if (!acceptLegal) {
      return NextResponse.json(
        { ok: false, error: "Legal consent required." },
        { status: 400 },
      );
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json(
        { ok: false, error: "Email already in use." },
        { status: 409 },
      );
    }

    const passwordHash = await hashPassword(password);

    const userAgent = req.headers.get("user-agent") ?? undefined;
    const ip = getClientIp(req) ?? undefined;

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        lessonAccess: { create: { status: "PENDING" } },
        consents: {
          create: [
            { type: "TERMS", version: LEGAL_VERSION, ip, userAgent },
            { type: "LEGAL", version: LEGAL_VERSION, ip, userAgent },
          ],
        },
      },
      select: { id: true, email: true },
    });

    const token = signAuthToken({ sub: user.id, email: user.email });

    const res = NextResponse.json({ ok: true, user });
    res.cookies.set("auth_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return res;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error." },
      { status: 500 },
    );
  }
}
