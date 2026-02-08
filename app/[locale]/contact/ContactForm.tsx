"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { User, Mail, MessageSquare, Send } from "lucide-react";

type FormState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "success" }
  | { status: "error"; message: string };

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [state, setState] = useState<FormState>({ status: "idle" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (state.status === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    setState({ status: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;

        setState({
          status: "error",
          message: data?.error ?? t("errors.sendFailed"),
        });
        return;
      }

      form.reset();
      setState({ status: "success" });
    } catch {
      setState({
        status: "error",
        message: t("errors.network"),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* NAME */}
        <label className="space-y-2">
          <span className="text-m font-medium text-[var(--text-main)]">
            {t("fields.name")}
          </span>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
            <input
              name="name"
              type="text"
              required
              className="w-full rounded-xl border border-black/10 bg-white/80 pl-12 pr-4 py-3 text-sm text-[var(--text-main)] shadow-sm focus:border-black/30 focus:outline-none"
            />
          </div>
        </label>

        {/* EMAIL */}
        <label className="space-y-2">
          <span className="text-m font-medium text-[var(--text-main)]">
            {t("fields.email")}
          </span>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-black/10 bg-white/80 pl-12 pr-4 py-3 text-sm text-[var(--text-main)] shadow-sm focus:border-black/30 focus:outline-none"
            />
          </div>
        </label>
      </div>

      {/* MESSAGE */}
      <label className="space-y-2">
        <span className="text-m font-medium text-[var(--text-main)]">
          {t("fields.message")}
        </span>
        <div className="relative flex gap-2">
          <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-black/40 mr-3" />
          <textarea
            name="message"
            required
            rows={6}
            className="w-full rounded-xl border border-black/10 bg-white/80 pl-12 px-4 py-3 text-sm text-[var(--text-main)] shadow-sm focus:border-black/30 focus:outline-none"
          />
        </div>
      </label>

      {/* ACTIONS */}
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--text-main)] px-6 py-3 text-sm font-semibold text-[var(--text-invert)] transition hover:opacity-90"
        >
          <Send className="h-4 w-4" />
          {state.status === "sending"
            ? t("buttons.sending")
            : t("buttons.send")}
        </button>

        <p
          className="text-sm text-[var(--text-main)]"
          role="status"
          aria-live="polite"
        >
          {state.status === "success"
            ? t("messages.success")
            : state.status === "error"
              ? state.message
              : ""}
        </p>
      </div>
    </form>
  );
}
