"use client";

import { useState } from "react";
import Link from "next/link";
import { PayPalProvider } from "@/components/payment/PayPalProvider";
import { PayPalLessonButton } from "@/components/payment/PayPalLessonButton";

export default function SchoolGate(props: {
  locale: string;
  status: string;
  paidAt: string | null;
  profileConfirmedAt: string | null;
  initialName: string;
  initialTelegram: string;
}) {
  const {
    locale,
    status,
    paidAt,
    profileConfirmedAt,
    initialName,
    initialTelegram,
  } = props;

  const isPaid = status === "ACTIVE" && !!paidAt;
  const needsProfile = isPaid && !profileConfirmedAt;

  const [name, setName] = useState(initialName);
  const [telegram, setTelegram] = useState(initialTelegram);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function devPay() {
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/lessons/dev-mark-paid", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Payment failed");
      window.location.reload();
    } catch (e: any) {
      setErr(e?.message ?? "Payment failed");
      setLoading(false);
    }
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/lessons/confirm-profile", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, telegram }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Save failed");
      window.location.reload();
    } catch (e: any) {
      setErr(e?.message ?? "Save failed");
      setLoading(false);
    }
  }

  // 1) Не оплачено
  if (!isPaid) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-4">
        <h3 className="font-semibold text-[var(--text-main)]">
          Доступ до уроків
        </h3>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Оплата $10 відкриває доступ до уроків школи.
        </p>

        {err && <p className="mt-2 text-sm text-red-600">{err}</p>}

        <div className="mt-4">
          <PayPalProvider>
            <PayPalLessonButton
              amount="10.00"
              onPaid={() => window.location.reload()}
            />
          </PayPalProvider>
        </div>
      </div>
    );
  }

  // 2) Оплачено, але не заповнили дані
  if (needsProfile) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-4">
        <h3 className="font-semibold text-[var(--text-main)]">
          Заповни дані для доступу
        </h3>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Після оплати потрібно вказати ім’я та Telegram. Якщо ти вийдеш і
          зайдеш знову — ми знову попросимо заповнити, доки не підтвердиш.
        </p>

        <form onSubmit={saveProfile} className="mt-4 space-y-3">
          <div>
            <label className="text-sm text-[var(--text-muted)]">Ім’я</label>
            <input
              className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[var(--text-muted)]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-[var(--text-muted)]">Telegram</label>
            <input
              className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[var(--text-muted)]"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              placeholder="@username"
            />
          </div>

          {err && <p className="text-sm text-red-600">{err}</p>}

          <button
            disabled={loading}
            className="w-full rounded-xl bg-[#2A5D59] px-4 py-2 text-[var(--text-invert)] hover:bg-[#3f7a72] disabled:opacity-60"
          >
            {loading ? "Loading..." : "Зберегти"}
          </button>
        </form>
      </div>
    );
  }

  // 3) Доступ активний + профіль підтверджений
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4">
      <h3 className="font-semibold text-[var(--text-main)]">
        Доступ активний ✅
      </h3>
      <p className="mt-1 text-sm text-[var(--text-muted)]">
        Можеш переходити до уроків.
      </p>

      <Link
        href={`/${locale}/lessons`}
        className="mt-4 inline-flex w-full justify-center rounded-xl bg-[#2A5D59] px-4 py-2 text-[var(--text-invert)] hover:bg-[#3f7a72]"
      >
        Перейти до уроків
      </Link>
    </div>
  );
}
