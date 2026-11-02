import React from "react";
import { Link } from "react-router";
import { Breadcrumbs, BreadcrumbItem } from "./breadcrumbs";
import { AlertCircle } from "lucide-react";

interface PageHeroAction {
  label: string;
  href: string;
  external?: boolean;
}

interface PageHeroProps {
  badge?: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  primaryCta?: PageHeroAction;
  secondaryCta?: PageHeroAction;
  disclaimer?: string;
  metaItems?: Array<{ label: string; value: string }>;
}

export const PageHero: React.FC<PageHeroProps> = ({
  badge,
  title,
  description,
  breadcrumbs,
  primaryCta,
  secondaryCta,
  disclaimer,
  metaItems,
}) => {
  return (
    <section className="border-b border-[var(--pub-border)] bg-[var(--pub-white)]/40 py-10 sm:py-14">
      <div className="public-container">
        <div className="max-w-4xl space-y-5">
          <Breadcrumbs items={breadcrumbs} />

          <div className="space-y-3">
            {badge && (
              <span className="pub-badge-forest">
                {badge}
              </span>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal public-serif text-[var(--pub-ink)] tracking-tight leading-[1.15]">
              {title}
            </h1>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-[var(--pub-muted)] leading-relaxed max-w-3xl">
            {description}
          </p>

          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {primaryCta && (
                <Link to={primaryCta.href} className="pub-btn-primary">
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link to={secondaryCta.href} className="pub-btn-secondary">
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}

          {disclaimer && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[var(--pub-paper)] border border-[var(--pub-border)] text-xs text-[var(--pub-muted)] mt-2">
              <AlertCircle className="w-3.5 h-3.5 text-[#8c6a23] shrink-0" />
              <span>{disclaimer}</span>
            </div>
          )}

          {metaItems && metaItems.length > 0 && (
            <div className="pt-4 border-t border-[var(--pub-border)] flex flex-wrap gap-x-8 gap-y-3 text-xs">
              {metaItems.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="uppercase tracking-wider text-[var(--pub-muted)] font-mono text-[10px]">
                    {item.label}
                  </span>
                  <span className="font-medium text-[var(--pub-ink)] mt-0.5">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
