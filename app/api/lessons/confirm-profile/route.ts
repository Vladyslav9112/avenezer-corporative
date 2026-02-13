import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";

const TG_RE = /^@?[a-zA-Z0-9_]{5,32}$/;

export async function POST(req: Request) {
  try {
    const user = await getUserFromCookie();
    if (!user)
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );

    const body = (await req.json()) as { name?: string; telegram?: string };

    const name = (body.name ?? "").trim();
    const tgRaw = (body.telegram ?? "").trim();
    const telegram = tgRaw.startsWith("@") ? tgRaw : `@${tgRaw}`;

    if (name.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Name is required." },
        { status: 400 },
      );
    }
    if (!TG_RE.test(telegram)) {
      return NextResponse.json(
        { ok: false, error: "Invalid Telegram username." },
        { status: 400 },
      );
    }

    const la = await prisma.lessonAccess.findUnique({
      where: { userId: user.id },
      select: { status: true, paidAt: true },
    });

    const isPaid = la?.status === "ACTIVE" && !!la?.paidAt;
    if (!isPaid) {
      return NextResponse.json(
        { ok: false, error: "Payment required." },
        { status: 400 },
      );
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { name, telegram },
      }),
      prisma.lessonAccess.update({
        where: { userId: user.id },
        data: { profileConfirmedAt: new Date() },
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error." },
      { status: 500 },
    );
  }
}
