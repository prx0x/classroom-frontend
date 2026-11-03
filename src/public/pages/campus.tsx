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
  Clock,
  CheckCircle2,
} from "lucide-react";

export const CampusPage: React.FC = () => {
  const { campus } = schoolConfig;

  usePageMeta({
    title: "Campus",
    description: campus.hero.description,
  });

  const facilitiesRef = useScrollReveal({ selector: ".pub-card", y: 24, stagger: 0.12 });
  const safetyRef = useScrollReveal({ selector: "[data-reveal-safety]", y: 20, stagger: 0.1 });

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      {/* 1. Page Hero */}
      <PageHero
        badge={campus.hero.badge}
        title={campus.hero.title}
        description={campus.hero.description}
        breadcrumbs={[{ label: "Campus" }]}
        primaryCta={{ label: "Schedule a Tour", href: "/contact" }}
        secondaryCta={{ label: "Admissions Information", href: "/admissions" }}
        disclaimer={campus.hero.disclaimer}
        metaItems={[
          { label: "Instructional Pavilions", value: "5 Dedicated Spaces" },
          { label: "Universal Access", value: "Step-Free Throughout" },
          { label: "Campus Visits", value: "By Appointment" },
        ]}
      />

      {/* 2. Architectural Vision & Environment */}
      <section className="public-container" aria-labelledby="campus-vision-heading">
        <ImageTextFeature
          overline={campus.overview.overline}
          title={campus.overview.heading}
          description={campus.overview.description}
          secondaryText="Every corner of our campus has been planned with natural daylight, acoustic calm, and environmental sustainability in mind, allowing spaces to transition seamlessly from focused individual study to vibrant group seminars."
          highlights={[
            "Abundant natural daylight with high ceilings and perimeter glazing",
            "Acoustic separation preserving quiet library study zones",
            "Sustainable native landscape planting and energy-efficient architecture",
          ]}
          cta={{ label: "View Learning Facilities", href: "#facilities" }}
          image={{
            alt: "Architectural study of campus quadrangle and science pavilion alignment",
            caption: "Architectural study: Central quadrangle and science pavilion alignment",
            aspectRatio: "4/3",
            statusNote: "Representative study • Official photo pending",
          }}
        />
      </section>

      {/* 3. Detailed Campus Facilities Catalog */}
      <section id="facilities" className="public-container" aria-labelledby="facilities-heading">
        <div ref={facilitiesRef} className="space-y-10">
          <SectionHeading
            overline="Learning Environments"
            title="Specialized facilities designed for focused discovery."
            description="From quiet research archives to vibrant maker studios and competitive athletic grounds, our facilities are crafted to support student excellence."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campus.facilities.map((fac, idx) => (
              <div
                key={fac.id}
                className="pub-card flex flex-col justify-between overflow-hidden hover:border-[var(--pub-forest)]/40 transition-colors"
              >
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="pub-badge-forest text-[10px]">
                      {fac.category}
                    </span>
                    <span className="font-mono text-xs text-[var(--pub-muted)]">
                      Space 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl public-serif text-[var(--pub-ink)] font-normal leading-snug">
                    {fac.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--pub-muted)] leading-relaxed">
                    {fac.description}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-[var(--pub-border)]">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--pub-ink)] font-semibold block">
                      Key Provisions
                    </span>
                    <ul className="space-y-1 text-xs text-[var(--pub-muted)] list-none p-0 m-0">
                      {fac.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--pub-forest)] mt-1.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-6 py-3 bg-[var(--pub-paper)] border-t border-[var(--pub-border)] flex items-center justify-between text-[11px] text-[var(--pub-muted)] font-mono">
                  <span>Photo Record:</span>
                  <span className="text-[var(--pub-gold)] font-medium">Pending Verification</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Health, Safety & Universal Accessibility */}
      <section className="bg-[var(--pub-white)] border-y border-[var(--pub-border)] py-16 md:py-20" aria-labelledby="safety-heading">
        <div ref={safetyRef} className="public-container space-y-10">
          <SectionHeading
            overline={campus.accessibilityAndSafety.overline}
            title={campus.accessibilityAndSafety.heading}
            description={campus.accessibilityAndSafety.description}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campus.accessibilityAndSafety.policies.map((pol, idx) => (
              <div
                key={idx}
                data-reveal-safety
                className="p-6 rounded-lg border border-[var(--pub-border)] bg-[var(--pub-paper)] space-y-3"
              >
                <div className="w-10 h-10 rounded-md bg-[var(--pub-forest)]/10 text-[var(--pub-forest)] flex items-center justify-center font-mono font-bold text-sm">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-semibold text-[var(--pub-ink)]">
                  {pol.title}
                </h4>
                <p className="text-sm text-[var(--pub-muted)] leading-relaxed">
                  {pol.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Campus Visits & Tour Guidelines */}
      <section id="visiting" className="public-container" aria-labelledby="visiting-heading">
        <div className="p-8 sm:p-10 rounded-xl pub-surface border border-[var(--pub-border)] space-y-6">
          <div className="space-y-3">
            <span className="pub-badge-forest">{campus.visiting.overline}</span>
            <h2 id="visiting-heading" className="text-2xl sm:text-3xl public-serif text-[var(--pub-ink)] font-normal">
              {campus.visiting.heading}
            </h2>
            <p className="text-sm sm:text-base text-[var(--pub-muted)] leading-relaxed max-w-3xl">
              {campus.visiting.description}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[var(--pub-paper)] border border-[var(--pub-border)] flex items-center gap-3">
            <Clock className="w-4 h-4 text-[var(--pub-forest)] shrink-0" />
            <div className="text-xs sm:text-sm text-[var(--pub-ink)] font-medium">
              Tour Timetable: <span className="text-[var(--pub-muted)] font-normal">{campus.visiting.hours}</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--pub-ink)] font-semibold block">
              Visitor Procedures
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-[var(--pub-muted)] list-none p-0 m-0">
              {campus.visiting.guidelines.map((g, gIdx) => (
                <li key={gIdx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--pub-forest)] shrink-0 mt-0.5" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <Link to="/contact" className="pub-btn-primary">
              Book a Guided Campus Visit
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Call To Action Banner */}
      <section className="public-container">
        <CallToAction
          variant="forest"
          overline="Admissions Dialogue"
          heading="Experience our learning community."
          description="Explore our admission guidelines, portfolio requirements, and upcoming entry milestones."
          primaryAction={{ label: "Admissions Journey", href: "/admissions" }}
          secondaryAction={{ label: "Contact Campus Office", href: "/contact" }}
        />
      </section>
    </div>
  );
};
