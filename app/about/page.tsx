import type { Metadata } from "next";
import { PAGES } from "@/content/siteContent";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { InfoBlock } from "@/components/ui/InfoBlock";
import { Bullets } from "@/components/ui/Bullets";

const page = PAGES.about;

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        subtitle={page.hero.subtitle}
      />
      {page.sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          subtitle={section.subtitle}
        >
          <InfoBlock paragraphs={section.paragraphs} />
          <Bullets blocks={section.bulletBlocks} />
        </Section>
      ))}
    </>
  );
}
