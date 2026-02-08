import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { InfoBlock } from "@/components/ui/InfoBlock";
import { Bullets } from "@/components/ui/Bullets";

import { Rocket, MousePointerClick } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "platform",
  });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "platform",
  });

  const purposeParagraphs = t.raw("sections.purpose.paragraphs") as string[];
  const howParagraphs = t.raw("sections.how.paragraphs") as string[];
  const howBullets = t.raw("sections.how.bullets") as string[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <Section
        id="mvp-purpose"
        title={
          <span className="inline-flex items-center gap-2">
            <Rocket className="h-5 w-5 text-[#2A5D59]" />
            {t("sections.purpose.title")}
          </span>
        }
      >
        <InfoBlock paragraphs={purposeParagraphs} />
        <Bullets blocks={[]} />
      </Section>

      <Section
        id="how-to-use"
        title={
          <span className="inline-flex items-center gap-2">
            <MousePointerClick className="h-5 w-5 text-[#2A5D59]" />
            {t("sections.how.title")}
          </span>
        }
      >
        <InfoBlock paragraphs={howParagraphs} />
        <Bullets blocks={[{ bullets: howBullets }]} />
      </Section>
    </>
  );
}
