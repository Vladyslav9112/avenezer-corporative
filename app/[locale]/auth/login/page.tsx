"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function LoginPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }

      router.push(next);
    } catch {
      setError("Network error.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold text-[var(--text-main)]">
        {t("loginTitle", { default: "Login" })}
      </h1>

      <form
        onSubmit={onSubmit}
        className="mt-6 space-y-3 rounded-2xl bg-[var(--bg-surface)] p-5 shadow-sm"
      >
        <div>
          <label className="text-sm text-[var(--text-muted)]">
            {t("email", { default: "Email" })}
          </label>
          <input
            className="mt-1 w-full rounded-xl outline-none bg-white px-3 py-2 text-[var(--text-muted)]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div>
          <label className="text-sm text-[var(--text-muted)]">
            {t("password", { default: "Password" })}
          </label>

          <div className="mt-1 flex overflow-hidden rounded-xl border border-black/10 bg-white">
            <input
              type={showPass ? "text" : "password"}
              className="w-full bg-transparent px-3 py-2 outline-none  text-[var(--text-muted)]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />

            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="px-3 text-sm text-[var(--text-muted)] hover:text-[var(--text-main)]"
              aria-label={showPass ? "Hide password" : "Show password"}
              title={showPass ? "Hide password" : "Show password"}
            >
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-[#2A5D59] px-4 py-2 text-[var(--text-invert)] hover:bg-[#3f7a72] disabled:opacity-60"
        >
          {loading
            ? t("loading", { default: "Loading..." })
            : t("loginBtn", { default: "Login" })}
        </button>

        <div className="flex items-center justify-between text-sm text-[var(--text-main)]">
          <Link className="underline" href="/auth/forgot-password">
            {t("forgot", { default: "Forgot password?" })}
          </Link>
          <Link className="underline" href="/auth/register">
            {t("registerLink", { default: "Create account" })}
          </Link>
        </div>
      </form>
    </div>
  );
}
