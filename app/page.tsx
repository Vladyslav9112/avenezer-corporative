import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { InfoBlock } from "@/components/ui/InfoBlock";
import { Bullets } from "@/components/ui/Bullets";

import { LayoutDashboard, Info, Smartphone, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "AvenEzer — Головна",
  description:
    "AvenEzer — міжнародна цифрова платформа для представлення бізнесів, сервісів i професійних послуг та зручної навігації користувачів у різних містах i країнах.",
};

export default function Home() {
  return (
    <>
      <PageHero
        eyebrow="HOME / ГОЛОВНА"
        title="AvenEzer"
        subtitle={
          "AvenEzer — це міжнародна цифрова платформа, створена для представлення бізнесів, сервісів i професійних послуг, а також для зручної навігації користувачів у різних містах i країнах.\n\nПлатформа поєднує технології, структуровану екосистему та спільноту учасників, які беруть участь у її розвитку."
        }
      />

      <Section
        id="platform-today"
        title={
          <span className="inline-flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-[#2A5D59]" />
            Платформа сьогодні
          </span>
        }
      >
        <InfoBlock
          paragraphs={[
            "На даний момент AvenEzer працює у форматі MVP веб-платформи.",
            "MVP дозволяє:",
          ]}
        />
        <Bullets
          blocks={[
            {
              bullets: [
                "створювати та переглядати бізнес-профілі,",
                "знайомитися з функціоналом платформи,",
                "долучатися до екосистеми на ранньому етапі,",
                "тестувати підходи та структуру майбутнього продукту.",
              ],
            },
          ]}
        />
      </Section>

      <Section
        id="mvp-note"
        title={
          <span className="inline-flex items-center gap-2">
            <Info className="h-5 w-5 text-[#2A5D59]" />
            Примітка щодо MVP
          </span>
        }
      >
        <InfoBlock
          paragraphs={[
            "MVP є початковою версією платформи та може змінюватися в процесі розвитку.",
          ]}
        />
        <Bullets blocks={[]} />
      </Section>

      <Section
        id="next-stage"
        title={
          <span className="inline-flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-[#2A5D59]" />
            Наступний етап
          </span>
        }
      >
        <InfoBlock
          paragraphs={[
            "Наступним етапом розвитку AvenEzer є мобільний додаток, який розширить доступ до платформи та зробить користування зручнішим для бізнесів i користувачів.",
            "Мобільний додаток перебуває на стадії планування та розробки. Функціонал i терміни запуску формуються поступово.",
          ]}
        />
        <Bullets blocks={[]} />
      </Section>

      <Section
        id="for-whom"
        title={
          <span className="inline-flex items-center gap-2">
            <Users className="h-5 w-5 text-[#2A5D59]" />
            Для кого створена платформа
          </span>
        }
      >
        <InfoBlock paragraphs={[]} />
        <Bullets
          blocks={[
            {
              title: "Бізнесам",
              bullets: [
                "цифрова присутність i видимість,",
                "представлення послуг i компаній,",
                "структурована подача інформації,",
                "доступ до нової аудиторії.",
              ],
            },
            {
              title: "Користувачам",
              bullets: [
                "пошук бізнесів i сервісів,",
                "навігація за категоріями та локаціями,",
                "зручний доступ до актуальної інформації.",
              ],
            },
          ]}
        />
      </Section>
    </>
  );
}
