import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { ComponentType } from "react";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import Reveal from "@/components/animation/Reveal";

import {
  BadgeHelp,
  Smartphone,
  HandHeart,
  Info,
  Users,
  GraduationCap,
} from "lucide-react";

type FaqItem = {
  q: string;
  a: string[];
  bullets?: string[];
};

type FaqSection = {
  title: string;
  items: FaqItem[];
};

type FaqSectionKey =
  | "general"
  | "app"
  | "nonprofit"
  | "additional"
  | "averProgram"
  | "averSchool";

const SECTION_ICONS: Record<
  FaqSectionKey,
  ComponentType<{ className?: string }>
> = {
  general: BadgeHelp,
  app: Smartphone,
  nonprofit: HandHeart,
  additional: Info,
  averProgram: Users,
  averSchool: GraduationCap,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "faq",
  });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "faq",
  });

  const sectionKeys: FaqSectionKey[] = [
    "general",
    "app",
    "nonprofit",
    "additional",
    "averProgram",
    "averSchool",
  ];

  const sections = sectionKeys.map((key) => ({
    key,
    data: t.raw(`sections.${key}`) as FaqSection,
  }));

  return (
    <>
      <Reveal variant="block">
        <PageHero
          eyebrow={t("hero.eyebrow")}
          title={t("hero.title")}
          subtitle={t("hero.subtitle")}
        />
      </Reveal>

      {sections.map(({ key, data }) => {
        const Icon = SECTION_ICONS[key];

        return (
          <Reveal variant="block" key={key}>
            <Section
              id={`faq-${key}`}
              title={
                <span className="inline-flex items-start gap-2 break-words">
                  <Icon className="mt-0.5 h-7.5 w-7.5 shrink-0 text-[#2A5D59]" />
                  <span>{data.title}</span>
                </span>
              }
            >
              <div className="space-y-4">
                {data.items.map((item, index) => (
                  <article
                    key={`${item.q.slice(0, 28)}-${index}`}
                    className="overflow-hidden rounded-xl border border-black/10 bg-white/70 p-4 sm:p-6"
                  >
                    <h3 className="break-words text-lg font-[var(--font-display)] leading-tight text-[var(--text-main)] sm:text-xl">
                      {item.q}
                    </h3>

                    <div className="mt-3 space-y-3 break-words text-base leading-7 text-[var(--text-muted)]">
                      {item.a.map((paragraph, paragraphIndex) => (
                        <p key={`${paragraph.slice(0, 24)}-${paragraphIndex}`}>
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {item.bullets?.length ? (
                      <ul className="mt-4 list-disc space-y-2 break-words pl-5 text-[var(--text-muted)]">
                        {item.bullets.map((bullet, bulletIndex) => (
                          <li key={`${bullet.slice(0, 24)}-${bulletIndex}`}>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                ))}
              </div>
            </Section>
          </Reveal>
        );
      })}
    </>
  );
}
