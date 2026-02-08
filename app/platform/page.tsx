import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { InfoBlock } from "@/components/ui/InfoBlock";
import { Bullets } from "@/components/ui/Bullets";

import { Rocket, MousePointerClick } from "lucide-react";

export const metadata: Metadata = {
  title: "AvenEzer — MVP платформа",
  description:
    "Опис MVP веб-платформи AvenEzer: призначення, тестування, структура та правила користування.",
};

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="PLATFORM / MVP ПЛАТФОРМА"
        title="MVP веб-платформа AvenEzer"
        subtitle="MVP — це перша робоча версія платформи AvenEzer, яка використовується для тестування функціоналу, формування структури платформи, збору зворотного звʼязку та підготовки до наступних етапів розвитку."
      />

      <Section
        id="mvp-purpose"
        title={
          <span className="inline-flex items-center gap-2">
            <Rocket className="h-5 w-5 text-[#2A5D59]" />
            Призначення MVP
          </span>
        }
      >
        <InfoBlock
          paragraphs={["Функціонал MVP може змінюватися або доповнюватися."]}
        />
        <Bullets blocks={[]} />
      </Section>

      <Section
        id="how-to-use"
        title={
          <span className="inline-flex items-center gap-2">
            <MousePointerClick className="h-5 w-5 text-[#2A5D59]" />
            Як користуватися платформою
          </span>
        }
      >
        <InfoBlock
          paragraphs={[
            "Платформа доступна для бізнесів i користувачів, які бажають:",
          ]}
        />
        <Bullets
          blocks={[
            {
              bullets: [
                "ознайомитися з можливостями AvenEzer,",
                "створити профіль (за наявності відповідного функціоналу),",
                "користуватися платформою відповідно до встановлених правил.",
              ],
            },
          ]}
        />
      </Section>
    </>
  );
}
