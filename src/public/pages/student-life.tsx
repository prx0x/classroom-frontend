import React from "react";
import { schoolConfig } from "@/config/school";
import { usePageMeta } from "../hooks/use-page-meta";
import { PageHero } from "../components/page-hero";
import { SectionHeading } from "../components/section-heading";
import { ImageTextFeature } from "../components/image-text-feature";
import { CallToAction } from "../components/call-to-action";
import { useScrollReveal } from "../motion/use-scroll-reveal";

export const StudentLifePage: React.FC = () => {
  const { studentLife } = schoolConfig;

  usePageMeta({
    title: "Student Life",
    description: studentLife.hero.description,
  });

  const activitiesRef = useScrollReveal({ selector: ".pub-card", y: 24, stagger: 0.12 });
  const traditionsRef = useScrollReveal({ selector: "[data-reveal-tradition]", y: 20, stagger: 0.1 });
  const pastoralRef = useScrollReveal({ selector: ".pub-card", y: 20, stagger: 0.1 });

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      {/* 1. Page Hero */}
      <PageHero
        badge={studentLife.hero.badge}
        title={studentLife.hero.title}
        description={studentLife.hero.description}
        breadcrumbs={[{ label: "Student Life" }]}
        primaryCta={{ label: "Admissions Journey", href: "/admissions" }}
        secondaryCta={{ label: "Campus Facilities", href: "/campus" }}
        disclaimer={studentLife.hero.disclaimer}
        metaItems={[
          { label: "Student Initiatives", value: "Student-Led Societies" },
          { label: "Participation", value: "Inclusive All-Level Access" },
          { label: "Traditions", value: "Pending Annual Calendar" },
        ]}
      />

      {/* 2. Co-Curricular Ethos */}
      <section className="public-container" aria-labelledby="student-life-ethos-heading">
        <ImageTextFeature
          overline={studentLife.ethos.overline}
          title={studentLife.ethos.heading}
          description={studentLife.ethos.description}
          secondaryText="Participation in student government, competitive sports, orchestra, and environmental restoration builds resilience, team trust, and civic empathy."
          highlights={[
            "Student autonomy with societies and journals led by elected student officers",
            "Deliberate balance between academic scholarship and creative/physical pursuits",
            "Inclusive participation encouraging every student to try unfamiliar disciplines",
          ]}
          cta={{ label: "Co-Curricular Activities", href: "#activities" }}
          image={{
            alt: "Architectural study of campus visual arts loft and outdoor amphitheater concourse",
            caption: "Architectural study: Visual arts loft and outdoor amphitheater concourse",
            aspectRatio: "4/3",
            statusNote: "Representative study • Official photo pending",
          }}
        />
      </section>

      {/* 3. Co-Curricular Activity Domains */}
      <section id="activities" className="public-container" aria-labelledby="activities-heading">
        <div ref={activitiesRef} className="space-y-10">
          <SectionHeading
            overline="Student Endeavour"
            title="Clubs, athletics, and creative pursuits."
            description="Our co-curricular programs provide platforms for authentic leadership, creative craft, athletic exertion, and community service."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {studentLife.coCurricular.map((act, idx) => (
              <div
                key={act.id}
                className="pub-card p-6 sm:p-8 space-y-4 flex flex-col justify-between hover:border-[var(--pub-forest)]/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="pub-badge-forest text-[10px]">
                      {act.category}
                    </span>
                    <span className="font-mono text-xs text-[var(--pub-muted)]">
                      Domain 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl public-serif text-[var(--pub-ink)] font-normal">
                    {act.title}
                  </h3>

                  <p className="text-sm text-[var(--pub-muted)] leading-relaxed">
                    {act.description}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-[var(--pub-border)]">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--pub-ink)] font-semibold block">
                    Representative Programs
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {act.activities.map((item, iIdx) => (
                      <span
                        key={iIdx}
                        className="px-2.5 py-1 rounded bg-[var(--pub-paper)] border border-[var(--pub-border)] text-xs text-[var(--pub-ink)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Seasonal Traditions */}
      <section className="bg-[var(--pub-white)] border-y border-[var(--pub-border)] py-16 md:py-20" aria-labelledby="traditions-heading">
        <div ref={traditionsRef} className="public-container space-y-10">
          <SectionHeading
            overline="Community Rituals"
            title="Seasonal traditions that bind our school community."
            description="Our annual calendar marks intellectual milestones, artistic performances, and athletic gatherings that unite students across grade levels."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentLife.traditions.map((trad, idx) => (
              <div
                key={idx}
                data-reveal-tradition
                className="p-6 rounded-xl border border-[var(--pub-border)] bg-[var(--pub-paper)] space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--pub-gold)] font-bold">
                    {trad.season}
                  </span>
                  <h4 className="text-lg public-serif text-[var(--pub-ink)] font-normal">
                    {trad.name}
                  </h4>
                  <p className="text-xs text-[var(--pub-muted)] leading-relaxed">
                    {trad.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[var(--pub-border)] text-[10px] font-mono text-[var(--pub-muted)]">
                  {trad.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Pastoral Care & Well-Being Scaffolding */}
      <section id="pastoral-care" className="public-container" aria-labelledby="pastoral-heading">
        <div ref={pastoralRef} className="space-y-10">
          <SectionHeading
            overline={studentLife.studentSupport.overline}
            title={studentLife.studentSupport.heading}
            description={studentLife.studentSupport.description}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studentLife.studentSupport.services.map((serv, idx) => (
              <div
                key={idx}
                className="pub-card p-6 sm:p-7 space-y-3"
              >
                <div className="w-10 h-10 rounded-md bg-[var(--pub-forest)]/10 text-[var(--pub-forest)] flex items-center justify-center font-mono font-bold text-sm">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-semibold text-[var(--pub-ink)]">
                  {serv.title}
                </h4>
                <p className="text-sm text-[var(--pub-muted)] leading-relaxed">
                  {serv.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call To Action Banner */}
      <section className="public-container">
        <CallToAction
          variant="paper"
          overline="Admissions Dialogue"
          heading="Become part of our vibrant school community."
          description="Explore our admission stages, tour our campus spaces, and learn how your student can participate in school life."
          primaryAction={{ label: "Admissions Process", href: "/admissions" }}
          secondaryAction={{ label: "Connect with Admissions", href: "/contact" }}
        />
      </section>
    </div>
  );
};
