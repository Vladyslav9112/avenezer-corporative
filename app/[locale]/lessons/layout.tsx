import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";

export default async function LessonsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const user = await getUserFromCookie();
  if (!user) redirect(`/${locale}/auth/login?next=/${locale}/lessons`);

  const la = await prisma.lessonAccess.findUnique({
    where: { userId: user.id },
    select: { status: true, paidAt: true, profileConfirmedAt: true },
  });

  const isPaid = la?.status === "ACTIVE" && !!la?.paidAt;

  if (!isPaid) redirect(`/${locale}/school`);
  if (!la?.profileConfirmedAt) redirect(`/${locale}/school`);

  return <>{children}</>;
}
