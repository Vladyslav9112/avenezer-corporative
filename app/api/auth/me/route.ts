import { NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";

export async function GET() {
  const user = await getUserFromCookie();
  return NextResponse.json({ ok: true, user });
}
