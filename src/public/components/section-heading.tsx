import React from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export interface SectionHeadingProps {
  overline?: string;
  badge?: React.ReactNode;
  title: string;
  description?: string;
  align?: "left" | "center";
  cta?: {
    label: string;
    href: string;
  };
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  overline,
  badge,
  title,
  description,
  align = "left",
  cta,
  className = "",
}) => {
  const isCenter = align === "center";

  return (
    <div
      className={`space-y-4 mb-10 sm:mb-14 ${
        isCenter ? "text-center max-w-3xl mx-auto" : "max-w-3xl"
      } ${className}`}
    >
      <div className={`flex flex-wrap items-center gap-2 ${isCenter ? "justify-center" : "justify-start"}`}>
        {badge}
        {overline && (
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--pub-forest)]">
            {overline}
          </span>
        )}
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-normal tracking-tight public-serif text-[var(--pub-ink)] leading-[1.2]">
        {title}
      </h2>

      {description && (
        <p className="text-base sm:text-lg text-[var(--pub-muted)] public-sans font-normal leading-relaxed">
          {description}
        </p>
      )}

      {cta && (
        <div className={`pt-2 ${isCenter ? "flex justify-center" : ""}`}>
          <Link
            to={cta.href}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--pub-forest)] hover:underline"
          >
            <span>{cta.label}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
};
