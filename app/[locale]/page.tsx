import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { InfoBlock } from "@/components/ui/InfoBlock";
import { Bullets } from "@/components/ui/Bullets";
import Reveal from "@/components/animation/Reveal";

import {
  LayoutDashboard,
  Info,
  Smartphone,
  Users,
  Network,
  BadgeInfo,
} from "lucide-react";

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

  // ✅ For whom (now as paragraphs, not bullet lists)
  const forWhomBusinessParagraphs = t.raw(
    "sections.forWhom.business.paragraphs",
  ) as string[];
  const forWhomAversParagraphs = t.raw(
    "sections.forWhom.avers.paragraphs",
  ) as string[];
  const forWhomUsersParagraphs = t.raw(
    "sections.forWhom.users.paragraphs",
  ) as string[];
  const forWhomNonprofitParagraphs = t.raw(
    "sections.forWhom.nonprofit.paragraphs",
  ) as string[];

  // ✅ Ecosystem short block
  const ecosystemParagraphs = t.raw(
    "sections.ecosystem.paragraphs",
  ) as string[];

  // ✅ Small honest note
  const developmentNoteParagraphs = t.raw(
    "sections.developmentNote.paragraphs",
  ) as string[];

  return (
    <>
      <Reveal variant="block">
        <PageHero
          eyebrow={t("hero.eyebrow")}
          title={t("hero.title")}
          subtitle={t("hero.subtitle")}
        />
      </Reveal>

      <Reveal variant="block">
        <Section
          id="platform-today"
          title={
            <span className="inline-flex items-center gap-2">
              <LayoutDashboard className="h-7.5 w-7.5 text-[#2A5D59]" />
              {t("sections.platformToday.title")}
            </span>
          }
        >
          <Reveal variant="text">
            <InfoBlock paragraphs={platformTodayParagraphs} />
          </Reveal>
          <Reveal variant="text" delay={0.05}>
            <Bullets blocks={[{ bullets: platformTodayBullets }]} />
          </Reveal>
        </Section>
      </Reveal>

      <Reveal variant="block">
        <Section
          id="mvp-note"
          title={
            <span className="inline-flex items-center gap-2">
              <Info className="h-7.5 w-7.5 text-[#2A5D59]" />
              {t("sections.mvpNote.title")}
            </span>
          }
        >
          <Reveal variant="text">
            <InfoBlock paragraphs={mvpNoteParagraphs} />
          </Reveal>
        </Section>
      </Reveal>

      <Reveal variant="block">
        <Section
          id="next-stage"
          title={
            <span className="inline-flex items-center gap-2">
              <Smartphone className="h-7.5 w-7.5 text-[#2A5D59]" />
              {t("sections.nextStage.title")}
            </span>
          }
        >
          <Reveal variant="text">
            <InfoBlock paragraphs={nextStageParagraphs} />
          </Reveal>
        </Section>
      </Reveal>

      {/* ✅ For whom (critical block) */}
      <Reveal variant="block">
        <Section
          id="for-whom"
          title={
            <span className="inline-flex items-center gap-2">
              <Users className="h-7.5 w-7.5 text-[#2A5D59]" />
              {t("sections.forWhom.title")}
            </span>
          }
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal variant="block">
              <div className="rounded-2xl border border-black/10 bg-white/70 p-5">
                <h3 className="mb-2 text-lg font-semibold text-[#222]">
                  {t("sections.forWhom.business.title")}
                </h3>
                <InfoBlock paragraphs={forWhomBusinessParagraphs} />
              </div>
            </Reveal>

            <Reveal variant="block" delay={0.05}>
              <div className="rounded-2xl border border-black/10 bg-white/70 p-5">
                <h3 className="mb-2 text-lg font-semibold text-[#222]">
                  {t("sections.forWhom.avers.title")}
                </h3>
                <InfoBlock paragraphs={forWhomAversParagraphs} />
              </div>
            </Reveal>

            <Reveal variant="block" delay={0.1}>
              <div className="rounded-2xl border border-black/10 bg-white/70 p-5">
                <h3 className="mb-2 text-lg font-semibold text-[#222]">
                  {t("sections.forWhom.users.title")}
                </h3>
                <InfoBlock paragraphs={forWhomUsersParagraphs} />
              </div>
            </Reveal>

            <Reveal variant="block" delay={0.15}>
              <div className="rounded-2xl border border-black/10 bg-white/70 p-5">
                <h3 className="mb-2 text-lg font-semibold text-[#222]">
                  {t("sections.forWhom.nonprofit.title")}
                </h3>
                <InfoBlock paragraphs={forWhomNonprofitParagraphs} />
              </div>
            </Reveal>
          </div>
        </Section>
      </Reveal>

      {/* ✅ Ecosystem short picture */}
      <Reveal variant="block">
        <Section
          id="ecosystem"
          title={
            <span className="inline-flex items-center gap-2">
              <Network className="h-7.5 w-7.5 text-[#2A5D59]" />
              {t("sections.ecosystem.title")}
            </span>
          }
        >
          <Reveal variant="text">
            <InfoBlock paragraphs={ecosystemParagraphs} />
          </Reveal>
        </Section>
      </Reveal>

      {/* ✅ Small strategic note */}
      <Reveal variant="block">
        <Section
          id="development-note"
          title={
            <span className="inline-flex items-center gap-2">
              <BadgeInfo className="h-7.5 w-7.5 text-[#2A5D59]" />
              {t("sections.developmentNote.title")}
            </span>
          }
        >
          <Reveal variant="text">
            <InfoBlock paragraphs={developmentNoteParagraphs} />
          </Reveal>
        </Section>
      </Reveal>
    </>
  );
}
