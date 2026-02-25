import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import SchoolGate from "./ui/SchoolGate";
import Reveal from "@/components/animation/Reveal";

export default async function SchoolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const user = await getUserFromCookie();
  if (!user) redirect(`/${locale}/auth/login?next=/${locale}/school`);

  const u = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      email: true,
      name: true,
      telegram: true,
      lessonAccess: {
        select: { status: true, paidAt: true, profileConfirmedAt: true },
      },
    },
  });

  if (!u) redirect(`/${locale}/auth/login?next=/${locale}/school`);

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Reveal variant="block">
        <div className="rounded-2xl bg-[var(--bg-surface)] p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-[var(--text-main)]">
            Школа AVER
          </h1>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Reveal variant="block">
              <div className="rounded-2xl border border-black/10 bg-white p-4">
                <h3 className="font-semibold text-[var(--text-main)]">
                  Хто такі AVER
                </h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  AVER — це людина, яка допомагає бізнесу правильно зайти в
                  систему і отримати результат через довіру, рекомендацію та
                  користь.
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--text-muted)]">
                  <li>Працює як провідник/наставник, а не “продавець”.</li>
                  <li>Пояснює користь і підключає бізнес до каталогу.</li>
                  <li>Будує структуру і може заробляти з неї.</li>
                </ul>
              </div>
            </Reveal>

            <Reveal variant="block" delay={0.05}>
              <div className="rounded-2xl border border-black/10 bg-white p-4">
                <h3 className="font-semibold text-[var(--text-main)]">
                  Плюси та заробіток
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--text-muted)]">
                  <li>Можливість заробляти з підключених бізнесів.</li>
                  <li>Побудова структури та відсотки з її обороту.</li>
                  <li>Доступ до уроків і готових сценаріїв роботи.</li>
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal variant="text" delay={0.08}>
            <div className="mt-6">
              <SchoolGate
                locale={locale}
                status={u.lessonAccess?.status ?? "PENDING"}
                paidAt={u.lessonAccess?.paidAt?.toISOString() ?? null}
                profileConfirmedAt={
                  u.lessonAccess?.profileConfirmedAt?.toISOString() ?? null
                }
                initialName={u.name ?? ""}
                initialTelegram={u.telegram ?? ""}
              />
            </div>
          </Reveal>

          <Reveal variant="fade" delay={0.1}>
            <div className="mt-6 text-sm text-[var(--text-muted)]">
              <Link
                className="underline"
                href={`/${locale}/terms`}
                target="_blank"
              >
                Terms
              </Link>{" "}
              ·{" "}
              <Link
                className="underline"
                href={`/${locale}/legal`}
                target="_blank"
              >
                Legal
              </Link>
            </div>
          </Reveal>
        </div>
      </Reveal>
    </div>
  );
}
