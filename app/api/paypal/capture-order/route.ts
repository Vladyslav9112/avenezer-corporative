import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { paypalCaptureOrder } from "@/lib/paypal";
import {
  LESSONS_PAYMENT_AMOUNT,
  LESSONS_PAYMENT_CURRENCY,
  LESSONS_PAYMENT_LABEL,
} from "@/lib/paymentConfig";

type PayPalMoney = {
  value?: string;
  currency_code?: string;
};

type PayPalCompletedCapture = {
  status?: string;
  amount?: PayPalMoney;
};

type PayPalCaptureOrder = {
  status?: string;
  purchase_units?: Array<{
    amount?: PayPalMoney;
    payments?: {
      captures?: PayPalCompletedCapture[];
    };
  }>;
};

function isCompleted(capture: PayPalCaptureOrder) {
  const orderCompleted = capture?.status === "COMPLETED";
  const captureCompleted =
    capture?.purchase_units?.[0]?.payments?.captures?.[0]?.status ===
    "COMPLETED";
  return Boolean(orderCompleted || captureCompleted);
}

function normalizeAmount(value: unknown) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return null;
  return numeric.toFixed(2);
}

function hasExpectedAmount(capture: PayPalCaptureOrder) {
  const completedCapture =
    capture?.purchase_units?.[0]?.payments?.captures?.find(
      (item) => item?.status === "COMPLETED",
    ) ?? capture?.purchase_units?.[0]?.payments?.captures?.[0];

  const amountValue =
    completedCapture?.amount?.value ??
    capture?.purchase_units?.[0]?.amount?.value;
  const currencyCode =
    completedCapture?.amount?.currency_code ??
    capture?.purchase_units?.[0]?.amount?.currency_code;

  return (
    normalizeAmount(amountValue) === LESSONS_PAYMENT_AMOUNT &&
    currencyCode === LESSONS_PAYMENT_CURRENCY
  );
}

export async function POST(req: Request) {
  const user = await getUserFromCookie();
  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  const body = (await req.json()) as { orderId?: string };
  const orderId = (body.orderId ?? "").trim();
  if (!orderId) {
    return NextResponse.json(
      { ok: false, error: "Missing orderId" },
      { status: 400 },
    );
  }

  const capture = await paypalCaptureOrder(orderId);

  if (!isCompleted(capture)) {
    return NextResponse.json(
      { ok: false, error: "Payment not completed" },
      { status: 400 },
    );
  }

  if (!hasExpectedAmount(capture)) {
    return NextResponse.json(
      {
        ok: false,
        error: `Invalid payment amount. Expected ${LESSONS_PAYMENT_LABEL}.`,
      },
      { status: 400 },
    );
  }

  await prisma.lessonAccess.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      status: "ACTIVE",
      paidAt: new Date(),
      provider: "PAYPAL",
      providerOrderId: orderId,
      profileConfirmedAt: null,
    },
    update: {
      status: "ACTIVE",
      paidAt: new Date(),
      provider: "PAYPAL",
      providerOrderId: orderId,
      profileConfirmedAt: null,
    },
  });

  return NextResponse.json({ ok: true });
}
