import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { InfoBlock } from "@/components/ui/InfoBlock";
import { Bullets } from "@/components/ui/Bullets";

// lucide icons
import { Users, GraduationCap, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "AvenEzer — Avers",
  description:
    "Хто такі Avers, їх роль у екосистемі AvenEzer, а також AvenEzer School як внутрішня школа навчання.",
};

export default function AversPage() {
  return (
    <>
      <PageHero
        eyebrow="AVERS / АВЕРИ"
        title="Хто такі Avers"
        subtitle="Aver — це незалежний учасник екосистеми AvenEzer, який бере участь у розвитку платформи, допомагає бізнесам i користувачам орієнтуватися в системі та працює з інструментами платформи."
      />

      <Section
        id="avers-role"
        title={
          <span className="inline-flex items-center gap-2">
            <Users className="w-5 h-5 text-[#2A5D59]" />
            Роль Avers
          </span>
        }
      >
        <InfoBlock
          paragraphs={[
            "Avers діють самостійно та взаємодіють з платформою відповідно до внутрішніх правил i умов участі.",
          ]}
        />
        <Bullets blocks={[]} />
      </Section>

      <Section
        id="school"
        title={
          <span className="inline-flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#2A5D59]" />
            AvenEzer School
          </span>
        }
      >
        <InfoBlock
          paragraphs={[
            "AvenEzer School — це внутрішня школа навчання для Avers.",
          ]}
        />
        <Bullets
          blocks={[
            {
              title: "Школа створена для",
              bullets: [
                "підготовки Avers до роботи з платформою,",
                "пояснення структури та правил екосистеми,",
                "формування стандартів комунікації та взаємодії.",
              ],
            },
          ]}
        />
      </Section>

      <Section
        id="school-note"
        title={
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2A5D59]" />
            Формат навчання
          </span>
        }
      >
        <InfoBlock
          paragraphs={[
            "Формат навчання та наповнення програм визначаються компанією та можуть змінюватися.",
          ]}
        />
        <Bullets blocks={[]} />
      </Section>
    </>
  );
}
