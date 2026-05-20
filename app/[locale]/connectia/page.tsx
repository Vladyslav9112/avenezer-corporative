import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { InfoBlock } from "@/components/ui/InfoBlock";
import { Bullets } from "@/components/ui/Bullets";
import Reveal from "@/components/animation/Reveal";

import { UsersRound } from "lucide-react";
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/lib/site";

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

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/connectia",
    title: t("meta.title"),
    description: t("meta.description"),
  });
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
  const tNav = await getTranslations({
    locale,
    namespace: "nav",
  });

  const partParagraphs = t.raw("sections.part.paragraphs") as string[];

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema(locale as AppLocale, [
          { name: tNav("home"), path: "/" },
          { name: t("hero.title"), path: "/connectia" },
        ])}
      />

      <Reveal variant="block">
        <PageHero
          eyebrow={t("hero.eyebrow")}
          title={t("hero.title")}
          subtitle={t("hero.subtitle")}
        />
      </Reveal>

      <Reveal variant="block">
        <Section
          id="connectia-part"
          title={
            <span className="inline-flex items-center gap-2">
              <UsersRound className="h-7.5 w-7.5 text-[#2A5D59]" />
              {t("sections.part.title")}
            </span>
          }
        >
          <Reveal variant="text">
            <InfoBlock paragraphs={partParagraphs} />
          </Reveal>
          <Reveal variant="text" delay={0.05}>
            <Bullets blocks={[]} />
          </Reveal>
        </Section>
      </Reveal>
    </>
  );
}
