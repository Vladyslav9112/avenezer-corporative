import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { InfoBlock } from "@/components/ui/InfoBlock";
import { Bullets } from "@/components/ui/Bullets";
import { ContactForm } from "./ContactForm";
import Reveal from "@/components/animation/Reveal";

import { Mail, MessageSquare } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "contact",
  });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "contact",
  });

  const contactBullets = t.raw("sections.details.bullets") as string[];

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
          id="contact-details"
          title={
            <span className="inline-flex items-center gap-2">
              <Mail className="h-7.5 w-7.5 text-[#2A5D59]" />
              {t("sections.details.title")}
            </span>
          }
        >
          <Reveal variant="text">
            <InfoBlock paragraphs={[]} />
          </Reveal>
          <Reveal variant="text" delay={0.05}>
            <Bullets
              blocks={[
                {
                  bullets: contactBullets,
                },
              ]}
            />
          </Reveal>
        </Section>
      </Reveal>

      <Reveal variant="block">
        <Section
          id="contact-form"
          title={
            <span className="inline-flex items-center gap-2">
              <MessageSquare className="h-7.5 w-7.5 text-[#2A5D59]" />
              {t("sections.form.title")}
            </span>
          }
          subtitle={t("sections.form.subtitle")}
        >
          <Reveal variant="text">
            <ContactForm />
          </Reveal>
        </Section>
      </Reveal>
    </>
  );
}
