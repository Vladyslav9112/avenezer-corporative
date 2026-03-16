import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type SectionProps = {
  id?: string;
  title: ReactNode; // ✅ було string
  subtitle?: string;
  children?: ReactNode;
};

type SectionPhoto = {
  src: string;
  alt: string;
};

const SECTION_PHOTOS: Record<string, SectionPhoto> = {
  "platform-today": {
    src: "https://images.unsplash.com/photo-1769740333462-9a63bfa914bc?auto=format&fit=crop&w=1600&q=80",
    alt: "Team planning a digital platform roadmap",
  },
  "mvp-note": {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    alt: "Startup team discussing MVP priorities",
  },
  "next-stage": {
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
    alt: "Smartphone app interface in hand",
  },
  "for-whom": {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    alt: "Diverse team collaborating in office",
  },
  ecosystem: {
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80",
    alt: "Connected network concept on screen",
  },
  "about-company": {
    src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80",
    alt: "Business partners shaking hands",
  },
  mission: {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    alt: "Team mission session with notes",
  },
  approach: {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    alt: "Structured planning board in office",
  },
  "connectia-part": {
    src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1600&q=80",
    alt: "Community members in collaborative workshop",
  },
  "avers-who": {
    src: "https://images.unsplash.com/photo-1763739530672-4aadafbd81ff?auto=format&fit=crop&w=1600&q=80",
    alt: "Mentor presenting to partners",
  },
  "become-aver": {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    alt: "Professional growth and onboarding scene",
  },
  school: {
    src: "/platform-hero.jpg",
    alt: "Education building with graduates",
  },
  "contact-details": {
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1600&q=80",
    alt: "Customer communication and support workspace",
  },
  "contact-form": {
    src: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1600&q=80",
    alt: "Writing message on laptop",
  },
};

function getSectionPhoto(id?: string): SectionPhoto | null {
  if (!id) return null;
  if (id.startsWith("faq-")) {
    return {
      src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80",
      alt: "Person reviewing documents and answers",
    };
  }

  return SECTION_PHOTOS[id] ?? null;
}

export function Section({ id, title, subtitle, children }: SectionProps) {
  const photo = getSectionPhoto(id);

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

          {photo ? (
            <div className="mb-6 overflow-hidden rounded-xl border border-black/10">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-48 w-full object-cover sm:h-64"
              />
            </div>
          ) : null}

          <div className="space-y-6">{children}</div>
        </div>
      </Container>
    </section>
  );
}
