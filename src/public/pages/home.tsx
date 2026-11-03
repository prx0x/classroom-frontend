import React from "react";
import { Link } from "react-router";
import { schoolConfig } from "@/config/school";
import { SectionHeading } from "../components/section-heading";
import { EditorialImage } from "../components/editorial-image";
import { CallToAction } from "../components/call-to-action";
import { CinematicHomepage } from "../cinematic/CinematicHomepage";
import { useScrollReveal } from "../motion/use-scroll-reveal";
import { usePageMeta } from "../hooks/use-page-meta";
import {
  ArrowRight,
  GraduationCap,
  CheckCircle2,
  Compass,
  Sparkles,
} from "lucide-react";

export const HomePage: React.FC = () => {
  const { campusPreview, studentLifePreview, admissionsCta, portalBanner } = schoolConfig;

  usePageMeta({
    title: "Home",
    description: schoolConfig.meta?.defaultDescription || schoolConfig.positioningStatement,
  });

  // GSAP Scroll Reveal hooks for the foundational content sections below the cinematic sequence
  const campusRef = useScrollReveal({ selector: ".pub-card", y: 24, stagger: 0.12 });
  const studentLifeRef = useScrollReveal({ selector: ".pub-card", y: 24, stagger: 0.12 });
  const admissionsRef = useScrollReveal({ selector: "[data-reveal-step]", y: 24, stagger: 0.1 });
  const portalRef = useScrollReveal({ selector: "[data-reveal-portal]", y: 20 });

  return (
    <div className="flex-1 flex flex-col">
      {/* =========================================================
          CONTINUOUS SCROLL-CONTROLLED CINEMATIC CAMPUS JOURNEY
          Scenes 1 to 5: Establishing vista, entrance colonnade, 
          interior rotunda & pillars, living campus disciplines, 
          and summit terrace identity reveal.
          ========================================================= */}
      <CinematicHomepage />

      {/* =========================================================
          CAMPUS FACILITIES & ARCHITECTURAL ENVIRONMENTS
          Architectural spaces, labs, library, and modern facilities
          ========================================================= */}
      <section className="py-16 sm:py-24 bg-[var(--pub-paper)] border-b border-[var(--pub-border)]">
        <div ref={campusRef} className="public-container">
          <SectionHeading
            overline={campusPreview.overline}
            title={campusPreview.heading}
            description={campusPreview.description}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {campusPreview.spaces.map((space) => (
              <div
                key={space.id}
                className="pub-card overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <EditorialImage
                    aspectRatio="16/10"
                    title={space.title}
                    caption={space.category}
                    statusNote={space.id === "central-library" ? "Official Campus Photography Verified" : space.photographyStatus}
                    sourceNote={space.id === "central-library" ? "Campus Grounds Photography" : "Campus Design Guide"}
                    alt={space.title}
                    src={space.id === "central-library" ? "/images/college-entrance.jpg" : undefined}
                  />

                  <div className="p-6 sm:p-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="pub-badge-forest text-[10px]">
                        {space.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-normal public-serif text-[var(--pub-ink)]">
                      {space.title}
                    </h3>

                    <p className="text-sm text-[var(--pub-muted)] leading-relaxed">
                      {space.description}
                    </p>

                    <div className="pt-2">
                      <span className="text-xs uppercase tracking-wider text-[var(--pub-muted)] font-semibold block mb-2">
                        Features:
                      </span>
                      <ul className="space-y-1.5">
                        {space.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-[var(--pub-ink)]">
                            <Compass className="w-3.5 h-3.5 text-[var(--pub-forest)] shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-[var(--pub-border-subtle)]">
                    <Link
                      to="/campus"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--pub-forest)] hover:underline"
                    >
                      <span>Campus Environments</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to={campusPreview.cta.href} className="pub-btn-secondary">
              <span>{campusPreview.cta.label}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          STUDENT LIFE PREVIEW
          Clubs, athletics, arts, and community engagement
          ========================================================= */}
      <section className="py-16 sm:py-24 bg-[var(--pub-white)] border-b border-[var(--pub-border)]">
        <div ref={studentLifeRef} className="public-container">
          <SectionHeading
            overline={studentLifePreview.overline}
            title={studentLifePreview.heading}
            description={studentLifePreview.description}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {studentLifePreview.areas.map((area) => (
              <div
                key={area.id}
                className="pub-card p-8 flex flex-col justify-between hover:border-[var(--pub-forest)]/50 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="pub-badge-gold text-[10px]">
                      {area.category}
                    </span>
                    <Sparkles className="w-4 h-4 text-[var(--pub-gold)]" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-normal public-serif text-[var(--pub-ink)]">
                    {area.title}
                  </h3>

                  <p className="text-sm text-[var(--pub-muted)] leading-relaxed">
                    {area.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-xs uppercase tracking-wider text-[var(--pub-muted)] font-semibold block mb-2">
                      Engagement Areas:
                    </span>
                    <ul className="space-y-1.5">
                      {area.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-[var(--pub-ink)]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--pub-gold)] shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[var(--pub-border-subtle)]">
                  <Link
                    to="/student-life"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--pub-forest)] hover:underline"
                  >
                    <span>Student Life Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to={studentLifePreview.cta.href} className="pub-btn-primary">
              <span>{studentLifePreview.cta.label}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          ADMISSIONS APPLICATION JOURNEY & INQUIRY
          Step-by-step admissions timeline and prospective family consultation
          ========================================================= */}
      <section className="py-16 sm:py-24 bg-[var(--pub-white)] border-b border-[var(--pub-border)]">
        <div ref={admissionsRef} className="public-container">
          <div className="mb-12">
            <SectionHeading
              overline={admissionsCta.overline}
              title={admissionsCta.heading}
              description={admissionsCta.description}
            />

            {/* Step-by-Step Admissions Journey */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {admissionsCta.steps.map((st) => (
                <div
                  key={st.step}
                  data-reveal-step
                  className="p-6 rounded-lg pub-surface bg-[var(--pub-paper)] border border-[var(--pub-border)] flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="font-mono text-xs font-bold text-[var(--pub-forest)]">
                      STEP {st.step}
                    </div>
                    <h3 className="text-lg font-normal public-serif text-[var(--pub-ink)]">
                      {st.title}
                    </h3>
                    <p className="text-xs text-[var(--pub-muted)] leading-relaxed">
                      {st.description}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[var(--pub-border)] text-[11px] text-[var(--pub-muted)] italic">
                    {st.timingNote}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <CallToAction
            overline="Prospective Families"
            heading="Discover the learning environment in person."
            description="Our admissions team is available to coordinate campus visits, answer curricular inquiries, and guide families through the admission timeline."
            primaryAction={admissionsCta.primaryCta}
            secondaryAction={admissionsCta.secondaryCta}
            note="Official admissions deadlines and fee schedules will be published upon school administration confirmation."
          />
        </div>
      </section>

      {/* =========================================================
          CLASSROOM PORTAL BRIDGE
          Internal administrative and classroom tool access
          ========================================================= */}
      <section className="py-14 bg-[var(--pub-paper)]">
        <div ref={portalRef} className="public-container">
          <div data-reveal-portal className="p-8 sm:p-10 rounded-xl bg-[#1b342b] text-[var(--pub-white)] flex flex-col md:flex-row items-center justify-between gap-6 border border-[#264b3e] shadow-sm">
            <div className="space-y-2 text-center md:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--pub-gold)] uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                {portalBanner.overline}
              </div>
              <h3 className="text-2xl sm:text-3xl public-serif font-normal">
                {portalBanner.heading}
              </h3>
              <p className="text-sm text-[var(--pub-paper)]/80 leading-relaxed">
                {portalBanner.description}
              </p>
            </div>
            <div className="shrink-0">
              <Link
                to={portalBanner.cta.href}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-[var(--pub-white)] text-[var(--pub-forest)] font-semibold text-sm hover:bg-[var(--pub-paper)] transition-colors shadow-xs"
              >
                <span>{portalBanner.cta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
