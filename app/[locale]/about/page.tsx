import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { InfoBlock } from "@/components/ui/InfoBlock";
import { Bullets } from "@/components/ui/Bullets";

import { Building2, Target, Layers3 } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "about",
  });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "about",
  });

  const aboutCompanyParagraphs = t.raw(
    "sections.aboutCompany.paragraphs",
  ) as string[];
  const missionParagraphs = t.raw("sections.mission.paragraphs") as string[];
  const approachParagraphs = t.raw("sections.approach.paragraphs") as string[];
  const approachBullets = t.raw("sections.approach.bullets") as string[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <Section
        id="about-company"
        title={
          <span className="inline-flex items-center gap-2">
            <Building2 className="h-7.5 w-7.5 text-[#2A5D59]" />
            {t("sections.aboutCompany.title")}
          </span>
        }
      >
        <InfoBlock paragraphs={aboutCompanyParagraphs} />
        <Bullets blocks={[]} />
      </Section>

      <Section
        id="mission"
        title={
          <span className="inline-flex items-center gap-2">
            <Target className="h-7.5 w-7.5 text-[#2A5D59]" />
            {t("sections.mission.title")}
          </span>
        }
      >
        <InfoBlock paragraphs={missionParagraphs} />
        <Bullets blocks={[]} />
      </Section>

      <Section
        id="approach"
        title={
          <span className="inline-flex items-center gap-2">
            <Layers3 className="h-7.5 w-7.5 text-[#2A5D59]" />
            {t("sections.approach.title")}
          </span>
        }
      >
        <InfoBlock paragraphs={approachParagraphs} />
        <Bullets blocks={[{ bullets: approachBullets }]} />
      </Section>
    </>
  );
}
