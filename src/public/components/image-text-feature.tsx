import React from "react";
import { Link } from "react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { EditorialImage, EditorialImageProps } from "./editorial-image";

export interface ImageTextFeatureProps {
  overline?: string;
  badge?: React.ReactNode;
  title: string;
  description: string;
  secondaryText?: string;
  highlights?: string[];
  cta?: {
    label: string;
    href: string;
  };
  image: EditorialImageProps;
  reverse?: boolean;
}

export const ImageTextFeature: React.FC<ImageTextFeatureProps> = ({
  overline,
  badge,
  title,
  description,
  secondaryText,
  highlights,
  cta,
  image,
  reverse = false,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      {/* Visual / Image Column */}
      <div
        className={`lg:col-span-6 ${
          reverse ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <EditorialImage {...image} />
      </div>

      {/* Narrative & Text Column */}
      <div
        className={`lg:col-span-6 space-y-6 ${
          reverse ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          {badge}
          {overline && (
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--pub-forest)]">
              {overline}
            </span>
          )}
        </div>

        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal public-serif text-[var(--pub-ink)] leading-[1.25]">
          {title}
        </h3>

        <p className="text-base sm:text-lg text-[var(--pub-muted)] leading-relaxed">
          {description}
        </p>

        {secondaryText && (
          <p className="text-sm text-[var(--pub-muted)] leading-relaxed">
            {secondaryText}
          </p>
        )}

        {highlights && highlights.length > 0 && (
          <ul className="space-y-2.5 pt-2">
            {highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-[var(--pub-ink)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--pub-forest)] mt-0.5 shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {cta && (
          <div className="pt-4">
            <Link to={cta.href} className="pub-btn-primary">
              <span>{cta.label}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
