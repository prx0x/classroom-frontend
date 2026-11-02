import React from "react";
import { Link } from "react-router";
import { ArrowRight, BookOpen, Compass, Sparkles, Microscope } from "lucide-react";
import { EducationalPillar } from "@/config/school";

export interface PillarCardProps {
  pillar: EducationalPillar;
}

const iconMap: Record<string, React.ReactNode> = {
  "01": <BookOpen className="w-5 h-5 text-[var(--pub-forest)]" />,
  "02": <Sparkles className="w-5 h-5 text-[var(--pub-clay)]" />,
  "03": <Compass className="w-5 h-5 text-[var(--pub-gold)]" />,
  "04": <Microscope className="w-5 h-5 text-[var(--pub-forest)]" />,
};

export const PillarCard: React.FC<PillarCardProps> = ({ pillar }) => {
  return (
    <article className="pub-card pub-card-interactive p-7 sm:p-8 flex flex-col justify-between h-full bg-[var(--pub-white)]">
      <div className="space-y-5">
        {/* Top Header: Number & Category */}
        <div className="flex items-center justify-between border-b border-[var(--pub-border-subtle)] pb-4">
          <span className="font-mono text-sm font-semibold tracking-wider text-[var(--pub-muted)]">
            {pillar.number}
          </span>
          <span className="pub-badge-forest text-[11px]">
            {pillar.category}
          </span>
        </div>

        {/* Pillar Icon & Title */}
        <div className="space-y-3">
          <div className="w-10 h-10 rounded-md bg-[var(--pub-paper)] flex items-center justify-center border border-[var(--pub-border)]">
            {iconMap[pillar.number] ?? <BookOpen className="w-5 h-5 text-[var(--pub-forest)]" />}
          </div>
          <h3 className="text-xl sm:text-2xl font-normal public-serif text-[var(--pub-ink)]">
            {pillar.title}
          </h3>
          <p className="text-xs font-medium text-[var(--pub-muted)] uppercase tracking-wider">
            {pillar.summary}
          </p>
        </div>

        {/* Narrative Description */}
        <p className="text-sm text-[var(--pub-muted)] leading-relaxed">
          {pillar.description}
        </p>
      </div>

      {/* Footer Link */}
      <div className="pt-6 mt-6 border-t border-[var(--pub-border-subtle)]">
        <Link
          to={pillar.href}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--pub-forest)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--pub-forest)]"
        >
          <span>Explore curriculum</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};
