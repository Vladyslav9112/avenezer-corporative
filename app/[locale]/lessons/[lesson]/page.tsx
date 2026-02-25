import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { LESSONS_UK } from "@/content/lessons/uk";
import CompleteLessonButton from "../ui/CompleteLessonButton";
import Reveal from "@/components/animation/Reveal";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ locale: string; lesson: string }>;
}) {
  const { locale, lesson } = await params;
  const lessonNumber = Number(lesson);

  if (!Number.isInteger(lessonNumber) || lessonNumber < 1) {
    notFound();
  }

  const user = await getUserFromCookie();
  if (!user) redirect(`/${locale}/auth/login?next=/${locale}/lessons`);

  const la = await prisma.lessonAccess.findUnique({
    where: { userId: user.id },
    select: {
      completedLessons: true,
      status: true,
      paidAt: true,
      profileConfirmedAt: true,
    },
  });

  const isPaid = la?.status === "ACTIVE" && !!la?.paidAt;
  if (!isPaid || !la?.profileConfirmedAt) redirect(`/${locale}/school`);

  const totalLessons = LESSONS_UK.length;
  const completedLessons = la?.completedLessons ?? 0;
  const unlockedMax = Math.min(completedLessons + 1, totalLessons);

  if (lessonNumber > unlockedMax) {
    redirect(`/${locale}/lessons/${unlockedMax}`);
  }

  const lessonContent = LESSONS_UK.find((item) => item.id === lessonNumber);
  if (!lessonContent) notFound();

  const isCompleted = lessonNumber <= completedLessons;
  const lines = lessonContent.body.split("\n");

  const blocks: Array<
    | { type: "heading"; text: string }
    | { type: "subheading"; text: string }
    | { type: "paragraph"; text: string }
    | { type: "list"; items: string[] }
  > = [];

  let listBuffer: string[] = [];
  const flushList = () => {
    if (listBuffer.length) {
      blocks.push({ type: "list", items: listBuffer });
      listBuffer = [];
    }
  };

  for (const rawLine of lines) {
    const text = rawLine.trim();

    if (!text) {
      flushList();
      continue;
    }

    const bulletMatch = text.match(/^([•\-–]|o)\s+(.+)$/);
    if (bulletMatch) {
      listBuffer.push(bulletMatch[2]);
      continue;
    }

    flushList();

    if (
      /^\d+\.\s+/.test(text) ||
      /^Крок\s+\d+/i.test(text) ||
      /^Рівень\s+\d+/i.test(text) ||
      text.endsWith(":")
    ) {
      blocks.push({ type: "subheading", text });
      continue;
    }

    if (text.length <= 60 && !text.endsWith(".")) {
      blocks.push({ type: "heading", text });
      continue;
    }

    blocks.push({ type: "paragraph", text });
  }

  flushList();

  return (
    <div className="lesson-shell mx-auto max-w-6xl p-6">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <Reveal variant="block" className="h-fit">
          <aside className="lesson-card lesson-animate lesson-delay-1 h-fit rounded-2xl border border-black/10 bg-white p-4">
            <p className="text-sm font-semibold text-(--text-muted)">Уроки</p>
            <nav className="mt-3 flex flex-col gap-2">
              {LESSONS_UK.map((item) => {
                const locked = item.id > unlockedMax;
                const active = item.id === lessonNumber;
                const isDone = item.id <= completedLessons;

                const baseClasses =
                  "lesson-nav-item rounded-xl px-3 py-2 text-sm transition";
                const activeClasses = "bg-[#2A5D59] text-(--text-invert)";
                const normalClasses =
                  "border border-black/10 text-(--text-main) hover:bg-(--bg-surface)";
                const doneClasses =
                  "border border-black/10 bg-white text-black/80 font-semibold done-lesson-text";
                const lockedClasses = "cursor-not-allowed opacity-50";

                if (locked) {
                  return (
                    <div
                      key={item.id}
                      className={`${baseClasses} ${normalClasses} ${lockedClasses}`}
                    >
                      {item.title}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.id}
                    href={`/${locale}/lessons/${item.id}`}
                    className={`${baseClasses} ${
                      active
                        ? activeClasses
                        : isDone
                          ? doneClasses
                          : normalClasses
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 text-xs text-(--text-muted)">
              Прогрес: {completedLessons}/{totalLessons}
            </div>
          </aside>
        </Reveal>

        <Reveal variant="block">
          <main className="lesson-card lesson-main lesson-animate lesson-delay-2 rounded-2xl border border-black/10 bg-(--bg-surface) p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-2xl font-semibold text-(--text-main)">
                {lessonContent.title}
              </h1>
              <span className="text-sm text-(--text-muted)">
                Урок {lessonNumber} з {totalLessons}
              </span>
            </div>

            <div className="lesson-card mt-4 rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
              <div className="lesson-content border-l-4 border-[#2A5D59]/20 pl-4 text-[15px] text-(--text-muted) leading-7 tracking-[0.01em] md:text-base">
                {blocks.map((block, index) => {
                  const spacing = index === 0 ? "" : "mt-4";

                  if (block.type === "heading") {
                    return (
                      <Reveal
                        key={`${block.type}-${index}`}
                        variant="text"
                        className={spacing}
                      >
                        <h2 className="text-lg font-semibold text-(--text-main)">
                          {block.text}
                        </h2>
                      </Reveal>
                    );
                  }

                  if (block.type === "subheading") {
                    return (
                      <Reveal
                        key={`${block.type}-${index}`}
                        variant="text"
                        className={spacing}
                      >
                        <h3 className="text-base font-semibold text-(--text-main)">
                          {block.text}
                        </h3>
                      </Reveal>
                    );
                  }

                  if (block.type === "list") {
                    return (
                      <Reveal
                        key={`${block.type}-${index}`}
                        variant="text"
                        className={spacing}
                      >
                        <ul className="list-disc space-y-1 pl-5">
                          {block.items.map((item, itemIndex) => (
                            <li key={`${block.type}-${index}-${itemIndex}`}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </Reveal>
                    );
                  }

                  return (
                    <Reveal
                      key={`${block.type}-${index}`}
                      variant="text"
                      className={spacing}
                    >
                      <p>{block.text}</p>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            <Reveal variant="fade" delay={0.05}>
              <CompleteLessonButton
                locale={locale}
                lessonNumber={lessonNumber}
                totalLessons={totalLessons}
                isCompleted={isCompleted}
              />
            </Reveal>
          </main>
        </Reveal>
      </div>
    </div>
  );
}
