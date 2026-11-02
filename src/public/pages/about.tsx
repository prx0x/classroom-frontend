import React from "react";
import { Link } from "react-router";
import { schoolConfig } from "@/config/school";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export const AboutPage: React.FC = () => {
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
          About {schoolConfig.shortName.split(" (")[0]}
        </h1>

        <p className="text-lg text-[var(--pub-muted)] leading-relaxed">
          {schoolConfig.positioningStatement}
        </p>

        <div className="p-6 rounded-lg pub-surface space-y-3">
          <h2 className="text-base font-semibold text-[var(--pub-ink)]">
            Institutional Background Status
          </h2>
          <p className="text-sm text-[var(--pub-muted)]">
            Full school history, mission statement, leadership messages, and board affiliations
            will be populated during Phase 3 once official identity records are verified by the school.
          </p>
          <div className="text-xs text-[var(--pub-muted)] font-mono pt-2">
            Affiliation: {schoolConfig.boardAffiliation}
          </div>
        </div>
      </div>
    </div>
  );
};
