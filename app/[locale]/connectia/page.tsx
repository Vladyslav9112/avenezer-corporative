import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { InfoBlock } from "@/components/ui/InfoBlock";
import { Bullets } from "@/components/ui/Bullets";

import { UsersRound } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "connectia",
  });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ConnectiaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "connectia",
  });

  const partParagraphs = t.raw("sections.part.paragraphs") as string[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <Section
        id="connectia-part"
        title={
          <span className="inline-flex items-center gap-2">
            <UsersRound className="h-7.5 w-7.5 text-[#2A5D59]" />
            {t("sections.part.title")}
          </span>
        }
      >
        <InfoBlock paragraphs={partParagraphs} />
        <Bullets blocks={[]} />
      </Section>
    </>
  );
}
