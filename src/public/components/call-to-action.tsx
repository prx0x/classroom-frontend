import React from "react";
import { Link } from "react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export interface CallToActionProps {
  overline?: string;
  badge?: React.ReactNode;
  heading: string;
  description: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  note?: string;
  variant?: "forest" | "paper";
  className?: string;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  overline,
  badge,
  heading,
  description,
  primaryAction,
  secondaryAction,
  note,
  variant = "forest",
  className = "",
}) => {
  const isForest = variant === "forest";

  return (
    <div
      className={`rounded-xl p-8 sm:p-12 lg:p-16 border transition-all ${
        isForest
          ? "bg-[var(--pub-forest)] text-[var(--pub-white)] border-[#2c5546] shadow-sm"
          : "bg-[var(--pub-white)] text-[var(--pub-ink)] border-[var(--pub-border)]"
      } ${className}`}
    >
      <div className="max-w-3xl space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          {badge}
          {overline && (
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                isForest ? "text-[var(--pub-gold)]" : "text-[var(--pub-forest)]"
              }`}
            >
              {overline}
            </span>
          )}
        </div>

        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-normal public-serif leading-[1.2] ${
            isForest ? "text-[var(--pub-white)]" : "text-[var(--pub-ink)]"
          }`}
        >
          {heading}
        </h2>

        <p
          className={`text-base sm:text-lg leading-relaxed ${
            isForest ? "text-[var(--pub-paper)]/85" : "text-[var(--pub-muted)]"
          }`}
        >
          {description}
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <Link
            to={primaryAction.href}
            className={`inline-flex items-center justify-center px-6 py-3 rounded-md text-sm font-semibold transition-colors shadow-xs ${
              isForest
                ? "bg-[var(--pub-white)] text-[var(--pub-forest)] hover:bg-[var(--pub-paper)]"
                : "bg-[var(--pub-forest)] text-[var(--pub-white)] hover:bg-[#1b382d]"
            }`}
          >
            <span>{primaryAction.label}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>

          {secondaryAction && (
            <Link
              to={secondaryAction.href}
              className={`inline-flex items-center justify-center px-6 py-3 rounded-md text-sm font-semibold border transition-colors ${
                isForest
                  ? "border-[var(--pub-white)]/40 text-[var(--pub-white)] hover:bg-[var(--pub-white)]/10"
                  : "border-[var(--pub-forest)] text-[var(--pub-forest)] hover:bg-[var(--pub-forest)]/10"
              }`}
            >
              <span>{secondaryAction.label}</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5 opacity-80" />
            </Link>
          )}
        </div>

        {note && (
          <p
            className={`text-xs ${
              isForest ? "text-[var(--pub-paper)]/60" : "text-[var(--pub-muted)]"
            }`}
          >
            {note}
          </p>
        )}
      </div>
    </div>
  );
};
