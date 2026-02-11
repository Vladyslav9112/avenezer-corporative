import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { InfoBlock } from "@/components/ui/InfoBlock";
import { Bullets } from "@/components/ui/Bullets";

// lucide icons
import { Users, BadgeCheck, GraduationCap, ShieldCheck } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "avers",
  });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function AversPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "avers",
  });

  const whoParagraphs = t.raw("sections.who.paragraphs") as string[];

  const clarityBullets = t.raw("sections.clarity.bullets") as string[];

  const schoolParagraphs = t.raw("sections.school.paragraphs") as string[];
  const schoolBullets = t.raw("sections.school.bullets") as string[];

  const noteParagraphs = t.raw("sections.note.paragraphs") as string[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      {/* ✅ Who are Avers */}
      <Section
        id="avers-who"
        title={
          <span className="inline-flex items-center gap-2">
            <Users className="h-7.5 w-7.5 text-[#2A5D59]" />
            {t("sections.who.title")}
          </span>
        }
      >
        <InfoBlock paragraphs={whoParagraphs} />
      </Section>

      {/* ✅ Micro clarity block */}
      <Section
        id="avers-clarity"
        title={
          <span className="inline-flex items-center gap-2">
            <BadgeCheck className="h-7.5 w-7.5 text-[#2A5D59]" />
            {t("sections.clarity.title")}
          </span>
        }
      >
        <Bullets blocks={[{ bullets: clarityBullets }]} />
      </Section>

      {/* School stays, but as a supporting tool */}
      <Section
        id="school"
        title={
          <span className="inline-flex items-center gap-2">
            <GraduationCap className="h-7.5 w-7.5 text-[#2A5D59]" />
            {t("sections.school.title")}
          </span>
        }
      >
        <InfoBlock paragraphs={schoolParagraphs} />
        <Bullets
          blocks={[
            {
              title: t("sections.school.bulletsTitle"),
              bullets: schoolBullets,
            },
          ]}
        />
      </Section>

      {/* Honest note */}
      <Section
        id="note"
        title={
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-7.5 w-7.5 text-[#2A5D59]" />
            {t("sections.note.title")}
          </span>
        }
      >
        <InfoBlock paragraphs={noteParagraphs} />
      </Section>
    </>
  );
}
