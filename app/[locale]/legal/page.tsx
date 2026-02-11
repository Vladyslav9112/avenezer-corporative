// app/legal/page.tsx
import { Section } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Policies – AvenEzer Inc.",
  description:
    "Legal Policies – AvenEzer Inc. (Enterprise-Grade Version – Corporate Website).",
};

export default function LegalPoliciesPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 text-[var(--text-invert)]">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Legal Policies – AvenEzer Inc.
        </h1>
        <p className="text-sm md:text-base opacity-80">
          (Enterprise-Grade Version – Corporate Website)
        </p>
        <p className="text-xs md:text-sm opacity-60 mt-2">
          Last updated: 11.02.2026
        </p>
      </header>

      <Section title="Company Information">
        <div className="text-[var(--text-muted)]">
          <p className="text-sm md:text-base">
            This website, digital platform, referral programs, and any related
            mobile applications (including applications currently referred to as
            “AvenYzer App”, the final name of which may change prior to public
            release) are operated by:
          </p>

          <p className="mt-4 text-sm md:text-base font-semibold text-[var(--text-main)]">
            AvenEzer Inc. (the “Company”)
          </p>

          <div className="mt-4 text-sm md:text-base space-y-1">
            <p>Corporation Number: 1731845-6</p>
            <p>Date of Incorporation: September 15, 2025</p>

            <div className="mt-4">
              <p className="font-semibold text-[var(--text-main)]">
                Registered Office:
              </p>
              <p>714 York St</p>
              <p>Office C6</p>
              <p>London, Ontario</p>
              <p>N5W 2S8</p>
              <p>Canada</p>
            </div>

            <div className="mt-4">
              <p className="font-semibold text-[var(--text-main)]">
                Industry Classification (NAICS):
              </p>
              <p>519130 — Internet Publishing and Web Portals</p>
            </div>

            <div className="mt-4">
              <p className="font-semibold text-[var(--text-main)]">
                Contact Email:
              </p>
              <a href="mailto:info@avenezer.ink" className="opacity-80">
                info@avenezer.ink
              </a>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
