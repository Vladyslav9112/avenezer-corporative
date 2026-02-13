"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/school";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [acceptLegal, setAcceptLegal] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const e1 = email.trim();
    if (!e1)
      return setError(t("errors.invalidEmail", { default: "Email required." }));
    if (password.length < 8)
      return setError(
        t("errors.passwordTooShort", {
          default: "Password must be at least 8 characters.",
        }),
      );
    if (password !== password2)
      return setError(
        t("errors.passwordsNotMatch", { default: "Passwords do not match." }),
      );
    if (!acceptLegal)
      return setError(
        t("errors.legalRequired", {
          default: "You must accept the Terms and Legal policies.",
        }),
      );

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: e1, password, acceptLegal }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(
          data.error ||
            t("errors.unknown", { default: "Registration failed." }),
        );
        setLoading(false);
        return;
      }

      router.push(next);
    } catch {
      setError(t("errors.network", { default: "Network error." }));
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold text-[var(--text-main)]">
        {t("registerTitle", { default: "Create account" })}
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

          <div className="mt-1 flex items-stretch overflow-hidden rounded-xl bg-white">
            <input
              type={showPass ? "text" : "password"}
              className="w-full bg-transparent outline-none  px-3 py-2 text-[var(--text-main)]"
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

        <div>
          <label className="text-sm text-[var(--text-muted)]">
            {t("passwordRepeat", { default: "Repeat password" })}
          </label>

          <div className="mt-1 flex items-stretch overflow-hidden rounded-xl bg-white">
            <input
              type={showPass2 ? "text" : "password"}
              className="w-full bg-transparent px-3 py-2 outline-none text-[var(--text-main)]"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              autoComplete="new-password"
            />

            <button
              type="button"
              onClick={() => setShowPass2((v) => !v)}
              className="px-3 text-sm text-[var(--text-muted)] hover:text-[var(--text-main)]"
              aria-label={showPass2 ? "Hide password" : "Show password"}
              title={showPass2 ? "Hide password" : "Show password"}
            >
              {showPass2 ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* ✅ Consent checkbox */}
        <label className="flex items-start gap-2 text-sm text-[var(--text-main)]">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-[#2A5D59]"
            checked={acceptLegal}
            onChange={(e) => setAcceptLegal(e.target.checked)}
          />
          <span className="leading-5">
            {t("consentPrefix", { default: "I agree to the" })}{" "}
            <Link className="underline" href="/terms" target="_blank">
              {t("termsLink", { default: "Terms of Use" })}
            </Link>{" "}
            {t("and", { default: "and" })}{" "}
            <Link className="underline" href="/legal" target="_blank">
              {t("legalLink", { default: "Legal Policies" })}
            </Link>
            .
          </span>
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-[#2A5D59] px-4 py-2 text-[var(--text-invert)] hover:bg-[#3f7a72] disabled:opacity-60 "
        >
          {loading
            ? t("loading", { default: "Loading..." })
            : t("registerBtn", { default: "Create account" })}
        </button>

        <div className="flex items-center justify-between text-sm text-[var(--text-main)]">
          <Link className="underline" href="/auth/login">
            {t("loginLink", { default: "I already have an account" })}
          </Link>
        </div>
      </form>
    </div>
  );
}
