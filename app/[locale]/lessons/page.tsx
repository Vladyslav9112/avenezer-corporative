import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { getLessonsByLocale } from "@/content/lessons";

export default async function LessonsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const user = await getUserFromCookie();
  const lessons = getLessonsByLocale(locale);

  if (!user) redirect(`/${locale}/auth/login?next=/${locale}/lessons`);

  const la = await prisma.lessonAccess.findUnique({
    where: { userId: user.id },
    select: { completedLessons: true },
  });

  const totalLessons = lessons.length;
  const completedLessons = la?.completedLessons ?? 0;
  const nextLesson = Math.min(completedLessons + 1, totalLessons);

  redirect(`/${locale}/lessons/${nextLesson}`);
}
