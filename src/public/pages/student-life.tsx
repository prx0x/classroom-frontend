import React from "react";
import { Link } from "react-router";
import { ArrowLeft, ShieldAlert, Sparkles } from "lucide-react";

export const StudentLifePage: React.FC = () => {
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
          Student Life &amp; Community
        </h1>

        <p className="text-lg text-[var(--pub-muted)] leading-relaxed">
          From competitive athletics to fine arts and student-led initiatives, our campus culture thrives on active participation.
        </p>

        <div className="p-6 rounded-lg pub-surface space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[var(--pub-forest)]/10 text-[var(--pub-forest)] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[var(--pub-ink)]">
                Student Activities &amp; Clubs
              </h2>
              <p className="text-xs text-[var(--pub-muted)]">
                Awaiting confirmed list of active student clubs and arts programmes
              </p>
            </div>
          </div>
          <p className="text-sm text-[var(--pub-muted)]">
            Verified student clubs, athletic leagues, creative arts, and community traditions will be presented here in Phase 3.
          </p>
        </div>
      </div>
    </div>
  );
};
