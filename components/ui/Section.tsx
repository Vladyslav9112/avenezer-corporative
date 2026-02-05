import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type SectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="py-8 sm:py-12">
      <Container>
        <div className="rounded-2xl border border-black/10 bg-[var(--bg-surface)] p-6 shadow-[0_12px_28px_rgba(0,0,0,0.08)] sm:p-10">
          <div className="mb-6">
            <h2 className="text-2xl font-[var(--font-display)] text-[var(--text-main)] sm:text-3xl">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-2 text-base text-[var(--text-muted)]">
                {subtitle}
              </p>
            ) : null}
          </div>
          <div className="space-y-6">{children}</div>
        </div>
      </Container>
    </section>
  );
}
