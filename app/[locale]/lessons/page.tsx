import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { getLessonsByLocale } from "@/content/lessons";
import { buildPageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/lessons",
    title: "Lessons",
    description: "Private lesson area for AvenEzer partners.",
    includeAlternates: false,
    noIndex: true,
  });
}

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
