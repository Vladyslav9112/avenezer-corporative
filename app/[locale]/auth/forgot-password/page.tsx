"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ForgotPasswordPage() {
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold text-[var(--text-main)]">
        {t("forgotTitle", { default: "Forgot password" })}
      </h1>

      <p className="mt-2 text-sm text-[var(--text-muted)]">
        {t("forgotHint", { default: "Enter your email and we’ll send a reset link." })}
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-6 space-y-3 rounded-2xl bg-[var(--bg-surface)] p-5 shadow-sm"
      >
        <div>
          <label className="text-sm text-[var(--text-muted)]">{t("email", { default: "Email" })}</label>
          <input
            className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        {sent && (
          <p className="text-sm text-green-700">
            {t("forgotSent", { default: "If the email exists, we sent a reset link." })}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-[#2A5D59] px-4 py-2 text-[var(--text-invert)] hover:bg-[#3f7a72] disabled:opacity-60"
        >
          {loading ? t("loading", { default: "Loading..." }) : t("forgotBtn", { default: "Send reset link" })}
        </button>

        <div className="text-sm text-[var(--text-main)]">
          <Link className="underline" href="/auth/login">
            {t("backToLogin", { default: "Back to login" })}
          </Link>
        </div>
      </form>
    </div>
  );
}
