import { NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { paypalCreateOrder } from "@/lib/paypal";

export async function POST() {
  const user = await getUserFromCookie();
  if (!user)
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );

  const order = await paypalCreateOrder("00.01");
  return NextResponse.json({ ok: true, id: order.id });
}
