import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 },
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address." },
        { status: 400 },
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT ?? 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const mailFrom = process.env.SMTP_FROM;
    const mailTo = process.env.SMTP_TO;

    if (!smtpHost || !smtpUser || !smtpPass || !mailFrom || !mailTo) {
      return NextResponse.json(
        { ok: false, error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const safe = (s: string) =>
      s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const prettyDate = new Date().toLocaleString("uk-UA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const subject = `Contact form: ${name}`;

    const html = `<!doctype html>
<html lang="uk">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${safe(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#4f8c83;">
  <!-- Preheader (hidden preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    Нове повідомлення з контактної форми AvenEzer — ${safe(name)} (${safe(email)})
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#4f8c83;">
    <tr>
      <td align="center" style="padding:28px 16px;">
        <!-- Container -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640"
          style="width:100%;max-width:640px;">
          <!-- Header -->
          <tr>
            <td style="padding:0 0 14px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" style="font-family:Arial, Helvetica, sans-serif;">
                    <div style="font-size:14px;letter-spacing:2px;text-transform:uppercase;color:#f2e8e1;opacity:.9;">
                      AvenEzer • Contact
                    </div>
                    <div style="font-size:26px;line-height:32px;font-weight:700;color:#f2e8e1;margin-top:8px;">
                      Нове повідомлення з сайту
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
              <!-- Top stripe -->
              <div style="height:6px;background:#2A5D59;"></div>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:22px 22px 8px 22px;font-family:Arial, Helvetica, sans-serif;color:#222;">
                    <div style="font-size:18px;font-weight:700;line-height:24px;">
                      Деталі відправника
                    </div>
                    <div style="height:10px;"></div>

                    <!-- Sender rows -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border-spacing:0 10px;">
                      <tr>
                        <td style="width:120px;font-size:12px;color:#444444;opacity:.9;">Імʼя</td>
                        <td style="font-size:14px;font-weight:700;color:#222;">${safe(name)}</td>
                      </tr>
                      <tr>
                        <td style="width:120px;font-size:12px;color:#444444;opacity:.9;">Email</td>
                        <td style="font-size:14px;color:#222;">
                          <a href="mailto:${encodeURIComponent(email)}" style="color:#2A5D59;text-decoration:underline;">
                            ${safe(email)}
                          </a>
                        </td>
                      </tr>
                    </table>

                    <div style="height:1px;background:rgba(0,0,0,.10);margin:14px 0;"></div>

                    <!-- Message -->
                    <div style="font-size:18px;font-weight:700;line-height:24px;margin-bottom:10px;">
                      Повідомлення
                    </div>

                    <div style="background:#ffffff;border:1px solid rgba(0,0,0,.10);border-radius:14px;padding:14px 14px;font-size:14px;line-height:20px;color:#222;white-space:pre-wrap;">
${safe(message)}
                    </div>

                    <!-- CTA -->
                    <div style="height:16px;"></div>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <a href="mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Re: " + subject)}"
                             style="display:inline-block;background:#2A5D59;color:#f2e8e1;text-decoration:none;border-radius:12px;padding:12px 16px;font-size:14px;font-weight:700;">
                            Відповісти клієнту
                          </a>
                        </td>
                        <td style="width:10px;"></td>
                        <td style="font-family:Arial, Helvetica, sans-serif;font-size:12px;color:#444444;">
                          Reply-To: <span style="color:#222;font-weight:700;">${safe(email)}</span>
                        </td>
                      </tr>
                    </table>

                    <div style="height:18px;"></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:14px 4px 0 4px;font-family:Arial, Helvetica, sans-serif;color:#f2e8e1;opacity:.85;font-size:12px;line-height:18px;">
              Це повідомлення надіслано з контактної форми корпоративного сайту AvenEzer.
              <br/>
              Якщо ти не очікував цей лист — перевір налаштування форми або SMTP.
            </td>
          </tr>
        </table>
        <!-- /Container -->
      </td>
    </tr>
  </table>
</body>
</html>`;

    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: email,
      subject,
      text: `AvenEzer — Contact form

Date: ${prettyDate}
Name: ${name}
Email: ${email}

Message:
${message}
`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Failed to send message." },
      { status: 500 },
    );
  }
}
