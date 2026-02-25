"use client";

import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

type Props = {
  amount?: string;
  onPaid?: () => void;
};

export function PayPalLessonButton({ amount = "0.01", onPaid }: Props) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const close = () => {
    setOpen(false);
    setError(null);
  };

  return (
    <>
      {/* Кнопка відкриття */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-[#2A5D59] px-4 py-2 text-sm font-medium text-[var(--text-invert)] transition hover:bg-[#3f7a72]"
      >
        Оплатити доступ до уроків
      </button>

      {/* Модалка */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={close} />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-black/10 bg-[var(--bg-surface)] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[var(--text-main)]">
                Оплата доступу до уроків
              </h3>

              <button
                onClick={close}
                className="text-xl leading-none text-[var(--text-muted)] hover:text-black"
              >
                ×
              </button>
            </div>

            {/* Amount */}
            <div className="mb-4 rounded-xl border border-black/10 bg-white/60 p-4 text-center">
              <p className="text-sm text-[var(--text-muted)]">Сума до оплати</p>
              <p className="mt-1 text-2xl font-bold text-[var(--text-main)]">
                ${amount}
              </p>
            </div>

            {/* Error */}
            {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

            {/* PayPal */}
            <PayPalButtons
              style={{ layout: "vertical" }}
              forceReRender={[amount]}
              createOrder={async () => {
                setError(null);

                const res = await fetch("/api/paypal/create-order", {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ amount }),
                });

                const data = await res.json();

                if (!res.ok || !data?.ok || !data?.id) {
                  throw new Error(
                    data?.error || "Не вдалося створити PayPal order",
                  );
                }

                return data.id as string;
              }}
              onApprove={async (data) => {
                setError(null);

                const res = await fetch("/api/paypal/capture-order", {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ orderId: data.orderID }),
                });

                const json = await res.json();

                if (!res.ok || !json?.ok) {
                  setError(json?.error || "Оплата не підтвердилась");
                  return;
                }

                close();
                onPaid?.();
              }}
              onError={(err) => {
                console.error(err);
                setError("PayPal помилка. Спробуй ще раз.");
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
