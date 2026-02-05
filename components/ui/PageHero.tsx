import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-invert)] opacity-80">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-4 text-4xl font-[var(--font-display)] text-[var(--text-invert)] sm:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-6 whitespace-pre-line text-base leading-7 text-[var(--text-invert)] opacity-90 sm:text-lg">
              {subtitle}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
