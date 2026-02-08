import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { InfoBlock } from "@/components/ui/InfoBlock";
import { Bullets } from "@/components/ui/Bullets";
import { ContactForm } from "./ContactForm";

import { Mail, Globe, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "AvenEzer — Контакти",
  description:
    "Контактна інформація AvenEzer для загальних питань та партнерських запитів.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT / КОНТАКТИ"
        title="Контактна інформація"
        subtitle="Загальні питання, партнерські запити та звернення щодо платформи:"
      />

      <Section
        id="contact-details"
        title={
          <span className="inline-flex items-center gap-2">
            <Mail className="h-5 w-5 text-[#2A5D59]" />
            Звʼязок
          </span>
        }
      >
        <InfoBlock paragraphs={[]} />
        <Bullets
          blocks={[
            {
              bullets: [
                "Email: info@avenezer.ink",
                "Website: www.avenezer.ink",
              ],
            },
          ]}
        />
      </Section>

      <Section
        id="contact-form"
        title={
          <span className="inline-flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-[#2A5D59]" />
            Форма зворотного звʼязку
          </span>
        }
        subtitle="Залиште повідомлення, і ми відповімо на вашу пошту."
      >
        <ContactForm />
      </Section>
    </>
  );
}
