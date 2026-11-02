import React from "react";
import { Link } from "react-router";
import { schoolConfig } from "@/config/school";
import { SectionHeading } from "../components/section-heading";
import { PillarCard } from "../components/pillar-card";
import { EditorialImage } from "../components/editorial-image";
import { CallToAction } from "../components/call-to-action";
import { useHeroEntrance } from "../motion/use-hero-entrance";
import { useScrollReveal } from "../motion/use-scroll-reveal";
import { useEditorialPillarsMotion } from "../motion/use-editorial-pillars";
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  ShieldAlert,
  CheckCircle2,
  BookOpen,
  Compass,
  Sparkles,
  MapPin,
  Calendar,
} from "lucide-react";

export const HomePage: React.FC = () => {
  const { hero, intro, pillars, academicsPreview, campusPreview, studentLifePreview, values, admissionsCta, portalBanner } = schoolConfig;

  // GSAP Motion Hooks
  const heroRef = useHeroEntrance();
  const introRef = useScrollReveal({ selector: "[data-reveal]", y: 22, stagger: 0.1 });
  const pillarsContainerRef = useEditorialPillarsMotion();
  const academicsRef = useScrollReveal({ selector: ".pub-card", y: 24, stagger: 0.12 });
  const campusRef = useScrollReveal({ selector: ".pub-card", y: 24, stagger: 0.12 });
  const studentLifeRef = useScrollReveal({ selector: ".pub-card", y: 24, stagger: 0.12 });
  const valuesRef = useScrollReveal({ selector: ".pub-card", y: 24, stagger: 0.1 });
  const admissionsRef = useScrollReveal({ selector: "[data-reveal-step]", y: 24, stagger: 0.1 });
  const portalRef = useScrollReveal({ selector: "[data-reveal-portal]", y: 20 });

  return (
    <div className="flex-1 flex flex-col">
      {/* =========================================================
          SECTION 1: HERO
          Editorial campus journal headline, dual CTAs, architectural composition
          ========================================================= */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[var(--pub-border)] bg-[var(--pub-paper)] overflow-hidden">
        <div ref={heroRef} className="public-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Editorial Headline & Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-7">
              {/* Status Badge */}
              <div data-hero-elem className="inline-flex items-center gap-2">
                <span className="pub-badge-unverified text-[11px]">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  {hero.badge}
                </span>
              </div>

              {/* Main Headline */}
              <h1 data-hero-elem className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight public-serif text-[var(--pub-ink)] leading-[1.12]">
                {hero.headline}
              </h1>

              {/* Supporting Subheadline */}
              <p data-hero-elem className="text-lg sm:text-xl text-[var(--pub-muted)] public-sans font-normal leading-relaxed max-w-2xl">
                {hero.subheadline}
              </p>

              {/* Primary Actions Row */}
              <div data-hero-elem className="pt-2 flex flex-wrap items-center gap-4">
                <Link to={hero.primaryCta.href} className="pub-btn-primary text-base px-6 py-3.5">
                  <span>{hero.primaryCta.label}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>

                <Link to={hero.secondaryCta.href} className="pub-btn-secondary text-base px-6 py-3.5">
                  <span>{hero.secondaryCta.label}</span>
                </Link>

                <Link
                  to={hero.portalCta.href}
                  className="pub-btn-portal text-sm px-4 py-3"
                  title="Direct access to classroom portal"
                >
                  <GraduationCap className="w-4 h-4 text-[var(--pub-forest)]" />
                  <span>{hero.portalCta.label}</span>
                </Link>
              </div>

              {/* Quick Metadata Highlights */}
              <div data-hero-elem className="pt-6 border-t border-[var(--pub-border)] grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-[var(--pub-muted)]">
                <div>
                  <strong className="block text-[var(--pub-ink)] font-semibold text-sm public-serif">
                    Intellectual Rigor
                  </strong>
                  <span>Evidence-based inquiry</span>
                </div>
                <div>
                  <strong className="block text-[var(--pub-ink)] font-semibold text-sm public-serif">
                    Dedicated Faculty
                  </strong>
                  <span>Mentorship &amp; discourse</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <strong className="block text-[var(--pub-ink)] font-semibold text-sm public-serif">
                    Campus Life
                  </strong>
                  <span>Expansive learning grounds</span>
                </div>
              </div>
            </div>

            {/* Right Column: Architectural / Campus Study Visual Composition (5 cols) */}
            <div data-hero-elem className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-tr from-[var(--pub-forest)]/10 to-[var(--pub-gold)]/10 rounded-xl blur-xs transform -rotate-1 pointer-events-none" />
                <div className="relative rounded-lg pub-surface p-4 sm:p-5 shadow-sm space-y-4">
                  <EditorialImage
                    aspectRatio="4/3"
                    title="The Central Cloister &amp; Quadrangle"
                    caption={hero.compositionCaption}
                    statusNote={hero.verifiedStatus}
                    sourceNote="Campus Design Blueprint"
                    alt="Campus architectural study rendering"
                  />
                  <div className="flex items-center justify-between text-xs text-[var(--pub-muted)] pt-1 px-1">
                    <span className="font-medium text-[var(--pub-ink)]">
                      {schoolConfig.shortName.split(" (")[0]} Main Campus
                    </span>
                    <span className="italic">Visual Study</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 2: INTRODUCTION
          Educational approach narrative and positioning
          ========================================================= */}
      <section className="py-16 sm:py-24 bg-[var(--pub-white)] border-b border-[var(--pub-border)]">
        <div ref={introRef} className="public-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div data-reveal className="lg:col-span-5 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--pub-forest)]">
                {intro.overline}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-normal public-serif text-[var(--pub-ink)] leading-[1.2]">
                {intro.heading}
              </h2>
            </div>

            <div data-reveal className="lg:col-span-7 space-y-6">
              {intro.paragraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-base sm:text-lg text-[var(--pub-muted)] public-sans font-normal leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}

              <div className="pub-quote-box my-6">
                <p className="text-lg public-serif text-[var(--pub-ink)]">
                  "Knowledge is not merely acquired; it is interrogated, applied, and shared in service of a greater common good."
                </p>
                <cite className="block text-xs uppercase tracking-wider font-mono text-[var(--pub-forest)] not-italic mt-2">
                  Academic Mission Statement (Provisional)
                </cite>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--pub-forest)] hover:underline"
                >
                  <span>Read our complete philosophy &amp; mission</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 3: LEARNING APPROACH / PILLARS
          Editorial desktop pinned narrative moment (>=1024px)
          and fluid vertical stack on mobile/tablet (<1024px)
          ========================================================= */}
      <section className="py-16 sm:py-24 bg-[var(--pub-paper)] border-b border-[var(--pub-border)]">
        <div ref={pillarsContainerRef} className="public-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-4 editorial-pillar-heading space-y-4">
              <SectionHeading
                overline="Pedagogical Core"
                title="Four pillars that shape our learning community."
                description="Our academic framework weaves rigorous scholarship with creative exploration, civic responsibility, and empirical discipline."
                cta={{ label: "Explore curriculum pathways", href: "/academics" }}
              />
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {pillars.map((pillar) => (
                <div key={pillar.id} className="editorial-pillar-card">
                  <PillarCard pillar={pillar} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 4: ACADEMICS PREVIEW
          Curriculum overview with pathways and discipline focus
          ========================================================= */}
      <section className="py-16 sm:py-24 bg-[var(--pub-white)] border-b border-[var(--pub-border)]">
        <div ref={academicsRef} className="public-container">
          <SectionHeading
            overline={academicsPreview.overline}
            title={academicsPreview.heading}
            description={academicsPreview.description}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {academicsPreview.pathways.map((pathway) => (
              <div
                key={pathway.id}
                className="pub-card p-8 flex flex-col justify-between hover:border-[var(--pub-forest)]/50 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="pub-badge-forest text-[11px]">
                      {pathway.gradeLevel}
                    </span>
                    <BookOpen className="w-4 h-4 text-[var(--pub-forest)]" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-normal public-serif text-[var(--pub-ink)]">
                    {pathway.title}
                  </h3>

                  <p className="text-sm text-[var(--pub-muted)] leading-relaxed">
                    {pathway.overview}
                  </p>

                  <div className="pt-2">
                    <span className="text-xs uppercase tracking-wider text-[var(--pub-muted)] font-semibold block mb-2">
                      Key Inquiry Areas:
                    </span>
                    <ul className="space-y-1.5">
                      {pathway.focusAreas.map((area, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-[var(--pub-ink)]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--pub-forest)] shrink-0" />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[var(--pub-border-subtle)]">
                  <Link
                    to={pathway.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--pub-forest)] hover:underline"
                  >
                    <span>Curriculum Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to={academicsPreview.cta.href} className="pub-btn-primary">
              <span>{academicsPreview.cta.label}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 5: CAMPUS PREVIEW
          Architectural spaces, labs, library, and facilities
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
                    statusNote={space.photographyStatus}
                    sourceNote="Campus Design Guide"
                    alt={space.title}
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
          SECTION 6: STUDENT LIFE PREVIEW
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
          SECTION 7: SCHOOL VALUES
          Core values guiding daily community life
          ========================================================= */}
      <section className="py-16 sm:py-24 bg-[var(--pub-paper)] border-b border-[var(--pub-border)]">
        <div ref={valuesRef} className="public-container">
          <SectionHeading
            overline={values.overline}
            title={values.heading}
            description={values.subheading}
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.items.map((val, idx) => (
              <div
                key={idx}
                className="pub-card p-7 space-y-4 bg-[var(--pub-white)]"
              >
                <div className="flex items-center justify-between border-b border-[var(--pub-border-subtle)] pb-3">
                  <span className="font-mono text-xs text-[var(--pub-muted)]">
                    VAL 0{idx + 1}
                  </span>
                  {val.latinMotto && (
                    <span className="text-[11px] font-serif italic text-[var(--pub-forest)]">
                      {val.latinMotto}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-normal public-serif text-[var(--pub-ink)]">
                  {val.name}
                </h3>

                <p className="text-sm text-[var(--pub-muted)] leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 8: ADMISSIONS CTA & APPLICATION JOURNEY
          Four clear steps and direct admissions inquiry
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
          SECTION 9: CLASSROOM PORTAL BRIDGE
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
