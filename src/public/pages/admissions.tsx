import React from "react";
import { Link } from "react-router";
import { schoolConfig } from "@/config/school";
import { ArrowLeft, ShieldAlert, Calendar } from "lucide-react";

export const AdmissionsPage: React.FC = () => {
  return (
    <div className="public-container py-16">
      <div className="max-w-3xl space-y-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--pub-forest)] font-medium hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Homepage
        </Link>

        <div className="inline-flex items-center gap-2">
          <span className="pub-badge-unverified">
            <ShieldAlert className="w-3.5 h-3.5" />
            Phase 1 Routing Foundation
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl public-serif text-[var(--pub-ink)] font-normal">
          Admissions &amp; Enrollment
        </h1>

        <p className="text-lg text-[var(--pub-muted)] leading-relaxed">
          We welcome families seeking an inspiring, rigorous, and supportive academic environment.
        </p>

        <div className="p-6 rounded-lg pub-surface space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[var(--pub-forest)]/10 text-[var(--pub-forest)] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[var(--pub-ink)]">
                Admissions Timeline &amp; Criteria Verification
              </h2>
              <p className="text-xs text-[var(--pub-muted)]">
                Official deadlines and fee schedules pending confirmation
              </p>
            </div>
          </div>
          <p className="text-sm text-[var(--pub-muted)]">
            Exact application deadlines, eligibility criteria, required documentation, and fee schedules
            will be published once confirmed by school administration. No placeholder fee or deadline figures are fabricated.
          </p>
          <div className="pt-2">
            <Link to="/contact" className="pub-btn-secondary text-sm">
              Contact Admissions Office
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
