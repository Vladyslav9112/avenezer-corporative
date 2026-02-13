import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { mailer, getFromEmail } from "@/lib/mail";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string };
    const email = (body.email ?? "").trim().toLowerCase();

    if (!EMAIL_RE.test(email)) {
      // не палимо валідність акаунта — повертаємо ок
      return NextResponse.json({ ok: true });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true },
    });

    // Завжди повертаємо ok (щоб не можна було підбирати emails)
    if (!user) return NextResponse.json({ ok: true });

    // інвалідуємо попередні невикористані токени
    await prisma.passwordResetToken.updateMany({
      where: { userId: user.id, usedAt: null },
      data: { usedAt: new Date() },
    });

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = sha256(rawToken);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // 30 хв

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    });

    const appUrl = process.env.APP_URL || "http://localhost:3000";
    const resetLink = `${appUrl}/en/auth/reset-password?token=${rawToken}`;

    const subject = "Reset your password";
    const text =
      `You requested a password reset.\n\n` +
      `Open this link to set a new password (valid for 30 minutes):\n` +
      `${resetLink}\n\n` +
      `If you didn't request this, ignore this email.`;

    await mailer.sendMail({
      from: getFromEmail(),
      to: user.email,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch {
    // теж не палимо деталі
    return NextResponse.json({ ok: true });
  }
}
