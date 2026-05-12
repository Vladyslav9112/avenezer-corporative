import { NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { paypalCreateOrder } from "@/lib/paypal";
import { LESSONS_PAYMENT_AMOUNT } from "@/lib/paymentConfig";

export async function POST() {
  const user = await getUserFromCookie();
  if (!user)
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );

  const order = await paypalCreateOrder(LESSONS_PAYMENT_AMOUNT);
  return NextResponse.json({ ok: true, id: order.id });
}
