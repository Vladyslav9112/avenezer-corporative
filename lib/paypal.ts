const BASE = process.env.PAYPAL_BASE_URL!;
const CLIENT = process.env.PAYPAL_CLIENT_ID!;
const SECRET = process.env.PAYPAL_CLIENT_SECRET!;

function must(v: string | undefined, name: string) {
  if (!v) throw new Error(`Missing ${name} in env`);
  return v;
}

async function getAccessToken() {
  const client = must(CLIENT, "PAYPAL_CLIENT_ID");
  const secret = must(SECRET, "PAYPAL_CLIENT_SECRET");
  const base = must(BASE, "PAYPAL_BASE_URL");

  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + Buffer.from(`${client}:${secret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error_description || "PayPal auth failed");
  return data.access_token as string;
}

export async function paypalCreateOrder(amount: string) {
  const token = await getAccessToken();

  const res = await fetch(`${BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: { currency_code: "CAD", value: amount },
        },
      ],
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "PayPal create-order failed");
  return data; // містить id
}

export async function paypalCaptureOrder(orderId: string) {
  const token = await getAccessToken();

  const res = await fetch(`${BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "PayPal capture failed");
  return data;
}
