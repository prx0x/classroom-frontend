import React from "react";
import { Link } from "react-router";
import { schoolConfig } from "@/config/school";
import { usePageMeta } from "../hooks/use-page-meta";
import { PageHero } from "../components/page-hero";
import { SectionHeading } from "../components/section-heading";
import { ImageTextFeature } from "../components/image-text-feature";
import { CallToAction } from "../components/call-to-action";
import {
  Compass,
  ScrollText,
  ShieldCheck,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

export const AboutPage: React.FC = () => {
  const { about, values } = schoolConfig;

  usePageMeta({
    title: "About",
    description: about.hero.description,
  });

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      {/* 1. Page Hero */}
      <PageHero
        badge={about.hero.badge}
        title={about.hero.title}
        description={about.hero.description}
        breadcrumbs={[{ label: "About" }]}
        primaryCta={{ label: "Admissions & Entry", href: "/admissions" }}
        secondaryCta={{ label: "Explore Campus", href: "/campus" }}
        disclaimer={about.hero.disclaimer}
        metaItems={[
          { label: "Institutional Ethos", value: "Curiosity & Character" },
          { label: "Community", value: "Mentorship-Driven" },
          { label: "Accreditation", value: "Pending Verification" },
        ]}
      />

      {/* 2. Mission & Educational Vision */}
      <section className="public-container" aria-labelledby="mission-heading">
        <ImageTextFeature
          overline={about.mission.overline}
          title={about.mission.heading}
          description={about.mission.statement}
          secondaryText={about.mission.ethosSummary}
          highlights={[
            "Rigorous intellectual seminar dialogue and evidence-based debate",
            "Compassionate mentorship cultivating student agency and resilience",
            "Ethical commitment to active civic participation and stewardship",
          ]}
          cta={{ label: "Explore Academic Pathways", href: "/academics" }}
          image={{
            alt: "Architectural study of campus central quadrangle and library commons",
            caption: "Architectural study: Central library cloister and assembly commons",
            aspectRatio: "4/3",
            statusNote: "Representative study • Official photo pending",
          }}
        />
      </section>

      {/* 3. Guiding Core Values */}
      <section className="public-container" aria-labelledby="values-heading">
        <div className="space-y-10">
          <SectionHeading
            overline="Guiding Principles"
            title="The foundational pillars of our academic community."
            description="Our core values guide seminar dialogue, interpersonal relationships, and ethical accountability across all grade levels."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {values.items.map((val, idx) => (
              <div
                key={idx}
                className="pub-card p-6 sm:p-8 flex flex-col justify-between hover:border-[var(--pub-forest)]/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-[var(--pub-gold)] font-semibold">
                      Principle 0{idx + 1}
                    </span>
                    {val.latinMotto && (
                      <span className="font-serif italic text-xs text-[var(--pub-muted)]">
                        {val.latinMotto}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl public-serif text-[var(--pub-ink)] font-normal">
                    {val.name}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--pub-muted)] leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Leadership & Faculty Stewardship */}
      <section className="bg-[var(--pub-white)] border-y border-[var(--pub-border)] py-16 md:py-20" aria-labelledby="leadership-heading">
        <div className="public-container space-y-10">
          <div className="max-w-3xl space-y-4">
            <span className="pub-badge-forest">{about.leadership.overline}</span>
            <h2 id="leadership-heading" className="text-3xl sm:text-4xl public-serif text-[var(--pub-ink)] font-normal">
              {about.leadership.heading}
            </h2>
            <p className="text-base sm:text-lg text-[var(--pub-muted)] leading-relaxed">
              {about.leadership.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {about.leadership.commitments.map((item, idx) => (
              <div key={idx} className="p-6 rounded-lg border border-[var(--pub-border)] bg-[var(--pub-paper)] space-y-3">
                <div className="w-10 h-10 rounded-md bg-[var(--pub-forest)]/10 text-[var(--pub-forest)] flex items-center justify-center font-mono font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-semibold text-[var(--pub-ink)]">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--pub-muted)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-md border border-dashed border-[var(--pub-border)] bg-[var(--pub-paper)]/70 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-[#8c6a23] mt-0.5 shrink-0" />
            <div className="text-xs text-[var(--pub-muted)] leading-relaxed">
              <span className="font-semibold text-[var(--pub-ink)]">Institutional Notice: </span>
              {about.leadership.verificationNote}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Heritage & Timeline Milestones */}
      <section className="public-container" aria-labelledby="heritage-heading">
        <div className="space-y-10">
          <SectionHeading
            overline={about.heritage.overline}
            title={about.heritage.heading}
            description={about.heritage.description}
          />

          <div className="relative border-l border-[var(--pub-border)] pl-6 ml-3 sm:ml-6 space-y-8">
            {about.heritage.milestones.map((m, idx) => (
              <div key={idx} className="relative space-y-2">
                <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[var(--pub-forest)] border-2 border-[var(--pub-paper)]" />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-[var(--pub-gold)] uppercase tracking-wider">
                    {m.period}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--pub-border)]/50 text-[var(--pub-muted)] font-mono">
                    {m.status}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-[var(--pub-ink)]">
                  {m.title}
                </h3>
                <p className="text-sm text-[var(--pub-muted)] max-w-2xl leading-relaxed">
                  {m.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Governance & Affiliation */}
      <section className="public-container" aria-labelledby="governance-heading">
        <div className="p-8 sm:p-10 rounded-xl pub-surface border border-[var(--pub-border)] space-y-6">
          <div className="space-y-2">
            <span className="pub-badge-forest">{about.governance.overline}</span>
            <h2 id="governance-heading" className="text-2xl sm:text-3xl public-serif text-[var(--pub-ink)] font-normal">
              {about.governance.heading}
            </h2>
            <p className="text-sm sm:text-base text-[var(--pub-muted)] leading-relaxed max-w-3xl">
              {about.governance.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-lg bg-[var(--pub-paper)] border border-[var(--pub-border)] space-y-1">
              <span className="text-xs text-[var(--pub-muted)] font-mono uppercase tracking-wider">
                Current Affiliation Record
              </span>
              <p className="text-sm font-semibold text-[var(--pub-ink)]">
                {about.governance.affiliationStatus}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[var(--pub-paper)] border border-[var(--pub-border)] space-y-1">
              <span className="text-xs text-[var(--pub-muted)] font-mono uppercase tracking-wider">
                Accountability Charter
              </span>
              <p className="text-xs text-[var(--pub-muted)] leading-relaxed">
                {about.governance.accountabilityNotice}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Call To Action Banner */}
      <section className="public-container">
        <CallToAction
          variant="forest"
          overline="Next Steps"
          heading="Join our learning community."
          description="Explore our admission pathways, schedule a campus visit, or connect directly with our admissions advisors."
          primaryAction={{ label: "Admissions Journey", href: "/admissions" }}
          secondaryAction={{ label: "Contact Admissions Office", href: "/contact" }}
        />
      </section>
    </div>
  );
};
