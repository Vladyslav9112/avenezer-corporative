import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Terms of Use - AvenEzer Inc. Platform",
  description: "Terms of Use for the AvenEzer Inc. platform.",
};

export default function TermsOfUsePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 text-[var(--text-invert)]">
      <header className="mb-12">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">
          Terms of Use: AvenEzer Inc. Platform
        </h1>
        <p className="mt-2 text-xs opacity-60 md:text-sm">
          Last updated: May 3, 2026
        </p>
      </header>

      <Section title="1. CORPORATE INFORMATION">
        <div className="space-y-6 text-[var(--text-muted)]">
          <p>
            This international business directory, digital platform, and any
            associated web or mobile applications (including the
            &quot;AvenEzer App&quot;) are operated by:
          </p>

          <p className="font-semibold text-[var(--text-main)]">
            AvenEzer Inc. (hereinafter referred to as the &quot;Company&quot;)
          </p>

          <ul className="list-disc space-y-1 pl-6">
            <li>Corporation Number: 1731845-6</li>
            <li>Jurisdiction of Incorporation: Ontario, Canada</li>
            <li>
              Registered Office Address: 714 York St, Office C6, London,
              Ontario, N5W 2S8, Canada
            </li>
            <li>E-mail: info@avenezer.ca</li>
          </ul>
        </div>
      </Section>

      <Section title="2. NATURE OF THE PLATFORM AND MVP STATUS">
        <div className="space-y-6 text-[var(--text-muted)]">
          <div className="space-y-3">
            <h3 className="font-semibold text-[var(--text-main)]">
              2.1 The Platform currently operates as a Minimum Viable Product
              (MVP).
            </h3>
            <p>
              The web-based version of the site is a functional business tool
              for the promotion of partners.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-[var(--text-main)]">2.2</h3>
            <p>
              The Company does not act as an agent, broker, or intermediary.
              All agreements and interactions between users are conducted solely
              at their own discretion and risk.
            </p>
          </div>
        </div>
      </Section>

      <Section title='3. ACCESS FEES AND "FOUNDING MEMBER" STATUS'>
        <div className="space-y-6 text-[var(--text-muted)]">
          <div className="space-y-3">
            <h3 className="font-semibold text-[var(--text-main)]">3.1</h3>
            <p>
              Any payment made during the MVP stage constitutes an access fee
              for entry into the ecosystem and covers administrative services
              for profile activation and verification.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-[var(--text-main)]">3.2</h3>
            <p>
              Founding Member Status: This honorary status is granted to all
              users who support the project during the MVP stage.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-[var(--text-main)]">3.3</h3>
            <p>
              Lifetime Top Placement: The user who is the first to register
              within their specific subcategory during the MVP stage is
              granted an exclusive right to maintain a &quot;Top
              Position&quot; (priority listing) within that section following
              the launch of the mobile application.
            </p>
            <p>
              This right is granted permanently (lifetime) without additional
              fees for ranking upgrades, subject to the user&apos;s ongoing
              compliance with Platform rules and content guidelines.
            </p>
          </div>
        </div>
      </Section>

      <Section title="4. LAUNCH TIMELINE AND REFUND POLICY">
        <div className="space-y-6 text-[var(--text-muted)]">
          <div className="space-y-3">
            <h3 className="font-semibold text-[var(--text-main)]">4.1</h3>
            <p>
              Launch Schedule: The official release of the AvenEzer mobile
              application is projected for January-March 2028.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-[var(--text-main)]">4.2</h3>
            <p>
              Refund Conditions: The Company guarantees a refund of the paid
              access fee strictly under the following circumstances:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                Non-Launch: If the mobile application is not released on
                official app stores (App Store/Google Play) by March 31, 2028.
              </li>
              <li>
                Satisfaction Guarantee: Within the first 6 (six) months
                following the official release of the mobile application.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-[var(--text-main)]">4.3</h3>
            <p>
              Actual Use (MVP Benefit): The User acknowledges and agrees that
              the presence of their business profile on the MVP website
              constitutes an active promotional service.
            </p>
            <p>
              If the User has received views, clicks to contact details, or
              inquiries from potential clients via the web version, the service
              is deemed actually rendered. In such cases, claims for a refund
              based on the &quot;non-launch of the app&quot; shall not be
              accepted, as the primary business objective (visibility) has been
              achieved.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-[var(--text-main)]">4.4</h3>
            <p>
              Timeline Adjustments and &quot;Silent Consent&quot;: In the event
              of a launch delay due to technical reasons, the Company shall
              notify users via email.
            </p>
            <p>
              If the User does not submit a written refund request within 14
              calendar days of such notice, it shall be deemed automatic
              consent to the revised timeline and continued participation with
              all privileges preserved.
            </p>
          </div>
        </div>
      </Section>

      <Section title="5. REFUND PROCEDURE">
        <div className="space-y-6 text-[var(--text-muted)]">
          <div className="space-y-3">
            <h3 className="font-semibold text-[var(--text-main)]">5.1</h3>
            <p>
              To initiate a refund request, the User must send an official
              notice to info@avenezer.ca.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-[var(--text-main)]">5.2</h3>
            <p>
              Upon issuance of a refund, the &quot;Founding Member&quot; status
              and &quot;Lifetime Top Placement&quot; rights are permanently and
              irrevocably revoked.
            </p>
          </div>
        </div>
      </Section>

      <Section title="6. NO INVESTMENT OR PARTNERSHIP">
        <div className="space-y-6 text-[var(--text-muted)]">
          <div className="space-y-3">
            <h3 className="font-semibold text-[var(--text-main)]">6.1</h3>
            <p>
              The payment of access fees does not constitute an investment, a
              loan, or the purchase of shares/equity in AvenEzer Inc.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-[var(--text-main)]">6.2</h3>
            <p>
              The &quot;Founding Member&quot; status is strictly a marketing
              privilege and does not grant any rights to the management,
              governance, or profits of the Company.
            </p>
          </div>
        </div>
      </Section>

      <Section title="7. LIMITATION OF LIABILITY">
        <div className="space-y-6 text-[var(--text-muted)]">
          <div className="space-y-3">
            <h3 className="font-semibold text-[var(--text-main)]">7.1</h3>
            <p>
              To the maximum extent permitted by law, the Company shall not be
              liable for any loss of profit, business interruption, or loss of
              business opportunities incurred by the User.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-[var(--text-main)]">7.2</h3>
            <p>
              The Company reserves the right to suspend access in the event of a
              breach of business community ethics or fraudulent activity.
            </p>
          </div>
        </div>
      </Section>

      <Section title="8. GOVERNING LAW AND JURISDICTION">
        <div className="space-y-6 text-[var(--text-muted)]">
          <p>
            These Terms of Use are governed by and construed in accordance with
            the laws of the Province of Ontario and the federal laws of Canada
            applicable therein.
          </p>

          <p>
            Any legal disputes arising from these Terms shall be subject to the
            exclusive jurisdiction of the courts of Ontario.
          </p>
        </div>
      </Section>
    </main>
  );
}
