import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { InfoBlock } from "@/components/ui/InfoBlock";
import { Bullets } from "@/components/ui/Bullets";
import Reveal from "@/components/animation/Reveal";

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
      <Reveal variant="block">
        <PageHero
          eyebrow={t("hero.eyebrow")}
          title={t("hero.title")}
          subtitle={t("hero.subtitle")}
        />
      </Reveal>

      <Reveal variant="block">
        <Section
          id="about-company"
          title={
            <span className="inline-flex items-center gap-2">
              <Building2 className="h-7.5 w-7.5 text-[#2A5D59]" />
              {t("sections.aboutCompany.title")}
            </span>
          }
        >
          <Reveal variant="text">
            <InfoBlock paragraphs={aboutCompanyParagraphs} />
          </Reveal>
          <Reveal variant="text" delay={0.05}>
            <Bullets blocks={[]} />
          </Reveal>
        </Section>
      </Reveal>

      <Reveal variant="block">
        <Section
          id="mission"
          title={
            <span className="inline-flex items-center gap-2">
              <Target className="h-7.5 w-7.5 text-[#2A5D59]" />
              {t("sections.mission.title")}
            </span>
          }
        >
          <Reveal variant="text">
            <InfoBlock paragraphs={missionParagraphs} />
          </Reveal>
          <Reveal variant="text" delay={0.05}>
            <Bullets blocks={[]} />
          </Reveal>
        </Section>
      </Reveal>

      <Reveal variant="block">
        <Section
          id="approach"
          title={
            <span className="inline-flex items-center gap-2">
              <Layers3 className="h-7.5 w-7.5 text-[#2A5D59]" />
              {t("sections.approach.title")}
            </span>
          }
        >
          <Reveal variant="text">
            <InfoBlock paragraphs={approachParagraphs} />
          </Reveal>
          <Reveal variant="text" delay={0.05}>
            <Bullets blocks={[{ bullets: approachBullets }]} />
          </Reveal>
          <Reveal variant="text" delay={0.08}>
            <div className="pt-2">
              <Link
                href="/faq"
                locale={locale}
                className="inline-flex items-center rounded-lg bg-[#2A5D59] px-4 py-2 text-sm font-medium text-[var(--text-invert)] transition hover:bg-[#3f7a72]"
              >
                {t("sections.faqLink")}
              </Link>
            </div>
          </Reveal>
        </Section>
      </Reveal>
    </>
  );
}
