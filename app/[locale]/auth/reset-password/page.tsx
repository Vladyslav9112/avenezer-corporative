"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ResetPasswordPage() {
  const t = useTranslations("auth");
  const sp = useSearchParams();
  const router = useRouter();

  const token = sp.get("token") || "";

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!token)
      return setError(t("errors.invalidToken", { default: "Invalid token." }));
    if (password.length < 8)
      return setError(
        t("errors.passwordTooShort", { default: "Password too short." }),
      );
    if (password !== password2)
      return setError(
        t("errors.passwordsNotMatch", { default: "Passwords do not match." }),
      );

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(
          data.error || t("errors.unknown", { default: "Reset failed." }),
        );
        setLoading(false);
        return;
      }

      setOk(true);
      setTimeout(() => router.push("/auth/login"), 800);
    } catch {
      setError(t("errors.network", { default: "Network error." }));
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold text-[var(--text-main)]">
        {t("resetTitle", { default: "Reset password" })}
      </h1>

      <form
        onSubmit={onSubmit}
        className="mt-6 space-y-3 rounded-2xl bg-[var(--bg-surface)] p-5 shadow-sm"
      >
        <div>
          <label className="text-sm text-[var(--text-muted)]">
            {t("newPassword", { default: "New password" })}
          </label>
          <input
            type="password"
            className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        <div>
          <label className="text-sm text-[var(--text-muted)]">
            {t("passwordRepeat", { default: "Repeat password" })}
          </label>
          <input
            type="password"
            className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        {ok && (
          <p className="text-sm text-green-700">
            {t("resetOk", {
              default: "Password updated. Redirecting to login...",
            })}
          </p>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-[#2A5D59] px-4 py-2 text-[var(--text-invert)] hover:bg-[#3f7a72] disabled:opacity-60"
        >
          {loading
            ? t("loading", { default: "Loading..." })
            : t("resetBtn", { default: "Update password" })}
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
