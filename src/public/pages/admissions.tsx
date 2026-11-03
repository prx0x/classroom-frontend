import React from "react";
import { Link } from "react-router";
import { schoolConfig } from "@/config/school";
import { usePageMeta } from "../hooks/use-page-meta";
import { PageHero } from "../components/page-hero";
import { SectionHeading } from "../components/section-heading";
import { ImageTextFeature } from "../components/image-text-feature";
import { CallToAction } from "../components/call-to-action";
import { useScrollReveal } from "../motion/use-scroll-reveal";
import {
  FileText,
  Calendar,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export const AdmissionsPage: React.FC = () => {
  const { admissions } = schoolConfig;

  usePageMeta({
    title: "Admissions",
    description: admissions.hero.description,
  });

  const journeyRef = useScrollReveal({ selector: ".pub-card", y: 24, stagger: 0.12 });
  const docsRef = useScrollReveal({ selector: "[data-reveal-doc]", y: 20, stagger: 0.1 });
  const faqsRef = useScrollReveal({ selector: ".pub-card", y: 20, stagger: 0.1 });

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      {/* 1. Page Hero */}
      <PageHero
        badge={admissions.hero.badge}
        title={admissions.hero.title}
        description={admissions.hero.description}
        breadcrumbs={[{ label: "Admissions" }]}
        primaryCta={{ label: "Inquire with Admissions", href: "/contact" }}
        secondaryCta={{ label: "Explore Academic Pathways", href: "/academics" }}
        disclaimer={admissions.hero.disclaimer}
        metaItems={[
          { label: "Evaluation Model", value: "Holistic & Character-Centered" },
          { label: "Admissions Stages", value: "4-Step Sequential Process" },
          { label: "Fee Schedule", value: "Available Upon Inquiry" },
        ]}
      />

      {/* 2. Admissions Philosophy */}
      <section className="public-container" aria-labelledby="admissions-philosophy-heading">
        <ImageTextFeature
          overline={admissions.philosophy.overline}
          title={admissions.philosophy.heading}
          description={admissions.philosophy.description}
          secondaryText="We evaluate applicants beyond test scores alone, considering intellectual curiosity, collaborative attitude, creative spark, and readiness to thrive in our educational community."
          highlights={[
            "Holistic candidate evaluation balancing academic foundation and character",
            "Personalized student interview and family dialogue",
            "Transparent communication throughout every evaluation phase",
          ]}
          cta={{ label: "View Enrollment Steps", href: "#admissions-journey" }}
          image={{
            alt: "Architectural study of campus admissions reception and student consultation hall",
            caption: "Architectural study: Admissions reception and student consultation hall",
            aspectRatio: "4/3",
            statusNote: "Representative study • Official photo pending",
          }}
        />
      </section>

      {/* 3. 4-Stage Admissions Journey */}
      <section id="admissions-journey" className="public-container" aria-labelledby="journey-heading">
        <div ref={journeyRef} className="space-y-10">
          <SectionHeading
            overline="The Enrollment Roadmap"
            title="A clear, supportive step-by-step admissions journey."
            description="Our admissions timeline is designed to give families ample opportunity to understand our culture while allowing faculty to evaluate prospective fit."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {admissions.journey.map((step) => (
              <div
                key={step.step}
                className="pub-card p-6 sm:p-8 space-y-5 flex flex-col justify-between hover:border-[var(--pub-forest)]/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm uppercase tracking-wider text-[var(--pub-gold)] font-bold">
                      Step {step.step} • {step.stage}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--pub-paper)] text-[var(--pub-muted)]">
                      {step.timing}
                    </span>
                  </div>

                  <h3 className="text-2xl public-serif text-[var(--pub-ink)] font-normal">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[var(--pub-muted)] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-[var(--pub-border)]">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--pub-ink)] font-semibold block">
                    Action Items
                  </span>
                  <ul className="space-y-1.5 text-xs text-[var(--pub-muted)] list-none p-0 m-0">
                    {step.checklist.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--pub-forest)] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Documentation Checklist */}
      <section id="documentation" className="bg-[var(--pub-white)] border-y border-[var(--pub-border)] py-16 md:py-20" aria-labelledby="docs-heading">
        <div ref={docsRef} className="public-container space-y-10">
          <SectionHeading
            overline={admissions.documentation.overline}
            title={admissions.documentation.heading}
            description={admissions.documentation.description}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {admissions.documentation.categories.map((cat, idx) => (
              <div
                key={idx}
                data-reveal-doc
                className="p-6 rounded-xl border border-[var(--pub-border)] bg-[var(--pub-paper)] space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-md bg-[var(--pub-forest)]/10 text-[var(--pub-forest)] flex items-center justify-center font-mono font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h4 className="text-lg public-serif text-[var(--pub-ink)] font-normal">
                    {cat.category}
                  </h4>
                  <ul className="space-y-2 text-xs text-[var(--pub-muted)] list-none p-0 m-0">
                    {cat.items.map((it, itIdx) => (
                      <li key={itIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--pub-forest)] mt-1.5 shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-md border border-dashed border-[var(--pub-border)] bg-[var(--pub-paper)] flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-[#8c6a23] mt-0.5 shrink-0" />
            <p className="text-xs text-[var(--pub-muted)] leading-relaxed">
              <span className="font-semibold text-[var(--pub-ink)]">Verification Note: </span>
              {admissions.documentation.statusNotice}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Calendar Dates & Tuition Schedule Notice */}
      <section className="public-container" aria-labelledby="dates-fees-heading">
        <div className="p-8 sm:p-10 rounded-xl pub-surface border border-[var(--pub-border)] space-y-6">
          <div className="space-y-2">
            <span className="pub-badge-forest">{admissions.datesAndFeesNotice.overline}</span>
            <h2 id="dates-fees-heading" className="text-2xl sm:text-3xl public-serif text-[var(--pub-ink)] font-normal">
              {admissions.datesAndFeesNotice.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-lg bg-[var(--pub-paper)] border border-[var(--pub-border)] space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--pub-ink)]">
                <Calendar className="w-4 h-4 text-[var(--pub-forest)]" />
                <span>Admissions Deadlines Policy</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--pub-muted)] leading-relaxed">
                {admissions.datesAndFeesNotice.datesNotice}
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[var(--pub-paper)] border border-[var(--pub-border)] space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--pub-ink)]">
                <FileText className="w-4 h-4 text-[var(--pub-forest)]" />
                <span>Tuition &amp; Financial Assistance</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--pub-muted)] leading-relaxed">
                {admissions.datesAndFeesNotice.feeNotice}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link to="/contact" className="pub-btn-primary text-sm">
              Request Official Admissions Prospectus &amp; Fee Sheet
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Frequently Asked Questions (FAQ) */}
      <section className="public-container" aria-labelledby="faq-heading">
        <div ref={faqsRef} className="space-y-10">
          <SectionHeading
            overline="Prospective Family Inquiries"
            title="Frequently Asked Questions."
            description="Answers to common questions regarding admissions considerations, visitation, and candidate evaluation."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {admissions.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="pub-card p-6 sm:p-7 space-y-3"
              >
                <h4 className="text-base sm:text-lg public-serif text-[var(--pub-ink)] font-normal flex items-start gap-2.5">
                  <span className="font-mono text-xs font-bold text-[var(--pub-forest)] mt-1 shrink-0">
                    Q{idx + 1}.
                  </span>
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs sm:text-sm text-[var(--pub-muted)] leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Call To Action Banner */}
      <section className="public-container">
        <CallToAction
          variant="forest"
          overline="Get In Touch"
          heading="Have questions regarding the application journey?"
          description="Connect directly with our admissions coordinator to schedule a tour or receive detailed application guidelines."
          primaryAction={{ label: "Contact Admissions Office", href: "/contact" }}
          secondaryAction={{ label: "Explore Academic Program", href: "/academics" }}
        />
      </section>
    </div>
  );
};
