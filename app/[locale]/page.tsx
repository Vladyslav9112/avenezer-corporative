import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { InfoBlock } from "@/components/ui/InfoBlock";
import { Bullets } from "@/components/ui/Bullets";

import { LayoutDashboard, Info, Smartphone, Users } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "home",
  });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "home",
  });

  const platformTodayParagraphs = t.raw(
    "sections.platformToday.paragraphs",
  ) as string[];
  const platformTodayBullets = t.raw(
    "sections.platformToday.bullets",
  ) as string[];

  const mvpNoteParagraphs = t.raw("sections.mvpNote.paragraphs") as string[];

  const nextStageParagraphs = t.raw(
    "sections.nextStage.paragraphs",
  ) as string[];

  const forWhomBusinessBullets = t.raw(
    "sections.forWhom.business.bullets",
  ) as string[];
  const forWhomUsersBullets = t.raw(
    "sections.forWhom.users.bullets",
  ) as string[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <Section
        id="platform-today"
        title={
          <span className="inline-flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-[#2A5D59]" />
            {t("sections.platformToday.title")}
          </span>
        }
      >
        <InfoBlock paragraphs={platformTodayParagraphs} />
        <Bullets blocks={[{ bullets: platformTodayBullets }]} />
      </Section>

      <Section
        id="mvp-note"
        title={
          <span className="inline-flex items-center gap-2">
            <Info className="h-5 w-5 text-[#2A5D59]" />
            {t("sections.mvpNote.title")}
          </span>
        }
      >
        <InfoBlock paragraphs={mvpNoteParagraphs} />
        <Bullets blocks={[]} />
      </Section>

      <Section
        id="next-stage"
        title={
          <span className="inline-flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-[#2A5D59]" />
            {t("sections.nextStage.title")}
          </span>
        }
      >
        <InfoBlock paragraphs={nextStageParagraphs} />
        <Bullets blocks={[]} />
      </Section>

      <Section
        id="for-whom"
        title={
          <span className="inline-flex items-center gap-2">
            <Users className="h-5 w-5 text-[#2A5D59]" />
            {t("sections.forWhom.title")}
          </span>
        }
      >
        <InfoBlock paragraphs={[]} />
        <Bullets
          blocks={[
            {
              title: t("sections.forWhom.business.title"),
              bullets: forWhomBusinessBullets,
            },
            {
              title: t("sections.forWhom.users.title"),
              bullets: forWhomUsersBullets,
            },
          ]}
        />
      </Section>
    </>
  );
}
