import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { paypalCaptureOrder } from "@/lib/paypal";

function isCompleted(capture: any) {
  const s1 = capture?.status === "COMPLETED";
  const s2 =
    capture?.purchase_units?.[0]?.payments?.captures?.[0]?.status ===
    "COMPLETED";
  return Boolean(s1 || s2);
}

export async function POST(req: Request) {
  const user = await getUserFromCookie();
  if (!user)
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );

  const body = (await req.json()) as { orderId?: string };
  const orderId = (body.orderId ?? "").trim();
  if (!orderId)
    return NextResponse.json(
      { ok: false, error: "Missing orderId" },
      { status: 400 },
    );

  const capture = await paypalCaptureOrder(orderId);

  if (!isCompleted(capture)) {
    return NextResponse.json(
      { ok: false, error: "Payment not completed" },
      { status: 400 },
    );
  }

  // ✅ записуємо доступ (і змушуємо знову заповнити дані після оплати)
  await prisma.lessonAccess.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      status: "ACTIVE",
      paidAt: new Date(),
      provider: "PAYPAL",
      providerOrderId: orderId,
      profileConfirmedAt: null,
    },
    update: {
      status: "ACTIVE",
      paidAt: new Date(),
      provider: "PAYPAL",
      providerOrderId: orderId,
      profileConfirmedAt: null,
    },
  });

  return NextResponse.json({ ok: true });
}
