import React from "react";
import { Link } from "react-router";
import { ArrowLeft, ShieldAlert, Compass } from "lucide-react";

export const CampusPage: React.FC = () => {
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
          Campus &amp; Learning Facilities
        </h1>

        <p className="text-lg text-[var(--pub-muted)] leading-relaxed">
          Explore the environments where our students collaborate, experiment, and develop their passions.
        </p>

        <div className="p-6 rounded-lg pub-surface space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[var(--pub-forest)]/10 text-[var(--pub-forest)] flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[var(--pub-ink)]">
                Campus Photography &amp; Spaces
              </h2>
              <p className="text-xs text-[var(--pub-muted)]">
                Requires confirmed campus imagery and facility inventory
              </p>
            </div>
          </div>
          <p className="text-sm text-[var(--pub-muted)]">
            Authentic campus imagery and verified facility descriptions will be introduced in Phase 3.
            Stock images will not be misrepresented as verified physical facilities.
          </p>
        </div>
      </div>
    </div>
  );
};
