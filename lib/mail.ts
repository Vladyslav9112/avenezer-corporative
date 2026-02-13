import nodemailer from "nodemailer";

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name} in env`);
  return v;
}

export const mailer = nodemailer.createTransport({
  host: mustEnv("SMTP_HOST"),
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: String(process.env.SMTP_SECURE ?? "true") === "true",
  auth: {
    user: mustEnv("SMTP_USER"),
    pass: mustEnv("SMTP_PASS"),
  },
});

export function getFromEmail() {
  return process.env.SMTP_FROM || mustEnv("SMTP_USER");
}
