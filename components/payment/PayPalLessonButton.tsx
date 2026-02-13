"use client";

import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

export function PayPalLessonButton({
  amount = "00.01",
  onPaid,
}: {
  amount?: string;
  onPaid?: () => void;
}) {
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      {error && <p className="mb-2 text-sm text-red-600">{error}</p>}

      <PayPalButtons
        style={{ layout: "vertical" }}
        forceReRender={[amount]}
        createOrder={async () => {
          setError(null);

          const res = await fetch("/api/paypal/create-order", {
            method: "POST",
          });
          const data = await res.json();

          if (!res.ok || !data?.ok || !data?.id) {
            throw new Error(data?.error || "Не вдалося створити PayPal order");
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

          onPaid?.();
        }}
        onError={(err) => {
          setError("PayPal помилка. Спробуй ще раз.");
          console.error(err);
        }}
        onCancel={() => {
          // не обов'язково, але можна показати повідомлення
          // setError("Оплату скасовано.");
        }}
      />
    </div>
  );
}
