import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { ok: false, error: "Not available in production" },
      { status: 403 },
    );
  }

  const user = await getUserFromCookie();
  if (!user)
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );

  await prisma.lessonAccess.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      status: "ACTIVE",
      paidAt: new Date(),
      provider: "PAYPAL",
      providerOrderId: `DEV-${Date.now()}`,
    },
    update: {
      status: "ACTIVE",
      paidAt: new Date(),
      provider: "PAYPAL",
      providerOrderId: `DEV-${Date.now()}`,
      // важливо: якщо хочеш щоразу змушувати знову заповнювати — розкоментуй:
      // profileConfirmedAt: null
    },
  });

  return NextResponse.json({ ok: true });
}
