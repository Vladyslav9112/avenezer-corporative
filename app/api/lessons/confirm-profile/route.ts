import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { mailer, getFromEmail } from "@/lib/mail";

export const runtime = "nodejs";

const TG_RE = /^@?[a-zA-Z0-9_]{5,32}$/;

function getClientIp(req: Request) {
  const xf = req.headers.get("x-forwarded-for");
  if (!xf) return null;
  return xf.split(",")[0]?.trim() || null;
}

const safe = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export async function POST(req: Request) {
  try {
    const sessionUser = await getUserFromCookie();
    if (!sessionUser) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

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

    // 1) Перевіряємо оплату
    const la = await prisma.lessonAccess.findUnique({
      where: { userId: sessionUser.id },
      select: {
        status: true,
        paidAt: true,
        provider: true,
        providerOrderId: true,
      },
    });

    const isPaid = la?.status === "ACTIVE" && !!la?.paidAt;
    if (!isPaid) {
      return NextResponse.json(
        { ok: false, error: "Payment required." },
        { status: 400 },
      );
    }

    // 2) Зберігаємо дані + підтвердження
    const updatedUser = await prisma.$transaction(async (tx) => {
      const u = await tx.user.update({
        where: { id: sessionUser.id },
        data: { name, telegram },
        select: { id: true, email: true, name: true, telegram: true },
      });

      await tx.lessonAccess.update({
        where: { userId: sessionUser.id },
        data: { profileConfirmedAt: new Date() },
      });

      return u;
    });

    // 3) Надсилаємо лист адміну
    const notifyTo = process.env.LESSONS_NOTIFY_EMAIL;
    if (!notifyTo) {
      return NextResponse.json({
        ok: true,
        emailSent: false,
        warning: "LESSONS_NOTIFY_EMAIL missing",
      });
    }

    const ip = getClientIp(req);
    const ua = req.headers.get("user-agent") ?? "";

    const prettyDate = new Date().toLocaleString("uk-UA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const subject = `AvenEzer School: Lessons purchased ($10) — ${updatedUser.email}`;

    const email = updatedUser.email;
    const provider = la?.provider ?? "PAYPAL";
    const orderId = la?.providerOrderId ?? "";
    const paidAt = la?.paidAt?.toISOString() ?? "";

    const preheader = `New lessons purchase — ${email} (${name}, ${telegram})`;

    const text =
      `AvenEzer School — Lessons purchase\n\n` +
      `Date: ${prettyDate}\n\n` +
      `User:\n` +
      `- Email: ${email}\n` +
      `- Name: ${name}\n` +
      `- Telegram: ${telegram}\n\n` +
      `Payment:\n` +
      `- Status: ${la?.status}\n` +
      `- PaidAt: ${paidAt}\n` +
      `- Provider: ${provider}\n` +
      `- OrderId: ${orderId}\n\n` +
      `Meta:\n` +
      `- IP: ${ip ?? ""}\n` +
      `- UA: ${ua}\n`;

    const html = `<!doctype html>
<html lang="uk">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${safe(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#4f8c83;">
  <!-- Preheader -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${safe(preheader)}
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#4f8c83;">
    <tr>
      <td align="center" style="padding:28px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="width:100%;max-width:640px;">
          <!-- Header -->
          <tr>
            <td style="padding:0 0 14px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" style="font-family:Arial, Helvetica, sans-serif;">
                    <div style="font-size:14px;letter-spacing:2px;text-transform:uppercase;color:#f2e8e1;opacity:.9;">
                      AvenEzer • School
                    </div>
                    <div style="font-size:26px;line-height:32px;font-weight:700;color:#f2e8e1;margin-top:8px;">
                      Нове придбання уроків
                    </div>
                  </td>
                  <td align="right" style="font-family:Arial, Helvetica, sans-serif;vertical-align:top;">
                    <div style="display:inline-block;background:rgba(242,232,225,.18);border:1px solid rgba(242,232,225,.35);border-radius:999px;padding:8px 12px;color:#f2e8e1;font-size:12px;">
                      ${safe(prettyDate)}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ededed;border-radius:18px;overflow:hidden;border:1px solid rgba(0,0,0,.08);box-shadow:0 10px 28px rgba(0,0,0,.18);">
              <!-- Stripe -->
              <div style="height:6px;background:#2A5D59;"></div>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:22px 22px 18px 22px;font-family:Arial, Helvetica, sans-serif;color:#222;">
                    <div style="font-size:18px;font-weight:700;line-height:24px;">
                      Дані користувача
                    </div>
                    <div style="height:10px;"></div>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border-spacing:0 10px;">
                      <tr>
                        <td style="width:140px;font-size:12px;color:#444444;opacity:.9;">Email</td>
                        <td style="font-size:14px;color:#222;">
                          <a href="mailto:${encodeURIComponent(email)}" style="color:#2A5D59;text-decoration:underline;font-weight:700;">
                            ${safe(email)}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="width:140px;font-size:12px;color:#444444;opacity:.9;">Імʼя</td>
                        <td style="font-size:14px;font-weight:700;color:#222;">${safe(name)}</td>
                      </tr>
                      <tr>
                        <td style="width:140px;font-size:12px;color:#444444;opacity:.9;">Telegram</td>
                        <td style="font-size:14px;color:#222;">
                          <span style="font-weight:700;">${safe(telegram)}</span>
                        </td>
                      </tr>
                    </table>

                    <div style="height:1px;background:rgba(0,0,0,.10);margin:14px 0;"></div>

                    <div style="font-size:18px;font-weight:700;line-height:24px;">
                      Оплата
                    </div>
                    <div style="height:10px;"></div>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border-spacing:0 10px;">
                      <tr>
                        <td style="width:140px;font-size:12px;color:#444444;opacity:.9;">Сума</td>
                        <td style="font-size:14px;font-weight:700;color:#222;">10.00 USD</td>
                      </tr>
                      <tr>
                        <td style="width:140px;font-size:12px;color:#444444;opacity:.9;">Статус</td>
                        <td style="font-size:14px;color:#222;">
                          <span style="display:inline-block;background:rgba(42,93,89,.12);border:1px solid rgba(42,93,89,.25);border-radius:999px;padding:6px 10px;font-weight:700;color:#2A5D59;">
                            ${safe(String(la?.status ?? ""))}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="width:140px;font-size:12px;color:#444444;opacity:.9;">Провайдер</td>
                        <td style="font-size:14px;color:#222;">${safe(String(provider))}</td>
                      </tr>
                      <tr>
                        <td style="width:140px;font-size:12px;color:#444444;opacity:.9;">Order ID</td>
                        <td style="font-size:14px;color:#222;">
                          <span style="font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">
                            ${safe(String(orderId))}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="width:140px;font-size:12px;color:#444444;opacity:.9;">Paid At</td>
                        <td style="font-size:14px;color:#222;">
                          <span style="font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">
                            ${safe(String(paidAt))}
                          </span>
                        </td>
                      </tr>
                    </table>

                    <div style="height:1px;background:rgba(0,0,0,.10);margin:14px 0;"></div>

                    <div style="font-size:14px;color:#444444;line-height:20px;">
                      <div><b>IP:</b> ${safe(ip ?? "")}</div>
                      <div style="margin-top:6px;"><b>UA:</b> ${safe(ua)}</div>
                    </div>

                    <div style="height:16px;"></div>

                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <a href="mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("AvenEzer School — lessons purchase")}"
                             style="display:inline-block;background:#2A5D59;color:#f2e8e1;text-decoration:none;border-radius:12px;padding:12px 16px;font-size:14px;font-weight:700;">
                            Написати користувачу
                          </a>
                        </td>
                        <td style="width:10px;"></td>
                        <td style="font-family:Arial, Helvetica, sans-serif;font-size:12px;color:#444444;">
                          Reply-To: <span style="color:#222;font-weight:700;">${safe(email)}</span>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await mailer.sendMail({
      from: getFromEmail(),
      to: notifyTo,
      subject,
      text,
      html,
      replyTo: updatedUser.email, // зручно одразу відповідати
    });

    return NextResponse.json({ ok: true, emailSent: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error." },
      { status: 500 },
    );
  }
}
