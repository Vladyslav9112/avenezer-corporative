import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { InfoBlock } from "@/components/ui/InfoBlock";
import { Bullets } from "@/components/ui/Bullets";

// lucide icons
import { Users, GraduationCap, ShieldCheck } from "lucide-react";

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

  const roleParagraphs = t.raw("sections.role.paragraphs") as string[];
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

      <Section
        id="avers-role"
        title={
          <span className="inline-flex items-center gap-2">
            <Users className="h-5 w-5 text-[#2A5D59]" />
            {t("sections.role.title")}
          </span>
        }
      >
        <InfoBlock paragraphs={roleParagraphs} />
        <Bullets blocks={[]} />
      </Section>

      <Section
        id="school"
        title={
          <span className="inline-flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-[#2A5D59]" />
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

      <Section
        id="school-note"
        title={
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#2A5D59]" />
            {t("sections.note.title")}
          </span>
        }
      >
        <InfoBlock paragraphs={noteParagraphs} />
        <Bullets blocks={[]} />
      </Section>
    </>
  );
}
