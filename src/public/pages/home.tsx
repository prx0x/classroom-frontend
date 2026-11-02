import React from "react";
import { Link } from "react-router";
import { schoolConfig } from "@/config/school";
import {
  ArrowRight,
  GraduationCap,
  BookOpen,
  Compass,
  Sparkles,
  ShieldAlert,
} from "lucide-react";

export const HomePage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Editorial Hero Section */}
      <section className="relative py-16 sm:py-24 border-b border-[var(--pub-border)] bg-[var(--pub-paper)] overflow-hidden">
        <div className="public-container">
          <div className="max-w-3xl space-y-6">
            {/* Verification Notice */}
            <div className="inline-flex items-center gap-2">
              <span className="pub-badge-unverified">
                <ShieldAlert className="w-3.5 h-3.5" />
                Phase 1 Prototype &bull; Verification Pending
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-4xl sm:text-6xl font-normal tracking-tight public-serif text-[var(--pub-ink)] leading-[1.15]">
              Cultivating curiosity, character, and lifelong discovery.
            </h1>

            {/* Positioning Statement */}
            <p className="text-lg sm:text-xl text-[var(--pub-muted)] public-sans font-normal leading-relaxed max-w-2xl">
              {schoolConfig.positioningStatement}
            </p>

            {/* Primary Action Row */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link to="/admissions" className="pub-btn-primary text-base px-6 py-3">
                <span>Admissions &amp; Enrollment</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link to="/academics" className="pub-btn-secondary text-base px-6 py-3">
                <span>Explore Academics</span>
              </Link>
              <Link
                to={schoolConfig.portalNavigation.href}
                className="pub-btn-portal text-base px-5 py-3"
              >
                <GraduationCap className="w-5 h-5 text-[var(--pub-forest)]" />
                <span>Open Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Intro / Pillars Preview Section */}
      <section className="py-16 sm:py-20 bg-[var(--pub-white)] border-b border-[var(--pub-border)]">
        <div className="public-container">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-wider font-semibold text-[var(--pub-forest)]">
              Educational Framework
            </span>
            <h2 className="text-3xl sm:text-4xl public-serif text-[var(--pub-ink)] mt-2 font-normal">
              An intentional environment for thoughtful learning.
            </h2>
            <p className="text-[var(--pub-muted)] mt-3">
              Our campus programs are designed around intellectual inquiry, creative discipline, and active community participation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="p-8 rounded-lg border border-[var(--pub-border)] bg-[var(--pub-paper)] flex flex-col justify-between hover:border-[var(--pub-forest)]/40 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[var(--pub-forest)]/10 text-[var(--pub-forest)] flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium public-serif text-[var(--pub-ink)]">
                  Rigorous Academics
                </h3>
                <p className="text-sm text-[var(--pub-muted)] leading-relaxed">
                  In-depth study paths that emphasize critical analytical inquiry and comprehensive subject mastery across disciplines.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[var(--pub-border)]">
                <Link
                  to="/academics"
                  className="text-sm font-semibold text-[var(--pub-forest)] hover:underline inline-flex items-center gap-1"
                >
                  <span>Curriculum overview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 rounded-lg border border-[var(--pub-border)] bg-[var(--pub-paper)] flex flex-col justify-between hover:border-[var(--pub-forest)]/40 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[var(--pub-forest)]/10 text-[var(--pub-forest)] flex items-center justify-center">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium public-serif text-[var(--pub-ink)]">
                  Campus &amp; Facilities
                </h3>
                <p className="text-sm text-[var(--pub-muted)] leading-relaxed">
                  Dedicated spaces structured to foster focused collaboration, practical experimentation, and physical well-being.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[var(--pub-border)]">
                <Link
                  to="/campus"
                  className="text-sm font-semibold text-[var(--pub-forest)] hover:underline inline-flex items-center gap-1"
                >
                  <span>Campus environments</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 rounded-lg border border-[var(--pub-border)] bg-[var(--pub-paper)] flex flex-col justify-between hover:border-[var(--pub-forest)]/40 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[var(--pub-forest)]/10 text-[var(--pub-forest)] flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium public-serif text-[var(--pub-ink)]">
                  Student Community
                </h3>
                <p className="text-sm text-[var(--pub-muted)] leading-relaxed">
                  Extracurricular clubs, athletics, arts, and student leadership opportunities that nurture diverse interests.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[var(--pub-border)]">
                <Link
                  to="/student-life"
                  className="text-sm font-semibold text-[var(--pub-forest)] hover:underline inline-flex items-center gap-1"
                >
                  <span>Life on campus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Classroom Portal Access Banner */}
      <section className="py-12 bg-[var(--pub-paper)] border-b border-[var(--pub-border)]">
        <div className="public-container">
          <div className="p-8 rounded-xl bg-[var(--pub-forest)] text-[var(--pub-white)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--pub-gold)] uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                Classroom Management Portal
              </div>
              <h3 className="text-2xl sm:text-3xl public-serif font-normal">
                Looking for the staff or student portal?
              </h3>
              <p className="text-sm text-[var(--pub-paper)]/80 max-w-xl">
                The portal provides access to active class management, subject directories, and administrative workflows.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                to={schoolConfig.portalNavigation.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[var(--pub-white)] text-[var(--pub-forest)] font-semibold text-sm hover:bg-[var(--pub-paper)] transition-colors shadow-xs"
              >
                <span>Enter Classroom Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
