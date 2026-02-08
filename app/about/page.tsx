import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { InfoBlock } from "@/components/ui/InfoBlock";
import { Bullets } from "@/components/ui/Bullets";

import { Building2, Target, Layers3 } from "lucide-react";

export const metadata: Metadata = {
  title: "AvenEzer — Про нас",
  description:
    "Про компанію AvenEzer, місія та підхід до розвитку міжнародної цифрової екосистеми.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT / ПРО AvenEzer"
        title="Про компанію"
        subtitle="AvenEzer — це незалежна платформа, яка розвивається як міжнародна цифрова екосистема."
      />

      <Section
        id="about-company"
        title={
          <span className="inline-flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[#2A5D59]" />
            Про компанію
          </span>
        }
      >
        <InfoBlock
          paragraphs={[
            "Компанія працює над створенням технологічного середовища, що об’єднує бізнеси, користувачів та незалежних учасників у межах єдиної структури з чіткими правилами взаємодії.",
          ]}
        />
        <Bullets blocks={[]} />
      </Section>

      <Section
        id="mission"
        title={
          <span className="inline-flex items-center gap-2">
            <Target className="h-5 w-5 text-[#2A5D59]" />
            Місія AvenEzer
          </span>
        }
      >
        <InfoBlock
          paragraphs={[
            "Наша місія — створити сучасну цифрову платформу, яка спрощує взаємодію між бізнесами та користувачами i формує новий стандарт онлайн-навігації та присутності.",
          ]}
        />
        <Bullets blocks={[]} />
      </Section>

      <Section
        id="approach"
        title={
          <span className="inline-flex items-center gap-2">
            <Layers3 className="h-5 w-5 text-[#2A5D59]" />
            Підхід до розвитку
          </span>
        }
      >
        <InfoBlock
          paragraphs={["AvenEzer розвивається поетапно, з фокусом на:"]}
        />
        <Bullets
          blocks={[
            {
              bullets: [
                "стабільну архітектуру,",
                "зрозумілу логіку користування,",
                "масштабованість,",
                "довгострокову цінність для учасників.",
              ],
            },
          ]}
        />
      </Section>
    </>
  );
}
