import React from "react";
import { Link } from "react-router";
import { schoolConfig } from "@/config/school";
import { usePageMeta } from "../hooks/use-page-meta";
import { PageHero } from "../components/page-hero";
import { SectionHeading } from "../components/section-heading";
import { ImageTextFeature } from "../components/image-text-feature";
import { CallToAction } from "../components/call-to-action";
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  Layers,
  FileCheck2,
  Calendar,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export const AcademicsPage: React.FC = () => {
  const { academics } = schoolConfig;

  usePageMeta({
    title: "Academics",
    description: academics.hero.description,
  });

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      {/* 1. Page Hero */}
      <PageHero
        badge={academics.hero.badge}
        title={academics.hero.title}
        description={academics.hero.description}
        breadcrumbs={[{ label: "Academics" }]}
        primaryCta={{ label: "Admissions Criteria", href: "/admissions" }}
        secondaryCta={{ label: "View Campus Facilities", href: "/campus" }}
        disclaimer={academics.hero.disclaimer}
        metaItems={[
          { label: "Curriculum Pedagogy", value: "Socratic & Empirical" },
          { label: "Program Divisions", value: "Primary to Senior Capstone" },
          { label: "Term Dates", value: "Pending Confirmation" },
        ]}
      />

      {/* 2. Educational Philosophy & Pedagogy */}
      <section className="public-container" aria-labelledby="academics-pedagogy-heading">
        <ImageTextFeature
          overline={academics.philosophy.overline}
          title={academics.philosophy.heading}
          description={academics.philosophy.lead}
          secondaryText="Through structured seminar questions, empirical laboratory protocols, and interdisciplinary synthesis, students learn not only what to think, but how to interrogate ideas from multiple perspectives."
          highlights={[
            "Socratic inquiry and evidence-based argument construction",
            "Laboratory experimentation and empirical data analysis",
            "Interdisciplinary bridge connecting humanities and sciences",
          ]}
          cta={{ label: "Explore Grade Divisions", href: "#grade-divisions" }}
          image={{
            alt: "Architectural study of academic seminar rooms and quantitative reasoning laboratory",
            caption: "Architectural study: Seminar rooms and quantitative reasoning laboratory",
            aspectRatio: "4/3",
            statusNote: "Representative study • Official photo pending",
          }}
        />
      </section>

      {/* 3. Grade Divisions & Learning Stages */}
      <section id="grade-divisions" className="public-container" aria-labelledby="divisions-heading">
        <div className="space-y-10">
          <SectionHeading
            overline="Structured Learning Stages"
            title="Curriculum divisions tailored to developmental maturity."
            description="Our academic progression balances foundational mastery with specialized inquiry, guiding learners from playful discovery to advanced capstone scholarship."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {academics.divisions.map((div, idx) => (
              <div
                key={div.id}
                className="pub-card p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[var(--pub-forest)]/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-[var(--pub-gold)] font-semibold">
                      Stage 0{idx + 1}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--pub-paper)] text-[var(--pub-muted)]">
                      {div.ageSpan}
                    </span>
                  </div>

                  <h3 className="text-2xl public-serif text-[var(--pub-ink)] font-normal">
                    {div.division}
                  </h3>

                  <div className="inline-block px-2.5 py-1 rounded bg-[var(--pub-forest)]/10 text-[var(--pub-forest)] font-mono text-xs font-semibold">
                    {div.grades}
                  </div>

                  <p className="text-sm text-[var(--pub-muted)] leading-relaxed">
                    {div.summary}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-[var(--pub-border)]">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--pub-ink)] font-semibold">
                    Core Competencies
                  </span>
                  <ul className="space-y-1.5 text-xs text-[var(--pub-muted)] list-none p-0 m-0">
                    {div.keyCompetencies.map((comp, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--pub-forest)] mt-1.5 shrink-0" />
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Academic Departments & Disciplines */}
      <section className="bg-[var(--pub-white)] border-y border-[var(--pub-border)] py-16 md:py-20" aria-labelledby="departments-heading">
        <div className="public-container space-y-10">
          <SectionHeading
            overline="Fields of Study"
            title="Departmental disciplines and areas of inquiry."
            description="Our academic framework spans the classical humanities, quantitative sciences, world languages, and studio arts."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {academics.departments.map((dept, idx) => (
              <div
                key={dept.id}
                className="p-6 sm:p-8 rounded-xl border border-[var(--pub-border)] bg-[var(--pub-paper)]/50 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="pub-badge-forest text-[10px]">
                      {dept.category}
                    </span>
                    <span className="font-mono text-xs text-[var(--pub-muted)]">
                      Dept 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl public-serif text-[var(--pub-ink)] font-normal">
                    {dept.name}
                  </h3>

                  <p className="text-sm text-[var(--pub-muted)] leading-relaxed">
                    {dept.overview}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[var(--pub-border)]">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--pub-ink)] font-semibold block mb-2">
                      Core Subjects &amp; Inquiries
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dept.focusDisciplines.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded bg-[var(--pub-white)] border border-[var(--pub-border)] text-xs text-[var(--pub-ink)]"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-[var(--pub-muted)] italic pt-1">
                    <span className="font-semibold text-[var(--pub-ink)] not-italic">Pedagogy: </span>
                    {dept.pedagogy}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Academic Support & Faculty Guidance */}
      <section id="academic-support" className="public-container" aria-labelledby="support-heading">
        <div className="space-y-10">
          <SectionHeading
            overline={academics.academicSupport.overline}
            title={academics.academicSupport.heading}
            description={academics.academicSupport.description}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {academics.academicSupport.programs.map((prog, idx) => (
              <div
                key={idx}
                className="pub-card p-6 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-md bg-[var(--pub-forest)]/10 text-[var(--pub-forest)] flex items-center justify-center font-mono font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h4 className="text-base font-semibold text-[var(--pub-ink)]">
                    {prog.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--pub-muted)] leading-relaxed">
                    {prog.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Academic Calendar & Term Notice */}
      <section className="public-container" aria-labelledby="calendar-notice-heading">
        <div className="p-6 sm:p-8 rounded-xl pub-surface border border-[var(--pub-border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--pub-forest)]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--pub-forest)] font-semibold">
                {academics.calendarNotice.overline}
              </span>
            </div>
            <h3 id="calendar-notice-heading" className="text-xl font-normal public-serif text-[var(--pub-ink)]">
              {academics.calendarNotice.heading}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--pub-muted)] leading-relaxed">
              {academics.calendarNotice.note}
            </p>
          </div>

          <Link to="/contact" className="pub-btn-secondary text-xs sm:text-sm shrink-0">
            Inquire for Term Dates
          </Link>
        </div>
      </section>

      {/* 7. Call To Action Banner */}
      <section className="public-container">
        <CallToAction
          variant="paper"
          overline="Next Steps"
          heading="Take the next step in your educational journey."
          description="Learn about our holistic admissions process, key evaluation stages, and how to apply for the upcoming academic year."
          primaryAction={{ label: "Admissions Process", href: "/admissions" }}
          secondaryAction={{ label: "Campus Facilities", href: "/campus" }}
        />
      </section>
    </div>
  );
};
