"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { LESSONS_PAYMENT_CURRENCY } from "@/lib/paymentConfig";

export function PayPalProvider({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  // щоб не падало “мовчки”
  if (!clientId) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Missing <b>NEXT_PUBLIC_PAYPAL_CLIENT_ID</b> in env.
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency: LESSONS_PAYMENT_CURRENCY,
        intent: "capture",
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
}
