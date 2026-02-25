"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CompleteLessonButton(props: {
  locale: string;
  lessonNumber: number;
  totalLessons: number;
  isCompleted: boolean;
}) {
  const { locale, lessonNumber, totalLessons, isCompleted } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acknowledged, setAcknowledged] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(45);

  const isLast = lessonNumber >= totalLessons;

  useEffect(() => {
    if (isCompleted) return;
    if (secondsLeft <= 0) return;

    const id = window.setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => window.clearInterval(id);
  }, [isCompleted, secondsLeft]);

  async function markComplete() {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/lessons/complete", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ lesson: lessonNumber }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to complete lesson");
      }

      if (isLast) {
        router.refresh();
        return;
      }

      router.push(`/${locale}/lessons/${data.nextLesson ?? lessonNumber + 1}`);
    } catch (err: any) {
      setError(err?.message ?? "Failed to complete lesson");
      setLoading(false);
    }
  }

  if (isCompleted) {
    if (isLast) {
      return (
        <div className="mt-6 rounded-2xl border border-black/10 bg-white p-4 text-sm text-(--text-muted)">
          Усі уроки пройдено ✅
        </div>
      );
    }

    return (
      <div className="mt-6 rounded-2xl border border-black/10 bg-white p-4 text-sm text-(--text-muted)">
        Урок пройдено ✅ Наступний урок відкриється в меню після завершення
        поточного.
      </div>
    );
  }

  const canSubmit = acknowledged && secondsLeft === 0 && !loading;

  return (
    <div className="mt-6 flex flex-col gap-3">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="rounded-2xl border border-black/10 bg-white p-4 text-sm text-(--text-muted)">
        <p>
          Щоб позначити урок пройденим, підтвердь ознайомлення та дочекайся
          таймера.
        </p>
        <label className="mt-3 flex items-center gap-2 text-sm text-(--text-main)">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={acknowledged}
            onChange={(event) => setAcknowledged(event.target.checked)}
          />
          Я ознайомився(лась) з уроком
        </label>
        <p className="mt-2 text-xs text-(--text-muted)">
          {secondsLeft > 0
            ? `Зачекай ще ${secondsLeft} сек.`
            : "Таймер завершено. Можеш завершити урок."}
        </p>
      </div>
      <button
        type="button"
        className="w-full rounded-xl bg-[#2A5D59] px-4 py-2 text-(--text-invert) hover:bg-[#3f7a72] disabled:opacity-60"
        disabled={!canSubmit}
        onClick={markComplete}
      >
        {loading ? "Зачекай..." : "Позначити урок пройденим"}
      </button>
    </div>
  );
}
