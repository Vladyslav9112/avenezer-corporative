// app/legal/page.tsx
import { Section } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use – AvenEzer Inc.",
  description:
    "Terms of Use – AvenEzer Inc. (Enterprise-Grade Version – Corporate Website).",
};

export default function TermsOfUsePage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 text-[var(--text-invert)]">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Terms of Use – AvenEzer Inc.
        </h1>
        <p className="text-xs md:text-sm opacity-60 mt-2">
          Last updated: 11.02.2026
        </p>
      </header>

      <Section title="1. Terms of Use">
        <div className="text-[var(--text-muted)] space-y-6">
          <h3 className="font-semibold text-[var(--text-main)]">
            1.1 Acceptance of Terms
          </h3>

          <p>
            By accessing or using this website, the Company’s digital platform,
            any related referral programs (including the Aver Program), or any
            mobile applications operated by the Company, you agree to be legally
            bound by these Legal Policies and Terms of Use, including any
            updates or modifications made from time to time.
          </p>

          <p>
            If you do not agree to these terms, you must immediately discontinue
            use of the platform and related services.
          </p>

          <h3 className="font-semibold text-[var(--text-main)]">
            1.2 Nature of the Company and Platform
          </h3>

          <p>
            AvenEzer Inc. is a Canadian corporation developing and operating an
            international digital informational and referral-based platform,
            including a business directory and related digital tools.
          </p>

          <p className="text-[var(--text-main)]">The Company:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>does not act as an employer of users or participants;</li>
            <li>
              does not act as an agent, broker, intermediary, or legal
              representative of any user, business, or third party;
            </li>
            <li>
              does not provide legal, financial, tax, investment, or
              professional advice;
            </li>
            <li>
              does not guarantee income, visibility, profitability, business
              success, or outcomes.
            </li>
          </ul>

          <p>
            The platform functions solely as a digital informational and
            referral-based environment.
          </p>

          <p>
            All interactions, negotiations, transactions, and business
            relationships occur directly between users and third parties,
            without participation, control, or responsibility of the Company.
          </p>

          <h3 className="font-semibold text-[var(--text-main)]">
            1.3 International Use
          </h3>

          <p>
            The platform is intended for use by users in multiple jurisdictions.
          </p>

          <p>
            Users are solely responsible for ensuring that their access to and
            use of the platform complies with all applicable laws, regulations,
            licensing requirements, and tax obligations in their country of
            residence or operation.
          </p>

          <p>
            The Company makes no representation that the platform or its
            services are appropriate, lawful, or available in all jurisdictions.
          </p>

          <h3 className="font-semibold text-[var(--text-main)]">
            1.4 MVP Status
          </h3>

          <p>
            The platform and related applications are currently offered as a
            Minimum Viable Product (MVP).
          </p>

          <p>
            Features, services, functionality, pricing, structure, or
            availability may be modified, suspended, discontinued, or expanded
            at any time without prior notice.
          </p>

          <h3 className="font-semibold text-[var(--text-main)]">
            1.5 User Responsibilities
          </h3>

          <p>Users agree to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              provide accurate, truthful, lawful, and up-to-date information;
            </li>
            <li>use the platform only for lawful purposes;</li>
            <li>
              refrain from misuse, abuse, circumvention, unauthorized access, or
              interference;
            </li>
            <li>comply with all applicable laws and regulations.</li>
          </ul>

          <p>
            The Company reserves the right to restrict or terminate access for
            violations of these terms.
          </p>
        </div>
      </Section>

      <Section title="2. Privacy Policy">
        <div className="text-[var(--text-muted)] space-y-6">
          <h3 className="font-semibold text-[var(--text-main)]">
            2.1 Data Controller
          </h3>

          <p>
            AvenEzer Inc. acts as the data controller for personal data
            processed through the website, platform, and related mobile
            applications.
          </p>

          <h3 className="font-semibold text-[var(--text-main)]">
            2.2 Information We Collect
          </h3>

          <p>
            The Company may collect and process categories of personal data
            including, but not limited to:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>
              personal identification data (such as name and email address);
            </li>
            <li>business-related information voluntarily provided by users;</li>
            <li>
              technical and usage data (including IP address, device
              identifiers, browser type, and interaction data).
            </li>
          </ul>

          <h3 className="font-semibold text-[var(--text-main)]">
            2.3 Purpose of Processing
          </h3>

          <p>Personal data is processed for purposes including:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>operating, maintaining, and improving the platform;</li>
            <li>enabling platform functionality and communications;</li>
            <li>
              security, fraud prevention, analytics, and legal compliance;
            </li>
            <li>fulfilling contractual or pre-contractual obligations.</li>
          </ul>

          <h3 className="font-semibold text-[var(--text-main)]">
            2.4 Legal Basis and International Data Protection Standards
          </h3>

          <p>
            Personal data is processed on lawful bases including user consent,
            contractual necessity, legitimate interests, or compliance with
            legal obligations, as applicable.
          </p>

          <p>
            The Company applies internationally recognized data protection
            standards, including:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>PIPEDA (Canada);</li>
            <li>GDPR principles (European Union), where applicable.</li>
          </ul>

          <h3 className="font-semibold text-[var(--text-main)]">
            2.5 Data Sharing
          </h3>

          <p>The Company does not sell personal data.</p>

          <p>Personal data may be shared only:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              with service providers necessary for hosting, analytics, security,
              or technical operations;
            </li>
            <li>
              where required by applicable law or lawful governmental request.
            </li>
          </ul>

          <h3 className="font-semibold text-[var(--text-main)]">
            2.6 Rights of Data Subjects
          </h3>

          <p>
            Subject to applicable law, users may request access, correction,
            deletion, restriction, objection, or withdrawal of consent regarding
            their personal data.
          </p>

          <p>Requests may be submitted via the contact email above.</p>

          <h3 className="font-semibold text-[var(--text-main)]">
            2.7 International Transfers
          </h3>

          <p>Personal data may be processed or transferred internationally.</p>

          <p>
            Where required, the Company implements appropriate safeguards,
            including standard contractual clauses or equivalent legal
            mechanisms.
          </p>
        </div>
      </Section>

      <Section title="3. Disclaimer">
        <div className="text-[var(--text-muted)] space-y-6">
          <h3 className="font-semibold text-[var(--text-main)]">
            3.1 No Professional Advice
          </h3>

          <p>
            All platform content is provided for informational purposes only and
            does not constitute legal, financial, tax, or business advice.
          </p>

          <h3 className="font-semibold text-[var(--text-main)]">
            3.2 No Guarantees
          </h3>

          <p>
            The Company makes no guarantees regarding income, performance,
            results, availability, or continuity of the platform.
          </p>

          <h3 className="font-semibold text-[var(--text-main)]">
            3.3 Third-Party Content
          </h3>

          <p>
            The Company is not responsible for content, offers, representations,
            or services provided by users or third parties.
          </p>
        </div>
      </Section>

      <Section title="4. Aver Program Legal Notice">
        <div className="text-[var(--text-muted)] space-y-6">
          <h3 className="font-semibold text-[var(--text-main)]">
            4.1 Independent Participant Status
          </h3>

          <p>
            Participants in the Aver Program (“Aver-и”) are independent
            participants acting on their own behalf.
          </p>

          <p>
            They are not employees, agents, contractors, representatives,
            shareholders, or legal affiliates of the Company.
          </p>

          <p>
            Participation does not grant any ownership, governance, voting, or
            profit-sharing rights in the Company.
          </p>

          <h3 className="font-semibold text-[var(--text-main)]">
            4.2 Program Structure
          </h3>

          <p>
            The Aver Program operates as a limited referral-based participation
            program with a fixed structure of three (3) levels.
          </p>

          <p>The program:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>does not include unlimited referral levels;</li>
            <li>does not require mandatory purchases, fees, or inventory;</li>
            <li>
              does not operate as a recruitment-based compensation system.
            </li>
          </ul>

          <h3 className="font-semibold text-[var(--text-main)]">
            4.3 No MLM or Pyramid Scheme
          </h3>

          <p>
            The Aver Program is designed as a referral-based participation model
            and is not intended to function as a multi-level marketing system,
            pyramid scheme, investment scheme, or employment program.
          </p>

          <h3 className="font-semibold text-[var(--text-main)]">
            4.4 Compensation Disclaimer
          </h3>

          <p>Any rewards or compensation:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              depend on applicable program terms and platform development stage;
            </li>
            <li>are not guaranteed;</li>
            <li>do not constitute wages, salary, or employment income.</li>
          </ul>

          <p>
            Participants are solely responsible for their own tax, reporting,
            and legal obligations.
          </p>
        </div>
      </Section>

      <Section title="5. Nonprofit & Social Initiatives Notice">
        <div className="text-[var(--text-muted)] space-y-6">
          <p>
            The Company may, in future versions of the platform or applications,
            support nonprofit organizations or social initiatives.
          </p>

          <p>
            Such support does not create legal partnerships, fiduciary duties,
            or charitable obligations and requires separate written agreements
            where applicable.
          </p>
        </div>
      </Section>

      <Section title="6. Cookie Policy">
        <div className="text-[var(--text-muted)] space-y-6">
          <p>
            The platform may use cookies or similar technologies to improve user
            experience, analyze performance, and maintain essential
            functionality.
          </p>

          <p>Users may manage cookies through browser or device settings.</p>
        </div>
      </Section>

      <Section title="7. Limitation of Liability">
        <div className="text-[var(--text-muted)] space-y-6">
          <p>
            To the maximum extent permitted by applicable law, the Company shall
            not be liable for indirect, incidental, consequential, or special
            damages, including loss of data, revenue, or business opportunities,
            arising from platform use or inability to use the platform.
          </p>
        </div>
      </Section>

      <Section title="8. Indemnification">
        <div className="text-[var(--text-muted)] space-y-6">
          <p>
            Users agree to indemnify and hold harmless the Company, its
            directors, officers, and affiliates from any claims, damages,
            liabilities, costs, or expenses arising from:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>misuse of the platform;</li>
            <li>violation of these Legal Policies;</li>
            <li>violation of applicable laws or third-party rights.</li>
          </ul>
        </div>
      </Section>

      <Section title="9. Intellectual Property">
        <div className="text-[var(--text-muted)] space-y-6">
          <p>
            All platform content, structure, software, branding elements, and
            intellectual property are owned by or licensed to the Company.
          </p>

          <p>
            Nothing in these Legal Policies grants users any license or
            ownership rights except as expressly stated.
          </p>
        </div>
      </Section>

      <Section title="10. Severability">
        <div className="text-[var(--text-muted)] space-y-6">
          <p>
            If any provision of these Legal Policies is found to be invalid or
            unenforceable, the remaining provisions shall remain in full force
            and effect.
          </p>
        </div>
      </Section>

      <Section title="11. Entire Agreement">
        <div className="text-[var(--text-muted)] space-y-6">
          <p>
            These Legal Policies constitute the entire agreement between the
            user and the Company regarding platform use and supersede any prior
            communications or understandings.
          </p>
        </div>
      </Section>

      <Section title="12. Governing Law and Jurisdiction">
        <div className="text-[var(--text-muted)] space-y-6">
          <p>
            These Legal Policies are governed by the laws of Canada and the
            Province of Ontario, without regard to conflict-of-law principles.
          </p>
        </div>
      </Section>

      <Section title="13. Updates to These Policies">
        <div className="text-[var(--text-muted)] space-y-6">
          <p>
            The Company reserves the right to update or modify these Legal
            Policies at any time.
          </p>

          <p>
            Continued use of the platform constitutes acceptance of the updated
            terms.
          </p>
        </div>
      </Section>
    </main>
  );
}
