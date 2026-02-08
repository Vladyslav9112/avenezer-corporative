import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { InfoBlock } from "@/components/ui/InfoBlock";
import { Bullets } from "@/components/ui/Bullets";

import { UsersRound } from "lucide-react";

export const metadata: Metadata = {
  title: "AvenEzer — Connectia Business Club",
  description:
    "Connectia Business Club — бізнес-спільнота в межах екосистеми AvenEzer для професійного спілкування та побудови ділових зв’язків.",
};

export default function ConnectiaPage() {
  return (
    <>
      <PageHero
        eyebrow="CONNECTIA BUSINESS CLUB"
        title="Connectia Business Club"
        subtitle="Connectia Business Club — це бізнес-спільнота в межах екосистеми AvenEzer, створена для професійного спілкування, обміну досвідом та побудови ділових зв’язків."
      />

      <Section
        id="connectia-part"
        title={
          <span className="inline-flex items-center gap-2">
            <UsersRound className="h-5 w-5 text-[#2A5D59]" />
            Частина екосистеми
          </span>
        }
      >
        <InfoBlock
          paragraphs={[
            "Клуб є частиною екосистеми AvenEzer i розвивається як окремий напрям.",
          ]}
        />
        <Bullets blocks={[]} />
      </Section>
    </>
  );
}
