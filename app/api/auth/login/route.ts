import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { signAuthToken } from "@/lib/auth/jwt";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string; password?: string };

    const email = (body.email ?? "").trim().toLowerCase();
    const password = (body.password ?? "").trim();

    if (!EMAIL_RE.test(email) || !password) {
      return NextResponse.json(
        { ok: false, error: "Invalid credentials." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, passwordHash: true },
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Invalid credentials." },
        { status: 401 },
      );
    }

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json(
        { ok: false, error: "Invalid credentials." },
        { status: 401 },
      );
    }

    const token = signAuthToken({ sub: user.id, email: user.email });

    const res = NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email },
    });
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
